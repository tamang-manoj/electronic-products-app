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
import ConfirmDeleteModal from "./ConfirmDeletePopup";
import image from "/no_image.jpg";
import Loading from "../cart/Loading";

const PopupCard = ({
  open,
  handleCardClose,
  product,
}: {
  open: boolean;
  handleCardClose: () => void;
  product: DataState;
}) => {
  const [count, setCount] = useState(1);

  const [deleteModal, setDeleteModal] = useState(false);

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector((state) => state.characters.status);

  const cartProductsAll = useAppSelector((state) => state?.cartProducts);
  const cartProducts = cartProductsAll.data;
  const isLoading = cartProductsAll.loading;

  const handleProductDelete = (product: DataState) => {
    if (product.id) {
      dispatch(deleteProduct(product.id));
    }
    navigate("/");

    const isItemInCart = cartProducts.find(
      (cartProduct) => cartProduct.productImgId === product.productImgId
    );
    if (isItemInCart) {
      dispatch(deleteFromCart(isItemInCart.cartItemId as string));
    }

    if (product.imgUrl) {
      // console.log(product.imgUrl);

      const deleteRef = ref(storage, `/images/${product.productImgId}`);
      deleteObject(deleteRef);
      // .then(() => {
      //   console.log("image deleted from storage");
      // })
      // .catch((error) => {
      //   console.log(error.message);
      // });
    }
  };

  const handleAddToCart = (productToAdd: CartState) => {
    handleCardClose();

    if (status.isLoggedIn && status.role === "user") {
      const productAlreadyInCart = cartProducts.find(
        (cartProduct) => cartProduct.productId === productToAdd.productId
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
      <div className="popup__wrapper" onClick={() => handleCardClose()}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="popup__card" onClick={(e) => e.stopPropagation()}>
            <div className="popup__elements">
              <div>
                {product.imgUrl ? (
                  <img src={product.imgUrl} />
                ) : (
                  <img src={image} alt="no image" />
                )}
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
                    {status.role === "admin" && status.isLoggedIn ? (
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
                        >
                          <MdOutlineDelete />
                        </div>
                      </div>
                    ) : status.role === "user" && status.isLoggedIn ? (
                      <div className="popup__card--footer">
                        <div>
                          Quantity{" "}
                          <button
                            className="popup__card--countButton"
                            onClick={() => setCount((count) => count - 1)}
                            disabled={
                              count <= 1 ||
                              product.productAvailable === "outOfStock"
                            }
                          >
                            -
                          </button>
                          <span
                            style={{
                              cursor:
                                product.productAvailable === "outOfStock"
                                  ? "not-allowed"
                                  : "",
                            }}
                          >
                            {count}
                          </span>
                          <button
                            className="popup__card--countButton"
                            onClick={() => setCount((count) => count + 1)}
                            disabled={
                              count === 5 ||
                              product.productAvailable === "outOfStock"
                            }
                          >
                            +
                          </button>
                        </div>

                        {product.productAvailable === "inStock" ? (
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
                                productId: product.id,
                              })
                            }
                          >
                            <BsCart3 />
                          </div>
                        ) : (
                          <p style={{ color: "red" }}>Out of stock</p>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button className="popup__closer" onClick={handleCardClose}>
              X
            </button>
          </div>
        )}

        {deleteModal && (
          <ConfirmDeleteModal
            product={product}
            closeDeleteModal={closeDeleteModal}
            handleProductDelete={handleProductDelete}
          />
        )}
      </div>
    </>
  );
};

export default PopupCard;
