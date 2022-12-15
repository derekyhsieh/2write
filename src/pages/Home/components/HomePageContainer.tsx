import {
	Modal,
	useMantineTheme,
} from "@mantine/core";
import DocumentCards from "./DocumentCards";
import HomeHeader from "./HomeHeader";
import { useState } from "react";
import { CreateDropzoneModalContent } from "./DropzoneButton";
import { CreatePromptModalContent } from "./PromptButton";

export default function HomePageContainer() {
	const [dropzoneModalIsOpen, setDropzoneModalIsOpen] = useState(false);
	const [promptModalIsOpen, setPromptModalIsOpen] = useState(false);
	const theme = useMantineTheme();

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
			<DocumentCards
				dropzoneModalOnClick={setDropzoneModalIsOpen}
				promptModalOnClick={setPromptModalIsOpen}
			/>
		</>
	);
}
