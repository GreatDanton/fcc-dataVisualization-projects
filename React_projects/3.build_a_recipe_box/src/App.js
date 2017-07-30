import React, { Component } from 'react';


// Global storage for handling recipe data. Each component has access to globalStorage
// data
let globalStorage = {
    "Recipe1": ["bla bla", "something1", "somethign2"],
    "Recipe2": ["bla bla", "something1", "somethign2"]
};


// outer container
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: globalStorage }
        this.addRecipe = this.addRecipe.bind(this);
    }

    // adding recipe function, opens up add recipe modal
    addRecipe() {
        console.log("Adding recipe");
    }

    render() {
        let titles = Object.keys(this.state.recipes);
        let recipes = titles.map((title, index) => {
            return (
                <Recipe key={index} title={title} ingredients={this.state.recipes[title]} />
            )
        });

        return (
            <div className="recipe-container">
                {recipes}
            </div>
        );
    }
}

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.ingredients,
            title: this.props.title,
            modalOpen: false
        }


        this.openRecipeModal = this.openRecipeModal.bind(this);
        this.closeRecipeModal = this.closeRecipeModal.bind(this);

        this.saveRecipe = this.saveRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.changeIngredients = this.changeIngredients.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
    }

    changeTitle(e) {
        this.setState({ title: e.target.value });
    }

    changeIngredients(e) {
        let ing = e.target.value.split(',');
        this.setState({ ingredients: ing });
    }

    saveRecipe() {
        console.log("save recipe");
    }

    deleteRecipe() {
        console.log("delete recipe");
    }

    openRecipeModal() {
        this.setState({ modalOpen: true });
    }

    closeRecipeModal() {
        this.setState({ modalOpen: false });
    }


    // display recipe and modal for each recipe
    render() {
        let ingredients = this.state.ingredients.map((ing, index) => {
            return (
                <li key={index}>{ing}</li>
            );
        })

        return (
            <div>
                <div className="recipe">
                    <h2>{this.state.title}</h2>
                    <h3 className="ingredients-title">Ingredients </h3>
                    <ul className="ingredients">
                        {ingredients}
                    </ul>
                    <button onClick={this.openRecipeModal}>Edit Recipe</button>
                </div>

                <div className={"recipe-modal " + (this.state.modalOpen ? "active" : "")}>
                    <div className="close" onClick={this.closeRecipeModal}>X</div>
                    <input type="text" value={this.state.title} onChange={this.changeTitle} ></input>
                    <textarea value={this.state.ingredients} onChange={this.changeIngredients} />
                    <button onClick={this.saveRecipe}>Save Recipe</button>
                    <button onClick={this.deleteRecipe}> Delete Recipe </button>
                </div>
                <div className={"overlay " + (this.state.modalOpen ? 'active' : '')} onClick={this.closeRecipeModal}></div>
            </div>
        );
    }
}

export default App;
