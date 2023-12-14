import "./CartComponent.css";
import { MdOutlineDelete } from "react-icons/md";
import { CartState, deleteFromCart, updateDeletedProduct } from "./cartSlice";
import { updateProductCount } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import image from "/no_image.jpg";
import { useState } from "react";

const CartComponent = ({ cartProduct }: { cartProduct: CartState }) => {
  const dispatch = useAppDispatch();

  const [deleteModal, setDeleteModal] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

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

  const deleteCartItem = async (cartProduct: CartState) => {
    dispatch(deleteFromCart(cartProduct.cartItemId as string));
    dispatch(updateDeletedProduct(cartProduct.cartItemId));
  };

  return (
    <>
      <div className="cart__product--card">
        <div className="cartImage__container">
          {cartProduct.imgUrl ? (
            <img src={`${cartProduct.imgUrl}`} />
          ) : (
            <img src={image} alt="no image" />
          )}

          {cartProduct.productAvailable === "outOfStock" && (
            <p className="outOfStock">Not Available</p>
          )}
        </div>

        <div className="info__section">
          <div className="cart__card--name" title={cartProduct.productName}>
            {cartProduct.productName}
          </div>
          <div className="cart__card--category">
            {cartProduct.productCategory}
          </div>
          <div className="cart__card--available">
            {cartProduct.productAvailable} item
          </div>
        </div>

        <div className="cart__card--price">Rs. {cartProduct.productPrice}</div>

        <div>
          <MdOutlineDelete
            className="cart__card--deleteIcon"
            onClick={() => setDeleteModal(true)}
          />
        </div>

        {cartProduct.productAvailable === "inStock" && (
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
        )}
      </div>

      {deleteModal && (
        <div className="popup__wrapper" onClick={() => closeDeleteModal()}>
          <div
            className="deletePopup__card"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Are you sure you want to delete this item?</p>
            <div className="deletePopup__buttons--container">
              <button onClick={closeDeleteModal}>Cancel</button>
              <button onClick={() => deleteCartItem(cartProduct)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartComponent;
