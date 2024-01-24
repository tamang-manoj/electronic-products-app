import { DataState, editProduct } from "./productsSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../firebase";
import Loading from "../cart/Loading";
import { v4 as uuidv4 } from "uuid";
import { IoMdCloudUpload } from "react-icons/io";
import useFormData from "./cusomHooks/useFormData";
import useImageData from "./cusomHooks/useImageData";

export function EditProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { idInParam } = useParams();

  const product = useAppSelector((state) => {
    return state.products.data.find(
      (product) => product.id === idInParam
    ) as DataState;
  });

  const prevId = product?.id;
  const prevProductImgId = product?.productImgId;

  const { formData, errors, checkErrors, handleChange } = useFormData({
    productName: product?.productName,
    productCategory: product?.productCategory,
    productPrice: product?.productPrice,
    productAvailable: product?.productAvailable,
    productDescription: product?.productDescription,
  });

  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const newProductImgId = uuidv4();

  const prevImgUrl = product?.imgUrl;
  const { imgFile, imgShow, handleCancelImage, handleImageFile } = useImageData(
    { initialImgShow: prevImgUrl as string }
  );

  const handleSubmitEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.productName &&
      formData.productCategory &&
      formData.productPrice &&
      formData.productAvailable
    ) {
      setDisableButton(true);
      setIsLoading(true);

      if (imgFile) {
        // deleting image first
        if (prevImgUrl) {
          const deleteRef = ref(storage, `/images/${prevProductImgId}`);
          deleteObject(deleteRef);
          // uploading new image and then downloading new image
          uploadBytes(ref(storage, `/images/${newProductImgId}`), imgFile).then(
            () => {
              getDownloadURL(ref(storage, `/images/${newProductImgId}`)).then(
                (url) =>
                  dispatch(
                    editProduct({
                      id: prevId,
                      productImgId: newProductImgId,
                      productName: formData.productName.trim(),
                      productCategory: formData.productCategory,
                      imgUrl: url,
                      productPrice: formData.productPrice,
                      productAvailable: formData.productAvailable,
                      productDescription: formData.productDescription.trim(),
                    })
                  ).then(() => navigate("/"))
              );
            }
          );
        } else {
          uploadBytes(ref(storage, `/images/${newProductImgId}`), imgFile).then(
            () => {
              getDownloadURL(ref(storage, `/images/${newProductImgId}`)).then(
                (url) =>
                  dispatch(
                    editProduct({
                      id: prevId,
                      productImgId: newProductImgId,
                      productName: formData.productName.trim(),
                      productCategory: formData.productCategory,
                      imgUrl: url,
                      productPrice: formData.productPrice,
                      productAvailable: formData.productAvailable,
                      productDescription: formData.productDescription.trim(),
                    })
                  ).then(() => navigate("/"))
              );
            }
          );
        }
      } else if (!imgFile) {
        if (prevImgUrl && imgShow) {
          dispatch(
            editProduct({
              id: prevId,
              productImgId: prevProductImgId,
              productName: formData.productName.trim(),
              productCategory: formData.productCategory,
              imgUrl: prevImgUrl,
              productPrice: formData.productPrice,
              productAvailable: formData.productAvailable,
              productDescription: formData.productDescription.trim(),
            })
          ).then(() => navigate("/"));
        }
        if (prevImgUrl && !imgShow) {
          const deleteRef = ref(storage, `/images/${prevProductImgId}`);
          deleteObject(deleteRef);

          dispatch(
            editProduct({
              id: prevId,
              productImgId: "",
              productName: formData.productName.trim(),
              productCategory: formData.productCategory,
              imgUrl: "",
              productPrice: formData.productPrice,
              productAvailable: formData.productAvailable,
              productDescription: formData.productDescription.trim(),
            })
          ).then(() => navigate("/"));
        } else if (!prevImgUrl) {
          dispatch(
            editProduct({
              id: prevId,
              productImgId: "",
              productName: formData.productName.trim(),
              productCategory: formData.productCategory,
              imgUrl: "",
              productPrice: formData.productPrice,
              productAvailable: formData.productAvailable,
              productDescription: formData.productDescription.trim(),
            })
          ).then(() => navigate("/"));
        }
      }
      setIsLoading(true);
      setDisableButton(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="form__container">
          <h2>Edit Product</h2>

          <form id="submitEditProduct" onSubmit={handleSubmitEditProduct}>
            <div className="form__element">
              <label>Name</label>
              <input
                className="form__element--input"
                type="text"
                name="productName"
                value={formData.productName}
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
                name="productCategory"
                value={formData.productCategory}
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
              <label>Price</label>
              <input
                className="form__element--input"
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
              />
              {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            </div>

            <div className="form__element">
              <label>Availablility: </label>
              <select
                className="form__element--input"
                name="productAvailable"
                value={formData.productAvailable}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>{" "}
              {errors.available && (
                <p style={{ color: "red" }}>{errors.available}</p>
              )}
            </div>

            <div className="form__element">
              <label>Description: </label>
              <textarea
                className="form__element--description"
                name="productDescription"
                value={formData.productDescription}
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
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
