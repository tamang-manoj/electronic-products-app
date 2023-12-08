import "./PopupCard.css";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DataState, deleteProduct } from "./productsSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";
import {
  CartState,
  addToCart,
  deleteFromCart,
  updateProductCount,
} from "../cart/cartSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const PopupCard = ({
  open,
  handleCardClose,
  product,
}: {
  open: boolean;
  handleCardClose: () => void;
  product: any;
}) => {
  const [count, setCount] = useState(1);

  const [deleteModal, setDeleteModal] = useState(false);
  // const showDeleteModal = () => {
  //   setDeleteModal(true);
  // };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const characters = useAppSelector((state) => state.characters);
  // const loggedIn = characters.loggedIn;
  // const loggedInRole = characters.loggedInRole;

  const value = localStorage.getItem("persist_login");
  let persistedLog: any;
  if (value) {
    persistedLog = JSON.parse(value);
  }
  // console.log(persistedLog);

  const cartProducts = useAppSelector((state) => state?.cartProducts.data);

  const handleProductDelete = (product: DataState) => {
    if (product.id) {
      dispatch(deleteProduct(product.id));
    }
    navigate("/");

    const isItemInCart = cartProducts.find(
      (cartProduct) => cartProduct.productImgId === product.productImgId
    );
    if (isItemInCart) {
      dispatch(deleteFromCart(isItemInCart.cartItemId));
    }
    const deleteRef = ref(storage, `/images/${product.productImgId}`);
    deleteObject(deleteRef)
      .then(() => {
        // console.log("image deleted from storage");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAddToCart = (productToAdd: CartState) => {
    if (persistedLog.loggedIn && persistedLog.loggedInRole === "user") {
      const productAlreadyInCart = cartProducts.find(
        (cartProduct) => cartProduct.productImgId === productToAdd.productImgId
      );

      if (productAlreadyInCart) {
        dispatch(
          updateProductCount({
            productAlreadyInCart,
            newCount: count,
          })
        );
        alert("Product already in cart. Incrementing product count.");
      } else {
        dispatch(addToCart(productToAdd));
        alert("Product added to cart.");
      }
      setCount(1);
    } else {
      navigate("/login");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="popup__wrapper">
        <div className="popup__card">
          <div className="popup__elements">
            <div>
              <img
                src={product.imgUrl}
                alt="No Image Available"
                className="popup__card--img"
              />
            </div>

            <div className="popup__card--info">
              <p className="popup__heading">{product.productName}</p>
              <p className="popup__category">
                Category: {product.productCategory}
              </p>

              <hr />

              <div className="popup__description">
                Description: {product.productDescription}
              </div>

              <hr />

              <h1 className="popup__price">Rs. {product.productPrice}</h1>

              <div className="countAndIconSection">
                <div>
                  {persistedLog.loggedInRole === "user" ? (
                    <div className="popup__card--footer">
                      <div>
                        Quantity{" "}
                        <button
                          className="popup__card--countButton"
                          onClick={() => setCount((count) => count - 1)}
                          disabled={count <= 1}
                        >
                          -
                        </button>
                        <span>{count}</span>
                        <button
                          className="popup__card--countButton"
                          onClick={() => setCount((count) => count + 1)}
                          // disabled={count === 5}
                        >
                          +
                        </button>
                      </div>

                      <div
                        className="popup__card--cartIcon"
                        onClick={() =>
                          handleAddToCart({
                            imgUrl: product.imgUrl,
                            productName: product.productName,
                            productCategory: product.productCategory,
                            productAvailable: product.productAvailable,
                            productPrice: product.productPrice,
                            productImgId: product.productImgId,
                            count: count,
                          })
                        }
                      >
                        <BsCart3 />
                      </div>
                    </div>
                  ) : (
                    <div className="popup__card--footer">
                      <div
                        className="popup__card--cartIcon"
                        onClick={handleEdit}
                      >
                        <FaRegEdit />
                      </div>

                      <div
                        className="popup__card--cartIcon"
                        onClick={() => {
                          setDeleteModal(true);
                        }}
                        // onClick={() => handleProductDelete(product)}
                      >
                        <MdOutlineDelete />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button className="popup__closer" onClick={handleCardClose}>
            X
          </button>
        </div>
        {deleteModal && (
          <ConfirmDeleteModal
            product={product}
            closeDeleteModal={closeDeleteModal}
            handleProductDelete={handleProductDelete}
          />
        )}
      </div>
      <div></div>
    </>
  );
};

export default PopupCard;
