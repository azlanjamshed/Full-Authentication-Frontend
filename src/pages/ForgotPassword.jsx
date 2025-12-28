import { useForm } from "react-hook-form";
import { forgotPassword } from "../api/auth.api";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await forgotPassword(data);
    alert("Reset link sent to email");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <input
        className="w-full border p-2"
        placeholder="Enter your email"
        {...register("email", { required: "Email required" })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <button className="w-full bg-purple-600 text-white p-2">
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;
