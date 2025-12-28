import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "../api/auth.api";
import getErrorMessage from "../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      verificationMethod: "phone", // ✅ DEFAULT
    },
  });

  const onSubmit = async (data) => {
    try {
      setServerError("");

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        verificationMethod: "phone", // enforced
      };

      await registerUser(payload);
      alert("Registered successfully. OTP sent to phone.");
      navigate("/verify-otp", {
        state: { phone: data.phone },
      });
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      {/* SERVER ERROR */}
      {serverError && (
        <p className="bg-red-100 text-red-600 p-2 rounded text-sm">
          {serverError}
        </p>
      )}

      {/* NAME */}
      <input
        className="w-full border p-2"
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      {/* EMAIL */}
      <input
        type="email"
        className="w-full border p-2"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      {/* PHONE */}
      <input
        type="tel"
        className="w-full border p-2"
        placeholder="Phone"
        {...register("phone", {
          required: "Phone number is required",
          minLength: {
            value: 10,
            message: "Phone must be at least 10 digits",
          },
        })}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      {/* PASSWORD */}
      <input
        type="password"
        className="w-full border p-2"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      {/* VERIFICATION METHOD (FIXED TO PHONE) */}
      {/* <div className="bg-gray-100 p-2 rounded text-center text-sm">
        Verification method: <b>Phone</b>
      </div> */}

      <button className="w-full bg-green-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
