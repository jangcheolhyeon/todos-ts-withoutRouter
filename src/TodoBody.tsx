import React from "react";
import TodosAll from "./TodosAll";
import TodosDone from "./TodosDone";
import TodosYet from "./TodosYet";

interface todosArray {
    id : number,
    todoText : string,
    isChecked : boolean,
    isEditing : boolean
  }

interface iCurrentPage{
    currentPage : string,
    todos : todosArray[],
    setTodos : React.Dispatch<React.SetStateAction<todosArray[]>>,
    setCurrentPage : React.Dispatch<React.SetStateAction<string>>,
}

function TodoBody({ currentPage, todos, setTodos, setCurrentPage } : iCurrentPage){
    return(
        <>
            {currentPage === 'all' && <TodosAll todos={todos} setTodos={setTodos} setCurrentPage={setCurrentPage} />}
            {currentPage === 'yet' && <TodosYet todos={todos} setTodos={setTodos} setCurrentPage={setCurrentPage} />}
            {currentPage === 'done' && <TodosDone todos={todos} setTodos={setTodos} setCurrentPage={setCurrentPage} />}
        </>
    );
}

export default TodoBody;