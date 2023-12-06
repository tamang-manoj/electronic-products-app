import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { DataState, deleteProduct } from "./productsSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { addToCart, deleteFromCart } from "../cart/cartSlice";
import { useState } from "react";
import PopupCard from "./PopupCard";

type ProductProp = {
  product: DataState;
};

const CardComponent = ({ product }: ProductProp) => {
  const [open, setOpen] = useState(false);
  const handleCardOpen = () => {
    setOpen(true);
  };
  const handleCardClose = () => {
    setOpen(false);
  };

  const characters = useAppSelector((state) => state.characters);
  const loggedIn = characters.loggedIn;
  const loggedInRole = characters.loggedInRole;

  const cartProducts = useAppSelector((state) => state.cartProducts.data);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProductDelete = (product: DataState) => {
    if (product.id) dispatch(deleteProduct(product.id));

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

  const handleAddToCart = (productToAdd: DataState) => {
    const productAlreadyInCart = cartProducts.find(
      (cartProduct) => cartProduct.productImgId === productToAdd.productImgId
    );
    // console.log(productAlreadyInCart);

    if (loggedIn) {
      if (productAlreadyInCart) {
        alert("Product is already in the cart!");
      } else {
        dispatch(addToCart(productToAdd));
        alert("Product added to cart.");
      }
    } else {
      navigate("/login");
    }
  };

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };

  return (
    <>
      <div className="card" onClick={handleCardOpen}>
        {open}

        <div className="image-container">
          <img src={product.imgUrl} />
        </div>

        <div className="card__description">
          <h5>{product.productName}</h5>
          <h5>Price: Rs. {product.productPrice}</h5>
        </div>

        {/* <div>
          {loggedInRole === "user" ? (
            <div
              className="card__icon"
              onClick={() =>
                handleAddToCart({
                  imgUrl: product.imgUrl,
                  productName: product.productName,
                  productCategory: product.productCategory,
                  productAvailable: product.productAvailable,
                  productPrice: product.productPrice,
                  productImgId: product.productImgId,
                })
              }
            >
              <BsCart3 />
            </div>
          ) : (
            <>
              <div className="card__icon" onClick={handleEdit}>
                <FaRegEdit />
              </div>
              <div
                className="card__icon"
                onClick={() => handleProductDelete(product)}
              >
                <MdOutlineDelete />
              </div>
            </>
          )}
        </div> */}
      </div>

      {/* Modal Popup */}
      <PopupCard open={open} handleCardClose={handleCardClose}>
        <div className="popup__elements">
          <div>
            <img src={product.imgUrl} className="popup__card--img" />
          </div>

          <div className="popup__card--description">
            <h3 className="popup__heading">{product.productName}</h3>
            <p className="popup__category">
              Category: {product.productCategory}
            </p>
            <hr />
            <h1 className="popup__price">Rs. {product.productPrice}</h1>

            <div className="countAndIconSection">
              <div>
                {loggedInRole === "user" ? (
                  <div className="popup__card--footer">
                    <div>
                      Quantity{" "}
                      <button className="popup__card--countButton">-</button>
                      <span>{"56"}</span>
                      <button className="popup__card--countButton">+</button>
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
                        })
                      }
                    >
                      <BsCart3 />
                    </div>
                  </div>
                ) : (
                  <div className="popup__card--footer">
                    <div className="popup__card--cartIcon" onClick={handleEdit}>
                      <FaRegEdit />
                    </div>

                    <div
                      className="popup__card--cartIcon"
                      onClick={() => handleProductDelete(product)}
                    >
                      <MdOutlineDelete />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PopupCard>
    </>
  );
};

export default CardComponent;
