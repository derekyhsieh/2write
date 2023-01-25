import { useState } from "react";
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
	MediaQuery,
	createStyles,
	useMantineTheme,
	Tooltip,
} from "@mantine/core";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { IconHighlight, IconDrone } from "@tabler/icons";
import { useDebounce } from "use-debounce";
import { CharacterCount } from "@tiptap/extension-character-count";
import { AutocompleteSnippets } from "./AutocompleteSnippets";
import { useSearchParams } from "react-router-dom";
import { LoginContext } from "../../../context/DocContext";

import { loadEssay } from "../../../services/FirestoreHelpers";

import { NavbarMini } from "./Navbar";
import CustomRichContainer from "./CustomRTE";
import CustomRTE from "./CustomRTE";
import DocumentHeader from "./DocumentHeader";
import Notepad from "./Notepad";
import { UserAuth } from "../../../context/AuthContext";
import { IconLogout } from "@tabler/icons";
import { convertURLToName } from "../../../utils/misc";
import UserMenu from "../../Home/components/UserMenu";

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

		zIndex: 10000,
		position: "fixed",
		top: "0.55%",
		right: "1.2%",
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

	const [searchParams, setSearchParams] = useSearchParams();
	const [initalContent, setInitialContent] = useState("");

	const { user, logOut } = UserAuth();

	const [opened, setOpened] = useState(false);
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

	return (
		<div>
			<LoginContext.Provider value={{ localDocData, setLocalDocData }}>
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
								<DocumentHeader localDocData={localDocData} />
							</Header>
							{/* This user menu needs to be here (outside of headers, etc), menus won't be accessible otherwise due to the way AppShell works */}
							<UserMenu
								userMenuOpened={userMenuOpened}
								setUserMenuOpened={setUserMenuOpened}
								classes={classes}
								user={user}
								logOut={logOut}
							/>
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
