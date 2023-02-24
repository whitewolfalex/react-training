import { useState, useRef, useEffect } from "react";
import AddDrinkPopupBtn from "./AddDrinkPopup";
import DrinkContent from "./DrinkContent";
import Header from "./Header";

const Home = () => {

    const [btnName, setBtnName] = useState("Create a drink");
    const [category, setCategory] = useState("Alcoholic");
    const [categories, setCategories] = useState([]);
    const childRef = useRef();
    const headerRef = useRef();

    function selectCategory(category, categories) {
        console.log("CHECK CATEGORY: ", category);
        //console.log("HERE GOES selectCategory()");
        setCategory(category);
        setCategories(categories);
        childRef.current.changeCategory(category);
    }

    function previewDrink(drinkItem) {
        ////console.log("CHECK DRINK ITEM", drinkItem);
    }

    function findDrink(searchTerm) {
        ////console.log("[Home]SEARCHING FOR TERM: ", searchTerm);
        childRef.current.findDrink(searchTerm);
    }

    function resetView(event) {
        if (event === undefined || event.target.value === '') {
            ////console.log("ACCEPTEDDDDDDDDDDD")
            childRef.current.resetView(event);
        }
    }


    function openCreateDrinkView() {
        if (btnName.trim().toLowerCase() === 'home') {
            // ////console.log("Button is ", btnName, btnName.trim().toLowerCase() === 'home');
            setBtnName("Create a drink");
            childRef.current.goHomeFromCreateDrinkModal();
            headerRef.current.openCreateDrinkView();
        } else {
            // ////console.log("Button is ", btnName);
            setBtnName("Home");
            childRef.current.openCreateDrinkView();
            headerRef.current.openCreateDrinkView();
        }
        // childRef.current.openCreateDrinkView();
    }

    function triggerFetchByCategory(categories){
        //console.log("[HOME] categories fetched", categories);
        setCategories(categories);
    }

    useEffect(() => {
        if (categories.length > 0) {
            //console.log("[HOME - useEffect]CHECK categories: ", categories);
            childRef.current.fetchTheDrinks(categories);
        }
        return () => {

        }
    }, [categories])



    return (
        <>
            <Header
                selectCategory={(categ, categs) => selectCategory(categ, categs)}
                triggerFetchByCategory={triggerFetchByCategory}
                findDrink={findDrink}
                resetView={resetView}
                ref={headerRef}
            />
            <AddDrinkPopupBtn
                openCreateDrinkView={openCreateDrinkView}
                btnName={btnName} />
            <DrinkContent
                previewDrink={previewDrink}
                selectCategory={selectCategory}
                findDrink={findDrink}
                ref={childRef}
            />

        </>
    );
}

export default Home;