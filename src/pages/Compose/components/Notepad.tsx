import { Button, Group, Stack, Title, Modal, useMantineTheme, Center, Text, TextInput, Select, createStyles } from '@mantine/core';

import { useState, Dispatch, SetStateAction } from 'react';

import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';



export default function Notepad() {
    const theme = useMantineTheme()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const content =
        `
    <h3 style="text-align: center">Welcome to the AI Notepad ✨</h3>
    <p style="text-align: center">Brainstorm essay outlines with the integrated <strong>Create Outline</strong> button or jot down any notes here!</p>
    <ul><li><p>Paste links here to populate your essay works cited page ✅</p></li><li><p>Include references and images for later ✅</p></li><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, underline, <s>strike-through</s> ✅</p></li><li><p>Ordered </p><ul><li><p>and bullet lists ✅</p></li></ul></li></ul>
    `

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content,
    });

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

                    <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }} onClick={(() => setModalIsOpen(true))} radius="md" size="sm">Create Outline</Button>

                </Group>

                <RichTextEditor editor={editor}>
                    <RichTextEditor.Content />
                </RichTextEditor>
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



function CreateOutlineModalContent({setIsActive}: Props) {
    return (
        <Center>
            <Stack>
                <Title size={"lg"} order={4}>Oops you forgot to include your Esssay prompt!</Title>

            <ContainedInputs/>


            <Button onClick={() => {setIsActive(false)}}>
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