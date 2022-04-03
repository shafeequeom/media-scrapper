import Redirection from "../components/redirect/Redirection";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";

const routes = (isLoggedIn) => [
  //Auth
  {
    path: "/",
    element: isLoggedIn ? <Home /> : <Redirection />,
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;
