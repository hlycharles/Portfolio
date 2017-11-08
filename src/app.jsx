import React from "react";
import Transition from "react-transition-group/Transition"

import Header from "./component/header.jsx";
import Home from "./screen/home.jsx";
import Work from "./screen/work.jsx";

import "./base.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "Home",
            screenInit: {
                "Home": true,
            },
        };
    }

    render() {
        return (
            <div>
                <Header onSwitchScreen={this.switchScreen.bind(this)}/>
                {this.transitionify(Home, "Home")}
                {this.transitionify(Work, "Work")}
            </div>
        );
    }

    transitionify(C, label, props) {
        return (
            <Transition in={this.state.screen === label} timeout={0}>
                {transitionState => (
                    <C 
                        transitionState={transitionState}
                        shouldDisplay={!!this.state.screenInit[label]}
                        onTransitionEnd={this.handleTransitionEnd.bind(this)}
                    />
                )}
            </Transition>
        );
    }

    switchScreen(screen) {
        const screens = this.state.screenInit;
        screens[screen] = true;
        this.setState({
            screen: screen,
            screenInit: screens,
        });
    }

    handleTransitionEnd() {
        const screens = {};
        screens[this.state.screen] = true;
        this.setState({
            screenInit: screens,
        });
    }
}
