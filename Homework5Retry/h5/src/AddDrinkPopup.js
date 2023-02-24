
import './AddDrinkStyle.css';

const AddDrinkPopupBtn = ({ openCreateDrinkView, btnName }) => {

    return (
        <>
            <span className="Popup" onClick={openCreateDrinkView}>{btnName}</span>
        </>
    );
};

export default AddDrinkPopupBtn;