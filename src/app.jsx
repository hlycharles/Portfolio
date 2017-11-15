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
            homePos: 0,
            subPage: {},
            renderType: "full",
        };
    }

    componentWillMount() {
        this.checkWindowSize();
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkWindowSize.bind(this));
    }

    render() {
        const homeProps = {
            homePos: this.state.homePos,
            onRecordHomePos: this.handleRecordHomePos.bind(this),
            renderType: this.state.renderType,
            onSwitchScreen: this.switchScreen.bind(this),
        };
        const workProps = {
            onSwitchScreen: this.switchScreen.bind(this),
            work: this.state.subPage,
        };
        return (
            <div>
                <Header onSwitchScreen={this.switchScreen.bind(this)} renderType={this.state.renderType}/>
                {this.transitionify(Home, "Home", homeProps)}
                {this.transitionify(Work, "Work", workProps)}
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
                        {...props}
                    />
                )}
            </Transition>
        );
    }

    switchScreen(screen, arg) {
        const screens = this.state.screenInit;
        screens[screen] = true;
        if (screen === "Work") {
            this.setState({
                subPage: arg,
            });
        }
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

    handleRecordHomePos(pos) {
        this.setState({
            homePos: pos, 
        });
    }

    checkWindowSize() {
        const type = (window.innerWidth <= 992) ? "lite" : "full";
        this.setState({
            renderType: type,
        });
    }
}
