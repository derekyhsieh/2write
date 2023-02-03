import React from "react";
import { Text, Group, Card, ActionIcon, Checkbox, Center } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

function Task(props: { index: number; task: any; deleteTask: any }) {
	const [checked, setChecked] = React.useState(false);

	return (
		<Group ml="xl">
			<Center>
				<Checkbox
					checked={checked}
					onChange={(event) => setChecked(event.currentTarget.checked)}
				/>
			</Center>
			<Card key={props.index} mt={"sm"} w="85%">
				<Group position={"apart"}>
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
				<Text color={"dimmed"} size={"md"} mt={"sm"}>
					{props.task.description ? props.task.description : ""}
				</Text>
			</Card>
		</Group>
	);
}

export default Task;
