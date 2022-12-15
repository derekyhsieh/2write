import { useRef } from "react";
import { Text, Group, Button, createStyles, Box } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons";

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

export function DropzoneButton(props: { onDrop: Function }) {
	const { classes, theme } = useStyles();
	const openRef = useRef<() => void>(null);

	return (
		<div className={classes.wrapper}>
			<Dropzone
				openRef={openRef}
				onDrop={() => {
					props.onDrop(false);
				}}
				className={classes.dropzone}
				radius="lg"
				accept={[MIME_TYPES.doc, MIME_TYPES.docx]}
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
						<Dropzone.Reject>Files other than DOC or DOCX</Dropzone.Reject>
						<Dropzone.Idle>Upload document</Dropzone.Idle>
					</Text>
					<Text align="center" size="sm" mt="xs" color="dimmed">
						Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
						<i>.doc</i> or <i>.docx</i> files.
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
	);
}
