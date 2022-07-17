import React, { Component } from 'react'
import EntryToll from './EntryToll';
import ExitToll from './ExitToll';
import MainMenu from './MainMenu';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    prevStep = () => {
        this.setState({ step: 1 });
    }

    nextStep = (pos) => {
        const { step } = this.state;
        this.setState({
            step: step + pos,
        });

    }
    render() {
        switch (this.state.step) {
            case 1:
                return (
                    <MainMenu
                        nextStep={this.nextStep}
                    />

                )
            case 2:
                return (
                    <EntryToll
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}

                    />

                )
            case 3:
                return (
                    <ExitToll
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                    />
                )
            default:
            //do none
        };
    }
}

export default Form