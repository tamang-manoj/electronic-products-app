import { useAppSelector } from "../../app/hooks";
import CartComponent from "./CartComponent";
import Loading from "./Loading";

const CartProductsPage = () => {
  const cartProductsAll = useAppSelector((state) => state.cartProducts);
  const cartProducts = cartProductsAll.data;
  const isLoading = cartProductsAll.loading;

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
