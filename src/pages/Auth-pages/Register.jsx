import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import HoverUnderlineText from "../../components/Shared/Animation/HoverUnderlineText";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    const image = data.image[0];
    const imageUrl = await imageUpload(image);
    try {
      //2. User Registration
      const result = await createUser(data.email, data.password);

      //3. Save username & profile photo
      await updateUserProfile(data.name, imageUrl);

      // update user data in db
      // const userData = {
      //   name,
      //   email,
      //   image: imageUrl,
      // };

      // await setUserInDb(userData);

      console.log(result);

      navigate("/");
      toast.success("Signup Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const result = await signInWithGoogle();

      // update user
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      console.log(userData);

      // await setUserInDb(userData);

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className=" flex justify-center mb-20 items-center bg-base-100">
      <div className="w-full max-w-md p-8 rounded-box shadow-lg bg-base-200 text-base-content">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Sign Up</h1>
          <p className="text-sm text-base-content opacity-70">
            Welcome to PlantNet
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label-text">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="label-text">
              Profile Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-error text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label-text">
              Email
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
              placeholder="Enter a password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="divider">OR</div>
        <button
          type="button"
          className="btn btn-outline w-full flex items-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* Footer Link */}
        <p className="mt-4 text-sm text-center text-base-content">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-secondary hover:underline">
            <HoverUnderlineText>Login</HoverUnderlineText>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
