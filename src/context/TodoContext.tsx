import React from "react";
import { useContext, createContext, useState } from "react";

interface TodoContextInterface {
	tasks: any;
	setTasks: Function;
}

const TodoContext = createContext<TodoContextInterface>(null!);

type TodoProps = {
	children: React.ReactNode;
};

export const TodoContextProvider = ({ children }: TodoProps) => {
	const [tasks, setTasks] = useState([]);

	return (
		<TodoContext.Provider value={{ tasks, setTasks }}>
			{children}
		</TodoContext.Provider>
	);
};

export const TodoTasks = () => {
	return useContext(TodoContext);
};
