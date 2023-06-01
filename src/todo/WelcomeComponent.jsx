import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldAPIService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const authContext = useAuth();

  function successResponse(response) {
    setMessage(response.data.message);
    console.log(response);
  }

  function errorResponse(error) {
    console.log(error);
  }
  return (
    <div className="Welcome">
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos - <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button
          className="btn btn-success mt-5"
          onClick={() => {
            // retrieveHelloWorldBean()
            retrieveHelloWorldPathVariable(username, authContext.token)
              .then((response) => successResponse(response))
              .catch((error) => errorResponse(error))
              .finally(() => console.log("clean up"));
          }}
        >
          Call Hello World REST API
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
