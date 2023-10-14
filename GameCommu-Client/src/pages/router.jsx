import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import HomePage from "./HomePage/HomePage";
import SelectGamesPage from "./SelectGamesPage/SelectGamesPage";
import AdminPage from "./AdminPage/AdminPage"
import SettingPage from "./SettingPage/SettingPage";
import PrivateRoute from "./Util/PrivateRoute";
import AnonymousPage from "./AnonymousPage/AnonymousPage";

export const router  = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <AnonymousPage />,
          errorElement: <ErrorPage />,
        },
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
      children: [
        {
          path: ":id",
          element: <HomePage />,
          errorElement: <ErrorPage />,
        }
      ],
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
      element: <PrivateRoute>
        <SelectGamesPage/>
      </PrivateRoute>,
      errorElement: <ErrorPage />
    },
    {
      path: "/admin/*",
      element: (
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      ),
    },

  ]);
  