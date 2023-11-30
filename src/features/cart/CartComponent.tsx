import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "./cartSlice";

const CartComponent = ({ cartProduct }: any) => {
  const dispatch = useDispatch();

  const deleteCartItem = async (cartProduct: any) => {
    // console.log(cartProduct);
    dispatch(deleteFromCart(cartProduct.cartItemId));
  };

  return (
    <>
      <div className="cartProductCard">
        <div className="cartImage__container">
          <img src={`${cartProduct.imgUrl}`} alt="cartProduct-image" />
        </div>
        <div>{cartProduct.productName}</div>
        <div>{cartProduct.productCategory}</div>
        <div>Rs. {cartProduct.productPrice}</div>
        <div>{cartProduct.productAvailable}</div>

        <div onClick={() => deleteCartItem(cartProduct)}>
          <MdOutlineDelete className="cartIcon--delete" />
        </div>
      </div>
    </>
  );
};

export default CartComponent;
