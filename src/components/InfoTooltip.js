
const InfoTooltip = ({ message, onClose }) => {

  return (
    <div className={`popup` + (message ? " popup_opened" : "")} >
      <div className="popup__container popup__container_infoTooltip">
        <button type="button" className="popup__close" onClick={onClose} ></button>
        <p
          className={"popup__info-message" + (message ? message.isSuccess
            ? " popup__info-message_success" : " popup__info-message_unsuccess" : "")}
        >
          {message ? message.text : " "}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;