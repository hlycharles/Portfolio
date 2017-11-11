import React from "react";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from "../component/carousel";

import "./home.css";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false,
        };
    }

    componentDidUpdate() {
        const overlays = document.getElementsByClassName("shadow-overlay");
        if (overlays.length > 0) {
            overlays[0].addEventListener("webkitAnimationEnd", this.handleAnimationEnd.bind(this), false);
            overlays[0].addEventListener("animationend", this.handleAnimationEnd.bind(this), false);
            overlays[0].addEventListener("msAnimationEnd", this.handleAnimationEnd.bind(this), false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.transitionState === "exiting" || nextProps.transitionState === "entering") {
            this.setState({
                showOverlay: true,
            });
        }
    }

    render() {
        const transitionState = this.props.transitionState
        if (!this.props.shouldDisplay) {
            return null;
        }
        let overlay = null;
        if (this.state.showOverlay) {
            if (transitionState === "exited") {
                overlay = (
                    <div className="shadow-overlay shadow-overlay-enter"></div>
                );
            } else if (transitionState === "entered") {
                overlay = (
                    <div className="shadow-overlay shadow-overlay-exit"></div>
                );
            }
        }
        // instagram images
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
            <div>
                {overlay}
                <div className={`home-container home-container-${transitionState}`}>
                    <Intro id="intro-home">
                        <h2 className="title intro-text">Luyao Hou</h2>
                        <h5 className="intro-text">Hello</h5>
                    </Intro>
                    <Section title="Instagram" padding={false}>
                        <Carousel imgs={instaImgs}/>
                    </Section>
                    <Section title="Work Experiences">
                        <Entry title="Software Intern" content="Remitly Seattle"/>
                    </Section>
                    <Section title="Projects" theme="gray">
                        <Entry title="iOS Reminder App" content="XCode" />
                    </Section>
                    <Section title="Resume">
                        <button><h4 className="normal">Click to view</h4></button>
                    </Section>
                </div>
            </div>
        );
    }

    handleAnimationEnd() {
        this.setState({
            showOverlay: false,
        });
    }
}
