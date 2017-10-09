import React from 'react';

// renders modal for adding new recipe
class NewRecipeModal extends React.Component {
    render() {
        if (this.props.open) {
            return (
                <div>
                    <div className="modal new-recipe">
                        <h2 className="card-title"> New Recipe </h2>
                        <label htmlFor="newTitle">Title: </label><br />
                        <input id="newTitle" type="text" placeholder="Recipe title"
                            value={this.props.newTitle}
                            onChange={this.props.onChange} />
                        <br />

                        <label htmlFor="newImage">Image: </label><br />
                        <input id="newImage" type="text" placeholder="Image url"
                            value={this.props.newImage}
                            onChange={this.props.onChange} />
                        <br />

                        <label htmlFor="newIngredients">Ingredients: </label><br />
                        <input id="newIngredients" type="text" placeholder="Key ingredients"
                            value={this.props.newIngredients}
                            onChange={this.props.onChange} />
                        <br />

                        <label htmlFor="newDescription">Description: </label><br />
                        <textarea id="newDescription" className="description" placeholder="Description"
                            onChange={this.props.onChange}>{this.props.newDescription}</textarea>

                        <button onClick={this.props.onSave}>Save </button>
                        <button onClick={this.props.onCancel}>Cancel </button>

                        <p className="error-message">{this.props.onError}</p>

                        <div className="modal-bottom-padding"></div>
                    </div>

                    <div className="overlay" onClick={this.props.onCancel}> </div>
                </div>
            )
        } else {
            return (
                null
            )
        }
    }
}

export { NewRecipeModal }