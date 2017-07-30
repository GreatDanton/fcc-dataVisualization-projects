import React, { Component } from 'react';


// Global storage for handling recipe data. Each component has access to globalStorage
// data
let globalStorage = {
    "Recipe1": ["bla bla", "something1", "somethign2"],
    "Recipe2": ["bla bla", "something1", "somethign2"],
    "Recipe3": ["bla bla", "something1", "somethign2"]
};


// outer container
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: globalStorage,
            newTitle: "",
            newIngredients: ""
        };


        this.openNewRecipeModal = this.openNewRecipeModal.bind(this);
        this.newTitle = this.newTitle.bind(this);
        this.newIngredients = this.newIngredients.bind(this);
        this.addNewRecipe = this.addNewRecipe.bind(this);
    }

    // adding recipe function, opens up add recipe modal
    openNewRecipeModal() {
        console.log("Adding recipe");
    }

    addNewRecipe(e) {
        e.preventDefault();
        let recipes = this.state.recipes;
        recipes[this.state.newTitle] = this.state.newIngredients.split(',');
        this.setState({ recipes: recipes, newTitle: "", newIngredients: "" });
    }

    newTitle(e) {
        this.setState({ newTitle: e.target.value.toString() });
    }

    newIngredients(e) {
        this.setState({ newIngredients: e.target.value });
    }

    render() {
        let titles = Object.keys(this.state.recipes);
        let recipes = titles.map((title, index) => {
            return (
                <Recipe key={index} title={title} ingredients={this.state.recipes[title]} />
            )
        });

        return (
            <div>
                <div className="recipe-container">
                    {recipes}
                </div>

                <div className="new-recipe">
                    <label htmlFor="newRecipe-title">Title: </label> <br />
                    <input id="newRecipe-title"
                        onChange={this.newTitle}
                        value={this.state.newTitle} />
                    <br />
                    <label htmlFor="newRecipe-ingredients">Ingredients: </label><br />
                    <input id="newRecipe-ingredients"
                        onChange={this.newIngredients}
                        value={this.state.newIngredients} autocomplete="off" />
                    <br />

                    <button onClick={this.addNewRecipe}> Add Recipe </button>
                </div>
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
            modalOpen: false,
            oldTitle: this.props.title,
            oldIngredients: this.props.ingredients,
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
        this.setState({
            oldTitle: this.state.title,
            oldIngredients: this.state.ingredients,
            modalOpen: false
        });
    }

    deleteRecipe() {
        console.log("delete recipe");
    }

    openRecipeModal() {
        this.setState({ modalOpen: true });
    }

    // if you close before you press save, recipe content will stay the same
    closeRecipeModal() {
        this.setState({
            modalOpen: false,
            title: this.state.oldTitle,
            ingredients: this.state.oldIngredients
        });
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
