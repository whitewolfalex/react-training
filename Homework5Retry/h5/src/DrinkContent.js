import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import axios from 'axios';
import './DrinkContainer.css';
import AddDrinkViewModal from './AddDrinkViewModal';

const DrinkContent = forwardRef((props, ref) => {
    const [currentList, setCurrentList] = useState({ category: '', list: [] });
    const [previewDrink, setPreviewDrink] = useState(false);
    const [category, setCategory] = useState('');
    const [backupCurrentList, setBackupCurrentList] = useState([]);
    const [previewDrinkData, setPreviewDrinkData] = useState();
    const [isCreateDrinkEnabled, setCreateDrinkEnabled] = useState();
    const [mustFetchByCategory, setMustFetchByCategory] = useState(false);


    function highlightActiveCategory(category) {

        const categElements = document.getElementsByClassName("CategoryItem");
        var elementsArray = [].slice.call(categElements);

        let selectedElem = null;
        for (var index = 0; index < elementsArray.length; index++) {
            var element = elementsArray[index];
            if (element.innerText === category) {
                selectedElem = element;
                selectedElem.style.backgroundColor = 'red';

                return;
            }
        }


    }

    function fetchListOfDrinks(categ) {
        const resCateg = extractCategory(categ);

        if (mustFetchByCategory === true
            || currentList.category !== resCateg
            || currentList.list.length === 0) {



            axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + resCateg)
                .then((res) => {

                    const drinks = res.data.drinks;
                    setCurrentList({ category: resCateg, list: drinks });
                    setCategory(resCateg);
                });
        } else {
        }
    }

    function previewDrinkTrigger(drinkItem) {
        setPreviewDrink(true);
        setPreviewDrinkData(drinkItem);
    }

    useImperativeHandle(ref, () => ({
        fetchTheDrinks(categs) {
            fetchListOfDrinks(categs[0]);
        },

        changeCategory(categ) {

            setMustFetchByCategory(true);
            fetchListOfDrinks(categ);
        },

        findDrink(searchTerm) {
            fetchDrinksByName(searchTerm);
        },

        resetView() {
            if (backupCurrentList !== undefined && backupCurrentList.length > 0) {
                setCurrentList({ category: '', list: backupCurrentList });
            }
        },

        openCreateDrinkView() {
            setCreateDrinkEnabled(true);
        },

        goHomeFromCreateDrinkModal() {
            setCreateDrinkEnabled(false);
        }

    }));


    function extractCategory(categ) {
        let processCateg = null;
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
        setCategory(category);
    }

    function fetchDrinksByName(term) {
        axios.get('https://thecocktaildb.com/api/json/v1/1/search.php?s=' + term)
            .then((res) => {
                if (res.data.drinks !== null) {
                    setBackupCurrentList(currentList);
                    setCurrentList({ category: '', list: res.data.drinks });
                } else if (currentList.list.length > 1) {
                    setBackupCurrentList(currentList);
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
        } else {
        }
    }

    function createDrink(name, ing1, ing2, quantity) {
        sendRequest();
    }





    function getItemsToRender() {
        if (isCreateDrinkEnabled === true) {
            return (<AddDrinkViewModal createDrink={createDrink} />);
        } else {
            if (previewDrink === false) {
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