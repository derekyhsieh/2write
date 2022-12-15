import { Stack, Modal, useMantineTheme } from "@mantine/core";
import DocumentCard from "./DocumentCard";
import HomeHeader from "./HomeHeader";
import { useState } from "react";
import { DropzoneButton } from "./DropzoneButton";

type Props = {
	setIsActive: (active: boolean) => void;
};

export default function HomePageContainer() {
	const [dropzoneModalIsOpen, setDropzoneModalIsOpen] = useState(false);
	const theme = useMantineTheme();

	function CreateDropzoneModalContent({ setIsActive }: Props) {
		return <DropzoneButton onDrop={setIsActive} />;
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
			<HomeHeader />
			<DocumentCard modalOnClick={setDropzoneModalIsOpen} />
		</>
	);
}
