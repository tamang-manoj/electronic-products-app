import { GrCart } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { charToSelect } from "../features/character/characterSlice";

const Navbar = () => {
  const cartProducts = useAppSelector((state) => state.cartProducts.data);
  const cartProductsCount = cartProducts.length;

  const characters = useAppSelector((state) => state.characters);
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
        <div className="navbar__logo" onClick={() => navigate("/")}>
          <h1>Electronic Products</h1>
        </div>

        <div className="navbar__nonHeader">
          <div className="navbar__icon">
            {!loggedIn ? (
              <div
                className="navbar__cart"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <GrCart />
              </div>
            ) : loggedInRole === "user" ? (
              <div
                className="navbar__cart"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <GrCart />
                <span className="icon__badge">{cartProductsCount}</span>
              </div>
            ) : (
              <div
                className="navbar__cart"
                onClick={() => {
                  navigate("/add-product");
                }}
              >
                <IoMdAddCircleOutline />
              </div>
            )}
          </div>

          {loggedIn ? (
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
