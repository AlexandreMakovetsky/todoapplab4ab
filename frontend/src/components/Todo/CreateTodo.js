import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResource } from "react-request-hook";
import { StateContext } from "../../contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(({ title, description, author }) => ({
    url: "/Todo",
    method: "post",
    data: {
      title,
      description,
      author,
      dateCreated: Date.now(),
      complete: "false",
      id: uuidv4(),
    },
  }));

  useEffect(() => {
    if (todo?.error) {
      setError(true);
      //alert("Something went wrong creating post.");
    }
    if (todo?.isLoading === false && todo?.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        description: todo.data.description,
        author: todo.data.author,
        dateCreated: todo.data.dateCreated,
        complete: todo.data.complete,
        id: todo.data.id,
      });
    }
  }, [todo]);

  function handleCreate() {
    createTodo({ title, description, author: user });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <br></br>
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <label htmlFor="create-description">Description:</label>
      <br></br>
      <textarea
        name="create-description"
        id="create-description"
        description={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <br></br>
      <input type="submit" value="Create" disabled={title.length === 0} />
    </form>
  );
}
