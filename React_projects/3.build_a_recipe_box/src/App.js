import React from 'react';
import { RecipeContainer, ViewRecipe } from './Recipe';
import { NewRecipeModal } from './NewRecipe';


// Global storage for handling recipe data. Each component has access to globalStorage
// data
let defaultRecipes = {
    "Coffee": {
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/275px-A_small_cup_of_coffee.JPG",
        "ingredients": ["Hot Water", "Coffee"],
        "description": "First we boil the water then we place the coffee grounds into the water"
    },
    "Pasta": {
        "image": "http://www.simplyrecipes.com/wp-content/uploads/2006/09/italian-sausage-spaghetti-horiz-640.jpg",
        "ingredients": ["Hot water, Pasta"],
        "description": "First we make this and then we create that"
    },
    "More Coffee": {
        "image": "http://www.paleoplan.com/wp-content/uploads/2015/02/is-coffee-paleo.jpg",
        "ingredients": ["Coffee, more coffee"],
        "description": "Throw grounds of coffee into the boiling pot and brew that delicious coffee"
    }
};


// outer app container that is embedded into the app
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: "",
            // for storing data for new recipe
            newRecipeOpen: false,
            newTitle: "",
            newImage: "",
            newIngredients: "",
            newDescription: "",
            newRecipeError: "", // show error message if any field is empty

            // we are reusing new recipe template for saving and editing existing
            // recipes. If editRecipe == true, we are editing recipe and save function
            // should change existing recipe instead of submitting new
            editRecipe: false,
            editRecipeOldTitle: "",
            // for rendering view recipe modal
            viewRecipeOpen: false,
            viewRecipeData: "",
            viewRecipeTitle: ""
        }

        // handling new recipe modal window
        this.openNewRecipe = this.openNewRecipe.bind(this);
        this.newRecipeChange = this.newRecipeChange.bind(this);
        this.newRecipeSave = this.newRecipeSave.bind(this);
        this.newRecipeCancel = this.newRecipeCancel.bind(this);
        // opening recipe
        this.showRecipe = this.showRecipe.bind(this);
        this.recipeClose = this.recipeClose.bind(this);
        this.recipeDelete = this.recipeDelete.bind(this);
        this.recipeEdit = this.recipeEdit.bind(this);
    }

    // on component mount import recipes from local storage
    // otherwise load default three recipes
    componentWillMount() {
        let ls = localStorage.getItem('recipes');
        // recipes in local storage exist, load recipes from
        // local storage
        if (ls !== null) {
            this.setState({ recipes: JSON.parse(ls) });
            return;
        }
        // local storage does not exist => load default recipes
        this.setState({ recipes: defaultRecipes });
    }

    // open 'new' recipe modal, for creating new recipes
    // or modifying existing recipes
    openNewRecipe() {
        if (!this.state.newRecipeOpen) {
            this.setState({ newRecipeOpen: true });
        }
    }

    // set state when typing into input boxes in new recipe modal
    newRecipeChange(e) {
        let id = e.target.id;
        let val = e.target.value;
        this.setState({ [id]: val })
    }

    // Save new recipe to state and local storage or display
    // error message
    newRecipeSave() {
        let title = this.state.newTitle;
        let desc = this.state.newDescription;
        let image = this.state.newImage;
        let ingredients = this.state.newIngredients.split(',')
        let message = ""
        if (title.length < 1) {
            message += "Empty title is not allowed. "
        }

        // check if recipe with such title already exist
        // only perform this check if we are not editing existing
        // recipe
        if (!this.state.editRecipe) {
            if (this.state.recipes.hasOwnProperty(title)) {
                message += title + " already exist, please pick another recipe title. "
            }
        }

        if (desc.length < 1) {
            message += "Description should not be empty. "
        }

        if (image.length < 1) {
            message += "Image url should be present. "
        }

        // check if ingredients exist
        if (this.state.newIngredients.length < 1) {
            message += "Ingredients should not be empty. "
        }

        // if any error is present, inform user
        if (message.length > 1) {
            this.setState({ newRecipeError: message })
            return
        }

        let recipes = Object.assign({}, this.state.recipes)
        // if we are modifying existing recipe first we have to delete
        // exisiting recipe
        if (this.state.editRecipe) {
            delete recipes[this.state.editRecipeOldTitle]
        }

        // adding new recipe inside the state
        recipes[title] = {
            image: image,
            description: desc,
            ingredients: ingredients
        }
        this.setState({
            recipes: recipes,
            newRecipeOpen: false, // close modal
            editRecipe: false, // we are not editing recipe anymore
        }, () => { this.clearNewFields() });
        // add recipes to local storage
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    // clears fields that populate modal for editing and modifying
    // existing recipes
    clearNewFields() {
        this.setState({
            newTitle: "",
            newImage: "",
            newIngredients: "",
            newDescription: "",
            editRecipeOldTitle: ""
        })
    }

    // if cancel button on the newRecipe modal is pressed, close modal
    // and overlay
    newRecipeCancel() {
        // close recipe modal and clear any error message
        this.setState({ newRecipeOpen: !this.state.newRecipeOpen, newRecipeError: "" })
    }

    // when recipe div is clicked display modal with recipe details
    // description and ingredients
    showRecipe(e) {
        let title = e.currentTarget.id;
        this.setState({
            viewRecipeOpen: !this.state.viewRecipeOpen,
            viewRecipeData: this.state.recipes[title],
            viewRecipeTitle: title
        })
    }

    // close recipe details modal
    recipeClose() {
        this.setState({ viewRecipeOpen: !this.state.viewRecipeOpen })
    }

    // Delete chosen recipe
    recipeDelete() {
        let recipes = Object.assign({}, this.state.recipes); // creating copy
        delete recipes[this.state.viewRecipeTitle]
        this.setState({ recipes: recipes });
        localStorage.setItem('recipes', JSON.stringify(recipes)); // add to local storage
        this.recipeClose();
    }

    // Editing existing recipe
    recipeEdit() {
        let title = this.state.viewRecipeTitle;
        let recipe = this.state.recipes[title];
        this.recipeClose();
        let img = recipe.image;
        let ingred = recipe.ingredients.join(', ');
        let desc = recipe.description;
        this.setState({
            newTitle: title,
            newImage: img,
            newIngredients: ingred,
            newDescription: desc,
            // open template
            newRecipeOpen: !this.state.newRecipeOpen,
            // By turning editRecipe to true we tell the save function
            // to mutate existing recipe instead of adding new
            editRecipe: !this.state.editRecipe,
            editRecipeOldTitle: title
        });
    }

    render() {
        return (
            <div className="app">
                <div className="navbar">
                    <h1 className="title">Recipe Box</h1>
                    <div className="spacer"></div>
                    <button onClick={this.openNewRecipe}>New Recipe</button>
                </div>
                <NewRecipeModal
                    onChange={this.newRecipeChange}
                    open={this.state.newRecipeOpen}
                    onSave={this.newRecipeSave}
                    onCancel={this.newRecipeCancel}
                    onError={this.state.newRecipeError}
                    newTitle={this.state.newTitle}
                    newImage={this.state.newImage}
                    newIngredients={this.state.newIngredients}
                    newDescription={this.state.newDescription}
                />

                <RecipeContainer recipes={this.state.recipes} onClick={this.showRecipe} />

                <ViewRecipe open={this.state.viewRecipeOpen}
                    title={this.state.viewRecipeTitle}
                    data={this.state.viewRecipeData}
                    close={this.recipeClose}
                    delete={this.recipeDelete}
                    edit={this.recipeEdit} />
            </div>
        )
    }
}

export default App;
