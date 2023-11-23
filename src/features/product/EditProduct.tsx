import { editProduct } from "./productsSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export function EditProduct() {
  const { productId } = useParams();

  const product = useAppSelector((state) => {
    return state.products.find((product) => product.id === productId);
  });
  // console.log(product);
  // const editId = product?.id;

  const prevName = product?.productName;
  const prevCategory = product?.productCategory;
  const prevImgFile = product?.imgFile;
  const prevProductPrice = product?.productPrice;
  const prevProductAvailable = product?.productAvailable;

  const [productName, setProductName] = useState(prevName);
  const [productCategory, setProductCategory] = useState(prevCategory);
  const [imgFile, setImgFile] = useState(prevImgFile);
  const [productPrice, setProductPrice] = useState(prevProductPrice);
  const [productAvailable, setProductAvailable] =
    useState(prevProductAvailable);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleImageFile = (e: any) => {
    e.preventDefault();

    setImgFile(URL.createObjectURL(e.target.files?.[0]));
  };

  const handleSubmitEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      productName &&
      productCategory &&
      imgFile &&
      productPrice &&
      productAvailable
    ) {
      dispatch(
        editProduct({
          editId: productId,
          productName,
          productCategory,
          imgFile,
          productPrice,
          productAvailable,
        })
      );

      navigate("/");
      console.log("submitted");
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form id="submitEditProduct" onSubmit={handleSubmitEditProduct}>
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
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
