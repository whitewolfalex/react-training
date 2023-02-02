import './MyContent.css';
import { useState } from 'react';
import SingleItem from './SingleItem';
import MultipleItems from './MultipleItems';

const MyContent = () => {
    const [oneElement, setOneElement] = useState({ name: "", title: "" });
    const flexClasic = { flexDirection: "column" };
    const flexReverse = { flexDirection: "column-reverse" };

    const [reverseFlex, setReverseFlex] = useState(flexClasic);

    const beverageList = [
        { name: 'IMG 1', title: 'Cocktail 1' },
        { name: 'IMG 2', title: 'Cocktail 2' },
        { name: 'IMG 3', title: 'Cocktail 3' },
        { name: 'IMG 4', title: 'Cocktail 4' }
    ];

    const [multipleDisplayState, setMultipleDisplayState] = useState(true);

    function handleClick(event) {
        console.log("Back button event", event.target);
        if (multipleDisplayState === false) {
            setMultipleDisplayState(true);
        }
        console.log("multiple display: ", multipleDisplayState);
    }

    const enableSingleDisplay = (event) => {
        console.log("Enabling single view", event);
        setMultipleDisplayState(false);
        // setOneElement(event.target);
        console.log(event.target.parentElement.id)
        setOneElement(beverageList.find((elem) => elem.name === event.target.parentElement.id));
        setReverseFlex(flexReverse);
    }

    return (
        <>
            <div className="MyContentContainer">
                <div className="SearchBar">
                    <div>Search by name</div>
                </div>
                <div className="UpperContainer">
                    <div className="BreakLine"></div>
                    <div>Category 1</div>
                    <div className="BreakLine"></div>
                </div>
            </div>
            {
                multipleDisplayState === false
                    ? <SingleItem item={oneElement} enableSingleDisplay={enableSingleDisplay} reverseFlex={reverseFlex} />
                    : <MultipleItems item={beverageList} enableSingleDisplay={enableSingleDisplay} />
            }

            <button id='backbtn' onClick={event => handleClick(event)}>Back</button>
        </>
    );
}

export default MyContent;