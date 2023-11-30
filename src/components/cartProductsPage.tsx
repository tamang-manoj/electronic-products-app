import { useAppSelector } from "../app/hooks";
import CartComponent from "../components/CartComponent";

const CartProductsPage = () => {
  const cartProducts = useAppSelector((state) => state.cartProducts.data);
  // console.log(cartProducts);

  return (
    <>
      {cartProducts.length === 0 ? (
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
