import { Component, createRef } from 'react';
import axios from 'axios';
import './DrinkContainer.css';

class DrinkContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentList: [],
            previewDrink: false,
            previewDrinkData: {},
            category: ""
        }
        this.getItemsToRender = this.getItemsToRender.bind(this);
        this.goHome = this.goHome.bind(this);
        this.changeCategory = this.changeCategory.bind(this);

    }

    componentDidMount() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
            .then((resp) => {
                return resp.json();
            }).then(
                (data) => {
                    this.setState({ currentList: data.drinks })
                });

    }

    fetchDrinkByCategroy(category) {
        this.updateMyCategory(category);
        console.log("GETCHING CATEGORY ->>>>>>>>>>>", category)
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' + category)
            .then((res) => {
                const drinks = res.data.drinks;
                console.log(drinks)
                this.setState({ currentList: drinks })
            });
    }

    previewDrink(drinkItem) {
        console.log("IS DRINK ITEM OKAY? ", drinkItem);
        this.props.previewDrink(drinkItem);
        this.setState({ previewDrink: true });
        this.setState({ previewDrinkData: drinkItem });
        console.log(this.state);

    }

    goHome() {
        this.setState({ previewDrink: false });
    }

    updateMyCategory(category){
        this.setState({ category: category })
    }



    changeCategory(category) {
        console.log("GOT THE CATEGORY ", category);
        this.fetchDrinkByCategroy(category);
    }

    getItemsToRender() {
        if (this.state.previewDrink === false) {
            return (

                <div className='DrinkContainer'>
                    {
                        this.state.currentList.map(drinkItem =>
                            <div className='DrinkItem' key={drinkItem.strDrink}>
                                <div className='DrinkTitle'
                                    key={drinkItem.strDrink}>
                                    {drinkItem.strDrink}
                                </div>
                                <img src={drinkItem.strDrinkThumb}
                                    alt="OOPS"
                                    className='DrinkImage'
                                    onClick={event => this.previewDrink(drinkItem)}
                                />
                            </div>)
                    }
                </div>

            )
        } else {
            return (
                <div className='PreviewDrink'>
                    <button onClick={this.goHome} className="BackBtn">Back</button>

                    <div className='DrinkItem'
                        key={this.state.previewDrinkData.strDrink}
                        style={{ flexDirection: "column", justifyContent: "flex-end" }}
                    >
                        <div className='DrinkTitle'
                            key={this.state.previewDrinkData.strDrink}
                            style={{ height: "80%", width: "559px", alignSelf: "flex-end" }}
                        >
                            {this.state.previewDrinkData.strDrink}
                        </div>
                        <img src={this.state.previewDrinkData.strDrinkThumb}
                            alt="OOPS"
                            className='DrinkImage'
                            onClick={event => this.previewDrink(this.state.previewDrinkData)}
                            style={{ height: "80%", width: "80%" }}
                        />
                    </div>

                </div>
            );
        }
    }

    render() {
        return (
            <>
                {
                    this.getItemsToRender()
                }
            </>
        );
    }
}

export default DrinkContent;