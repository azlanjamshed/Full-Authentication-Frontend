import api from "../utils/axios";

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/registeration", data);
export const getMe = () => api.get("/auth/user");
export const logoutUser = () => api.get("/auth/logout");
export const verifyOtp = (data) => api.post("/auth/otp-verification", data)
export const forgotPassword = (data) => api.post("/password/forgot", data)
export const resetPassword = (token, data) => api.put(`/password/reset/:token${token}`, data)





