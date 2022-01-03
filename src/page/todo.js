import { useState, useEffect, useCallback } from "react";
import "./todos.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {
  createTodo,
  getAllTodos,
  deleteTodoById,
  updateTodo,
} from "../services";

const Todo = () => {
  const [todos, setTodos] = useState([]); //Tüm liste öğelerini çekmek için kullandığım state
  const [newTodo, setNewTodo] = useState({ content: "" }); //Listeye yeni bir eleman eklerken kullandığım state
  const [inputValue, setInputValue] = useState(""); //Kullanıcı adını ekranda yazdırmak için kullandığım state
  const [username, setUsername] = useState(localStorage.getItem("name") || ""); //Kullanıcı adını localStorage da tutmak için kullandığım state
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //Inputtan gelen değeri setInputValue ile inputValue içerisine gönderiyoruz
  const onChangeUsername = (event) => {
    setInputValue(event.target.value);
  };
  const handleLogin = () => {
    //inputValue içerisine gönderdiğimiz değeri localStorage a set ediyoruz
    localStorage.setItem("name", inputValue);
    //inputtan gelen username'i ekrana azdırabilmek için username e set ediyoruz
    setUsername(inputValue);
  };
  /**Güncelleme fonksiyonunu çağırdığımız useEffect'in dependency array'ini boş
  bıraktığımız da uyarı vermemesi için useEffect'in dependecy array'ine fonksiyonun
  kendisini gönderiyoruz fakat burada useCallback 
  kullanmazsak useEffect sonsuz döngüye giriyor*/
  const getList = useCallback(async () => {
    const data = await getAllTodos();
    setTodos(data);
  }, []);
  //Liste üzerinde yaptığımız CRUD işlemlerinin anlık takibi için useEffect ile Listemizi her işlemden sonra güncelliyoruz
  useEffect(() => {
    getList();
  }, [getList]);
  const onChangeInput = (event) => {
    //Yeni öğe eklerken kullandığımız inputtan gelen değeri set ediyoruz ve contentin içerisine aktarıyoruz
    setNewTodo({ content: event.target.value });
  };

  const addTodo = async (event) => {
    //inputun boş veya 3 karakterden az olup olmadığını kontrol ediyoruz
    if (newTodo.content.length >= 3) {
      //endpointimize inputtan aldığımız değeri gönderiyoruz
      await createTodo(newTodo);
      setNewTodo({ content: event.target.value });
      getList();
    } else {
      alert("Minimum 3 Karakter Girmelisiniz");
    }
  };

  const deleteTodo = async (id) => {
    //Parametre olarak aldığımız id yi enpointimize gönderiyoruz ve siliyoruz
    await deleteTodoById(id);
    getList();
  };
  //Parametre olarak aldığımız id ye ait veriye ulaşıyoruz ve isActive değişkeni ile isComleted değerini false veya true olarak düzenliyoruz
  const updateTodoById = async (id, isActive) => {
    await updateTodo(id, isActive);
    getList();
  };

  return (
    <div className="contain">
      {!username && (
        <div>
          <input
            placeholder="Username"
            className="new-input"
            name="username"
            value={inputValue}
            onChange={onChangeUsername}
          />
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
      <h1 className="username">
        {username ? <p>Welcome {username}</p> : ""}
      </h1>
      <h1 className="title">toDo App</h1>
      <ul>
        {todos.map((item) => (
          <li className="list" key={item.id}>
            <div className="li-container">
              <span>
                <Checkbox
                  {...label}
                  checked={item.isCompleted}
                  onChange={(event) => {
                    updateTodoById(item.id, {
                      isCompleted: event.target.checked,
                    });
                  }}
                />
              </span>
              {item.content}
              <span className="buttonHolder ">
                <IconButton
                  onClick={() => deleteTodo(item.id)}
                  aria-label="delete"
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <input
          placeholder="Add New toDo"
          className="new-todo"
          name="textarea"
          onChange={onChangeInput}
          value={newTodo.content}
        ></input>

        <button className="button" onClick={addTodo}>
          ADD
        </button>
      </div>
    </div>
  );
};
export default Todo;
