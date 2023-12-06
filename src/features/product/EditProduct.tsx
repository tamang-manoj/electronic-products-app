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

export function EditProduct() {
  const { idInParam } = useParams();

  const product = useAppSelector((state) => {
    return state.products.data.find((product) => product.id === idInParam);
  });

  const prevId = product?.id;
  const prevProductImgId = product?.productImgId;
  const prevProductName = product?.productName;
  const prevProductCategory = product?.productCategory;
  // console.log(prevProductCategory);
  const prevImgUrl = product?.imgUrl;
  const prevProductPrice = product?.productPrice;
  const prevProductAvailable = product?.productAvailable;

  const [productName, setProductName] = useState(prevProductName);
  const [productCategory, setProductCategory] = useState(prevProductCategory);
  const [imgFile, setImgFile] = useState<File>();
  const [imgShow, setImgShow] = useState(prevImgUrl);
  const [productPrice, setProductPrice] = useState(prevProductPrice);
  const [productAvailable, setProductAvailable] =
    useState(prevProductAvailable);

  const [disableButton, setDisableButton] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target.files) {
      setImgFile(e.target.files[0]);
      if (e.target.files[0]) {
        setImgShow(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleSubmitEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productName && productCategory && productPrice && productAvailable) {
      if (imgFile) {
        // deleting image first
        const deleteRef = ref(storage, `/images/${prevProductImgId}`);
        deleteObject(deleteRef);

        // uploading new image and then downloading new image
        uploadBytes(ref(storage, `/images/${prevProductImgId}`), imgFile).then(
          () => {
            getDownloadURL(ref(storage, `/images/${prevProductImgId}`)).then(
              (url) =>
                dispatch(
                  editProduct({
                    id: prevId,
                    productImgId: prevProductImgId,
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

      setDisableButton(true);
    }
  };

  return (
    <div className="form__container">
      <h2>Edit Product</h2>

      <form id="submitEditProduct" onSubmit={handleSubmitEditProduct}>
        <div className="form__element">
          <label htmlFor="productName">Name</label>
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
            <option value="">Select</option>
            <option value="Mobile Accessories">Mobile</option>
            <option value="Audio">Audio</option>
            <option value="Wearable">Wearable</option>
            <option value="Computer Accessories">Computer</option>
            <option value="Camera Accessories">Camera</option>
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
            id="productImage"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleEditImageFile}
          />
        </div>

        <div className="form__element">
          <label htmlFor="productPrice">Price</label>
          <input
            className="form__element--input"
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div className="form__element">
          <label htmlFor="productAvailable">Available</label>
          <input
            className="form__element--input"
            type="text"
            value={productAvailable}
            onChange={(e) => setProductAvailable(e.target.value)}
          />
        </div>

        <div className="form__element">
          <button type="submit" disabled={disableButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
