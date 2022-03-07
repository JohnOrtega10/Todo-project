import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Form from "./components/form/form.component";
import TodoList from "./components/todo-list/todo-list.component";

import "./App.css";

const App = () => {
  // State
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios
      .get("http://localhost:4000/api/v1/todos")
      .then((res) => setTodos(res.data.data.todos))
      .catch((err) => console.log(err));
  };

  const addTodo = (todo) => {
    axios
      .post(`http://localhost:4000/api/v1/todos`, todo)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  const editTodo = (id, newContent) => {
    axios
      .patch(`http://localhost:4000/api/v1/todos/${id}`, {
        content: newContent,
      })
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/todos/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <Form onAddTodo={addTodo} />
      <TodoList onDeleteTodo={deleteTodo} onEditTodo={editTodo} items={todos} />
    </div>
  );
};

export default App;
