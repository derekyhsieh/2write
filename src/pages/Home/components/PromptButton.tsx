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
import { createEssay } from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { createSearchParams, useNavigate } from "react-router-dom";

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

   const [essayPromptValue, setEssayPromptValue] = useState<string>("");
   const navigate = useNavigate()
   

    const {user} = UserAuth()

    const generateEssay = () => {

       


        const essayID = crypto.randomUUID()
        const params = [
            ['essayId', essayID],
        ];
        createEssay(user.uid, essayID, essayPromptValue === "" ? null : essayPromptValue).then(() => {
            navigate({
                pathname: '/compose',
                search: `?${createSearchParams({essayId: essayID})}`
            })
        })

    } 

    return (
            <Stack>
                <Title size={"lg"} order={4} align="center">
                    Enter your essay prompt below (optional)
                </Title>

                <PromptContainedInputs setEssayPromptValue={setEssayPromptValue} essayPromptValue={essayPromptValue}/>

                <Button
                    onClick={() => {
                        generateEssay()
                        // setIsActive(false);
                    }}
                >
                    Generate ✨
                </Button>
            </Stack>
    );
}

type PromptContainedInputsProps = {
    essayPromptValue: string;
    setEssayPromptValue: (value: string) => void;
}

function PromptContainedInputs({setEssayPromptValue, essayPromptValue}: PromptContainedInputsProps) {
    const { classes } = useStyles();

    return (
        <div>
            <TextInput
                value={essayPromptValue}
                onChange={(event) => setEssayPromptValue(event.currentTarget.value)}
                label="Enter the prompt for your essay"
                placeholder="Why is 2Write the best app?"
                classNames={classes}
            />
        </div>
    );
}