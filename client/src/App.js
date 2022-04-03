import {
  BrowserRouter as Router,
  Navigate,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store";
import routes from "./router";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";
import "./App.css";
import Header from "./components/nav/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const store = createStore(rootReducer);
const theme = createTheme();

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));
  const isLoggedIn = user && user.token;

  useEffect(() => {
    if (isLoggedIn && !user.name) {
      currentUser()
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.data;
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: data.name,
                email: data.email,
                token: user.token,
                id: data.id,
              },
            });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          dispatch({
            type: "LOGOUT",
            payload: null,
          });
          navigate("/login");
        });
    }
  }, [dispatch]);

  return useRoutes(routes(isLoggedIn));
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Header></Header>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  );
};
export default AppWrapper;
