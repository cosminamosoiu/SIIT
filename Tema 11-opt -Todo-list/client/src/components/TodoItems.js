import React from "react"

const TodoItems = ({todo}) => {
    return (
        <div className="todoItems">
            <h1>{todo.message}</h1>
            <p>{todo.id}</p>
        </div>
    )
};

export default TodoItems;