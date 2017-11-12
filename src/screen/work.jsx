import React from "react";
import $ from "jquery";

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

    componentWillReceiveProps(nextProps) {
        if (this.props.transitionState === "entered" && nextProps.transitionState === "exiting") {
            window.scrollTo(0, 0);
        }
    }

    render() {
        if (!this.props.shouldDisplay) {
            return null;
        }
        const instaImgs = [
            {
                src: "yosemite.jpg",
                hwRatio: 1,
            },{
                src: "yosemite.jpg",
                hwRatio: 1,
            }, {
                src: "yosemite.jpg",
                hwRatio: 1,
            },
        ];
        return (
            <div className={`work-container work-container-${this.props.transitionState}`}>
                <Intro id="intro-work">
                    <h2 className="title intro-text">Internship</h2>
                </Intro>
                <Section title="Photos" padding={false}>
                    <Carousel imgs={instaImgs}/>
                </Section>
            </div>
        );
    }

    handleTransitionEnd() {
        if (this.props.transitionState === "entered") {
            const workContainers = document.getElementsByClassName("work-container");
            if (workContainers != null && workContainers.length > 0) {
                const workContainer = workContainers[0];
                workContainer.classList.add("work-container-transition-complete");
            }
        }
        this.props.onTransitionEnd()
    }
}
