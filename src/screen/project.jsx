import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from '../component/carousel';
import CloseBtn from "../component/closeBtn";

import "./project.css";

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCloseBtn: false,
        };
    }

    componentDidUpdate() {
        const containers = document.getElementsByClassName("project-container");
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
        const imgs = [];
        if (this.props.project.imgs.length > 0) {
            this.props.project.imgs.forEach(img =>{
                imgs.push({
                    src: img,
                    hwRatio: 1,
                });
            })
        }
        return (
            <div className={`project-container project-container-${this.props.transitionState}`}>
                <div className="project-container-content">
                    <Intro id="intro-project">
                        <h2 className="title intro-text">{this.props.project.title}</h2>
                        <h5 className="intro-text">{this.props.project.description}</h5>
                    </Intro>
                    {
                        imgs.length > 0 &&
                        <Section theme="gray"><Carousel imgs={imgs} /></Section>
                    }
                    <Section title="Summary">
                        <Entry content={this.props.project.summary} />
                    </Section>
                    <Section title="Technologies" theme="gray">
                        <Entry content={this.props.project.technology} />
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
