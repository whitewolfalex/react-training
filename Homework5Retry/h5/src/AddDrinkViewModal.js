import { upload } from "@testing-library/user-event/dist/upload";
import { useState } from "react";
import "./AddDrinkStyle.css";


const AddDrinkViewModal = ({ createDrink }) => {

    const [selectedImage, setSelectedImage] = useState(null);

    function resetImage(event) {
        event.preventDefault();
        setSelectedImage(null);
    }

    function preventAutoClose(event) {
        event.preventDefault();
    }

    function uploadImage(event) {
        event.preventDefault();
        setSelectedImage(event.target.files[0]);
    }

    function createDrinkTrigger(event) {
        event.preventDefault();
        const myform = event.target.form;
        createDrink(myform.drinkName.value, myform.ing1.value, myform.ing2.value, myform.quantity.value);
    }

    return (
        <form onChange={event => preventAutoClose(event)}>
            <div className="CreateContainer">
                <div className="LeftContainer">
                    {selectedImage &&
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />}

                    <input
                        id="myImage"
                        type="file"
                        name="myImage"
                        onChange={(event) => uploadImage(event)}
                    />
                    <button onClick={resetImage}>Remove</button>
                </div>
                <div className="RightContainer">
                    <input type="text" name="drinkName" placeholder="Cocktail name"></input>
                    <input type="text" name="ing1" placeholder="Ingredient 1"></input>
                    <input type="text" name="ing2" placeholder="Ingredient 2"></input>
                    <input type="text" name="quantity" placeholder="Quantity"></input>
                    <input type="submit" onClick={createDrinkTrigger} value="Create Cocktail" />
                </div>
            </div>
        </form>
    );

}

export default AddDrinkViewModal;