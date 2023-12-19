import { useState } from "react";
import { ErrorType } from "../AddProduct";
import Validation from "../../../components/Validation";

const useFormData = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<ErrorType>({
    name: "",
    category: "",
    price: "",
    available: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
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
