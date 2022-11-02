import React,{useState, useEffect} from 'react';
import TodoHeader from "./TodoHeader";
import styles from './css/App.module.css';
import TodoBody from './TodoBody';

// todos의 타입들
interface todosArray {
  id : number,
  todoText : string,
  isChecked : boolean,
  isEditing : boolean
}

function App() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<todosArray[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('all');

  //앱이 처음 시작할때 localStroage에 있는 정보들을 todos에 넣어줌
  useEffect(() => {
    console.log("useEffect");
    for(let i=0;i<localStorage.length;i++){
      if(localStorage.getItem(String(i)) == null){
        continue;
      }

      const newTodoObj = JSON.parse(String(localStorage.getItem(String(i))));
      // console.log(newTodoObj);

      setTodos((prev : any[]) => {
        return [
          ...prev,
          {...newTodoObj}
        ]
      })

    }
  }, [])

  const onChange = (e : React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTodo(value);
    return value;
  }

  const changePage = (page : string) => {
    setCurrentPage(page);
  }

  return(
    <>
      <div className={styles.todo_container}>
          <TodoHeader todo_header_change={onChange} todo={todo} setTodo={setTodo} setTodos={setTodos} todos={todos} />
            <div className={styles.todo_navi_container}>
              {currentPage === 'all' ? (
                <button onClick={() => changePage('all')} style={{ textDecoration: "underline", textDecorationColor : "red", textDecorationStyle: "wavy" }} >모두보기</button>
              ) : (
                <button onClick={() => changePage('all')}>모두보기</button>
              ) }

              {currentPage === 'yet' ? (
                <button onClick={() => changePage('yet')} style={{ textDecoration: "underline", textDecorationColor : "red", textDecorationStyle: "wavy" }} >할일들</button>
              ) : (
                <button onClick={() => changePage('yet')}>할일들</button>
              ) }

              {currentPage === 'done' ? (
                <button onClick={() => changePage('done')} style={{ textDecoration: "underline", textDecorationColor : "red", textDecorationStyle: "wavy" }} >끝낸것들</button>
              ) : (
                <button onClick={() => changePage('done')}>끝낸것들</button>
              ) }

            </div>
            <div className={styles.todos_body_container}>
              <TodoBody currentPage={currentPage} setCurrentPage={setCurrentPage} todos={todos} setTodos={setTodos} />
            </div>
        </div>
    </>
  );
}

export default App;
