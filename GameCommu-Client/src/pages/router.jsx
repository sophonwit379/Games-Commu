import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import HomePage from "./HomePage/HomePage";
import SelectGamesPage from "./SelectGamesPage/SelectGamesPage";
import AdminPage from "./AdminPage/AdminPage"
import TablePages from "./AdminPage/TablePages";

export  const router  = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "home",
      element: <HomePage/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "select-game",
      element: <SelectGamesPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/admin/*",
      element: <AdminPage/>,
      children: [
        {
          path: "table",
          element: <TablePages/>,
        },
      ],
    },

  ]);
  