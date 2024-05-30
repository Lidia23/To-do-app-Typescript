import React from "react";
import Todo from "../models/todo";
import { useState } from 'react';


type TodosCntxObject = {
    items: Todo[];
    addTodo: (text: string) => void;
    deleteTodo: (id: string) => void;
};

export const TodoContext = React.createContext<TodosCntxObject>({
    items: [],
    addTodo: () => { },
    deleteTodo: (id: string) => { }
});

const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (text: string) => {
        const newTodo = new Todo(text);
        setTodos((prevTodos) => {
            return prevTodos.concat(newTodo);
        });
    }

    const deleteHandler = (id: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== id); //filter create a new array excluding the item with matching id
        })
    }
    const contexValue: TodosCntxObject = {
        items: todos,
        addTodo: addTodoHandler,
        deleteTodo: deleteHandler,
    }
    return <TodoContext.Provider value={contexValue}>{props.children}</TodoContext.Provider>
}

export default TodosContextProvider;