import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Worksheet from "../pages/Dashboard/Employee-pages/work-sheet/Worksheet";
import PaymentHistory from "../pages/Dashboard/Employee-pages/payment-history/PaymentHistory";
import Employees from "../pages/Dashboard/HR-pages/employee-list/Employees";

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
    ],
  },
]);
