import React from "react";
import TodoItems from "./TodoItems";
import classes from './Todos.module.css';
import { useContext } from "react";
import { TodoContext } from "../store/todos-contex";

const Todos: React.FC = () => {
    const todoCtx = useContext(TodoContext);
    return (
        <ul className={classes.todos}>
            {todoCtx.items.map((item) => (
                <TodoItems
                    onDeleteHandler={todoCtx.deleteTodo.bind(null, item.id)}
                    key={item.id}
                    text={item.text} />
            ))}
        </ul>
    );
}
export default Todos;