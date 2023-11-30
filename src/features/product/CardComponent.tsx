import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { deleteProduct } from "./productsSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { addToCart, deleteFromCart } from "../cart/cartSlice";

export interface ProductState {
  id?: any;
  productImgId: string;
  productName: string;
  productCategory: string;
  imgUrl: string;
  productPrice: string;
  productAvailable: string;
}

// interface Props {
//   product: ProductState;
//   role: string;
// }

const CardComponent = ({ product }: any) => {
  const characters = useAppSelector((state) => state.characters);
  const charArray = characters.charArray;
  const loggedIn = characters.loggedIn;
  const loggedInRole = characters.loggedInRole;

  const cartProducts = useAppSelector((state) => state.cartProducts.data);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProductDelete = (product: any) => {
    dispatch(deleteProduct(product.id));

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

  const handleAddToCart = (productToAdd: any) => {
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
    <div className="product-card">
      <div className="image-container">
        <img src={product.imgUrl} />
      </div>

      <div className="card__description">
        <h5>{product.productName}</h5>
        <p>Category: {product.productCategory}</p>
        <p>Available: {product.productAvailable}</p>
        <h5>Price: Rs. {product.productPrice}</h5>
      </div>

      <div>
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
      </div>
    </div>
  );
};

export default CardComponent;
