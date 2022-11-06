import Todo from "./Todo";
import { useContext, useEffect } from "react";
import { StateContext } from "../../contexts";

export default function Todolist() {
  const { state, dispatch } = useContext(StateContext);
  const { todo } = state;

  useEffect(() => {
    if (todo && todo.data) {
      dispatch({ type: "FETCH_TODO", todo: todo.data.reverse() });
    }
  }, [todo]);

  return (
    <div>
      {todo.map((p, i) => (
        <Todo {...p} key={p.id} />
      ))}
    </div>
  );
}
