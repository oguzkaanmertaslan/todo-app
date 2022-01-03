import { useState, useEffect } from "react";

import "./App.css";
import Todo from "./page/todo";
import "./page/todos.css";
function App() {

  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("isDarkMode")));

  useEffect(() => {
      isDarkMode ? document.body.classList.add("dark-mode"): localStorage.setItem('isDarkMode',false); 
  }, []);

  const darkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode',!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };
  return (
    <div>
      <button className="button" onClick={() => darkMode()}>Change Theme</button>
      <Todo />
    </div>
  );
}
export default App;
