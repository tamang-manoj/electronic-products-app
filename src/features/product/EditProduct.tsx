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

  const prevImgUrl = product?.imgUrl;
  const prevProductPrice = product?.productPrice;
  const prevProductAvailable = product?.productAvailable;

  const [productName, setProductName] = useState(prevProductName);
  const [productCategory, setProductCategory] = useState(prevProductCategory);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(prevImgUrl);
  const [productPrice, setProductPrice] = useState(prevProductPrice);
  const [productAvailable, setProductAvailable] =
    useState(prevProductAvailable);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditImageFile = (e: any) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmitEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productName && productCategory && productPrice && productAvailable) {
      if (imgFile) {
        // deleting first
        const deleteRef = ref(storage, `/images/${prevProductImgId}`);
        deleteObject(deleteRef);

        // uploading new and then downloading new
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
            imgUrl,
            productPrice,
            productAvailable,
          })
        ).then(() => navigate("/"));
      }
    }
  };

  return (
    <div className="form__container">
      <h1>Edit Product</h1>
      <form id="submitEditProduct" onSubmit={handleSubmitEditProduct}>
        <div className="form__element">
          <label htmlFor="productName">Product Name</label>
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
            <option value="Mobile Accessories">Mobile Accessories</option>
            <option value="Audio">Audio</option>
            <option value="Wearable">Wearable</option>
            <option value="Computer Accessories">Computer Accessories</option>
            <option value="Camera Accessories">Camera Accessories</option>
          </select>
        </div>

        <div className="form__element">
          <label htmlFor="productImage">Product Image</label>
          <input type="file" onChange={handleEditImageFile} />
        </div>

        <div className="form__element">
          <label htmlFor="productPrice">Product Price</label>
          <input
            className="form__element--input"
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div className="form__element">
          <label htmlFor="productAvailable">Product Available</label>
          <input
            className="form__element--input"
            type="text"
            value={productAvailable}
            onChange={(e) => setProductAvailable(e.target.value)}
          />
        </div>

        <div className="form__element">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
