import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import Login from "../features/character/Login";

const Protected = () => {
  const characters = useAppSelector((state) => state.characters);
  const loggedIn = characters.loggedIn;

  return <div>{loggedIn ? <Outlet /> : <Login />}</div>;
};

export default Protected;
