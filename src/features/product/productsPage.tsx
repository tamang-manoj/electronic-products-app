import CardComponent from "./CardComponent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../cart/Loading";
import { useEffect, useState } from "react";
import { DataState, getProducts } from "./productsSlice";
import { getCartData } from "../cart/cartSlice";
import { useLocation } from "react-router";
import PopupCard from "./PopupCard";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  // console.log(products.data);
  const data = products.data;
  // console.log(data);
  const isLoading = products.isLoading;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCartData());
  }, []);

  const [open, setOpen] = useState(false);

  const handleCardClose = () => {
    setOpen(false);
  };

  const [item, setItem] = useState();
  const location = useLocation();
  // console.log(location.state);

  useEffect(() => {
    if (location.state) {
      const selectedProd = data.find(
        (product) => product.id === location.state.productId
      );
      console.log(selectedProd);
      setItem(selectedProd as DataState | any);
      setOpen(true);
      // navigate(location.pathname, { replace: true });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data.length !== 0 ? (
        <div className="card-container">
          {data.map((product) => (
            <CardComponent key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-product">
          <h1>No Products To Show</h1>
        </div>
      )}

      {open && (
        <PopupCard
          product={item}
          open={open}
          handleCardClose={handleCardClose}
        />
      )}
    </>
  );
};

export default ProductsPage;
