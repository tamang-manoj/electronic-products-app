import { useDispatch } from "react-redux";
import { addProduct } from "./productsSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import Loading from "../cart/Loading";
import Validation from "../../components/Validation";

export interface ErrorType {
  name?: string;
  category?: string;
  price?: string;
  available?: string;
}

export function AddProduct() {
  const [loadingOnAdd, setLoadingOnAdd] = useState(false);

  const [productName, setProductName] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();
  const [productPrice, setProductPrice] = useState<string>("");
  const [productAvailable, setProductAvailable] = useState<string>("");
  const [imgShow, setImgShow] = useState<string>("");
  const [productDescription, setProductDescription] = useState("");

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const [errors, setErrors] = useState<ErrorType>({
    name: "",
    category: "",
    price: "",
    available: "",
  });

  const productImgId = uuidv4();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCancelImage = () => {
    setImgFile(undefined);
    setImgShow("");
  };

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
      setLoadingOnAdd(true);

      if (imgFile) {
        uploadBytes(ref(storage, `/images/${productImgId}`), imgFile).then(
          () => {
            getDownloadURL(ref(storage, `/images/${productImgId}`)).then(
              (url) =>
                dispatch(
                  addProduct({
                    imgUrl: url,
                    productImgId,
                    productName,
                    productCategory,
                    productPrice: productPrice.replace(/^0+/, ""),
                    productAvailable,
                    productDescription,
                  })
                ).then(() => {
                  setLoadingOnAdd(false);
                  navigate("/");
                })
            );
          }
        );
      } else {
        dispatch(
          addProduct({
            imgUrl: "",
            productImgId,
            productName,
            productCategory,
            productPrice: productPrice.replace(/^0+/, ""),
            productAvailable,
            productDescription,
          })
        ).then(() => {
          setLoadingOnAdd(false);
          navigate("/");
        });
      }
    }
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
                Image:
                <div className=" form__image--show">
                  {imgShow ? (
                    <>
                      <img src={imgShow} />
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelImage();
                        }}
                      >
                        X
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </label>

              <input
                id="productImage"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageFile}
              />
            </div>

            <div className="form__element">
              <label>Price: </label>
              <input
                className="form__element--input"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                // maxLength={4} doesn't work
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
              </select>

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
                Add
              </button>
            </div>
          </form>
        </div>
      )}{" "}
    </>
  );
}
