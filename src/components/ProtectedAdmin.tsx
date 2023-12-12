import { Navigate, Outlet } from "react-router";
// import { useAppSelector } from "../app/hooks";

const ProtectedAdmin = () => {
  const value = localStorage.getItem("persist_login");
  let persistedLog;
  if (value) {
    persistedLog = JSON.parse(value);
  }
  //   console.log(value);

  // const status = useAppSelector((state) => state.characters.status);

  return (
    <div>
      {persistedLog?.isLoggedIn && persistedLog?.role === "admin" ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ProtectedAdmin;
