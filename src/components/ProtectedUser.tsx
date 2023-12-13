import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";

const ProtectedUser = () => {
  const status = useAppSelector((state) => state.characters.status);

  console.log(status);

  // const value = localStorage.getItem("persist_login");
  // let persistedLog;
  // if (value) {
  //   persistedLog = JSON.parse(value);
  // }

  return (
    <div>
      {status?.isLoggedIn === true && status?.role === "user" ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ProtectedUser;
