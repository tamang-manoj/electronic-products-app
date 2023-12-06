import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "./cartSlice";
import { updateProductCount } from "./cartSlice";
import { useAppSelector } from "../../app/hooks";
import Loading from "./Loading";

const CartComponent = ({ cartProduct }: any) => {
  const dispatch = useDispatch();

  // products from main products
  const products = useAppSelector((state) => state.products.data);
  const selectedProductsInfo = products.find(
    (product) => product.productImgId === cartProduct.productImgId
  );
  const productAvailable = Number(selectedProductsInfo?.productAvailable);

  // FROM CART PRODUCTS

  const cartProducts = useAppSelector((state) => state.cartProducts);
  const isLoading = cartProducts.loading;

  const handleIncrement = () => {
    dispatch(
      updateProductCount({
        cartItemId: cartProduct.cartItemId,
        newCount: cartProduct.count + 1,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(
      updateProductCount({
        cartItemId: cartProduct.cartItemId,
        newCount: cartProduct.count - 1,
      })
    );
  };

  const deleteCartItem = async (cartProduct: any) => {
    // console.log(cartProduct);
    dispatch(deleteFromCart(cartProduct.cartItemId));
  };

  return (
    <>
      <div className="cart__product--card">
        <div className="cartImage__container">
          <img src={`${cartProduct.imgUrl}`} alt="cartProduct-image" />
        </div>

        <div className="info__section">
          <div className="cart__card--name">{cartProduct.productName}</div>
          <div className="cart__card--category">
            {cartProduct.productCategory}
          </div>
          <div className="cart__card--available">
            {cartProduct.productAvailable} item(s) left
          </div>
        </div>

        <div className="cart__card--priceAndDelete">
          <div className="cart__card--price">
            Rs. {cartProduct.productPrice}
          </div>

          <MdOutlineDelete
            className="cart__card--deleteIcon"
            onClick={() => deleteCartItem(cartProduct)}
          />
        </div>

        <div className="cart__card--changeCount">
          <span>
            <button
              className="decrement"
              onClick={handleDecrement}
              disabled={cartProduct.count === 1}
            >
              -
            </button>
          </span>

          <span> {isLoading ? <Loading /> : cartProduct.count} </span>

          <span>
            <button
              className="increment"
              onClick={handleIncrement}
              disabled={cartProduct.count === productAvailable}
            >
              +
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
