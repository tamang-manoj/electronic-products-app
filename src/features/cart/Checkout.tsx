import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router";
import { deleteFromCart, updateDeletedProduct } from "./cartSlice";

const Checkout = ({ info }: { info: string[] }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputPromo, setInputPromo] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const promocodes = useAppSelector((state) => state.promocodes);

  // console.log(promocodes);
  const isMatchPromocode = promocodes.find(
    (each) => each.promocode === inputPromo
  );

  const cartProducts = useAppSelector((state) => state.cartProducts.data);
  //   console.log(cartProducts);

  const checkoutProducts = cartProducts.filter((product) =>
    info.includes(product.cartItemId as string)
  );
  // console.log(checkoutProducts);

  const costArray = checkoutProducts.map(
    (checkoutProduct: { productPrice: string; count: number }) =>
      Number(checkoutProduct.productPrice) * checkoutProduct.count
  );
  // console.log(costArray);
  const subTotalCost = costArray.reduce((total, num) => total + num, 0);
  // console.log(subTotalCost);

  const itemCountArray = checkoutProducts.map(
    (checkoutProduct) => checkoutProduct.count
  );
  const itemCountTotal = itemCountArray.reduce((total, num) => total + num, 0);
  // console.log(itemCountTotal);

  const handleSubmitPromocode = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setInputPromo(inputValue);
  };

  const handleCheckoutBtn = () => {
    console.log("checkout clicked");
    navigate("/");
    checkoutProducts.forEach((checkoutProduct) => {
      dispatch(deleteFromCart(checkoutProduct.cartItemId as string));
      dispatch(updateDeletedProduct(checkoutProduct.cartItemId));
    });
  };

  return (
    <>
      <div className="checkout__card">
        <h4>Order Summary</h4>
        <p>
          Subtotal ({itemCountTotal} items): {subTotalCost}{" "}
        </p>

        <div className="promocode__success">
          {isMatchPromocode && checkoutProducts.length !== 0 && (
            <>
              <p>Applied Promocode "{isMatchPromocode.promocode}"</p>
              <p>Promocode Discout: Rs. -{isMatchPromocode.discount}</p>
            </>
          )}
        </div>

        {!isMatchPromocode && checkoutProducts.length !== 0 && (
          <div>
            <input
              className="checkoutCard__input"
              type="text"
              placeholder="Enter Promo Code"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="checkout__button checkoutCard__applyButton"
              onClick={(e) => handleSubmitPromocode(e)}
            >
              Apply
            </button>
          </div>
        )}

        <p>
          Total Payment: Rs.{" "}
          {isMatchPromocode
            ? subTotalCost - isMatchPromocode.discount >= 0
              ? subTotalCost - isMatchPromocode.discount
              : 0
            : subTotalCost}
        </p>

        <button className="checkout__button" onClick={handleCheckoutBtn}>
          Checkout
        </button>
      </div>
    </>
  );
};

export default Checkout;
