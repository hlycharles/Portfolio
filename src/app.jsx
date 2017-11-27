import React from "react";
import Transition from "react-transition-group/Transition"
import $ from "jquery";

import Header from "./component/header.jsx";
import Home from "./screen/home.jsx";
import Work from "./screen/work.jsx";
import Project from "./screen/project.jsx";
import Subpage from "./screen/subpage.jsx";

import "./base.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "Home",
            // existing screens to render
            existingScreens: {
                "Home": true,
            },
            // scroll position on home page
            homePos: 0,
            // section of home page to show
            homeSection: null,
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
            homeSection: this.state.homeSection,
            onFinishShowSection: this.handleFinishShowSection.bind(this),
            renderType: this.state.renderType,
            onFinishShowSection: this.handleFinishShowSection.bind(this),
        };
        const workProps = {
            work: this.state.subPage,
            shouldDisplay: !!this.state.existingScreens["Work"],
        };
        const projectProps = {
            project: this.state.subPage,
            shouldDisplay: !!this.state.existingScreens["Project"],
        }

        // subpage components
        const projectComp = (
            <Project {...projectProps} />
        );
        const workComp = (
            <Work {...workProps} />
        );

        return (
            <div>
                <Header 
                    onSwitchScreen={this.switchScreen.bind(this)}
                    renderType={this.state.renderType}
                    onShowWork={this.handleShowSection("Work").bind(this)}
                    onShowProject={this.handleShowSection("Project").bind(this)}
                />
                {this.transitionify(Home, "Home", homeProps)}
                {this.transitionify(Work, "Work", workProps, workComp)}
                {this.transitionify(Project, "Project", projectProps, projectComp)}
            </div>
        );
    }

    transitionify(C, label, props, children) {
        if (children == null) {
            return (
                <Transition in={this.state.screen === label} timeout={0}>
                    {transitionState => (
                        <C 
                            transitionState={transitionState}
                            shouldDisplay={!!this.state.existingScreens[label]}
                            onTransitionEnd={this.handleTransitionEnd.bind(this)}
                            onSwitchScreen={this.switchScreen.bind(this)}
                            {...props}
                        />
                    )}
                </Transition>
            );
        }
        return (
            <Transition in={this.state.screen === label} timeout={0}>
                {transitionState => (
                    <Subpage 
                        transitionState={transitionState}
                        shouldDisplay={!!this.state.existingScreens[label]}
                        onTransitionEnd={this.handleTransitionEnd.bind(this)}
                        onSwitchScreen={this.switchScreen.bind(this)}
                        {...props}
                    >
                    {children}
                    </Subpage>
                )}
            </Transition>
        );
    }

    handleShowSection(section) {
        return () => {
            if ((!!this.state.existingScreens.Work) || (!!this.state.existingScreens.Project)) {
                // switch to home page to show home sections
                this.switchScreen("Home");
            }
            this.setState({
                homeSection: section,
            });
        }
    }

    handleFinishShowSection() {
        this.setState({
            homeSection: null,
        })
    }

    switchScreen(screen, arg) {
        const screens = this.state.existingScreens;
        screens[screen] = true;
        if (screen === "Work" || screen === "Project") {
            this.setState({
                subPage: arg,
            });
        }
        this.setState({
            screen: screen,
            existingScreens: screens,
        });
    }

    handleTransitionEnd() {
        // show only one page once transition ends
        const screens = {};
        screens[this.state.screen] = true;
        this.setState({
            existingScreens: screens,
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
