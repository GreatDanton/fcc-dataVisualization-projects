import React, { Component } from 'react';
import marked from 'marked';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let m = marked(e.target.value);
        this.setState({ markdown: m });
    }

    render() {
        return (
            <div className="container">
                <h2 className="title"> Markdown Previewer </h2>
                <div className="row">
                    <textarea className="half left" onChange={this.onChange} placeholder={"Type markdown here"} />
                    <div className="display" dangerouslySetInnerHTML={{ __html: this.state.markdown }}></div>
                </div>
                <div className="display">{this.state.markdown}</div>
            </div >
        );
    }
}

export { App }