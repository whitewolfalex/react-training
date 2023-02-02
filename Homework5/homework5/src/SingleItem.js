import "./BeverageItems.css";

const SingleItem = ({ item, enableSingleDisplay, reverseFlex }) => {

    return (
        <>
            {
                (item.name === "")
                    ? <></>
                    : <div className="BeverageContainer SingleItemDisplay SpaceAroundItem"
                        onClick={enableSingleDisplay} id={item.name} style={reverseFlex}>

                        <div className="Image SingleItemDisplay">{item.name}</div>
                        <div className="ImageTitle SingleItemDisplay">{item.title}</div>
                    </div>

            }

        </>
    );
}

export default SingleItem; 