import { useRef, useState } from "react";
import {
	Text,
	Group,
	Button,
	createStyles,
	Notification,
	Modal,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons";
import { auth } from "../../../services/firebase";
import { v4 as uuidv4 } from "uuid";
import { createEssay, saveTitle } from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
	setIsActive: (active: boolean) => void;
};

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: "relative",
		marginBottom: 30,
	},

	dropzone: {
		borderWidth: 1,
		paddingBottom: 50,
	},

	icon: {
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[3]
				: theme.colors.gray[4],
	},

	control: {
		position: "absolute",
		width: 250,
		left: "calc(50% - 125px)",
		bottom: -20,
	},
}));

export function CreateDropzoneModalContent({ setIsActive }: Props) {
	return <DropzoneButton onDrop={setIsActive} />;
}

export function DropzoneButton(props: { onDrop: Function }) {
	const { classes, theme } = useStyles();
	const [failedModalIsOpen, setFailedModalIsOpen] = useState(false);

	const openRef = useRef<() => void>(null);

	const navigate = useNavigate();

	const { user } = UserAuth();

	const convertDocxToHtml = async (file, token) => {
		try {
			const res = await fetch("/api/convert", {
				method: "post",
				headers: {
					"Content-Type": "application/octet-stream",
					Authorization: "Bearer ".concat(token),
				},
				body: file,
			});
			const data = await res.json();
			return data;
		} catch (e) {
			console.error(e);
			setFailedModalIsOpen(true);
		}
	};

	return (
		<>
			<Modal
				opened={failedModalIsOpen}
				centered
				onClose={() => setFailedModalIsOpen(false)}
				withCloseButton={false}
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
				zIndex={999999}
				radius={"md"}
				trapFocus
			>
				<Notification
					icon={<IconX size={18} />}
					title="File upload failed"
					color="red"
					disallowClose
					style={{ border: 0, boxShadow: "none" }}
				>
					Something went wrong with the file you uploaded. Please, try again!
				</Notification>
			</Modal>

			<div className={classes.wrapper}>
				<Dropzone
					openRef={openRef}
					onDrop={(files) => {
						props.onDrop(false);
						// loop through all selected files in dropzone
						files.forEach((file, index) => {
							const reader = new FileReader();

							reader.onabort = () => {
								console.log("file reader aborted");
								setFailedModalIsOpen(true);
							};
							reader.onerror = () => {
								console.log("file reading failed");
								setFailedModalIsOpen(true);
							};

							reader.onload = (event) => {
								if (event.lengthComputable) {
									let binaryString =
										typeof reader.result === "object" && reader.result;

									auth.currentUser.getIdToken(true).then(async (idToken) => {
										// send binary string of file to server for conversion to html

										const conversionResults = await convertDocxToHtml(
											binaryString,
											idToken
										);

										// create new essay in firestore for each file
										const essayID = uuidv4();

										Promise.all([
											createEssay(
												user.uid,
												essayID,
												"",
												conversionResults.html
											),
											saveTitle(
												user.uid,
												essayID,
												// get all characters before the first \n (new line), which is the title of the document
												conversionResults.rawText.split("\n")[0]
											),
										])
											.then(() => {
												// open first uploaded document
												if (index === 0) {
													navigate({
														pathname: "/compose",
														search: `?${createSearchParams({
															essayId: essayID,
															isNewDoc: "true",
														})}`,
													});
												}
											})
											.catch((error) => {
												console.error(error);
												setFailedModalIsOpen(true);
											});
									});
								}
							};

							// read every file as an array buffer
							reader.readAsArrayBuffer(file);
						});
					}}
					className={classes.dropzone}
					radius="lg"
					accept={[MIME_TYPES.docx]}
					maxSize={30 * 1024 ** 2}
				>
					<div style={{ pointerEvents: "none" }}>
						<Group position="center">
							<Dropzone.Accept>
								<IconDownload
									size={50}
									color={theme.colors[theme.primaryColor][6]}
									stroke={1.5}
								/>
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
							</Dropzone.Reject>
							<Dropzone.Idle>
								<IconCloudUpload
									size={50}
									color={
										theme.colorScheme === "dark"
											? theme.colors.dark[0]
											: theme.black
									}
									stroke={1.5}
								/>
							</Dropzone.Idle>
						</Group>

						<Text align="center" weight={700} size="lg" mt="xl">
							<Dropzone.Accept>Drop files here</Dropzone.Accept>
							<Dropzone.Reject>Files other than DOCX</Dropzone.Reject>
							<Dropzone.Idle>Upload document</Dropzone.Idle>
						</Text>
						<Text align="center" size="sm" mt="xs" color="dimmed">
							Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
							<i>.docx</i> files.
						</Text>
					</div>
				</Dropzone>

				<Button
					className={classes.control}
					size="md"
					radius="xl"
					onClick={() => openRef.current?.()}
				>
					Select files
				</Button>
			</div>
		</>
	);
}
