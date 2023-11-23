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
    <div>
      <h1>Add Product</h1>

      <form id="submitProduct" onSubmit={handleSubmitProduct}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <select
          name="productCategory"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Mobile Accessories">Mobile Accessories</option>
          <option value="Audio">Audio</option>
          <option value="Wearable">Wearable</option>
          <option value="Computer Accessories">Computer Accessories</option>
          <option value="Camera Accessories">Camera Accessories</option>
        </select>

        <div>
          <label htmlFor="productImage">Product Image</label>
          <input type="file" onChange={handleImageFile} />
        </div>

        <label htmlFor="productPrice">Product Price</label>
        <input
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />

        <label htmlFor="productAvailable">Product Available</label>
        <input
          type="text"
          value={productAvailable}
          onChange={(e) => setProductAvailable(e.target.value)}
        />

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
