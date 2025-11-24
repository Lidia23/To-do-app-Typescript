import React, { useEffect } from "react";
import {Todo} from "../models/todo";
import { useState } from 'react';
import { TaskService } from "../services/task.service";


type TodosCntxObject = {
    items: Todo[];
    addTodo: (text: string) => void;
    deleteTodo: (id: number) => void;
};

export const TodoContext = React.createContext<TodosCntxObject>({
    items: [],
    addTodo: () => { },
    deleteTodo: (id: number) => { }
});

const TodosContextProvider: React.FC = (props) => {
    const taskService: TaskService = new TaskService();
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, []);
    const fetchTodos = async () => {
        try {
            const res = await taskService.getTasks();
            if (!res) throw new Error('Failed to fetch todos');
            setTodos(res);
        } catch (err) {
            console.error(err);
        }
    };

    const addTodoHandler = async (text: string) => {
        const request: Todo = {text: text}
        try {
            await taskService.createTask(request)
        } catch (error) {
            console.log(error)
        }
        fetchTodos();
    }

    const deleteHandler = async (id: number) => {
        try{
            await taskService.deleteTask(id)
        }catch(error){
            console.error(error)
        }
        fetchTodos()
    }
    const contexValue: TodosCntxObject = {
        items: todos,
        addTodo: addTodoHandler,
        deleteTodo: deleteHandler,
    }
    return <TodoContext.Provider value={contexValue}>{props.children}</TodoContext.Provider>
}

export default TodosContextProvider;