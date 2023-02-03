import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon,
	Center,
	useMantineTheme,
	Stack,
	createStyles,
	Checkbox,
} from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import { IconTrash } from "@tabler/icons";
import Task from "./Task";

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
	const theme = useMantineTheme();
	const { classes } = useStyles();

	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);

	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");

	const createTask = () => {
		setTasks([
			...tasks,
			{
				title: taskTitle,
				description: taskDescription,
			},
		]);

		saveTasks([
			...tasks,
			{
				title: taskTitle,
				description: taskDescription,
			},
		]);
	};

	const deleteTask = (index) => {
		let clonedTasks = [...tasks];

		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);

		saveTasks([...clonedTasks]);
	};

	const loadTasks = () => {
		let loadedTasks = localStorage.getItem("tasks");

		let tasks = JSON.parse(loadedTasks);

		if (tasks) {
			setTasks(tasks);
		}
	};

	const saveTasks = (tasks) => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};

	useEffect(() => {
		loadTasks();
	}, []);

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
			>
				<Stack>
					<Title size={"lg"} order={4} align="center">
						Add a new task
					</Title>
					<TextInput
						value={taskTitle}
						onChange={(event) => setTaskTitle(event.currentTarget.value)}
						label="Title"
						placeholder="Write your task title here"
						required
						classNames={classes}
					/>
					<TextInput
						value={taskDescription}
						onChange={(event) => setTaskDescription(event.currentTarget.value)}
						label="Description"
						placeholder="Write your task description here"
						classNames={classes}
					/>
					<Button
						onClick={() => {
							createTask();
							setOpened(false);
						}}
					>
						Create Task
					</Button>
				</Stack>
			</Modal>
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
					tasks.map((task, index) => {
						if (task.title) {
							return (
								<Task index={index} task={task} deleteTask={deleteTask}/>
							);
						}
					})
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
		</>
	);
}
