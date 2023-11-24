import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useAppDispatch } from "../../app/hooks";
import { deleteProduct } from "./productsSlice";
import { addToCart } from "../role/cartSlice";

export interface ProductState {
  id?: any;
  productName: string;
  productCategory: string;
  imgFile: string;
  productPrice: string;
  productAvailable: string;
}

interface Props {
  product: ProductState;
  role: string;
}

const CardComponent = ({ product, role }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteProduct({ id: product.id }));
  };

  const handleAddToCart = () => {
    // console.log("added to cart");
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.imgFile} />
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
            <div className="card__icon" onClick={handleDelete}>
              <MdOutlineDelete />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
