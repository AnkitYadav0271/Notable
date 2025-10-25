import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ChangePassword from "./pages/ChangePassword";
import UserHome from "./pages/UserHome";
import { UserProvider } from "./context/UserContext";
import { Layout } from "./Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path:"/",element:<Home/>},
      { path: "/signup", element: <Signup /> },
      { path: "/verify", element: <VerifyEmail /> },
      { path: "/verify/:token", element: <Verify /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-otp/:email", element: <VerifyOtp /> },
      { path: "/change-password/:email", element: <ChangePassword /> },
      { path: "/dashboard", element: <UserHome /> },
      { path: "/add-note", element: <UserHome /> },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
