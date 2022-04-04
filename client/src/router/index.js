import Redirection from "../components/redirect/Redirection";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Scrap from "../pages/Scrap";

const routes = (isLoggedIn) => [
  //Auth
  {
    path: "/",
    element: isLoggedIn ? <Home /> : <Login />,
  },
  {
    path: "/profile",
    element: isLoggedIn ? <Profile /> : <Redirection />,
  },
  {
    path: "/scrap",
    element: isLoggedIn ? <Scrap /> : <Redirection />,
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;
