import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../role/cartSlice";
import { deleteProduct } from "./productsSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";

export interface ProductState {
  id?: any;
  productName: string;
  productCategory: string;
  imgUrl: string;
  productPrice: string;
  productAvailable: string;
}

interface Props {
  product: ProductState;
  role: string;
}

const CardComponent = ({ product, role }: Props) => {
  const roleStatus = useAppSelector((state) => state.roleStatus);
  const cartProducts = useAppSelector((state) => state.cartProducts);
  const isLoggeIn = roleStatus.loggedIn;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (product: any) => {
    dispatch(deleteProduct(product.id));
    // dispatch(deleteImg(id, productName));

    const deleteRef = ref(storage, `/images/${product.productId}`);
    deleteObject(deleteRef)
      .then(() => {
        // console.log("image deleted from storage");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAddToCart = () => {
    // console.log("added to cart");
    const already = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );

    !isLoggeIn
      ? navigate("/login")
      : !already
      ? dispatch(addToCart(product))
      : alert("Product already in the cart!");
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
        {role === "user" ? (
          <div className="card__icon" onClick={handleAddToCart}>
            <BsCart3 />
          </div>
        ) : (
          <>
            <div className="card__icon" onClick={handleEdit}>
              <FaRegEdit />
            </div>
            <div className="card__icon" onClick={() => handleDelete(product)}>
              <MdOutlineDelete />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
