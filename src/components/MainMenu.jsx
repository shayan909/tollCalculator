
import React, { Component } from 'react'

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "Toll Calculator Main Menu"
        };
    }
 
    render() {
        return (
            <div className="container">
                <h1>{this.state.heading}</h1>
                <button className="button"
                    onClick={() => this.props.nextStep(1)}>Entry Toll</button>

                <button className="button"
                    onClick={() => this.props.nextStep(2)}>Exit Toll</button>
            </div>)
    }
}
