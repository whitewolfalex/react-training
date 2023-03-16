import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './categories.css'

function NavigationBar() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        console.log("Categories? ", categories, categories.length === 0);
        if (categories.length === 0) {
            fetchCategories();
            navigate('/Cocktail', { replace: false });
        }

        async function fetchCategories() {
            const resp = await
                fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
            const data = await resp.json();
            setCategories(data.drinks);

            console.log(data.drinks);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='categories'>
            {
                categories
                    .map(el =>
                        <Link
                            to={`${el.strCategory.replace('/', '%2F')}`}
                            key={el.strCategory}>

                            <div
                                className='nav-element'>
                                {el.strCategory}
                            </div>

                        </Link>
                    )
            }
        </div >
    );
}

export default NavigationBar;