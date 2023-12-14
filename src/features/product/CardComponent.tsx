import { DataState } from "./productsSlice";
import { useState } from "react";
import PopupCard from "./PopupCard";
import image from "/no_image.jpg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CartState, addToCart, updateProductCount } from "../cart/cartSlice";

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

  const status = useAppSelector((state) => state.characters.status);
  const dispatch = useAppDispatch();

  const cartProducts = useAppSelector((state) => state.cartProducts.data);

  const handleAddToCartFromCard = (productToAdd: CartState) => {
    if (
      // status.isLoggedIn && status.role === "user" &&
      productToAdd.productAvailable === "inStock"
    ) {
      const productAlreadyInCart = cartProducts.find(
        (cartProduct) => cartProduct.productId === productToAdd.productId
      );

      if (productAlreadyInCart) {
        dispatch(
          updateProductCount({
            productAlreadyInCart,
            newCount: 1,
          })
        );
        alert("Product already in cart. Incrementing product count.");
      } else {
        dispatch(addToCart(productToAdd));
        alert("Product added to cart.");
      }
    }
  };

  return (
    <>
      <div
        className="card "
        onClick={handleCardOpen}
        title={product.productName}
      >
        <div className="image-container">
          {product.imgUrl ? (
            <img src={product.imgUrl} />
          ) : (
            <img src={image} alt="no image" />
          )}

          {product.productAvailable === "outOfStock" && (
            <p className="outOfStock">Out of Stock</p>
          )}
        </div>

        <div className="card__info">
          <div className="card__name ">
            <p>{product.productName}</p>
          </div>

          <p className="card__price">Rs.{product.productPrice}</p>
        </div>

        <div>
          {status.role === "user" && status.isLoggedIn && (
            <button
              disabled={product.productAvailable === "outOfStock"}
              className="cardButton"
              onClick={(e) => {
                handleAddToCartFromCard({
                  imgUrl: product.imgUrl,
                  productName: product.productName,
                  productCategory: product.productCategory,
                  productAvailable: product.productAvailable,
                  productPrice: product.productPrice,
                  productImgId: product.productImgId,
                  count: 1,
                  productId: product.id,
                });
                e.stopPropagation();
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <PopupCard
        product={product}
        open={open}
        handleCardClose={handleCardClose}
      />
    </>
  );
};

export default CardComponent;
