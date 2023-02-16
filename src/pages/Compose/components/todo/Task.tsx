import { useEffect, useState } from "react";
import {
	Text,
	Group,
	Card,
	ActionIcon,
	Checkbox,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons";

function Task(props: {
	index: number;
	task: any;
	deleteTask: any;
	setTaskChecked: Function;
}) {
	const [checked, setChecked] = useState(props.task.checked);

	useEffect(() => {
		setChecked(props.task.checked);
	}, [props]);
	
	return (
		// <Group ml="lg" position="center">
		// 	<Center>
		// 		<Checkbox
		// 			checked={checked}
		// 			onChange={(event) => setChecked(event.currentTarget.checked)}
		// 		/>
		// 	</Center>

		<Card
			key={props.index}
			mt={"sm"}
			w="100%"
			shadow={checked ? "sm" : ""}
			radius="lg"
		>
			<Group position={"apart"}>
				<Checkbox
					checked={checked}
					onChange={(event) => {
						setChecked(event.currentTarget.checked);
						props.setTaskChecked(props.index);
					}}
				/>
				<Text weight={"bold"} strikethrough={checked}>
					{props.task.title}
				</Text>
				<ActionIcon
					onClick={() => {
						props.deleteTask(props.index);
					}}
					color={"red"}
					variant={"transparent"}
				>
					<IconTrash />
				</ActionIcon>
			</Group>
			{props.task.description && (
				<Text
					color={"dimmed"}
					size={"md"}
					mt={"sm"}
					ta="center"
					strikethrough={checked}
				>
					{props.task.description}
				</Text>
			)}
		</Card>
		// </Group>
	);
}

export default Task;
