function Popup({ handleDeleteTrue }) {
    return (
      <div className="modal">
        <div className="modal_box">
          <p>You sure you wanna delete?</p>
          <button className="modal_buttonCancel">Cancel</button>
          <button onClick={handleDeleteTrue} className="modal_buttoDelete">
            Confirm
          </button>
        </div>
      </div>
    );
  }
  
  export default Popup;