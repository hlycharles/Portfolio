import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from "../component/carousel";
import { getIntro, getProjects, getWork } from "../util/data.js";
import { LanguageIcon } from "../util/type.js";

import "./home.css";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false,
            intro: "",
            works: [],
            projects: [],
        };
    }

    componentWillMount() {
        getIntro(content => {
            this.setState({
                intro: content,
            });
        })

        getProjects(projects => {
            this.setState({
                projects: projects,
            });
        });

        getWork(works => {
            this.setState({
                works: works,
            });
        });
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
        const projects = [];
        for (let i = 0; i < this.state.projects.length; i++) {
            const project = this.state.projects[i];
            let icons = [];
            if (project.languages.length > 0) {
                project.languages.forEach(l => {
                    if (LanguageIcon[l] != null) {
                        icons.push(`project/${LanguageIcon[l]}`);
                    }
                });
            }
            projects.push(
                <Entry 
                    title={project.title}
                    content={project.intro}
                    name={project.name}
                    imgs={icons}
                    onClick={this.handleProjectClick(project).bind(this)}
                    key={i}
                />,
            );
        }     
        const works = [];
        for (let i = 0; i < this.state.works.length; i++) {
            const work = this.state.works[i];
            works.push(
                <Entry title={work.title} content={work.intro} onClick={this.handleWorkClick(work).bind(this)} key={i} />
            );
        }
        return (
            <div>
                {overlay}
                <div className={`home-container home-container-${transitionState}`}>
                    <div className="home-container-content">
                        <Intro id="intro-home">
                            <h2 className="title intro-text">Luyao Hou</h2>
                            <h5 className="intro-text">{this.state.intro}</h5>
                        </Intro>
                        <Section title="Instagram" padding={false}>
                            <Carousel imgs={instaImgs}/>
                            <button className="section-btn" onClick={this.handleInstaClick.bind(this)}>
                                <h4>See more</h4>
                            </button>
                        </Section>
                        <Section title="Work Experiences" theme="gray">
                            {works}
                        </Section>
                        <Section title="Projects">
                            {projects}
                        </Section>
                        <Section title="Resume" theme="gray">
                            <button onClick={this.handleResumeClick.bind(this)}><h4 className="normal">Press to view</h4></button>
                        </Section>
                    </div>
                </div>
            </div>
        );
    }

    handleInstaClick() {
        window.open("https://www.instagram.com/hlycharles/", "_blank");
    }

    handleWorkClick(work) {
        return () => {
            this.props.onSwitchScreen("Work", work);
        }
    }

    handleProjectClick(project) {
        return () => {
            this.props.onSwitchScreen("Project", project);
        }
    }

    handleResumeClick() {
        window.open("/data/resume.pdf", "_blank");
    }

    handleAnimationEnd() {
        this.setState({
            showOverlay: false,
        });
    }
}
