import { DataState } from "./productsSlice";
import { useState } from "react";
import PopupCard from "./PopupCard";
import image from "/no_image.jpg";

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
        </div>

        <div className="card__description">
          <div className="card__name ">
            <p>{product.productName}</p>
          </div>

          <p className="card__price">Rs.{product.productPrice}</p>
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
