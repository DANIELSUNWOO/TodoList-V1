import { useState } from "react";
import "./App.css";

function Input({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  };

  return (
    <div className="todo-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
}

function TodoItem({ todo, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("이 할 일을 삭제하시겠습니까?")) {
      onDelete(todo.id);
    }
  };

  return (
    <li className={`todo-item${todo.completed ? " completed" : ""}`}>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span className="todo-text">{todo.text}</span>
      <button className="delete-btn" onClick={handleDelete}>
        삭제
      </button>
    </li>
  );
}

function TodoList({ todos, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty-message">할 일이 없습니다.</p>;
  }
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>할 일 목록</h1>
      <Input onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
