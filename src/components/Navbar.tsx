import { GrCart } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectedRole } from "../features/role/roleSlice";

const Navbar = () => {
  const roleStatus = useAppSelector((state) => state.roleStatus);
  const role = roleStatus.role;
  const loggedIn = roleStatus.loggedIn;
  // console.log(loggedIn);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(selectedRole({ role: "user", loggedIn: false }));
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
          {role === "user" ? (
            <GrCart
              onClick={() => {
                loggedIn ? navigate("/cart") : navigate("/login");
              }}
            />
          ) : (
            <div>
              <IoMdAddCircleOutline
                onClick={() => {
                  navigate("/products/addProduct");
                }}
              />
            </div>
          )}
        </div>

        <div className="navbar__icon">
          {role === "admin" ? (
            <MdAdminPanelSettings style={{ color: "#FBF8BE" }} />
          ) : role === "user" && loggedIn ? (
            <FaRegUser style={{ color: "#FBF8BE" }} />
          ) : (
            <FaRegUser />
          )}
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
