import { Outlet } from "react-router";
// import { useAppSelector } from "../app/hooks";
import Login from "../features/character/Login";

const ProtectedUser = () => {
  // const characters = useAppSelector((state) => state.characters);
  // const loggedIn = characters.loggedIn;

  const value = localStorage.getItem("persist_login");
  let persistedLog;
  if (value) {
    persistedLog = JSON.parse(value);
  }
  // console.log(value);

  return (
    <div>
      {persistedLog.loggedIn && persistedLog.loggedInRole === "user" ? (
        <Outlet />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ProtectedUser;
