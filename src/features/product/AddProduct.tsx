import { useDispatch } from "react-redux";
import { addProduct } from "./productsSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAvailable, setProductAvailable] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleImageFile = (e: any) => {
    e.preventDefault();
    // console.log(e.target.files);
    setImgFile(URL.createObjectURL(e.target.files?.[0]));
  };

  const handleSubmitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      productName &&
      productCategory &&
      imgFile &&
      productPrice &&
      productAvailable
    ) {
      // console.log("submitted");
      dispatch(
        addProduct({
          id: uuidv4(),
          productName,
          productCategory,
          imgFile,
          productPrice,
          productAvailable,
        })
      );
      setProductName("");
      setProductCategory("");
      setImgFile("");
      setProductPrice("");
      setProductAvailable("");
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
          <input type="file" onChange={handleImageFile} />
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
