import { useState, useLayoutEffect } from "react";
import { useEditor } from "@tiptap/react";
import {
	RichTextEditor,
	Link,
	useRichTextEditorContext,
} from "@mantine/tiptap";
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Avatar,
	Aside,
	Group,
	Menu,
	UnstyledButton,
	Text,
	Modal,
	MediaQuery,
	createStyles,
	useMantineTheme,
	Tooltip,
	Button,
	Stack,
	Kbd,
} from "@mantine/core";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Typography from "@tiptap/extension-typography";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { IconHighlight, IconDrone } from "@tabler/icons";
import { useDebounce } from "use-debounce";
import { CharacterCount } from "@tiptap/extension-character-count";
import { AutocompleteSnippets } from "./AutocompleteSnippets";
import { useLocation, useSearchParams } from "react-router-dom";
import { LoginContext } from "../../../context/DocContext";

import {
	createEssay,
	loadEssay,
	checkIfEssayExists,
} from "../../../services/FirestoreHelpers";

import { NavbarMini } from "./Navbar";
import CustomRichContainer from "./CustomRTE";
import CustomRTE from "./CustomRTE";
import DocumentHeader from "./DocumentHeader";
import Notepad from "./Notepad";
import { UserAuth } from "../../../context/AuthContext";
import { IconLogout } from "@tabler/icons";
import { convertURLToName } from "../../../utils/misc";
import UserMenu from "../../Home/components/UserMenu";
import useWindowSize from "../../../hooks/useWindowSize";
import { StatsRingCard } from "./plagiarism-feature/StatsRingCard";
import { CreatePlagiarismModalContent } from "./plagiarism-feature/PlagiarismModal";
import { auth } from "../../../services/firebase";
import Tour from "reactour";

const useStyles = createStyles((theme) => ({
	user: {
		color: theme.white,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: "background-color 100ms ease",

		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},

		[theme.fn.smallerThan("md")]: {
			top: "-0.08999%",
			right: "1.8%",
		},

		zIndex: 1000,
		position: "fixed",
		top: "0.55%",
		right: "1.2%",
	},

	plagiarismDetector: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},

		[theme.fn.smallerThan("md")]: {
			top: "1.4%",
			right: "12%",
		},

		zIndex: 1000,
		position: "fixed",
		top: "1.99%",
		right: "7%",
	},

	plagiarismDetectorClone: {
		opacity: 0,

		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},

		[theme.fn.smallerThan("md")]: {
			top: "1.4%",
			right: "12%",
		},

		zIndex: 1099,
		position: "fixed",
		top: "1.99%",
		right: "7%",
	},

	search: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
		width: "60%",
	},

	tooltipTitle: {
		fontSize: theme.fontSizes.md,
	},

	avatarHover: {
		":hover": {
			outline: "3px solid #E9E9E9",
		},
	},

	avatarMenu: {
		outline: "3px solid #D4D4D4",
	},
}));

export default function ComposeContainer() {
	const theme = useMantineTheme();
	const { classes } = useStyles();
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const [plagiarismModalIsOpen, setPlagiarismModalIsOpen] = useState(false);
	const [isPlagiarismButtonLoading, setIsPlagiarismButtonLoading] =
		useState(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const [initalContent, setInitialContent] = useState("");

	const [currentClassification, setCurrentClassification] =
		useState<string>("");
	const [currentClassificationPercentage, setCurrentClassificationPercentage] =
		useState<number>(0);

	const [currentPlagiarism, setCurrentPlagiarism] = useState<string>("");
	const [currentPlagiarismPercentage, setCurrentPlagiarismPercentage] =
		useState<number>(0);

	const { user, logOut } = UserAuth();
	const [onboardingOpen, setOnboardingOpen] = useState(false);

	useLayoutEffect(() => {
		checkIfEssayExists(user.uid, "hasSeenOnboarding").then((exists) => {
			if (exists) {
				setOnboardingOpen(false);
			} else {
				setOnboardingOpen(true);
			}
		});
	}, []);

	// document metadata
	const [localDocData, setLocalDocData] = useState<{
		content: string;
		essayPrompt?: string;
		timestamp: {
			seconds: number;
			nanoseconds: number;
		};
		lastEdit?: {
			seconds: number;
			nanoseconds: number;
		};
		title?: string;
	}>({
		content: "",
		timestamp: { seconds: 0, nanoseconds: 0 },
	});

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			AutocompleteSnippets,
			Superscript,
			SubScript,
			CharacterCount,
			Highlight,
			Typography,
			TextStyle,
			FontFamily,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],

		onCreate: ({ editor }) => {
			loadEssay(user.uid, searchParams.get("essayId")).then((doc) => {
				// neeed to set intial content so debouncer isn't called on first load
				setInitialContent(doc.content);
				console.log({ ...doc });
				// @ts-ignore
				setLocalDocData({ ...doc });
				editor.commands.setContent(doc.content == "" ? "    " : doc.content);
			});
		},
	});

	const steps = [
		{
			selector: ".mantine-3f8va4",
			content: () => (
				<>
					{"Type your documents here. You can use the "}
					<Kbd>Tab</Kbd>
					{
						" key to accept an autcomplete suggestion or just keep typing to ignore it. Suggestions are made after you've written at least 6 words."
					}
				</>
			),
		},
		{
			selector: ".mantine-g0wba",
			content:
				"Use this button to create an outline for your essay. Make sure you have a prompt!",
		},
		{
			selector: ".mantine-hhjyz1",
			content:
				"Use the toolbar to edit different aspects of your document. You can also keep track of statistics about your document here.",
		},
	];

	return (
		<div>
			<Tour
				steps={steps}
				isOpen={onboardingOpen}
				onRequestClose={() => {
					setOnboardingOpen(false);
					createEssay(user.uid, "hasSeenOnboarding", "").then(() => {
						console.log("saved hasSeenOnboarding");
					});
				}}
				showNumber={false}
				rounded={15}
				accentColor="#228BE6"
			/>
			<LoginContext.Provider value={{ localDocData, setLocalDocData }}>
				<Modal
					opened={plagiarismModalIsOpen}
					centered
					onClose={() => setPlagiarismModalIsOpen(false)}
					withCloseButton={false}
					overlayColor={
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2]
					}
					overlayOpacity={0.55}
					overlayBlur={3}
					zIndex={999999}
					trapFocus
				>
					<CreatePlagiarismModalContent
						setIsActive={setPlagiarismModalIsOpen}
						classification={currentClassification}
						percentage={currentClassificationPercentage}
						classificationTitles={[
							"Text written by a human",
							"Text written by an AI",
						]}
						classificationDescription="We use state-of-the-art machine learning algorithms to accurately
						identify AI-generated content."
					/>
				</Modal>
				<AppShell
					styles={{
						main: {
							background:
								theme.colorScheme === "dark"
									? theme.colors.dark[8]
									: theme.colors.gray[0],
						},
					}}
					navbarOffsetBreakpoint="sm"
					asideOffsetBreakpoint="sm"
					navbar={<NavbarMini editor={editor} />}
					aside={
						<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
							<Aside
								p="md"
								hiddenBreakpoint="sm"
								width={{ sm: 300, md: 350, lg: 400 }}
							>
								<Notepad />
							</Aside>
						</MediaQuery>
					}
					header={
						<>
							<Header
								height={{ base: 60, md: 70 }}
								p="md"
								style={{ position: "fixed", top: 0 }}
							>
								<DocumentHeader localDocData={localDocData} editor={editor} />
							</Header>
							{/* This user menu needs to be here (outside of headers, etc), menus won't be accessible otherwise due to the way AppShell works */}
							<UserMenu
								userMenuOpened={userMenuOpened}
								setUserMenuOpened={setUserMenuOpened}
								classes={classes}
								user={user}
								logOut={logOut}
							/>
							<Tooltip
								label={"Detects AI generated and plagiarized content"}
								position="bottom"
								multiline
							>
								<Button
									className={classes.plagiarismDetector}
									disabled={
										editor?.view.state.doc.textContent.split(" ").length < 100
									}
									radius="md"
									variant="outline"
									size="sm"
									loading={isPlagiarismButtonLoading}
									onClick={async () => {
										setIsPlagiarismButtonLoading(true);
										const idToken = await auth.currentUser?.getIdToken();
										await fetch("/api/classify", {
											method: "post",
											headers: { "Content-Type": "application/json" },
											body: JSON.stringify({
												idToken: idToken,
												prompt: editor?.view.state.doc.textContent,
											}),
										})
											.then((res) => res.json())
											.then((data: any) => {
												setCurrentClassification(data.label);
												setCurrentClassificationPercentage(data.score);
												setPlagiarismModalIsOpen(true);
												setIsPlagiarismButtonLoading(false);
											});
									}}
								>
									Plagiarism Detector
								</Button>
							</Tooltip>
							<Tooltip
								label={
									"Detects AI generated and plagiarized content, minimum of 100 words"
								}
								position="bottom"
								multiline
							>
								<Button
									className={classes.plagiarismDetectorClone}
									disabled={
										editor?.view.state.doc.textContent.split(" ").length >= 100
									}
									radius="md"
									size="sm"
								>
									Plagiarism Detector
								</Button>
							</Tooltip>
						</>
					}
				>
					<CustomRTE
						localDocData={localDocData}
						setLocalDocData={setLocalDocData}
						editor={editor}
					/>
				</AppShell>
			</LoginContext.Provider>
		</div>
	);
}
