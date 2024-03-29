import {
	Button,
	Group,
	Stack,
	Title,
	Modal,
	useMantineTheme,
	Center,
	TextInput,
	Select,
	createStyles,
} from "@mantine/core";

import { useState, useEffect } from "react";
import { convertStringIntoHTML } from "../../../utils/CleanHTML";

import { RichTextEditor } from "@mantine/rte";
import "./NotepadEditor.css";
import { useFetch } from "../../../hooks/useFetch";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import {
	saveEssayPrompt,
	saveNotepad,
} from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { useContext } from "react";
import { LoginContext } from "../../../context/DocContext";
import { auth } from "../../../services/firebase";

type NotepadProps = {
	localDocData: any;
};

export default function Notepad() {
	const theme = useMantineTheme();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams] = useSearchParams();
	const content =
		searchParams.get("isNewDoc") == "true"
			? `
    <h3 class="ql-align-center">Welcome to the AI Notepad ✨</h3><p class="ql-align-center">Brainstorm essay outlines with the integrated <strong>Create Outline</strong> button or jot down any notes here!</p><ul><li>Paste links here to populate your essay works cited page ✅</li><li>Include references and images for later ✅</li><li>General text formatting: <strong>bold</strong>, <em>italic</em>, underline, <s>strike-through</s> ✅</li><li>Ordered and bullet lists ✅</li></ul></div>`
			: "";

	const [editorValue, setEditorValue] = useState(content);
	const [debouncedEditor] = useDebounce(editorValue, 5000);
	// @ts-ignore
	const { localDocData, setLocalDocData } = useContext(LoginContext);

	const { user } = UserAuth();

	useEffect(() => {
		if (editorValue !== "") {
			// console.log(editorValue);
			console.log("saving notepad");
			saveNotepad(user.uid, searchParams.get("essayId"), editorValue);
		}
	}, [debouncedEditor]);

	useEffect(() => {
		setEditorValue(localDocData.notepad);
		// console.log(localDocData.notepad);
	}, [localDocData]);

	const handleCreateOutline = () => {
		if (localDocData.hasOwnProperty("essayPrompt") && localDocData.essayPrompt) {
			// fetch outline
			const prompt = localDocData.essayPrompt;

			setIsLoading(true);

			auth.currentUser?.getIdToken(true).then((token) => {
				fetch("/api/outline", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer ".concat(token),
					},
					body: JSON.stringify({ prompt: prompt }),
				})
					.then((res) => res.json())
					.then((returnedData) => {
						const cleanedHTML = convertStringIntoHTML(returnedData.answer);
						const notepadContent = `<h3>AI Outline</h3> <p>${cleanedHTML}</p>`;
						saveNotepad(user.uid, searchParams.get("essayId"), notepadContent);
						setEditorValue(notepadContent);

						let newState = localDocData;
						newState.notepad = notepadContent;
						setLocalDocData(newState);
					})
					.finally(() => {
						setIsLoading(false);
					});
			});
		} else {
			setModalIsOpen(true);
		}
	};

	return (
		<>
			<Modal
				opened={modalIsOpen}
				centered
				onClose={() => setModalIsOpen(false)}
				withCloseButton={false}
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
				zIndex={9999}
				radius={"md"}
			>
				<CreateOutlineModalContent
					setIsActive={setModalIsOpen}
					userID={user.uid}
					essayID={searchParams.get("essayId")}
				/>
			</Modal>

			<Group>
				<Group position="apart" style={{ width: "100%" }}>
					<Title order={2}>Notepad</Title>

					<Button
						loading={isLoading}
						onClick={handleCreateOutline}
						radius="md"
						size="sm"
					>
						Create Outline
					</Button>
				</Group>

				<RichTextEditor
					styles={{ root: { width: "100%" } }}
					value={editorValue}
					onChange={setEditorValue}
					controls={[["bold", "italic", "underline", "link", "image"]]}
					id="rte"
				/>
			</Group>
		</>
	);
}

const useStyles = createStyles((theme) => ({
	root: {
		position: "relative",
	},

	input: {
		height: "auto",
		paddingTop: 18,
	},

	label: {
		position: "absolute",
		pointerEvents: "none",
		fontSize: theme.fontSizes.xs,
		paddingLeft: theme.spacing.sm,
		paddingTop: theme.spacing.sm / 2,
		zIndex: 1,
	},
}));

type Props = {
	setIsActive: (active: boolean) => void;
	userID: string;
	essayID: string;
};

function CreateOutlineModalContent({ setIsActive, userID, essayID }: Props) {
	const [prompt, setPrompt] = useState("");
	const [generateButtonDisabled, setGenerateButtonDisabled] = useState(true);

	return (
		<Center>
			<Stack>
				<Title size={"lg"} order={4}>
					Oops, you forgot to include your essay prompt!
				</Title>

				<ContainedInputs
					prompt={prompt}
					setPrompt={setPrompt}
					generateButtonDisabled={generateButtonDisabled}
					setGenerateButtonDisabled={setGenerateButtonDisabled}
				/>

				<Button
					onClick={() => {
						setIsActive(false);
						saveEssayPrompt(userID, essayID, prompt);
					}}
					disabled={generateButtonDisabled}
				>
					Generate ✨
				</Button>
			</Stack>
		</Center>
	);
}

function ContainedInputs(props: {
	prompt;
	setPrompt;
	generateButtonDisabled;
	setGenerateButtonDisabled;
}) {
	// You can add these classes as classNames to any Mantine input, it will work the same
	const { classes } = useStyles();

	return (
		<div>
			<TextInput
				value={props.prompt}
				onChange={(event) => {
					props.setPrompt(event.currentTarget.value);
					if(props.prompt === "") {
						props.setGenerateButtonDisabled(true);
					} else {
						props.setGenerateButtonDisabled(false);
					}
				}}
				label="Enter the prompt for your essay"
				placeholder="Why is 2Write the best app?"
				classNames={classes}
				required
			/>

			<Select
				style={{ marginTop: 20, zIndex: 2 }}
				data={[
					"Research Essay",
					"Historical Essay",
					"Argumentative Essay",
					"Reflection Essay",
					"Other",
				]}
				placeholder="Argumentative Essay"
				label="Pick which category your essay best fits under"
				classNames={classes}
			/>
		</div>
	);
}
