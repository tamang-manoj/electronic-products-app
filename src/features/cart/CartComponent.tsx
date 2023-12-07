import "./CartComponent.css";

import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "./cartSlice";
import { updateProductCount } from "./cartSlice";
import { useAppSelector } from "../../app/hooks";

const CartComponent = ({ cartProduct }: any) => {
  const dispatch = useDispatch();

  const products = useAppSelector((state) => state.products.data);
  const selectedProductsInfo = products.find(
    (product) => product.productImgId === cartProduct.productImgId
  );
  const productAvailable = Number(selectedProductsInfo?.productAvailable);

  const handleIncrement = () => {
    dispatch(
      updateProductCount({
        productAlreadyInCart: cartProduct,
        newCount: 1,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(
      updateProductCount({
        productAlreadyInCart: cartProduct,
        newCount: -1,
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
          <button
            className="popup__card--countButton"
            onClick={handleDecrement}
            disabled={cartProduct.count === 1}
          >
            -
          </button>

          <span> {cartProduct.count} </span>
          <button
            className="popup__card--countButton"
            onClick={handleIncrement}
            disabled={cartProduct.count === productAvailable}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
