import "./BeverageItems.css";
import SingleItem from "./SingleItem";

const MultipleItems = ({ item, enableSingleDisplay }) => {

    const myMap = item.map(elem =>
        <SingleItem item={elem} key={elem.title} enableSingleDisplay={enableSingleDisplay} />
    )

    return (
        <>
            <div className="BeverageItems" id="BeverageItems">
                {
                    myMap
                }
            </div>
        </>
    );
}

export default MultipleItems;