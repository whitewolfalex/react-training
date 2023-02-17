import { Component, useState, useEffect, createRef } from "react";
import DrinkContent from "./DrinkContent";
import Header from "./Header";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: "Alcoholic"
        }
        this.changeCategory = this.selectCategory.bind(this);
        this.child = createRef();
    }



    selectCategory(category) {
        console.log("CHECK CATEGORY: ", category);
        this.setState({ category: category });
        this.child.current.changeCategory(category);
    }

    previewDrink(drinkItem) {
        console.log("CHECK DRINK ITEM", drinkItem);
    }

    render() {
        return (
            <>
                <Header selectCategory={category => this.selectCategory(category)} />
                <DrinkContent previewDrink={this.previewDrink} selectCategory={this.selectCategory} ref={this.child} />
            </>
        );
    }


}

export default Home;