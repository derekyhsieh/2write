import { Modal, useMantineTheme, Notification } from "@mantine/core";
import HomePageCards from "./HomePageCards";
import HomeHeader from "./HomeHeader";
import {  useState, useLayoutEffect } from "react";
import { CreateDropzoneModalContent } from "./DropzoneModal";
import { CreatePromptModalContent } from "./PromptModal";
import { UserAuth } from "../../../context/AuthContext";
import { CreateRenameModalContent } from "./RenameModal";
import { DocumentData } from "firebase/firestore";
import { loadEssayList } from "../../../services/FirestoreHelpers";
import { IconX } from "@tabler/icons";

export default function HomePageContainer() {
	const [dropzoneModalIsOpen, setDropzoneModalIsOpen] = useState(false);
	const [promptModalIsOpen, setPromptModalIsOpen] = useState(false);
	const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
	const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
	const [dropzoneFailedModalIsOpen, setDropzoneFailedModalIsOpen] = useState(false);

	const [isOnRenderLoading, setIsOnRenderLoading] = useState(true);
	const [essayList, setEssayList] = useState<DocumentData[]>([]);

	const theme = useMantineTheme();
	const { user } = UserAuth();

	useLayoutEffect(() => {
		loadEssayList(user.uid).then((essayList) => {
			for (const essay of essayList) {
				if (essay["essayId"] === "hasSeenOnboarding") {
					essayList.splice(essayList.indexOf(essay), 1);
				}
			}
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
				radius={"md"}
			>
				<CreateDropzoneModalContent setIsActive={setDropzoneModalIsOpen} setDropzoneFailedModalIsActive={setDropzoneFailedModalIsOpen} />
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
				radius={"md"}
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
				radius={"md"}
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
				radius={"md"}
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
			<Modal
				opened={dropzoneFailedModalIsOpen}
				centered
				onClose={() => setDropzoneFailedModalIsOpen(false)}
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
