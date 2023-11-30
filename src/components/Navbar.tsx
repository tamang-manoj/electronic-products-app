import { GrCart } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { charToSelect } from "../features/character/characterSlice";

const Navbar = () => {
  const characters = useAppSelector((state) => state.characters);
  const charArray = characters.charArray;
  const loggedIn = characters?.loggedIn;
  const loggedInRole = characters.loggedInRole;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(charToSelect({ loggedIn: false, loggedInRole: "user" }));
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div onClick={() => navigate("/")}>
          <h1>Electronic Products</h1>
        </div>

        <div className="navbar__icon">
          {loggedInRole === "user" && loggedIn ? (
            <GrCart
              onClick={() => {
                loggedIn ? navigate("/cart") : navigate("/login");
              }}
            />
          ) : loggedInRole === "admin" ? (
            <div>
              <IoMdAddCircleOutline
                onClick={() => {
                  navigate("/products/addProduct");
                }}
              />
            </div>
          ) : null}
        </div>

        {loggedIn ? (
          <button className="navbar__button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="navbar__button" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
