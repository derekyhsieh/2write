import React from "react";
import { Text, Group, Card, ActionIcon, Checkbox, Center } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

function Task(props: { index: number; task: any; deleteTask: any }) {
	const [checked, setChecked] = React.useState(false);
	let blankComponent;

	return (
		// <Group ml="lg" position="center">
		// 	<Center>
		// 		<Checkbox
		// 			checked={checked}
		// 			onChange={(event) => setChecked(event.currentTarget.checked)}
		// 		/>
		// 	</Center>
		<Card withBorder key={props.index} mt={"sm"} w="100%">
			<Group position={"apart"}>
				<Checkbox
					checked={checked}
					onChange={(event) => setChecked(event.currentTarget.checked)}
				/>
				<Text weight={"bold"}>{props.task.title}</Text>
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
			{props.task.description ? (
				<Text color={"dimmed"} size={"md"} mt={"sm"} ta="center">
					{props.task.description}
				</Text>
			) : (
				blankComponent
			)}
		</Card>
		// </Group>
	);
}

export default Task;
