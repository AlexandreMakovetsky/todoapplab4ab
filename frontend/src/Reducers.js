function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        complete: action.complete,
        dateCompleted: action.dateCompleted,
        id: action.id,
      };
      return [newTodo, ...state];
    case "DELETE_TODO":
      const copyStateDelete = [...state];
      const removedStateDelete = copyStateDelete.filter(
        (copyStateDelete) => copyStateDelete.id !== action.id
      );
      return [...removedStateDelete];
    case "TOGGLE_TODO":
      const completedTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        complete: action.complete,
        dateCompleted: action.dateCompleted,
        id: action.id,
      };
      const copyStateToggle = [...state];
      const removedStateToggle = copyStateToggle.filter(
        (copyStateToggle) => copyStateToggle.id !== action.id
      );
      return [...removedStateToggle, completedTodo];
    case "FETCH_TODO":
      return action.todo;
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todo: todoReducer(state.todo, action),
  };
}
