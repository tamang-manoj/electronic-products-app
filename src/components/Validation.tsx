import { ErrorType } from "../features/product/AddProduct";

const Validation = ({
  productName,
  productCategory,
  productPrice,
  productAvailable,
}: {
  productName?: string;
  productCategory?: string;
  productPrice?: string;
  productAvailable?: string;
}) => {
  const errors: ErrorType = {};

  //   const text_pattern = /^.{5,100}$/;
  //   const number_pattern = /^[0-9]{1,6}$/;

  if (productName === "") {
    errors.name = "Name is required!";
  }

  if (productCategory === "") {
    errors.category = "Category is required!";
  }

  if (productPrice === "") {
    errors.price = "Price is required!";
  }
  //   else if (number_pattern.test(productPrice)) {
  //     errors.price = "Price not in range";
  //   }

  if (productAvailable === "") {
    errors.available = "Available is required!";
  }

  return errors;
};

export default Validation;
