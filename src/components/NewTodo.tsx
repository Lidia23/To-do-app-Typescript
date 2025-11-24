import { useRef } from "react";
import classes from './NewTodo.module.css';
import { useContext } from "react";
import { TodoContext } from "../store/todos-contex";

const NewTodo: React.FC = () => {
    const newTodoCtx = useContext(TodoContext);

    const todoTextInputRef = useRef<HTMLInputElement>(null); //HTMLPara.. HTMLButton... 
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value; //? for the moment is not connected to any element// ! kur je 100% i sigurt se connection will be establish at this point
        if (enteredText.trim().length === 0) {
            return;
        }

        newTodoCtx.addTodo(enteredText);
        if (todoTextInputRef.current) {
            todoTextInputRef.current.value = '';
        }
    }
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Todo text</label>
            <input type="text" id="text" ref={todoTextInputRef} />
            <button>Add Todo</button>
        </form>
    )
}
export default NewTodo;