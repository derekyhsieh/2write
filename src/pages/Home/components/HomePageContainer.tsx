import { Modal, useMantineTheme } from "@mantine/core";
import HomePageCards from "./HomePageCards";
import HomeHeader from "./HomeHeader";
import { useEffect, useState, useLayoutEffect } from "react";
import { CreateDropzoneModalContent } from "./DropzoneModal";
import { CreatePromptModalContent } from "./PromptModal";
import { UserAuth } from "../../../context/AuthContext";
import { CreateRenameModalContent } from "./RenameModal";
import { DocumentData } from "firebase/firestore";
import { loadEssayList } from "../../../services/FirestoreHelpers";

export default function HomePageContainer() {
	const [dropzoneModalIsOpen, setDropzoneModalIsOpen] = useState(false);
	const [promptModalIsOpen, setPromptModalIsOpen] = useState(false);
	const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
	const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

	const [isOnRenderLoading, setIsOnRenderLoading] = useState(true);
	const [essayList, setEssayList] = useState<DocumentData[]>([]);

	const theme = useMantineTheme();
	const { user } = UserAuth();

	useLayoutEffect(() => {
		loadEssayList(user.uid).then((essayList) => {
			setEssayList(essayList);
			setIsOnRenderLoading(false);
		});
	}, []);

	const [essayId, setEssayId] = useState("");
	const [oldTitle, setOldTitle] = useState("");

	const setCurrentEssayCallback = (essayId: string, oldTitle: string) => {
		setEssayId(essayId);
		setOldTitle(oldTitle);
	};

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

			<Modal
				opened={createModalIsOpen}
				centered
				onClose={() => setCreateModalIsOpen(false)}
				withCloseButton={false}
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
			>
				<CreatePromptModalContent setIsActive={setCreateModalIsOpen} />
			</Modal>
			<Modal
				opened={renameModalIsOpen}
				centered
				onClose={() => setRenameModalIsOpen(false)}
				withCloseButton={false}
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
			>
				<CreateRenameModalContent
					oldTitle={oldTitle}
					essayId={essayId}
					essayList={essayList}
					setEssayList={setEssayList}
					userId={user.uid}
					setIsActive={setRenameModalIsOpen}
				/>
			</Modal>
			<HomeHeader essayList={essayList} />
			<HomePageCards
				createModalOnClick={setCreateModalIsOpen}
				dropzoneModalOnClick={setDropzoneModalIsOpen}
				promptModalOnClick={setPromptModalIsOpen}
				renameModalOnClick={setRenameModalIsOpen}
				setCurrentEssayCallback={setCurrentEssayCallback}
				isRenameModalActive={renameModalIsOpen}
				essayList={essayList}
				setEssayList={setEssayList}
				isOnRenderLoading={isOnRenderLoading}
				setIsOnRenderLoading={setIsOnRenderLoading}
			/>
		</>
	);
}
