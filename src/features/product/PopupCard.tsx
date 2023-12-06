import "./PopupCard.css";

const PopupCard = ({
  open,
  handleCardClose,
  children,
}: {
  open: boolean;
  handleCardClose: () => void;
  children: React.ReactNode;
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="popup__wrapper">
      <div className="popup__card">
        {children}
        <button className="popup__closer" onClick={handleCardClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default PopupCard;
