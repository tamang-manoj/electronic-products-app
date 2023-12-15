import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CartComponent from "./CartComponent";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { getCartData } from "../cart/cartSlice";
import Checkout from "./Checkout";

const CartProductsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  const cartProductsAll = useAppSelector((state) => state.cartProducts);
  const cartProducts = cartProductsAll.data;
  const isLoading = cartProductsAll.loading;

  const [info, setInfo] = useState<string[]>([]);
  const handleInputChecked = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setInfo([...info, value]);
    } else {
      setInfo(info.filter((en) => en !== value));
    }
  };
  // console.log(info);

  // console.log(cartProducts);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : cartProducts.length === 0 ? (
        <div className="empty-product">
          <h1>No Products in the cart</h1>
        </div>
      ) : (
        <div className="cartCheckout__container">
          <div className="cartProduct-container">
            {cartProducts.map((cartProduct) => (
              <div className="checkbox__cart" key={cartProduct.cartItemId}>
                <input
                  disabled={cartProduct.productAvailable === "outOfStock"}
                  type="checkbox"
                  style={{ cursor: "pointer" }}
                  onChange={(e) => handleInputChecked(e)}
                  value={cartProduct.cartItemId}
                />
                <CartComponent cartProduct={cartProduct} />
              </div>
            ))}
          </div>

          <Checkout info={info} />
        </div>
      )}
    </>
  );
};

export default CartProductsPage;
