import React, { FC, SetStateAction } from "react";
import { CustomDrawer } from "./CustomDrawer";
import TodoList from "./todo/TodoList";

interface TodoDrawerProps {
	setOpened: React.Dispatch<SetStateAction<string>>;
	opened: string;
}

const TodoDrawer: FC<TodoDrawerProps> = ({
	setOpened,
	opened,
}) => {
	return (
		<CustomDrawer
			setOpened={setOpened}
			opened={opened == "todos"}
		>
			<TodoList />
		</CustomDrawer>
	);
};

export default TodoDrawer;
