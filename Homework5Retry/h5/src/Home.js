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
        setCategory(category);
        setCategories(categories);
        childRef.current.changeCategory(category);
    }

    function previewDrink(drinkItem) {
    }

    function findDrink(searchTerm) {
        childRef.current.findDrink(searchTerm);
    }

    function resetView(event) {
        if (event === undefined || event.target.value === '') {
            childRef.current.resetView(event);
        }
    }


    function openCreateDrinkView() {
        if (btnName.trim().toLowerCase() === 'home') {
            setBtnName("Create a drink");
            childRef.current.goHomeFromCreateDrinkModal();
            headerRef.current.openCreateDrinkView();
        } else {
            setBtnName("Home");
            childRef.current.openCreateDrinkView();
            headerRef.current.openCreateDrinkView();
        }
    }

    function triggerFetchByCategory(categories) {
        setCategories(categories);
    }

    useEffect(() => {
        if (categories.length > 0) {
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