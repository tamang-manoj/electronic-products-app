import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router";
import { setCharInfo } from "./characterSlice";

function Login() {
  const [email, setEmail] = useState("@gmail.com");

  const characters = useAppSelector((state) => state.characters);
  const charArray = characters.charArray;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRoleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email) {
      const foundCharacter = charArray.find(
        (character) => character.email === email
      );

      if (foundCharacter) {
        localStorage.setItem(
          "persist_login",
          JSON.stringify({ isLoggedIn: true, role: foundCharacter.role })
        );

        const value = localStorage.getItem("persist_login");
        let persistedLog;
        if (value) {
          persistedLog = JSON.parse(value);
        }

        dispatch(setCharInfo(persistedLog));

        navigate("/");
      } else {
        alert("Email not found!");
      }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
