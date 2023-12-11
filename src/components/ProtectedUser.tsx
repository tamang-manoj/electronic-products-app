import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import Login from "../features/character/Login";

const ProtectedUser = () => {
  const status = useAppSelector((state) => state.characters.status);

  return (
    <div>
      {status.isLoggedIn && status.role === "user" ? <Outlet /> : <Login />}
    </div>
  );
};

export default ProtectedUser;
