import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Profile</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
