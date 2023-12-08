import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CartComponent from "./CartComponent";
import Loading from "./Loading";
import { getCartData } from "./cartSlice";
import { useEffect } from "react";

const CartProductsPage = () => {
  const cartProductsAll = useAppSelector((state) => state.cartProducts);
  const cartProducts = cartProductsAll.data;
  const isLoading = cartProductsAll.loading;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  return (
    <>
      {cartProducts.length === 0 ? (
        <div className="empty-product">
          <h1>No Products in the cart</h1>
        </div>
      ) : isLoading ? (
        <Loading />
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
