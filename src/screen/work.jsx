import React from "react";

import Intro from "../component/intro";
import Section from "../component/section";
import Carousel from '../component/carousel';

import "./work.css";

export default class Work extends React.Component {

    componentDidUpdate() {
        const containers = document.getElementsByClassName("work-container");
        if (containers.length > 0) {
            containers[0].addEventListener("webkitTransitionEnd", this.handleTransitionEnd.bind(this), false);
            containers[0].addEventListener("transitionend", this.handleTransitionEnd.bind(this), false);
            containers[0].addEventListener("msTransitionEnd", this.handleTransitionEnd.bind(this), false);
        }
    }

    render() {
        if (!this.props.shouldDisplay) {
            return null;
        }
        return (
            <div className={`work-container work-container-${this.props.transitionState}`}>
                <Intro id="intro-work">
                    <h2 className="title intro-text">Internship</h2>
                </Intro>
                <Section title="Photos" padding={false}>
                    <Carousel />
                </Section>
            </div>
        );
    }

    handleTransitionEnd() {
        this.props.onTransitionEnd()
    }
}
