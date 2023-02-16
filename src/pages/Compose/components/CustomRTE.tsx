import { RichTextEditor } from "@mantine/tiptap";
import { BubbleMenu } from "@tiptap/react";
import { useDebounce } from "use-debounce";
import { Editor } from "@tiptap/react";

import { Text, Loader, Stack, Menu, createStyles } from "@mantine/core";

import { useEffect, useState, useRef } from "react";
import { saveEssay } from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { auth } from "../../../services/firebase";
import {
	IconArrowForwardUp,
	IconArrowBackUp,
	IconTypography,
	IconPlus,
	IconMinus,
} from "@tabler/icons";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

type CustomRTEProps = {
	localDocData: any;
	setLocalDocData: Function;
	editor: Editor;
};

const useStyles = createStyles((theme) => ({
	audioRecordNow: {
		backgroundColor: `${theme.colors.gray[1]} !important`,
		boxShadow: "none !important",
		borderRadius: "20px",
		boxSizing: "border-box",
		width: "40px !important",
		height: "40px !important",
		display: "flex",
		alignItems: "center",
		padding: "12px",
		transition: "all .2s ease-in",
	},
	audioInvisible: {
		display: "none !important",
	},
}));

export default function CustomRTE({
	localDocData,
	setLocalDocData,
	editor,
}: CustomRTEProps) {
	// has data on timestamp etc

	const { classes, theme } = useStyles();
	const [searchParams, setSearchParams] = useSearchParams();
	const [initalContent, setInitialContent] = useState("");
	const [isRewriteLoading, setIsRewriteLoading] = useState(false);
	const [audioLoading, setAudioLoading] = useState(false);
	const [fontSize, setFontSize] = useState(11);
	const fontRef = useRef<HTMLInputElement>(null);

	const { user } = UserAuth();

	const recorderControls = useAudioRecorder();

	const getWordCountFromString = (str: string) => {
		return str.split(" ").length;
	};

	const getRewrite = async (token) => {
		try {
			const res = await fetch("/api/rewrite", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer ".concat(token),
				},
				body: JSON.stringify({
					prompt: editor.state.doc.textBetween(
						editor.state.selection.from,
						editor.state.selection.to,
						" "
					),
				}),
			});
			const data = await res.json();
			setIsRewriteLoading(false);
			editor?.commands.insertContent(data.answer);
		} catch (e) {
			setIsRewriteLoading(false);
			console.error(e);
		}
	};

	const transcribeAudio = async (audioBlob, token) => {
		try {
			const res = await fetch("/api/transcribe", {
				method: "post",
				headers: {
					"Content-Type": "application/octet-stream",
					Authorization: "Bearer ".concat(token),
				},
				body: audioBlob,
			});
			const data = await res.json();
			editor?.commands.insertContent(
				data.results.channels[0].alternatives[0].transcript
			);
		} catch (e) {
			console.error(e);
		}
	};

	const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2500);

	useEffect(() => {
		if (debouncedEditor) {
			// makes sure we don't save on first load when there aren't any acutal changes other than loading from db

			if (editor?.getHTML() !== initalContent) {
				if (editor?.getText() !== "") {
					console.log("SAVING DOC");
					saveEssay(editor?.getHTML(), user.uid, searchParams.get("essayId"));
				}
			}
		}
	}, [debouncedEditor]);

	const setEditorFontFamily = (font) => {
		editor.chain().focus().setFontFamily(font).run();
	};

	const toolbar = (
		<RichTextEditor.Toolbar sticky stickyOffset={60}>
			<RichTextEditor.ControlsGroup>
				<Menu position={"right-start"}>
					<Menu.Target>
						<RichTextEditor.Control title="Fonts">
							<IconTypography stroke={1.5} size={16} />
						</RichTextEditor.Control>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>
							<strong>Fonts</strong>
						</Menu.Label>
						<Menu.Item onClick={() => setEditorFontFamily("Times New Roman")}>
							Times New Roman
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("Calibri")}>
							Calibri
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("Arial")}>
							Arial
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("Verdana")}>
							Verdana
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("Inter")}>
							Inter
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("Helvetica")}>
							Helvetica
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("serif")}>
							Serif
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("monospace")}>
							Monospace
						</Menu.Item>
						<Menu.Item onClick={() => setEditorFontFamily("cursive")}>
							Cursive
						</Menu.Item>
						<Menu.Item
							onClick={() => editor.chain().focus().unsetFontFamily().run()}
						>
							Unset Font
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
				<RichTextEditor.Control title="Decrease font size">
					<IconMinus
						onClick={() => {
							if (fontSize - 1 > 0) {
								setFontSize(fontSize - 1);
								editor.commands.setFontSize(fontSize.toString());
							}
						}}
						stroke={1.5}
						size={16}
					/>
				</RichTextEditor.Control>
				<RichTextEditor.Control title="Font size">
					<input
						ref={fontRef}
						style={{
							padding: 0,
							margin: 5,
							border: 0,
							outline: "none",
							// width: 13,
							width: 30,
							textAlign: "center",

							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontSize: 13,
							fontWeight: 300,
						}}
						type="number"
						min={1}
						value={fontSize}
						onChange={(e) => {
							setFontSize(parseInt(e.currentTarget.value));
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								fontRef.current.blur();
							}
						}}
						onBlur={() => {
							// check if font size is less than 1 or cannot be parsed
							if (fontSize < 1 || !fontSize) {
								setFontSize(11);
								editor.commands.setFontSize(fontSize.toString());
							} else {
								editor.commands.setFontSize(fontSize.toString());
							}
						}}
					/>
					<style>
						{
							"input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }input[type=number] {-moz-appearance: textfield;}"
						}
					</style>
				</RichTextEditor.Control>
				<RichTextEditor.Control title="Increase font size">
					<IconPlus
						onClick={() => {
							setFontSize(fontSize + 1);
							editor.commands.setFontSize(fontSize.toString());
						}}
						stroke={1.5}
						size={16}
					/>
				</RichTextEditor.Control>
			</RichTextEditor.ControlsGroup>
			<RichTextEditor.ControlsGroup>
				<RichTextEditor.Bold />
				<RichTextEditor.Italic />
				<RichTextEditor.Underline />
				<RichTextEditor.ColorPicker
					colors={[
						"#25262b",
						"#868e96",
						"#fa5252",
						"#e64980",
						"#be4bdb",
						"#7950f2",
						"#4c6ef5",
						"#228be6",
						"#15aabf",
						"#12b886",
						"#40c057",
						"#82c91e",
						"#fab005",
						"#fd7e14",
					]}
				/>
				<RichTextEditor.Highlight />
				<RichTextEditor.Strikethrough />
				<RichTextEditor.ClearFormatting />
			</RichTextEditor.ControlsGroup>

			<RichTextEditor.ControlsGroup>
				<RichTextEditor.H1 />
				<RichTextEditor.H2 />
				<RichTextEditor.H3 />
				<RichTextEditor.H4 />
			</RichTextEditor.ControlsGroup>

			<RichTextEditor.ControlsGroup>
				<RichTextEditor.Blockquote />
				<RichTextEditor.Hr />
				<RichTextEditor.BulletList />
				<RichTextEditor.OrderedList />
				<RichTextEditor.Subscript />
				<RichTextEditor.Superscript />
			</RichTextEditor.ControlsGroup>

			<RichTextEditor.ControlsGroup>
				<RichTextEditor.Link />
				<RichTextEditor.Unlink />
			</RichTextEditor.ControlsGroup>

			<RichTextEditor.ControlsGroup>
				<RichTextEditor.AlignLeft />
				<RichTextEditor.AlignCenter />
				<RichTextEditor.AlignJustify />
				<RichTextEditor.AlignRight />
			</RichTextEditor.ControlsGroup>

			<RichTextEditor.ControlsGroup>
				<RichTextEditor.Control
					onClick={() => editor.chain().focus().undo().run()}
					disabled={editor ? !editor.can().undo() : false}
					title="Undo"
				>
					<IconArrowBackUp stroke={1.5} size={16} />
				</RichTextEditor.Control>
				<RichTextEditor.Control
					onClick={() => editor.chain().focus().redo().run()}
					disabled={editor ? !editor.can().redo() : false}
					title="Redo"
				>
					<IconArrowForwardUp stroke={1.5} size={16} />
				</RichTextEditor.Control>
			</RichTextEditor.ControlsGroup>

			<RichTextEditor.ControlsGroup>
				<AudioRecorder
					onRecordingComplete={(audioBlob) => {
						setAudioLoading(true);
						auth.currentUser?.getIdToken(true).then((token) => {
							transcribeAudio(audioBlob, token).then(() => {
								setAudioLoading(false);
							});
						});
					}}
					recorderControls={recorderControls}
					classes={{
						AudioRecorderClass: audioLoading
							? classes.audioInvisible
							: classes.audioRecordNow,
						AudioRecorderStatusClass: classes.audioInvisible,
						AudioRecorderTimerClass: classes.audioInvisible,
						AudioRecorderPauseResumeClass: classes.audioInvisible,
						AudioRecorderDiscardClass: classes.audioInvisible,
					}}
				/>
				{audioLoading && <Loader h={25} w={25} />}
			</RichTextEditor.ControlsGroup>
		</RichTextEditor.Toolbar>
	);

	return (
		<RichTextEditor
			styles={{
				root: {
					// display: "flex",
					minHeight: "100%",
					backgroundColor: "#fff",
				},
				content: {
					// display: "flex",
					// flexGrow: 1,
					minHeight: "100%",
					height: "100%",
				},
			}}
			editor={editor}
		>
			{toolbar}

			{editor && (
				<BubbleMenu editor={editor}>
					<RichTextEditor.ControlsGroup>
						<Stack spacing={0}>
							<RichTextEditor.Control>
								<Text m={3} fz="md" weight={600}>
									{getWordCountFromString(
										editor.state.doc.textBetween(
											editor.state.selection.from,
											editor.state.selection.to,
											" "
										)
									) + " "}
									words
								</Text>
							</RichTextEditor.Control>
							<RichTextEditor.Control>
								{isRewriteLoading ? (
									<Loader h={20} w={20} />
								) : (
									<Text
										variant="gradient"
										gradient={{ from: "indigo", to: "cyan", deg: 45 }}
										weight="semibold"
										sx={{ fontFamily: "Greycliff CF, sans-serif" }}
										p={5}
										m={5}
										onClick={async () => {
											setIsRewriteLoading(true);
											auth.currentUser.getIdToken(true).then((idToken) => {
												getRewrite(idToken);
											});
										}}
										aria-label="Rewrite with AI"
										title="Rewrite with AI"
									>
										Rewrite with AI
									</Text>
								)}
							</RichTextEditor.Control>
						</Stack>
					</RichTextEditor.ControlsGroup>
				</BubbleMenu>
			)}
			<RichTextEditor.Content spellCheck />
		</RichTextEditor>
	);
}
