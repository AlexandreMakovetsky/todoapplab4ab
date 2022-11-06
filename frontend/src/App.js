import { useReducer, useEffect } from "react";
import Todolist from "./components/Todo/Todolist";
import UserBar from "./components/User/Userbar";
import CreateTodo from "./components/Todo/CreateTodo";
import appReducer from "./Reducers";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todo: [],
  });

  const [todo, getTodo] = useResource(() => ({
    url: "/Todo",
    method: "get",
  }));

  const { user } = state;

  useEffect(getTodo, []);

  useEffect(() => {
    if (todo && todo.data) {
      dispatch({ type: "FETCH_TODO", todo: todo.data.reverse() });
    }
  }, [todo]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <UserBar />
      {user && <Todolist />}
      {user && <CreateTodo />}
    </StateContext.Provider>
  );
}

export default App;
