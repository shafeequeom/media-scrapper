import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store";

import routes from "./router";

import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";

import "./App.css";
import Header from "./components/nav/Header";

const store = createStore(rootReducer);

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));
  const isLoggedIn = user && user.token;

  useEffect(() => {
    if (user && !user.name) {
      currentUser()
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: user.token,
              id: res.data.id,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch]);

  return useRoutes(routes(isLoggedIn));
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header></Header>
        <App />
      </Router>
    </Provider>
  );
};
export default AppWrapper;
