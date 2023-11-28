import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { selectedRole } from "../features/role/roleSlice";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRoleLogin = (e: any) => {
    e.preventDefault();
    if (role) {
      dispatch(selectedRole({ role: role, loggedIn: true }));
      navigate("/");
    }
  };

  return (
    <div className="form__container">
      <h2>Login</h2>

      <form id="login-form" onSubmit={handleRoleLogin}>
        <div className="form__element">
          <label htmlFor="email">Email: </label>
          <input
            className="form__element--input"
            type="text"
            // value={email}
            value="khusi@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__element">
          <label htmlFor="password">Password: </label>
          <input
            className="form__element--input"
            type="text"
            // value={password}
            value="Khusi@123Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__element">
          {/* <label htmlFor="role">Role: </label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}

          <label htmlFor="user">User</label>
          <input
            className="form__radio"
            type="radio"
            name="role"
            value="user"
            onChange={(e) => setRole(e.target.value)}
          />

          <label htmlFor="admin">Admin</label>
          <input
            className="form__radio"
            type="radio"
            name="role"
            value="admin"
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form__element">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
