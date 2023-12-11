import { Outlet } from "react-router";
import Login from "../features/character/Login";
import { useAppSelector } from "../app/hooks";

const ProtectedAdmin = () => {
  // const value = localStorage.getItem("persist_login");
  // let persistedLog;
  // if (value) {
  //   persistedLog = JSON.parse(value);
  // }
  // //   console.log(value);

  const status = useAppSelector((state) => state.characters.status);

  return (
    <div>
      {status.isLoggedIn && status.role === "admin" ? <Outlet /> : <Login />}
    </div>
  );
};

export default ProtectedAdmin;
