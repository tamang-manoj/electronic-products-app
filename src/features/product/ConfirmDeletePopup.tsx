import { DataState } from "./productsSlice";

const ConfirmDeleteModal = ({
  closeDeleteModal,
  handleProductDelete,
  product,
}: {
  closeDeleteModal: () => void;
  handleProductDelete: any;
  product: DataState;
}) => {
  return (
    <div className="popup__wrapper">
      <div className="deletePopup__card">
        <p>Are you sure you want to delete this item?</p>
        <div className="deletePopup__buttons--container">
          <button onClick={closeDeleteModal}>Cancel</button>
          <button onClick={() => handleProductDelete(product)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
