import { useDispatch } from "react-redux";
import { addProduct } from "./productsSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

export function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [imgFile, setImgFile] = useState<File>();
  const [productPrice, setProductPrice] = useState("");
  const [productAvailable, setProductAvailable] = useState("");
  const [imgShow, setImgShow] = useState("");

  const [disableButton, setDisableButton] = useState(false);

  const productImgId = uuidv4();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        setImgFile(e.target.files[0]);
        setImgShow(URL.createObjectURL(e.target.files[0]));
      }
    }
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
      setDisableButton(true);

      uploadBytes(ref(storage, `/images/${productImgId}`), imgFile).then(() => {
        getDownloadURL(ref(storage, `/images/${productImgId}`)).then((url) =>
          dispatch(
            addProduct({
              imgUrl: url,
              productImgId,
              productName,
              productCategory,
              productPrice,
              productAvailable,
            })
          ).then(() => navigate("/"))
        );
      });
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
          <div className="category__label">
            <label htmlFor="productCategory">Category:</label>
          </div>

          <select
            id="productCategory"
            name="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value=""></option>
            <option value="Mobile">Mobile</option>
            <option value="Audio">Audio</option>
            <option value="Wearable">Wearable</option>
            <option value="Computer">Computer</option>
            <option value="Camera">Camera</option>
          </select>
        </div>

        <div className="form__element">
          <label htmlFor="productImage" className="custom-file-upload">
            Image:
            <div className=" form__image--show">
              {imgShow ? <img src={imgShow} /> : ""}
            </div>
          </label>

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageFile}
            id="productImage"
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
          <button type="submit" disabled={disableButton}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
