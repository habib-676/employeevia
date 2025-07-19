import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/Spinners/LoadingSpinner";
const HrRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "hr" || role === "admin") return children;
  return <Navigate to="/" />;
};

export default HrRoute;
