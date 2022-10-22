import React, {useState} from 'react';

const App = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDesc, setNewTodoDesc] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const [filterStatus, setFilterStatus] = useState('全て');
  const createUUID = () => {
    const uuid = "xxxxxxxx-xxxx-4xxx-Zxxx-xxxxxxxxxxxx".split("");
    const len = uuid.length;
    for (let i = 0; i < len; i++) {
      switch (uuid[i]) {
        case "4": 
          break;
        case "-":
          break;
        case "x":
          uuid[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case "Z":
          uuid[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
        default:
          break;
      }
    }
    return uuid.join("");
  }
  // todoの追加
  const changeNewTodoTitle = e => {
    setNewTodoTitle(e.target.value);
  }
  const changeNewTodoDesc = e => {
    setNewTodoDesc(e.target.value);
  }
  const addNewTodo = () => {
    if(newTodoTitle) {
      setTodos([...todos, {id: createUUID(), title: newTodoTitle, desc: newTodoDesc, status: '未着手'}]);
      setNewTodoTitle('');
      setNewTodoDesc('');
      document.getElementById('add-error').innerText = '';
    } else {
      document.getElementById('add-error').innerText = 'タイトルを入力してください';
    }
  }
  // filter
  const changeFilterStatus = e => {
    setFilterStatus(e.target.value);
  }
  // todoの編集
  const changeStatus = (id, newStatus) => {
    const newTodos = todos.map( todo => todo.id === id ? {...todo, status: newStatus} : todo );
    setTodos(newTodos);
  }
  const deleteTodo = id => {
    const newTodos = todos.filter( todo => todo.id !== id );
    setTodos(newTodos);
  }
  const openEditor = todo => {
    setEditTodo(todo);
  }
  const changeEditTodoTitle = e => {
    setEditTodo({...editTodo, title: e.target.value});
  }
  const changeEditTodoDesc = e => {
    setEditTodo({...editTodo, desc: e.target.value});
  }
  const completeEditTodo = () => {
    if(editTodo.title) {
      const newTodos = todos.map( todo => todo.id === editTodo.id ? editTodo : todo );
      setTodos(newTodos);
      setEditTodo({});
      document.getElementById('edit-error').innerText = '';
    } else {
      document.getElementById('edit-error').innerText = 'タイトルを入力してください';
    }
  }
  const closeEditor = () => {
    setEditTodo({});
  }
  return (
    <>
      <h1>TODO</h1>
      <input name="newTodoTitle" value={newTodoTitle} placeholder="タイトル" onChange={changeNewTodoTitle} /><p id="add-error" style={{color: 'red', display: 'inline-block'}}></p><br />
      <textarea name="newTodoDesc" value={newTodoDesc} placeholder="詳細" onChange={changeNewTodoDesc}></textarea><br />
      <button onClick={addNewTodo}>追加</button>
      <h2>一覧</h2>
      <span>表示するステータス：</span>
      <select name="status" value={filterStatus} onChange={changeFilterStatus}>
        <option value="全て">全て</option>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <ul>
        { todos.map(todo => {
            if( filterStatus === '全て' || filterStatus === todo.status ) {
              return (
                <li>
                  <h3 style={{display: 'inline-block', margin: '10px 10px 10px 0'}}>{todo.title}</h3>
                  <select name="status" value={todo.status} onChange={e => changeStatus( todo.id, e.target.value )}>
                    <option value="未着手">未着手</option>
                    <option value="進行中">進行中</option>
                    <option value="完了">完了</option>
                  </select><br />
                  {todo.desc && <p style={{margin: '0 0 10px 0'}}>{todo.desc}</p>}
                  <button onClick={() => openEditor(todo)}>編集</button>
                  <button onClick={() => deleteTodo(todo.id)}>削除</button>
                  {
                    editTodo.id === todo.id &&
                    <div>
                      <input name="newTodoTitle" value={editTodo.title} placeholder="タイトル" onChange={changeEditTodoTitle} /><p id="edit-error" style={{color: 'red', display: 'inline-block'}}></p><br />
                      <textarea name="newTodoDesc" value={editTodo.desc} placeholder="詳細" onChange={changeEditTodoDesc}></textarea><br />
                      <button onClick={completeEditTodo}>追加</button>
                      <button onClick={closeEditor}>キャンセル</button>
                    </div>
                  }
                </li>
              );
            } else {
              return false;
            }
          })
        }
      </ul>
    </>
  );
}

export default App;