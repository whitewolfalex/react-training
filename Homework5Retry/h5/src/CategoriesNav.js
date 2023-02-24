import { useEffect, useState } from 'react';
import axios from 'axios';
import './Header.css';

const CategoriesNav = ({ selectCategory, triggerFetchByCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }

        return () => {
            ////console.log("Categories are fetched");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function selectCategoryTrigger(categoryName) {
        selectCategory(categoryName, categories);
    }

    function fetchCategories() {
        if (categories.length === 0) {
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
                .then((res) => {
                    ////console.log(res.data);
                    const categories = res.data.drinks;
                    setCategories(categories);
                    triggerFetchByCategory(categories);
                });
        }
    }

    return (
        <div className='CategoriesContainer'>
            {
                categories.map(category =>
                    <div className='CategoryItem'
                        key={category.strCategory}
                        onClick={event => selectCategoryTrigger(category.strCategory)}>
                        {category.strCategory}
                    </div>
                )
            }
        </div>
    );

}

export default CategoriesNav;