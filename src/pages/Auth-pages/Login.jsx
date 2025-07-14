import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import HoverUnderlineText from "../../components/Shared/Animation/HoverUnderlineText";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/Animation/LoadingSpinner";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const onSubmit = async (data) => {
    console.log("Login submitted:", data);

    try {
      //User Login
      const result = await signIn(data.email, data.password);

      console.log(result);

      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      console.log(userData);
      // update user
      // await setUserInDb(userData);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const result = await signInWithGoogle();

      console.log(result);
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      console.log(userData);
      // update user
      // await setUserInDb(userData);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center mb-20 bg-base-100">
      <div className="w-full max-w-md p-8 rounded-box shadow-lg bg-base-200 text-base-content">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Log In</h1>
          <p className="text-sm text-base-content opacity-70">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="label-text">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="label-text">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            {isSubmitting ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-2 text-right">
          <button className="text-xs text-secondary hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Social Login */}
        <div className="divider">OR</div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* Footer Link */}
        <p className="mt-4 text-sm text-center text-base-content">
          Don&apos;t have an account yet?{" "}
          <Link to="/auth/register" className="text-secondary hover:underline">
            <HoverUnderlineText> Sign up</HoverUnderlineText>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
