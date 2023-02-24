import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import axios from 'axios';
import './DrinkContainer.css';
import AddDrinkViewModal from './AddDrinkViewModal';

const DrinkContent = forwardRef((props, ref) => {
    const [currentList, setCurrentList] = useState({ category: '', list: [] });
    const [previewDrink, setPreviewDrink] = useState(false);
    const [category, setCategory] = useState('');
    // const [temporarySearchList, setTemporarySearchList] = useState([]);
    const [backupCurrentList, setBackupCurrentList] = useState([]);
    const [previewDrinkData, setPreviewDrinkData] = useState();
    const [isCreateDrinkEnabled, setCreateDrinkEnabled] = useState();
    const [mustFetchByCategory, setMustFetchByCategory] = useState(false);

    // function fetchDrinkByCategroy(category) {
    //     updateMyCategory(category);
    //     axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + category)
    //         .then((res) => {
    //             const drinks = res.data.drinks;
    //             ////console.log(drinks)
    //             setCurrentList(drinks)
    //         });
    // }

    function highlightActiveCategory(category) {
        //console.log("??????????????????????????????????????");

        const categElements = document.getElementsByClassName("CategoryItem");
        //console.log("HIGHLIGHT SE:ECTED: ", categElements);
        var elementsArray = [].slice.call(categElements);
        // const selectedCateg = categElements.find(elem => elem.innerText === category);
        // //console.log("HIGHLIGHT SE:ECTED: ", selectedCateg);
        let selectedElem = null;
        for (var index = 0; index < elementsArray.length; index++) {
            var element = elementsArray[index];
            //console.log("CHECK the element ", element.innerText);
            if (element.innerText === category) {
                //console.log("FOUND the element ", element);
                selectedElem = element;
                // return element; // If you wish to return the element instead of true (comment out previous line if this option is used)
                //console.log("SELECTED ELEMENT IS, ", selectedElem);
                selectedElem.style.backgroundColor = 'red';

                return;
            }
        }


    }

    function fetchListOfDrinks(categ) {
        console.log(
            "CHECK CATEG===================================>",
            "\n||>param ", categ,
            "\n||>mustFetch === true ",mustFetchByCategory === true,
            "\n||>currentlist.category !== category ",currentList.category !== category,
            "\n||>length === 0 ",currentList.list.length === 0,
            "\n||>mustsgetch ",mustFetchByCategory,
            "\n||>currentList", currentList,
            "\n||>category",  category
        );

        const resCateg = extractCategory(categ);

        if (mustFetchByCategory === true
            || currentList.category !== resCateg
            || currentList.list.length === 0) {


            console.log("Ddddddddddddddddddddddddddddddddddddddddddd", resCateg);

            axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + resCateg)
                .then((res) => {

                    const drinks = res.data.drinks;
                    setCurrentList({ category: resCateg, list: drinks });
                    console.log("WHAT CATEGPRY: ", resCateg);
                    setCategory(resCateg);
                });
        } else {
        }
    }

    function previewDrinkTrigger(drinkItem) {
        ////console.log("IS DRINK ITEM OKAY? ", drinkItem);
        // previewDrink(drinkItem);
        setPreviewDrink(true);
        setPreviewDrinkData(drinkItem);
    }

    useImperativeHandle(ref, () => ({
        fetchTheDrinks(categs) {
            //console.log("Check categories: ", categories);
            fetchListOfDrinks(categs[0]);
        },

        changeCategory(categ) {
            console.log("GOT THE CATEGORY ", categ);

            setMustFetchByCategory(true);
            // updateMyCategory(categ);
            fetchListOfDrinks(categ);
        },

        findDrink(searchTerm) {
            ////console.log("HERE WE GOOOO", searchTerm);
            fetchDrinksByName(searchTerm);
        },

        resetView() {
            ////console.log("Reseting view", backupCurrentList, currentList)
            if (backupCurrentList !== undefined && backupCurrentList.length > 0) {
                setCurrentList({ category: '', list: backupCurrentList });
            }
        },

        openCreateDrinkView() {
            ////console.log("[DrinkContent] Opening create drink modal");
            setCreateDrinkEnabled(true);
            // getItemsToRender(true);
        },

        goHomeFromCreateDrinkModal() {
            ////console.log("Going home from Create drink");
            setCreateDrinkEnabled(false);
            // setPreviewDrink(false);
            // getItemsToRender(false);
        }

    }));


    function extractCategory(categ) {
        let processCateg = null;
        // console.log(typeof (categ) === 'object');
        if (typeof (categ) === 'object') {
            return processCateg = categ.strCategory;
        } else {
            return processCateg = categ;
        }
    }

    function goHome() {
        setPreviewDrink(false);
    }

    function updateMyCategory(categ) {
        console.log("UPDATEING CATEOGRY: ", categ);
        setCategory(category);
    }

    function fetchDrinksByName(term) {
        axios.get('https://thecocktaildb.com/api/json/v1/1/search.php?s=' + term)
            .then((res) => {
                ////console.log("HERE ARE RESULT:  ", res)
                if (res.data.drinks !== null) {
                    setBackupCurrentList(currentList);
                    // setTemporarySearchList(res.data.drinks);
                    setCurrentList({ category: '', list: res.data.drinks });
                } else if (currentList.list.length > 1) {
                    setBackupCurrentList(currentList);
                    // setTemporarySearchList(res.data.drinks);
                    setCurrentList(
                        {
                            category: '',
                            list: [{ strDrink: "There are no results", strDrinkThumb: "oops.jpg" }]
                        });
                }
            });
    }

    function sendRequest() {
        // eslint-disable-next-line no-restricted-globals
        if ((confirm("Are you sure"))) {
            //console.log("CONFIRMED");
        } else {
            //console.log("NOT ACCEPTED");
        }
    }

    function createDrink(name, ing1, ing2, quantity) {
        //console.log("Received data to create", name, ing1, ing2, quantity);
        sendRequest();
    }





    function getItemsToRender() {
        if (isCreateDrinkEnabled === true) {
            return (<AddDrinkViewModal createDrink={createDrink} />);
        } else {
            if (previewDrink === false) {
                //console.log("create 1", isCreateDrinkEnabled);
                return (
                    <div className='DrinkContainer'>
                        {
                            currentList.list.map(drinkItem =>
                                <div className='DrinkItem' key={drinkItem.strDrink}>
                                    <div className='DrinkTitle'
                                        key={drinkItem.strDrink}>
                                        {drinkItem.strDrink}
                                    </div>
                                    <img src={drinkItem.strDrinkThumb}
                                        alt="OOPS"
                                        className='DrinkImage'
                                        onClick={event => previewDrinkTrigger(drinkItem)}
                                    />
                                </div>)
                        }
                    </div>
                )
            } else {
                return (
                    <div className='PreviewDrink'>
                        <button onClick={goHome} className="BackBtn">Back</button>

                        <div className='DrinkItem'
                            key={previewDrinkData.strDrink}
                            style={{ flexDirection: "column" }}
                        >
                            <div className='DrinkTitle'
                                key={previewDrinkData.strDrink}
                            // style={{ padding: "20px", height: "20px", alignSelf: "flex-end" }}
                            >
                                {previewDrinkData.strDrink}
                            </div>
                            <img src={previewDrinkData.strDrinkThumb}
                                alt="OOPS"
                                className='DrinkImage'
                                onClick={event => previewDrinkTrigger(previewDrinkData)}
                                style={{ width: "300px", height: "300px" }}
                            />
                        </div>
                    </div>
                );
            }
        }
    }

    return (
        <>
            {
                getItemsToRender()
            }
        </>
    );
});

export default DrinkContent;