import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Carousel from '../component/carousel';
import CloseBtn from "../component/closeBtn";

import "./work.css";

export default class Work extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCloseBtn: false,
        };
    }

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
                <div className="work-container-content">
                    <Intro id="intro-work">
                        <h2 className="title intro-text">Internship</h2>
                    </Intro>
                    <Section title="Photos" padding={false}>
                        <Carousel imgs={instaImgs}/>
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
