import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api/auth.api";

const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = async (data) => {
    await resetPassword(token, data);
    alert("Password reset successful");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <input
        type="password"
        className="w-full border p-2"
        placeholder="New Password"
        {...register("password", { required: true })}
      />

      <input
        type="password"
        className="w-full border p-2"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
      />

      <button className="w-full bg-red-600 text-white p-2">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
