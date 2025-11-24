import React from "react";
import {Todo} from "../models/todo";
import classes from './TodoItem.module.css';

const TodoItems: React.FC<{ text: Todo['text'], onDeleteHandler: () => void }> = (props) => {
    return <li onClick={props.onDeleteHandler} className={classes.item}>{props.text}</li>
}

export default TodoItems;