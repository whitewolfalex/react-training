import { Component } from 'react';
import axios from 'axios';
import './Header.css';

class CategoriesNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
            .then((res) => {
                const categories = res.data.drinks;
                this.setState({ categories });

            });
    }

    selectCategory(key){
        console.log("Works", key);
        this.props.selectCategory(key.strAlcoholic);
    }

    render() {
        return (
            <>
                <div className='CategoriesContainer'>
                    {
                        this.state.categories.map(category =>
                            <div className='CategoryItem'
                                key={category.strAlcoholic}
                                onClick={event => this.selectCategory(category)}>
                                {category.strAlcoholic}
                            </div>
                        )
                    }
                </div>
            </>
        );
    }
}

export default CategoriesNav;