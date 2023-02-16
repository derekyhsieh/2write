import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Center,
	Stack,
	createStyles,
	ScrollArea,
} from "@mantine/core";
import React, { useState } from "react";
import { saveTasks } from "../../../../services/FirestoreHelpers";
import { UserAuth } from "../../../../context/AuthContext";
import Task from "./Task";
import { TodoTasks } from "../../../../context/TodoContext";

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

export default function TodoList() {
	const { classes, theme } = useStyles();
	const { user } = UserAuth();
	const { tasks, setTasks } = TodoTasks();

	const [opened, setOpened] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");

	const createTask = () => {
		setTasks([
			...tasks,
			{
				title: taskTitle,
				description: taskDescription,
				checked: false,
			},
		]);

		saveTasks(user.uid, [
			...tasks,
			{
				title: taskTitle,
				description: taskDescription,
				checked: false,
			},
		]);
	};

	// sort tasks by if they are checked or not, checked tasks go to the bottom
	const sortTasks = (tasks) => {
		let sortedTasks = tasks.sort((a, b) => {
			return a.checked - b.checked;
		});

		return sortedTasks;
	};

	// set a task to checked based on index
	const setTaskChecked = (index) => {
		let clonedTasks = [...tasks];

		clonedTasks[index].checked = !clonedTasks[index].checked;

		setTasks(clonedTasks);

		saveTasks(user.uid, [...clonedTasks]);
	};

	const deleteTask = (index) => {
		let clonedTasks = [...tasks];

		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);

		saveTasks(user.uid, [...clonedTasks]);
	};

	const handleTaskCreation = () => {
		createTask();
		setButtonDisabled(true);
		setOpened(false);
		setTaskDescription("");
		setTaskTitle("");
	};

	return (
		<>
			<Modal
				opened={opened}
				size={"md"}
				withCloseButton={false}
				onClose={() => {
					setOpened(false);
				}}
				centered
				overlayColor={
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
				trapFocus
				zIndex={99999}
				radius={"md"}
			>
				<Stack>
					<Title size={"lg"} order={4} align="center">
						Add a new task
					</Title>
					<TextInput
						value={taskTitle}
						onChange={(event) => {
							setTaskTitle(event.currentTarget.value);
							if (event.currentTarget.value === "") {
								setButtonDisabled(true);
							} else {
								setButtonDisabled(false);
							}
						}}
						label="Title"
						placeholder="Write your task title here"
						required
						classNames={classes}
						onKeyDown={(event) => {
							if (event.key === "Enter" && taskTitle !== "") {
								handleTaskCreation();
							}
						}}
					/>
					<TextInput
						value={taskDescription}
						onChange={(event) => setTaskDescription(event.currentTarget.value)}
						label="Description"
						placeholder="Write your task description here"
						classNames={classes}
						onKeyDown={(event) => {
							if (event.key === "Enter" && taskTitle !== "") {
								handleTaskCreation();
							}
						}}
					/>
					<Button
						onClick={() => {
							if (taskTitle !== "") {
								handleTaskCreation();
							}
						}}
						disabled={buttonDisabled}
					>
						Create Task
					</Button>
				</Stack>
			</Modal>
			<ScrollArea.Autosize maxHeight={750}>
				<Container>
					<Center>
						<Title
							sx={(theme) => ({
								fontFamily: `Greycliff CF, ${theme.fontFamily}`,
								fontWeight: 900,
							})}
							ta={"center"}
						>
							My Todo List
						</Title>
					</Center>
					{tasks.length > 0 ? (
						React.Children.toArray(
							sortTasks(tasks).map((task, index) => {
								if (task.title) {
									return (
										<Task
											index={index}
											task={task}
											deleteTask={deleteTask}
											setTaskChecked={setTaskChecked}
										/>
									);
								}
							})
						)
					) : (
						<Center>
							<Text size={"lg"} mt={"md"} color={"dimmed"}>
								You haven't created any tasks yet.
							</Text>
						</Center>
					)}
					<Center>
						<Button
							onClick={() => {
								setOpened(true);
							}}
							mt={"md"}
							w="80%"
						>
							New Task
						</Button>
					</Center>
				</Container>
			</ScrollArea.Autosize>
		</>
	);
}
