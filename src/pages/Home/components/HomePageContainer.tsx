import {
	Stack,
	Modal,
	useMantineTheme,
	createStyles,
	TextInput,
	Select,
	Center,
	Title,
	Button,
} from "@mantine/core";
import DocumentCard from "./DocumentCard";
import HomeHeader from "./HomeHeader";
import { useState } from "react";
import { DropzoneButton } from "./DropzoneButton";

type Props = {
	setIsActive: (active: boolean) => void;
};

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

export default function HomePageContainer() {
	const { classes } = useStyles();
	const [dropzoneModalIsOpen, setDropzoneModalIsOpen] = useState(false);
	const [promptModalIsOpen, setPromptModalIsOpen] = useState(false);
	const theme = useMantineTheme();

	function PromptContainedInputs() {
		const { classes } = useStyles();

		return (
			<div>
				<TextInput
					label="Enter the prompt for your essay"
					placeholder="Why is 2Write the best app?"
					classNames={classes}
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

	function CreateDropzoneModalContent({ setIsActive }: Props) {
		return <DropzoneButton onDrop={setIsActive} />;
	}

	function CreatePromptModalContent({ setIsActive }: Props) {
		return (
				<Stack>
					<Title size={"lg"} order={4} align="center">
						Enter your essay prompt below
					</Title>

					<PromptContainedInputs />

					<Button
						onClick={() => {
							setIsActive(false);
						}}
					>
						Generate ✨
					</Button>
				</Stack>
		);
	}

	return (
		<>
			<Modal
				opened={dropzoneModalIsOpen}
				centered
				onClose={() => setDropzoneModalIsOpen(false)}
				withCloseButton={false}
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
				trapFocus
			>
				<CreateDropzoneModalContent setIsActive={setDropzoneModalIsOpen} />
			</Modal>
			<Modal
				opened={promptModalIsOpen}
				centered
				onClose={() => setPromptModalIsOpen(false)}
				withCloseButton={false}
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
			>
				<CreatePromptModalContent setIsActive={setPromptModalIsOpen} />
			</Modal>
			<HomeHeader />
			<DocumentCard
				dropzoneModalOnClick={setDropzoneModalIsOpen}
				promptModalOnClick={setPromptModalIsOpen}
			/>
		</>
	);
}
