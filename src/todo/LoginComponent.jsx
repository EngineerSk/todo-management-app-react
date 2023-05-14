import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {
  const [username, setUsername] = useState("Oriade");
  const [password, setPassword] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const navigate = useNavigate();
  const authContext = useAuth();

  function handleUsername(event) {
    setUsername(event.target.value);
    console.log(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  function handleSubmit() {
    if (authContext.login(username, password)) {
      setShowErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else setShowErrorMessage(true);
  }

  return (
    <div className="Login">
      <h1>Time to Login</h1>
      {showErrorMessage && (
        <div className="errorMessage">
          Authentication failed! Please, check your credentials
        </div>
      )}
      <div className="LoginForm">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
