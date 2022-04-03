let initialState = {};

if (typeof window !== "undefined") {
  if (localStorage.getItem("token")) {
    initialState.token = localStorage.getItem("token");
  }
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
}
