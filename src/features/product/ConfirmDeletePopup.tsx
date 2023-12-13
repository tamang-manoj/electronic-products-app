import { DataState } from "./productsSlice";

const ConfirmDeleteModal = ({
  closeDeleteModal,
  handleProductDelete,
  product,
}: {
  closeDeleteModal: () => void;
  handleProductDelete: (product: DataState) => void;
  product: DataState;
}) => {
  return (
    <div className="popup__wrapper" onClick={() => closeDeleteModal()}>
      <div className="deletePopup__card" onClick={(e) => e.stopPropagation()}>
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
