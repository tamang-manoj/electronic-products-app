import { GrCart } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCharInfo } from "../features/character/characterSlice";

const Navbar = () => {
  const cartProducts = useAppSelector((state) => state.cartProducts.data);
  const cartProductsCount = cartProducts.length;

  const charStatus = useAppSelector((state) => state.characters.status);

  // const value = localStorage.getItem("persist_login");
  // let persistedLog;
  // if (value) {
  //   persistedLog = JSON.parse(value);
  // }
  // // console.log(persistedLog);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setCharInfo({ isLoggedIn: false, role: "user" }));
    localStorage.removeItem("persist_login");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__logo" onClick={() => navigate("/")}>
          <h1>Electronic Products</h1>
        </div>

        <div className="navbar__nonHeader">
          <div className="navbar__icon">
            {charStatus.isLoggedIn && charStatus.role === "user" ? (
              <div
                className="navbar__cart"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <GrCart />
                <span className="icon__badge">{cartProductsCount}</span>
              </div>
            ) : charStatus.isLoggedIn && charStatus.role === "admin" ? (
              <div
                className="navbar__cart"
                onClick={() => {
                  navigate("/add-product");
                }}
              >
                <IoMdAddCircleOutline />
              </div>
            ) : (
              <div
                className="navbar__cart"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <GrCart />
              </div>
            )}
          </div>

          {charStatus.isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
