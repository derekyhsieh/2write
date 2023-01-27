import {
	Stack,
	createStyles,
	TextInput,
	Title,
	Button,
	Center,
	Loader,
} from "@mantine/core";
import { useState } from "react";
import { saveTitle } from "../../../services/FirestoreHelpers";
import { DocumentData } from "firebase/firestore";

type Props = {
	setIsActive: (active: boolean) => void;
	essayId: string;
	essayList: DocumentData[];
	setEssayList: Function;
	userId: string;
	oldTitle: string;
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

export function CreateRenameModalContent({
	setIsActive,
	essayId,
	essayList,
	userId,
	oldTitle,
	setEssayList,
}: Props) {
	const [renameEssayValue, setRenameEssayValue] = useState<string>("");
	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

	const handleRenameEssay = () => {
		setHasSubmitted(true);
		if (renameEssayValue === "") {
			setIsActive(false);
		} else {
			saveTitle(userId, essayId, renameEssayValue).then(() => {
				for (const essay of essayList) {
					if (essay.essayId === essayId) {
						essay.title = renameEssayValue;
					}
				}
				setIsActive(false);
			});
		}
	};

	return (
		<Stack>
			<Title size={"lg"} order={4} align="center">
				Enter the new name for your document
			</Title>

			<RenameContainedInputs
				handleRenameEssay={handleRenameEssay}
				setRenameEssayValue={setRenameEssayValue}
				renameEssayValue={renameEssayValue}
				oldTitle={oldTitle}
			/>

			<Button onClick={() => handleRenameEssay()} disabled={hasSubmitted}>Rename</Button>
		</Stack>
	);
}

type RenameContainedInputsProps = {
	renameEssayValue: string;
	setRenameEssayValue: (value: string) => void;
	handleRenameEssay: () => void;
	oldTitle: string;
};

function RenameContainedInputs({
	setRenameEssayValue,
	renameEssayValue,
	oldTitle,
	handleRenameEssay,
}: RenameContainedInputsProps) {
	const { classes } = useStyles();

	return (
		<div>
			<TextInput
				value={renameEssayValue}
				onChange={(event) => setRenameEssayValue(event.currentTarget.value)}
				label={"New Title"}
				onKeyDown={(event) => {
					if (event.key === "Enter") handleRenameEssay();
				}}
				placeholder={oldTitle}
				classNames={classes}
			/>
		</div>
	);
}
