import { editProduct } from "./productsSlice";
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
import { ErrorType } from "./AddProduct";
import Validation from "../../components/Validation";
import { v4 as uuidv4 } from "uuid";
import { IoMdCloudUpload } from "react-icons/io";

export function EditProduct() {
  const [loadingOnEdit, setLoadingOnEdit] = useState(false);

  const { idInParam } = useParams();

  const product = useAppSelector((state) => {
    return state.products.data.find((product) => product.id === idInParam);
  });

  const prevId = product?.id;
  const prevProductImgId = product?.productImgId;
  const [productName, setProductName] = useState(product?.productName);
  const [productCategory, setProductCategory] = useState(
    product?.productCategory
  );
  const [productPrice, setProductPrice] = useState(product?.productPrice);
  const [productAvailable, setProductAvailable] = useState(
    product?.productAvailable
  );
  const [productDescription, setProductDescription] = useState(
    product?.productDescription
  );

  const [disableButton, setDisableButton] = useState(false);

  const [errors, setErrors] = useState<ErrorType>({
    name: "",
    category: "",
    price: "",
    available: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const newProductImgId = uuidv4();

  const prevImgUrl = product?.imgUrl;
  const [imgShow, setImgShow] = useState(prevImgUrl);
  // console.log(prevImgUrl);
  const [imgFile, setImgFile] = useState<File>();

  const handleSelectImage = () => {
    setImgFile(undefined);
    setImgShow("");
  };

  const handleEditImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e?.target.files) {
      if (e.target.files[0]) {
        setImgFile(e.target.files[0]);
        setImgShow(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleSubmitEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(
      Validation({
        productName,
        productCategory,
        productPrice,
        productAvailable,
      })
    );

    if (productName && productCategory && productPrice && productAvailable) {
      setDisableButton(true);
      setLoadingOnEdit(true);

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
                      productName,
                      productCategory,
                      imgUrl: url,
                      productPrice,
                      productAvailable,
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
                      productName,
                      productCategory,
                      imgUrl: url,
                      productPrice,
                      productAvailable,
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
              productName,
              productCategory,
              imgUrl: prevImgUrl,
              productPrice,
              productAvailable,
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
              productName,
              productCategory,
              imgUrl: "",
              productPrice,
              productAvailable,
            })
          ).then(() => navigate("/"));
        } else if (!prevImgUrl) {
          dispatch(
            editProduct({
              id: prevId,
              productImgId: "",
              productName,
              productCategory,
              imgUrl: "",
              productPrice,
              productAvailable,
            })
          ).then(() => navigate("/"));
        }
      }
      setLoadingOnEdit(true);
      setDisableButton(false);
    }
  };

  return (
    <>
      {loadingOnEdit ? (
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
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
              <label htmlFor="productImage" className="custom-file-upload">
                Upload Image:
                <IoMdCloudUpload className="imageUploadIcon" />
              </label>
              <input
                id="productImage"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleEditImageFile}
              />

              <div className="form__image--show">
                {imgShow ? (
                  <>
                    <img src={imgShow} />
                    <span className="cancelImage" onClick={handleSelectImage}>
                      X
                    </span>
                  </>
                ) : (
                  <span>No Image</span>
                )}
              </div>
            </div>

            <div className="form__element">
              <label>Price</label>
              <input
                className="form__element--input"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            </div>

            <div className="form__element">
              <label>Availablility: </label>
              <select
                className="form__element--input"
                value={productAvailable}
                onChange={(e) => setProductAvailable(e.target.value)}
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
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                maxLength={830}
              />
            </div>

            <div className="form__element">
              <button type="submit" disabled={disableButton}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
