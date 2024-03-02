import "./App.css";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { FaRegEdit } from "react-icons/fa";
import Like from './components/Like'

interface ToDoItem {
  id: number;
  text: string;
  status: boolean;
  completedOn?: string
}

function App() {
  const [toDos, setToDos] = useState<ToDoItem[]>([]);
  const [completedTodos, setCompletedTodos] = useState<ToDoItem[]>([]);
  const [toDo, setToDo] = useState<string>("");
  const [isCompletedScreen, setIsCompletedScreen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todolist') || '[]');
    setToDos(storedTodos);
    console.log('hii');

    const storedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos') || '[]');
    setCompletedTodos(storedCompletedTodos);
  }, []);



  function dataAdding() {
    if (editingItemId !== null) {
      console.log('evidaii');

      const updatedToDos = toDos.map(item =>
        item.id === editingItemId ? { ...item, text: editText } : item
      );
      setToDos(updatedToDos);
      localStorage.setItem('todolist', JSON.stringify(updatedToDos));

      // Reset editing state
      setEditingItemId(null);
      setEditText("");
    } else {
      // If not editing, add a new to-do item
      if (toDo == '') return
      setToDos([{ id: Date.now(), text: toDo, status: false }, ...toDos]);
      setToDo("");
    }
  }

  const handleToDoDelete = (index: number) => {
    let reducedTodos = [...toDos];
    reducedTodos.splice(index, 1);
    // console.log (index);=

    // console.log (reducedTodos);
    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    setToDos(reducedTodos);
  };
  const handleComplete = (index: number) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTodo = {
      ...toDos[index],
      completedOn: finalDate,
    };

    // console.log (filteredTodo);

    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log('hello', updatedCompletedList);
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      'completedTodos',
      JSON.stringify(updatedCompletedList)
    );
    // console.log (index);

    handleToDoDelete(index);
  };
  const handleCompletedTodoDelete = (index: number) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index);
    // console.log (reducedCompletedTodos);
    localStorage.setItem(
      'completedTodos',
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleEdit = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hee');
    const mTodo = toDos.map((ts) => ts.id == id ? { ...ts, text: e.target.value } : ts)
    setToDos(() => mTodo)
    console.log(mTodo);


  };

  return (
    <>
      <div className="app">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>Whoop, it's Thursday 🌝 ☕ </h2>
        </div>
        <div className="input">
          <input
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            type="text"
            placeholder="🖊️ Add item..."
          />


          <i onClick={dataAdding} className="fas fa-plus"></i>
        </div>
        <div className="todos">




          <div className="btn-area">
            <button
              className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
              onClick={() => setIsCompletedScreen(false)}
            >
              To Do
            </button>
            <button
              className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
              onClick={() => setIsCompletedScreen(true)}
            >
              Completed
            </button>
          </div>




          <div className="todo-list">

            {isCompletedScreen === false &&
              toDos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    {edit ? <input type="text" className="w-28" defaultValue={item.text} onChange={(e) => handleEdit(item.id, e)} /> : <h3>{item.text}</h3>}

                  </div>
                  <div>


                    <Like onClick={() => {
                      console.log('clicked');
                    }} />
                    <BsCheckLg
                      title="Completed?"
                      className=" check-icon"
                      size={25}
                      onClick={() => handleComplete(index)}
                    />
                    <FaRegEdit
                      className="edit-btn"
                      style={{ fontSize: '30px', paddingLeft: '20px' }}
                      onClick={() => setEdit(!edit)}
                    />
                    <AiOutlineDelete
                      title="Delete?"
                      className="icon"
                      onClick={() => handleToDoDelete(index)}
                    />
                  </div>
                </div>
              ))}

            {isCompletedScreen === true &&
              completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.text}</h3>
                    <p> <i>Completed at: {item.completedOn}</i></p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleCompletedTodoDelete(index)}
                    />
                  </div>
                </div>
              ))}
          </div>



          {toDos.map((obj) =>
            obj.status ? <h1 key={obj.id}>{obj.text}</h1> : null
          )}
        </div>
      </div>
    </>
  );
}

export default App;
