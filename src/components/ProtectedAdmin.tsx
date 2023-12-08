import { Outlet } from "react-router";
import Login from "../features/character/Login";

const ProtectedAdmin = () => {
  const value = localStorage.getItem("persist_login");
  let persistedLog;
  if (value) {
    persistedLog = JSON.parse(value);
  }
  //   console.log(value);

  return (
    <div>
      {persistedLog.loggedIn && persistedLog.loggedInRole === "admin" ? (
        <Outlet />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ProtectedAdmin;
