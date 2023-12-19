import { useDispatch } from "react-redux";
import { addProduct } from "./productsSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import Loading from "../cart/Loading";
import { IoMdCloudUpload } from "react-icons/io";
import useFormData from "./cusomHooks/useFormData";
import useImageData from "./cusomHooks/useImageData";

export interface ErrorType {
  name?: string;
  category?: string;
  price?: string;
  available?: string;
}

export function AddProduct() {
  const [loadingOnAdd, setLoadingOnAdd] = useState(false);

  const [disableButton, setDisableButton] = useState(false);

  const { imgFile, imgShow, handleCancelImage, handleImageFile } = useImageData(
    { initialImgShow: "" }
  );

  const { formData, errors, checkErrors, handleChange } = useFormData({
    productName: "",
    productCategory: "",
    productPrice: "",
    productAvailable: "",
    productDescription: "",
  });

  // console.log(formData);

  const productImgId = uuidv4();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.productName &&
      formData.productCategory &&
      formData.productPrice &&
      formData.productAvailable
    ) {
      setLoadingOnAdd(true);

      setDisableButton(true);

      if (imgFile) {
        setLoadingOnAdd(true);
        uploadBytes(ref(storage, `/images/${productImgId}`), imgFile).then(
          () => {
            getDownloadURL(ref(storage, `/images/${productImgId}`)).then(
              (url) =>
                dispatch(
                  addProduct({
                    imgUrl: url,
                    productImgId,
                    productName: formData.productName,
                    productCategory: formData.productCategory,
                    productPrice: formData.productPrice.replace(/^0+/, ""),
                    productAvailable: formData.productAvailable,
                    productDescription: formData.productDescription,
                  })
                ).then(() => {
                  setLoadingOnAdd(false);
                  navigate("/");
                })
            );
          }
        );
        // setLoadingOnAdd(false);
      } else {
        setLoadingOnAdd(true);
        dispatch(
          addProduct({
            imgUrl: "",
            productImgId,
            productName: formData.productName,
            productCategory: formData.productCategory,
            productPrice: formData.productPrice.replace(/^0+/, ""),
            productAvailable: formData.productAvailable,
            productDescription: formData.productDescription,
          })
        ).then(() => {
          setLoadingOnAdd(false);
          navigate("/");
        });
      }
    }
    // setLoadingOnAdd(false);
    setDisableButton(false);
  };

  return (
    <>
      {loadingOnAdd ? (
        <Loading />
      ) : (
        <div className="form__container">
          <h2>Add Product</h2>

          <form id="submitProduct" onSubmit={handleSubmitProduct}>
            <div className="form__element">
              <label>Name: </label>
              <input
                className="form__element--input"
                type="text"
                value={formData.productName}
                name="productName"
                onChange={handleChange}
                maxLength={130}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div className="form__element">
              <div className="category__label">
                <label>Category:</label>
              </div>

              <select
                id="productCategory"
                value={formData.productCategory}
                name="productCategory"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Mobile">Mobile</option>
                <option value="Audio">Audio</option>
                <option value="Wearable">Wearable</option>
                <option value="Computer">Computer</option>
                <option value="Camera">Camera</option>
              </select>
              {errors.category && (
                <p style={{ color: "red" }}>{errors.category}</p>
              )}
            </div>

            <div className="form__element">
              <p>Upload Image:</p>
              <label htmlFor="productImage" className="custom-file-upload">
                <input
                  id="productImage"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageFile}
                />

                {!imgShow && (
                  <div className="form__image--show">
                    <span>
                      <IoMdCloudUpload className="imageUploadIcon" />
                    </span>
                  </div>
                )}
              </label>
              {imgShow && (
                <div className="form__image--show">
                  <img src={imgShow} />
                  <span className="cancelImage" onClick={handleCancelImage}>
                    X
                  </span>
                </div>
              )}
            </div>

            <div className="form__element">
              <label>Price: </label>
              <input
                className="form__element--input"
                type="number"
                value={formData.productPrice}
                name="productPrice"
                onChange={handleChange}
              />
              {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            </div>

            <div className="form__element">
              <label>Availablility: </label>
              <select
                className="form__element--input"
                value={formData.productAvailable}
                name="productAvailable"
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>

              {errors.available && (
                <p style={{ color: "red" }}>{errors.available}</p>
              )}
            </div>

            <div className="form__element">
              <label>Description: </label>
              <textarea
                className="form__element--description"
                value={formData.productDescription}
                name="productDescription"
                onChange={handleChange}
                maxLength={830}
              />
            </div>

            <div className="form__element form__buttons">
              <button type="reset" onClick={() => navigate(-1)}>
                Cancel
              </button>

              <button
                type="submit"
                disabled={disableButton}
                onClick={checkErrors}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}{" "}
    </>
  );
}
