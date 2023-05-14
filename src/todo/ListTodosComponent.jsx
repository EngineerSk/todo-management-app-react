function ListTodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const todos = [
    { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
    {
      id: 2,
      description: "Learn Cloud DevOps",
      done: false,
      targetDate: targetDate,
    },
    { id: 3, description: "Learn Docker", done: false, targetDate: targetDate },
    {
      id: 4,
      description: "Learn Ansible",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 5,
      description: "Learn Fullstack Development",
      done: false,
      targetDate: targetDate,
    },
  ];
  return (
    <div className="ListTodosComponent">
      <h1>Things You Want To Do</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <td>id</td>
              <td>Description</td>
              <td>Is Done?</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTodosComponent;
