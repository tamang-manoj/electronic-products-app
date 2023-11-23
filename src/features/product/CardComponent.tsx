import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useAppDispatch } from "../../app/hooks";
import { deleteProduct } from "./productsSlice";

// interface Props {
//   productName: string;
//   productCategory: string;
//   productPrice: string;
//   productAvailable: string;
// }

const CardComponent = ({ product }: any) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct({ id: product.id }));
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.imgFile} />
      </div>

      <div className="description">
        <h3>{product.productName}</h3>
        <h5>Category: {product.productCategory}</h5>
        <h5>Price: {product.productPrice}</h5>
        <h5>Available: {product.productAvailable}</h5>
      </div>

      <div>
        <Link to={`/products/edit/${product.id}`}>
          <FaRegEdit className="icon edit" />
        </Link>

        <MdOutlineDelete className="icon delete" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default CardComponent;
