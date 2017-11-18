import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from '../component/carousel';
import CloseBtn from "../component/closeBtn";

import "./work.css";

export default class Work extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCloseBtn: false,
            hasTransitionListener: false,
        };
    }

    componentDidUpdate() {
        const containers = document.getElementsByClassName("work-container");
        if (containers.length > 0 && !this.state.hasTransitionListener) {
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

    render() {
        if (!this.props.shouldDisplay) {
            return null;
        }        
        return (
            <div className={`work-container work-container-${this.props.transitionState}`}>
                <div className="work-container-content">
                    <Intro id="intro-work">
                        <h2 className="title intro-text">{this.props.work.title}</h2>
                        <h5 className="intro-text">{this.props.work.description}</h5>
                    </Intro>
                    <Section title="Summary">
                        <Entry content={this.props.work.summary} />
                    </Section>
                    <Section title="Technologies" theme="gray">
                        <Entry content={this.props.work.technology} />
                    </Section>
                    {this.state.showCloseBtn && <CloseBtn onClick={this.handleCloseBtnClick.bind(this)}/>}
                </div>
            </div>
        );
    }

    handleTransitionEnd() {
        if (this.props.transitionState === "entered") {
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
        this.setState({
            showCloseBtn: false,
        });
        this.props.onSwitchScreen("Home");
    }
}
