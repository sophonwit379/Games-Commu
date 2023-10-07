import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import HomePage from "./HomePage/HomePage";
import SelectGamesPage from "./SelectGamesPage/SelectGamesPage";
import AdminPage from "./AdminPage/AdminPage"
import TablePages from "./AdminPage/TablePages";
import SettingPage from "./SettingPage/SettingPage";
import PrivateRoute from "./Util/PrivateRoute";

export  const router  = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "home",
      element: <PrivateRoute>
        <HomePage/>
      </PrivateRoute>,
      errorElement: <ErrorPage />,
    },
    {
      path: "setting",
      element: <PrivateRoute>
        <SettingPage/>
      </PrivateRoute>,
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
  