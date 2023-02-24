import { forwardRef, useState, useEffect } from 'react';
import './Header.css';

const SearchBar = forwardRef((props, ref) => {

    const [inputValue, setInputValue] = useState();

    const renderCloseIcon = () => {
        if (inputValue !== undefined && inputValue !== '') {
            return (
                <span className='CloseBtn' onClick={resetInputValue}>
                    X
                </span>);
        } else {
        }
    }

    useEffect(() => {
        renderCloseIcon();

        return () => {

        }
    }, [inputValue])


    function resetInputValue() {
        if (inputValue !== undefined && inputValue !== '') {
            document.getElementById("inputValue").value = '';
            props.resetView();
        }
    }

    function updateInputValue(event) {
        if (event.target.value !== '' && event.target.value !== undefined) {
            setInputValue(event.target.value);
        } else {

        }
    }


    function findDrink(event) {
        const inputValue = event.target.value;
        ////console.log("FIND DRINKKKKKKKKKKKKK", inputValue)

        if (event.key === 'Enter') {
            const searchTermTrimed = inputValue.trim().toLowerCase();

            ////console.log("Entered ENTER", searchTermTrimed)
            props.findDrink(searchTermTrimed);
        }
    }

    return (
        <>
            <div className="SearchBar Sticky"
                id='SearchBar'>
                <div>
                    {renderCloseIcon()}

                    <input
                        type="text"
                        placeholder='Search here...'
                        className='SearchBarInput'
                        id="inputValue"
                        onKeyDown={findDrink}
                        onChange={event => {
                            props.resetView(event);
                            updateInputValue(event);
                        }
                        }
                    />
                </div>
            </div>
        </>

    );
});

export default SearchBar;