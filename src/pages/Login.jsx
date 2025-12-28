// import { useForm } from "react-hook-form";
// import { loginUser } from "../api/auth.api";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const onSubmit = async (data) => {
//     setLoading(true);
//     await loginUser(data);
//     setLoading(false);
//     navigate("/profile");
//     alert("Logged in successfully");
//   };

//   return (
//     {loading ? <p>Loading...</p> :
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-sm mx-auto mt-20 space-y-4"
//     >
//       <input
//         className="w-full border p-2"
//         placeholder="Email"
//         {...register("email", { required: "Email required" })}
//       />
//       {errors.email && <p className="text-red-500">{errors.email.message}</p>}

//       <input
//         type="password"
//         className="w-full border p-2"
//         placeholder="Password"
//         {...register("password", { required: "Password required" })}
//       />
//       {errors.password && (
//         <p className="text-red-500">{errors.password.message}</p>
//       )}

//       <button className="w-full bg-blue-600 text-white p-2">Login</button>
//     </form>}
//   );
// };

// export default Login;

import { useForm } from "react-hook-form";
import { loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      setUser(res.data.user);
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            className="w-full border p-2"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            className="w-full border p-2"
            placeholder="Password"
            {...register("password", { required: "Password required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
