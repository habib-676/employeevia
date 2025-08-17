import { FaExclamationTriangle } from "react-icons/fa";
import { Link, useNavigate, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-6 text-center">
      <div className="max-w-md">
        <div className="text-7xl text-error mb-4 flex justify-center">
          <FaExclamationTriangle />
        </div>

        <h1 className="text-4xl font-extrabold text-base-content mb-2">
          {error?.status || 404} – Page Not Found
        </h1>

        <p className="text-base text-base-content/70 mb-6">
          {error?.statusText ||
            "Sorry, the page you are looking for doesn’t exist or has been moved."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-error"
          >
            ⬅ Go Back
          </button>

          <Link to="/" className="btn btn-primary text-white font-semibold">
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
