import { useDispatch } from "react-redux";
import { addProduct } from "./productsSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

export function AddProduct() {
  const [productName, setProductName] = useState(
    "Apple iPhone 11 - 128 GB - Oliz Store"
  );
  const [productCategory, setProductCategory] = useState("Mobile");
  const [imgFile, setImgFile] = useState(null);
  const [productPrice, setProductPrice] = useState("85500");
  const [productAvailable, setProductAvailable] = useState("53");

  const productId = uuidv4();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleImageFile = (e: any) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      productName &&
      productCategory &&
      imgFile &&
      productPrice &&
      productAvailable
    ) {
      uploadBytes(ref(storage, `/images/${productId}`), imgFile).then(() => {
        getDownloadURL(ref(storage, `/images/${productId}`)).then((url) =>
          dispatch(
            addProduct({
              imgUrl: url,
              productId,
              productName,
              productCategory,
              productPrice,
              productAvailable,
            })
          )
        );
      });
      navigate("/");
    }
  };

  return (
    <div className="form__container">
      <h2>Add Product</h2>

      <form id="submitProduct" onSubmit={handleSubmitProduct}>
        <div className="form__element">
          <label htmlFor="productName">Name: </label>
          <input
            className="form__element--input"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form__element">
          <label htmlFor="productCategory">Category: </label>
          <select
            name="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Mobile">Mobile Accessories</option>
            <option value="Audio">Audio</option>
            <option value="Wearable">Wearable</option>
            <option value="Computer">Computer Accessories</option>
            <option value="Camera">Camera Accessories</option>
          </select>
        </div>

        <div className="form__element">
          <label htmlFor="productImage">Image: </label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleImageFile}
          />
        </div>

        <div className="form__element">
          <label htmlFor="productPrice">Price: </label>
          <input
            className="form__element--input"
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div className="form__element">
          <label htmlFor="productAvailable">Available: </label>
          <input
            className="form__element--input"
            type="text"
            value={productAvailable}
            onChange={(e) => setProductAvailable(e.target.value)}
          />
        </div>

        <div className="form__element">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
