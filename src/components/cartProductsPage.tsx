import { useAppSelector } from "../app/hooks";
import CartComponent from "../components/CartComponent";

const CartProductsPage = () => {
  const cartProducts = useAppSelector((state) => state.cartProducts);
  // console.log(cartProducts);

  return (
    <>
      {cartProducts.length !== 0 ? (
        <div className="cartProduct-container">
          {cartProducts.map((cartProduct) => (
            <CartComponent key={cartProduct.id} cartProduct={cartProduct} />
          ))}
        </div>
      ) : (
        <div className="empty-cart">
          <h1>No Products in the cart</h1>
        </div>
      )}
    </>
  );
};

export default CartProductsPage;
