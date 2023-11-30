import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router";
import { charToSelect } from "../features/role/characterSlice";

function Login() {
  const [email, setEmail] = useState("@gmail.com");

  const characters = useAppSelector((state) => state.characters);
  const charArray = characters.charArray;
  // const loggedIn = characters.loggedIn;
  // const loggedInCharacter = characters.loggedInCharacter;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRoleLogin = (e: any) => {
    e.preventDefault();

    if (email) {
      const foundCharacter = charArray.find(
        (character) => character.email === email
      );

      if (foundCharacter) {
        dispatch(
          charToSelect({ loggedIn: true, loggedInRole: foundCharacter.role })
        );
        navigate("/");
      } else {
        alert("Email not found!");
      }
    }

    // if (role) {
    //   dispatch(selectedRole({ role: role, loggedIn: true }));
    //   navigate("/");
    // }
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
