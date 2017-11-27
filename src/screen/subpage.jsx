import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from '../component/carousel';
import CloseBtn from "../component/closeBtn";

import "../transition.css";

export default class Subpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCloseBtn: false,
            // avoid adding listener multiple times
            hasTransitionListener: false,
        };
    }

    componentDidUpdate() {
        const containers = document.getElementsByClassName("ts-page");
        if (containers.length > 0 && !this.state.hasTransitionListener) {
            // avoid adding listener multiple times
            containers[0].addEventListener("webkitTransitionEnd", this.handleTransitionEnd.bind(this), false);
            containers[0].addEventListener("transitionend", this.handleTransitionEnd.bind(this), false);
            containers[0].addEventListener("msTransitionEnd", this.handleTransitionEnd.bind(this), false);
            if (this.props.transitionState !== "exiting" && this.props.transitionState !== "exited") {
                this.setState({
                    hasTransitionListener: true,
                });
            }
        }
    }

    componentWillUnmount() {
        const containers = document.getElementsByClassName("ts-page");
        if (containers.length > 0) {
            // avoid adding listener multiple times
            containers[0].addEventListener("webkitTransitionEnd");
            containers[0].addEventListener("transitionend");
            containers[0].addEventListener("msTransitionEnd");
            if (this.props.transitionState !== "exiting" && this.props.transitionState !== "exited") {
                this.setState({
                    hasTransitionListener: true,
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.transitionState === "entered" && nextProps.transitionState === "exiting") {
            this.setState({
                showCloseBtn: false,
            })
        }
    }

    render() {
        if (!this.props.shouldDisplay) {
            return null;
        }
        
        return (
            <div className={`ts-page ts-page-${this.props.transitionState}`}>
                {this.props.children}
                {this.state.showCloseBtn && <CloseBtn onClick={this.handleCloseBtnClick.bind(this)}/>}
            </div>
        );
    }

    handleTransitionEnd() {
        if (this.props.transitionState === "entered") {
            // show close button only after the page has fully entered
            this.setState({
                showCloseBtn: true,
            });
        } else if (this.props.transitionState === "exited") {
            this.setState({
                hasTransitionListener: false,
            });
        }
        this.props.onTransitionEnd()
    }

    handleCloseBtnClick() {
        // hide close button
        this.setState({
            showCloseBtn: false,
        });
        this.props.onSwitchScreen("Home");
    }
}
