import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from "../component/carousel";
import { getIntro, getProjects, getWork } from "../util/data.js";
import { LanguageIcon } from "../util/type.js";

import "./home.css";

// number of recent Instagram photos to show
const instagramCount = 3;

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // gray overlay for transitioning between pages
            showOverlay: false,
            // introduction content
            intro: "",
            works: [],
            projects: [],
            // loaded Instagram images
            instagramImgs: [],
        };
    }

    componentWillMount() {
        getIntro(intro => {
            this.setState({
                intro: intro,
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

    componentDidMount() {
        this.requestInstagram();
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
            // show overlay during page transition
            this.setState({
                showOverlay: true,
            });
        }
        if (this.props.transitionState === "entered" && nextProps.transitionState === "exiting") {
            // record scroll position so that it can be recovered when returning to home page 
            this.props.onRecordHomePos(-$(".home-container-content").first().offset().top);
        }
        if (nextProps.transitionState === "entering") {
            // restore scroll position
            $(".home-container").scrollTop(this.props.homePos);
        } else if (
            nextProps.transitionState === "entered" &&
            nextProps.homeSection != null
        ) {
            const currScroll = $(".home-container").first().scrollTop();
            if ($(`#${nextProps.homeSection}`).position() != null) {
                $(".home-container").animate({
                    scrollTop: currScroll + $(`#${nextProps.homeSection}`).position().top - 100,
                }, 500, this.props.onFinishShowSection);
            }
        }
    }

    render() {
        const transitionState = this.props.transitionState;
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

        // project elements
        const projects = [];
        for (let i = 0; i < this.state.projects.length; i++) {
            const project = this.state.projects[i];
            // parse icons for programming languages
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
        
        // work elements
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
                        {/* personal introduction */}
                        <Intro id="intro-home">
                            <h2 className="title intro-text">Luyao Hou</h2>
                            <h5 className="intro-text">{this.state.intro}</h5>
                        </Intro>
                        <Section title="Instagram" padding={false}>
                            <Carousel 
                                imgs={this.state.instagramImgs}
                                renderType={this.props.renderType}
                                id="instagram"
                            />
                            {/* external link to personal Instagram page */}
                            <button className="section-btn" onClick={this.handleInstaClick.bind(this)}>
                                <h4>See more</h4>
                            </button>
                        </Section>
                        {/* Work experience section */}
                        <Section title="Work Experiences" theme="gray" id="Work">
                            {works}
                        </Section>
                        {/* Project section */}
                        <Section title="Projects" id="Project">
                            {projects}
                        </Section>
                        <Section title="Resume" theme="gray">
                            {/* Link to resume */}
                            <button onClick={this.handleResumeClick.bind(this)}><h4 className="normal">Press to view</h4></button>
                        </Section>
                    </div>
                </div>
            </div>
        );
    }

    handleInstagramResponse(response) {
        const data = response.data;
        const imgs = [];
        data.forEach(d => {
            const img = d.images["standard_resolution"];
            imgs.push({
                src: img.url,
                hwRatio: img.height / img.width,
                isUrl: true,
            });
        })
        this.setState({
            instagramImgs: imgs,
        });
    }

    requestInstagram() {
        const uri = `https://api.instagram.com/v1/users/self/media/recent?access_token=247738439.1677ed0.64a10f284491469394a56afe85957451&count=${instagramCount}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", uri, true);
        xhr.onload = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.handleInstagramResponse(JSON.parse(xhr.responseText));
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
        // open resume in pdf format in new window
        window.open("data/resume.pdf", "_blank");
    }

    handleAnimationEnd() {
        this.setState({
            showOverlay: false,
        });
    }
}
