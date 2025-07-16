import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Worksheet from "../pages/Dashboard/Employee-pages/work-sheet/Worksheet";
import PaymentHistory from "../pages/Dashboard/Employee-pages/payment-history/PaymentHistory";
import Employees from "../pages/Dashboard/HR-pages/employee-list/Employees";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth-pages/Login";
import Register from "../pages/Auth-pages/Register";
import axios from "axios";
import LoadingSpinner from "../components/Shared/Animation/LoadingSpinner";
import EmployeeDetails from "../pages/Dashboard/HR-pages/employee-list/EmployeeDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "contact-us",
        element: <div>Contact us</div>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <Worksheet></Worksheet>,
      },
      {
        path: "work-sheet",
        Component: Worksheet,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "employee-list",
        element: <Employees></Employees>,
      },
      {
        path: "employee-list/details/:email",
        hydrateFallbackElement: <LoadingSpinner />,
        loader: async ({ params }) => {
          const { data } = await axios(
            `${import.meta.env.VITE_API_URL}/payments/${params.email}`
          );
          return data;
        },

        element: <EmployeeDetails></EmployeeDetails>,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        element: <div>error</div>,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
