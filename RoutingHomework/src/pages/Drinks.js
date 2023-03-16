import { useEffect, useState, serializeFormQuery } from 'react';
import { Link, useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './Drinks.css';

function Drinks() {
    let loadedDrinks = useLoaderData();
    const { categoryName } = useParams();
    const [currentList, setCurrentList] = useState(loadedDrinks);
    const [backupList, setBackupList] = useState([]);
    const [query, setQuery] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    async function fetchCategory(newCategory) {
        const res = await
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${newCategory}`);
        const data = await res.json();

        setCurrentList(data.drinks);
    }

    async function searchForTerm(ev) {
        const queryTerm = ev.target.value;
        if (ev !== undefined && ev.key === 'Enter') {
            // console.log("GOOD", ev.target.value);

            const res = await
                fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${queryTerm}`);
            const data = await res.json();
            console.log("CHECKING SEARCH RESULT", data);


            if ((data !== undefined && data.drinks !== undefined) && data.drinks.length > 0) {
                setBackupList(currentList);
                setCurrentList(data.drinks);
                navigate(`?${queryTerm}`, false);
            } else {
                console.log("DATA???????????????????? ", data);
            }
        }

    }

    function resetSearch() {
        if (backupList.length > 0) {
            setCurrentList(backupList);
            document.getElementById('searchinput').value = '';

        } else {
            console.log("HELLOOO?????");
            document.getElementById('searchinput').value = '';
        }

    }

    function sanitizeTextForURL(param) {
        return param.replace('/', "%2F");
    }


    useEffect(() => {
        if (categoryName === undefined) {
            fetchCategory("Cocktail");
        }
        else {
            fetchCategory(categoryName);
            resetSearch();
        }

        if (query !== undefined && query !== '') {
            console.log("Entered search for ", query)
            searchForTerm(query);
        }


        console.log("PATH CHANGED",);

        return () => {
            console.log("Categories fetched");
        }
    }, [categoryName, query])


    // console.log('Loaded drinks: ', loadedDrinks);
    // console.log('[DRINKS]Loaded params: ', categoryName);
    // console.log("My element ", document.getElementsByClassName('categories')[0].parentElement);
    return <>
        <h2 style={{ backgroundColor: 'rgb(49, 56, 55)', margin: '0px', padding: '10px', color: 'white' }}>{categoryName}</h2>

        <span >
            <span
                className='reset-search'
                onClick={resetSearch}
            >Reset search
            </span>
            <input
                id='searchinput'
                type='text'
                placeholder='Search here ...'
                className='search_area'
                onKeyDown={(e) => searchForTerm(e)}
            /></span>

        <div className='drinks-container'>
            {
                currentList.map((drink) => (


                    <div key={drink.strDrink} className='drink-container'> {drink.strDrink}
                        <Link
                            to={`/${sanitizeTextForURL(categoryName)}/${sanitizeTextForURL(drink.strDrink)}`}
                            state={{ strDrinkThumb: drink.strDrinkThumb }}
                        >
                            <img
                                src={drink.strDrinkThumb}
                                alt=''
                                className='img-container'
                            />
                        </Link>

                    </div>
                ))
            }
        </div>


    </>;
}

export default Drinks;