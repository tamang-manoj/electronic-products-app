import { GrCart } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { charToSelect } from "../features/character/characterSlice";

const Navbar = () => {
  const products = useAppSelector((state) => state.products.data);
  const productsCount = products.length;

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
        <div className="navbar__header" onClick={() => navigate("/")}>
          <h1>Electronic Products</h1>
        </div>

        <div className="navbar__nonHeader">
          <div className="navbar__icon">
            {loggedInRole === "user" && loggedIn ? (
              <div
                className="navbar__cart"
                onClick={() => {
                  loggedIn ? navigate("/cart") : navigate("/login");
                }}
              >
                <GrCart />
                <span className="icon__badge">{cartProductsCount}</span>
              </div>
            ) : loggedInRole === "admin" ? (
              <div
                className="navbar__cart"
                onClick={() => {
                  navigate("/products/addProduct");
                }}
              >
                <IoMdAddCircleOutline />
                <span className="icon__badge">{productsCount}</span>
              </div>
            ) : null}
          </div>

          <div>
            {" "}
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
