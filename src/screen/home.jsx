import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from "../component/carousel";
import { getProjects } from "../util/data.js";

import "./home.css";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false,
        };
    }

    componentDidMount() {
        const uri = "https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=247738439.1677ed0.64a10f284491469394a56afe85957451";
        const xhr = new XMLHttpRequest();
        xhr.open("GET", uri, true);
        xhr.onload = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.warn(xhr.statusText);
                }
            }
        };
        xhr.onerror = e => {
            console.error(xhr.transitionState);
        };
        xhr.send();
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
        if (this.props.transitionState === "entered" && nextProps.transitionState === "exiting") {
            this.props.onRecordHomePos(-$(".home-container-content").first().offset().top);
        }
        if (nextProps.transitionState === "entering") {
            $(".home-container").scrollTop(this.props.homePos);
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
        const projects = getProjects();
        const projectEntries = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            projectEntries.push(
                <Entry title={project.title} content={project.intro} name={project.name} key={i} />,
            );
        }     
        return (
            <div>
                {overlay}
                <div className={`home-container home-container-${transitionState}`}>
                    <div className="home-container-content">
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
                            {projectEntries}
                        </Section>
                        <Section title="Resume">
                            <button><h4 className="normal">Click to view</h4></button>
                        </Section>
                    </div>
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
