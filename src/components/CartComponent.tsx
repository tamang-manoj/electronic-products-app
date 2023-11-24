interface CardProductState {
  id: any;
  productName: string;
  productCategory: string;
  imgFile: string;
  productPrice: string;
  productAvailable: string;
}

interface Prop {
  cartProduct: CardProductState;
}

const CartComponent = ({ cartProduct }: Prop) => {
  // console.log(cartProduct);
  return (
    <>
      <div className="cartProductCard">
        <div className="cartImage-container">
          <img src={`${cartProduct.imgFile}`} alt="product_image" />
        </div>
        <div>{cartProduct.productName}</div>
        <div>{cartProduct.productPrice}</div>
      </div>
    </>
  );
};

export default CartComponent;
