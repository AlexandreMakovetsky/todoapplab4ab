import React from "react";
import { useResource } from "react-request-hook";

function Todo({ title, description, author, id }) {
  const [, deleteTodo] = useResource(({ id }) => ({
    url: `/Todo/${id}`,
    method: "delete",
    data: {
      id,
    },
  }));

  const [, toggleTodo] = useResource(({ id }) => ({
    url: `/Todo/${id}`,
    method: "patch",
    data: {
      complete: true,
      dateCompleted: Date.now(),
    },
  }));

  return (
    <div>
      <h3>----------------</h3>
      <h3>Title: {title}</h3>
      <h3>Description: {description}</h3>
      <br />
      <i>
        Written by: <b>{author}</b>
      </i>
      <br></br>
      <br></br>
      <div>
        <input
          type="checkbox"
          id="complete"
          onChange={() => toggleTodo({ id })}
        />
        Complete
      </div>
      <br></br>
      <div>
        <button type="button" onClick={() => deleteTodo({ id })}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(Todo);
