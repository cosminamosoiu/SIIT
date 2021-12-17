import React from 'react';
import TodoItems from './TodoItems'

const Todos = ({todos}) => {
    return todos.map((todo) => <TodoItems key={todo.id} todo={todo}/>);
}
    

export default Todos;