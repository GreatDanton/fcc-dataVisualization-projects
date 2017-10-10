import React from 'react';
import { CloseModal } from './closeButton';

class RecipeContainer extends React.Component {
    render() {
        let titles = Object.keys(this.props.recipes)
        let recipes = titles.map((title, index) => {
            let image = this.props.recipes[title].image
            return (
                <Recipe image={image} title={title} key={index} onClick={this.props.onClick} />
            )
        });
        return (
            <div className="recipe-container">
                {recipes}
            </div>
        )
    }
}


// Recipe component, displaying each recipe in the global storage
class Recipe extends React.Component {
    render() {
        return (
            <div id={this.props.title} className="recipe" onClick={this.props.onClick}>
                <img src={this.props.image} alt={this.props.title} />
                <div className="title">{this.props.title}</div>
            </div>
        )
    }
}

// ViewRecipe component is displaying details of the chosen recipe, provided via props
class ViewRecipe extends React.Component {
    render() {
        if (this.props.open) {
            return (
                <div>
                    <div className="modal view-recipe">
                        <CloseModal onClick={this.props.close} />

                        <h2 className="title"> {this.props.title} </h2>
                        <img src={this.props.data.image} alt={this.props.title} />
                        <h3> Ingredients: </h3>
                        <ul>
                            {this.props.data.ingredients.map((ingredient, index) => {
                                return (
                                    <li key={index}> {ingredient}</li>
                                )
                            })}
                        </ul>
                        <h3> Description </h3>
                        <p>{this.props.data.description}</p>

                        <div className="btn-manage-row">
                            <button onClick={this.props.edit}>Edit</button>
                            <button onClick={this.props.delete}>Delete</button>
                        </div>

                        <div className="modal-bottom-padding"></div>
                    </div>
                    <div className="overlay" onClick={this.props.close}></div>
                </div>
            )

        } else {
            return (null)
        }
    }
}

export { RecipeContainer, ViewRecipe }