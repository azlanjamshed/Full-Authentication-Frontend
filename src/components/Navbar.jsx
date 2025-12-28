import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../api/auth.api";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/">AuthApp</Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={logout} className="text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
