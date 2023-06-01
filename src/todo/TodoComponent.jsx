import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoAPI,
  retrieveTodoAPI,
  updateTodoApi,
} from "./api/TodoAPIService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

export default function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const navigate = useNavigate();
  const retrieveTodo = () => {
    if (id !== "-1") {
      retrieveTodoAPI(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
          console.log();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => retrieveTodo(), [id]);

  const onSubmit = (values) => {
    console.log(values);
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      completed: false,
    };
    if (id != -1) {
      updateTodoApi(username, id, todo)
        .then(() => {
          navigate(`/todos`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createTodoAPI(username, todo)
        .then(() => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    }
  };

  const validate = (values) => {
    let errors = {
      // description: "Enter at least 5 characters",
    };
    if (values.description.length < 5)
      errors.description = "Enter at least 5 characters.";
    if (
      values.targetDate == null ||
      values.targetDate === "" ||
      !moment(values.targetDate).isValid()
    )
      errors.targetDate = "Enter a target date";
    return errors;
  };

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize="true"
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => {
            return (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    type="text"
                    className="form-control"
                    name="description"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    type="date"
                    className="form-control"
                    name="targetDate"
                  ></Field>
                </fieldset>
                <div>
                  <button className="btn btn-success mt-5" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
