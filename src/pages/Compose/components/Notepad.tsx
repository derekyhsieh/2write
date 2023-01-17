import { Button, Group, Stack, Title, Modal, useMantineTheme, Center, Text, TextInput, Select, createStyles } from '@mantine/core';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { convertStringIntoHTML } from '../../../utils/CleanHTML';

import { RichTextEditor } from "@mantine/rte"
import "./NotepadEditor.css"
import { useFetch } from '../../../hooks/useFetch';
import { useDebounce } from "use-debounce";
import { useSearchParams } from 'react-router-dom';
import { saveNotepad } from '../../../services/FirestoreHelpers';
import { UserAuth } from '../../../context/AuthContext';



type NotepadProps = {
    localDocData: any
}


export default function Notepad(localDocData) {
    const theme = useMantineTheme()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams()
    const content = searchParams.get("isNewDoc") == "true" ? `
    <h3 style="text-align: center">Welcome to the AI Notepad ✨</h3>
    <p style="text-align: center">Brainstorm essay outlines with the integrated <strong>Create Outline</strong> button or jot down any notes here!</p>
    <ul><li><p>Paste links here to populate your essay works cited page ✅</p></li><li><p>Include references and images for later ✅</p></li><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, underline, <s>strike-through</s> ✅</p><p>Ordered and bullet lists ✅</p></li></ul></li></ul>`
    : ''


    const [editorValue, setEditorValue] = useState(content)
    const [debouncedEditor] = useDebounce(editorValue, 5000)

    const {user} = UserAuth()

    useEffect(() => {


        if(editorValue !== "") {
            console.log(editorValue)
            console.log("saving notepad")
            saveNotepad(user.uid, searchParams.get("essayId"), editorValue)
        }


    }, [debouncedEditor])


    useEffect(() => {

        setEditorValue(localDocData.localDocData.notepad)
        console.log(localDocData.localDocData.notepad)

    }, [localDocData])

    const handleCreateOutline = () => {
        const data = localDocData




        

        if(data.localDocData.hasOwnProperty('essayPrompt')) {
            // fetch outline 
            const prompt = data.localDocData.essayPrompt

            setIsLoading(true)

            fetch("/api/outline", {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"prompt": prompt}),
            })
            .then((res) => res.json())
            .then((returnedData) => {

                const cleanedHTML = convertStringIntoHTML(returnedData.answer)
                const notepadContent = `<h3>AI Outline</h3> <p>${cleanedHTML}</p>`
                saveNotepad(user.uid, searchParams.get("essayId"), notepadContent)
                setEditorValue(notepadContent)
                
            }).finally(() => {

                setIsLoading(false)

            })



        } else {
            setModalIsOpen(true)
        }


    }



    return (
        <>

            <Modal
                opened={modalIsOpen}
                centered
                onClose={() => setModalIsOpen(false)}
                withCloseButton={false}
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <CreateOutlineModalContent setIsActive={setModalIsOpen} />
            </Modal>

            <Group>

                <Group position='apart' style={{ width: "100%" }}>

                    <Title order={2}>Notepad</Title>

                    <Button loading={isLoading} onClick={handleCreateOutline} radius="md" size="sm">Create Outline</Button>

                </Group>

                <RichTextEditor styles={{root: {width: "100%"}}} value={editorValue} onChange={setEditorValue} controls={[
                    ['bold', 'italic', 'underline', 'link', 'image'],
                    
                ]} id="rte"/>

            </Group>
        </>
    );
}


const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
    },

    input: {
        height: 'auto',
        paddingTop: 18,
    },

    label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: theme.spacing.sm / 2,
        zIndex: 1,
    },
}));

type Props = {
    setIsActive: (active: boolean) => void;
}



function CreateOutlineModalContent({ setIsActive }: Props) {
    return (
        <Center>
            <Stack>
                <Title size={"lg"} order={4}>Oops, you forgot to include your essay prompt!</Title>

                <ContainedInputs />


                <Button onClick={() => { setIsActive(false) }}>
                    Generate ✨
                </Button>

            </Stack>
        </Center>
    )
}



function ContainedInputs() {
    // You can add these classes as classNames to any Mantine input, it will work the same
    const { classes } = useStyles();

    return (
        <div>
            <TextInput label="Enter the prompt for your essay" placeholder="Why is 2Write the best app?" classNames={classes} />

            <Select
                style={{ marginTop: 20, zIndex: 2 }}
                data={['Research Essay', 'Historical Essay', 'Argumentative Essay', 'Reflection Essay', 'Other']}
                placeholder="Argumentative Essay"
                label="Pick which category your essay best fits under"
                classNames={classes}
            />


        </div>
    );
}