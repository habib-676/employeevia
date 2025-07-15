import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import HoverUnderlineText from "../../components/Shared/Animation/HoverUnderlineText";
import useAuth from "../../hooks/useAuth";
import { imageUpload, setUserInDb } from "../../api/utils";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

const roles = ["employee", "hr"];
const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedRole, setSelectedRole] = useState(roles[0]);

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
      const userData = {
        name: data.name,
        email: data.email,
        image: imageUrl,
        role: selectedRole,
        bank_account_no: data.bank_account_no,
        salary: parseFloat(data.salary),
        designation: data.designation,
      };

      await setUserInDb(userData);

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
        role: "employee",
        bank_account_no: 11111111111,
        salary: 10000,
        designation: "fresher",
      };

      console.log(userData);

      await setUserInDb(userData);

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center mb-20 items-center bg-base-100 min-h-screen">
      <div className="w-full max-w-md p-8 rounded-box shadow-xl bg-base-200 text-base-content">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Sign Up</h1>
          <p className="text-sm opacity-70">Welcome to EmployeeVia</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Fieldset: Name & Designation */}
          <fieldset className="border border-base-300 p-4 rounded">
            <legend className="text-sm font-medium text-base-content mb-2">
              Basic Info
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="label-text">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-error text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Designation */}
              <div>
                <label className="label-text">Designation</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  placeholder="Enter your designation"
                />
                {errors.designation && (
                  <p className="text-error text-sm">
                    {errors.designation.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Fieldset: Email & Password */}
          <fieldset className="border border-base-300 p-4 rounded">
            <legend className="text-sm font-medium text-base-content mb-2">
              Credentials
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="label-text">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-error text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label-text">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must contain at least one capital letter and one special character",
                    },
                  })}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-error text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Profile Image */}
          <div>
            <label className="label-text">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-error text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Fieldset: Bank Account & Role */}
          <fieldset className="border border-base-300 p-4 rounded">
            <legend className="text-sm font-medium text-base-content mb-2">
              Employment Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bank Account */}
              <div>
                <label className="label-text">Bank Account No</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("bank_account_no", {
                    required: "Bank account is required",
                  })}
                  placeholder="Enter your bank account number"
                />
                {errors.bank_account_no && (
                  <p className="text-error text-sm">
                    {errors.bank_account_no.message}
                  </p>
                )}
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="label-text mb-1 block">Select Role</label>
                <Listbox value={selectedRole} onChange={setSelectedRole}>
                  <div className="relative">
                    <Listbox.Button className="input input-bordered w-full flex justify-between items-center">
                      {selectedRole}
                      <IoIosArrowDown />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-base-200 border rounded shadow-md">
                      {roles.map((role) => (
                        <Listbox.Option
                          key={role}
                          value={role}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 ${
                              active ? "bg-primary text-white" : ""
                            }`
                          }
                        >
                          {role}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </div>
          </fieldset>

          {/* Salary */}
          <div>
            <label className="label-text">Salary</label>
            <input
              type="number"
              step="any"
              className="input input-bordered w-full"
              {...register("salary", { required: "Salary is required" })}
              placeholder="Enter your salary"
            />
            {errors.salary && (
              <p className="text-error text-sm">{errors.salary.message}</p>
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

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Sign In */}
        <button
          type="button"
          className="btn btn-outline w-full flex items-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-4 text-sm text-center">
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
