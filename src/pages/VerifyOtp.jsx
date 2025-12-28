import { useForm } from "react-hook-form";
import { verifyOtp } from "../api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // email passed from register page
  const phone = location.state?.phone;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await verifyOtp({
        phone: phone,
        otp: data.otp,
      });

      alert("Account verified successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  if (!phone) {
    return (
      <p className="text-center mt-20 text-red-500">
        Email not found. Please register again.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>

        <p className="text-sm text-gray-600 text-center">
          OTP sent to <b>{phone}</b>
        </p>

        <input
          className="w-full border p-2 text-center tracking-widest"
          placeholder="Enter OTP"
          maxLength={6}
          {...register("otp", {
            required: "OTP is required",
            minLength: {
              value: 5,
              message: "OTP must be 5 digits",
            },
          })}
        />

        {errors.otp && (
          <p className="text-red-500 text-sm">{errors.otp.message}</p>
        )}

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
