import { useEffect, useState } from "react";
import {
  deleteTodoForUsername,
  retrieveAllTodosForUsername,
} from "./api/TodoAPIService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  // const today = new Date();
  // const targetDate = new Date(
  //   today.getFullYear() + 12,
  //   today.getMonth(),
  //   today.getDay()
  // );

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();
  // const todos = [
  // { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
  // {
  //   id: 2,
  //   description: "Learn Cloud DevOps",
  //   done: false,
  //   targetDate: targetDate,
  // },
  // { id: 3, description: "Learn Docker", done: false, targetDate: targetDate },
  // {
  //   id: 4,
  //   description: "Learn Ansible",
  //   done: false,
  //   targetDate: targetDate,
  // },
  // {
  //   id: 5,
  //   description: "Learn Fullstack Development",
  //   done: false,
  //   targetDate: targetDate,
  // },
  // ];
  const refreshTodos = () => {
    retrieveAllTodosForUsername(username)
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    refreshTodos();
  });

  const deleteTodo = (id) => {
    deleteTodoForUsername(username, id)
      .then((response) => {
        setMessage(`Delete of todo with id of ${id} successful`);
        refreshTodos();
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const updateTodo = (id) => {
    navigate(`/todo/${id}`);
  };

  const addNewTodo = () => {
    navigate(`/todo/-1`);
  };
  return (
    <div className="ListTodosComponent">
      <h1>Things You Want To Do</h1>
      {message !== null && <div className="alert alert-warning">{message}</div>}
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.completed.toString()}</td>
                <td>{todo.targetDate}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="btn btn-success mt-3"
          onClick={() => {
            addNewTodo();
          }}
        >
          Add New Todo
        </button>
      </div>
    </div>
  );
}

export default ListTodosComponent;
