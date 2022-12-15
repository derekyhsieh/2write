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
import DocumentCards from "./DocumentCards";
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

export function CreatePromptModalContent({ setIsActive }: Props) {
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

function PromptContainedInputs() {
    const { classes } = useStyles();

    return (
        <div>
            <TextInput
                label="Enter the prompt for your essay"
                placeholder="Why is 2Write the best app?"
                classNames={classes}
            />
        </div>
    );
}