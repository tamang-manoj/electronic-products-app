import { useState } from "react";
import { ErrorType } from "../AddProduct";
import Validation from "../../../components/Validation";

export interface InitialState {
  productName: string;
  productCategory: string;
  productPrice: string;
  productAvailable: string;
  productDescription: string;
}

const useFormData = (initialState: InitialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<ErrorType>({
    name: "",
    category: "",
    price: "",
    available: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: InitialState) => ({
      ...prevData,
      [name]: value.trimStart(),
    }));
  };

  const checkErrors = () => {
    setErrors(
      Validation({
        productName: formData.productName,
        productCategory: formData.productCategory,
        productPrice: formData.productPrice,
        productAvailable: formData.productAvailable,
      })
    );
  };

  return {
    formData,
    errors,
    checkErrors,
    handleChange,
  };
};

export default useFormData;
