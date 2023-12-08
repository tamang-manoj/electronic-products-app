import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CartComponent from "./CartComponent";
import Loading from "./Loading";
import { useEffect } from "react";
import { getCartData } from "../cart/cartSlice";

const CartProductsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  const cartProductsAll = useAppSelector((state) => state.cartProducts);
  const cartProducts = cartProductsAll.data;
  const isLoading = cartProductsAll.loading;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : cartProducts.length === 0 ? (
        <div className="empty-product">
          <h1>No Products in the cart</h1>
        </div>
      ) : (
        <div className="cartProduct-container">
          {cartProducts.map((cartProduct) => (
            <CartComponent
              key={cartProduct.cartItemId}
              cartProduct={cartProduct}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CartProductsPage;
