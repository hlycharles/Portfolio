import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from '../component/carousel';
import CloseBtn from "../component/closeBtn";

export default class Project extends React.Component {

    render() {
        if (!this.props.shouldDisplay) {
            return null;
        }
        const imgs = [];
        if (this.props.project.imgs.length > 0) {
            this.props.project.imgs.forEach(img =>{
                // get source uri and height width ratio
                const imgInfo = img.split("&");
                imgs.push({
                    src: `project/${this.props.project.id}/${imgInfo[0]}`,
                    hwRatio: parseFloat(imgInfo[1]),
                });
            })
        }
        return (
            <div className="project-container">
                {/* project introduction */}
                <Intro id="intro-project">
                    <h2 className="title intro-text">{this.props.project.title}</h2>
                    <h5 className="intro-text">{this.props.project.description}</h5>
                </Intro>
                {
                    // optional project images
                    imgs.length > 0 &&
                    <Section theme="gray" padding={false}>
                        <Carousel
                            imgs={imgs}
                            renderType={this.props.renderType}
                            id={`project_${this.props.project.id}`}
                        />
                    </Section>
                }
                <Section title="Summary">
                    <Entry content={this.props.project.summary} />
                </Section>
                <Section title="Technologies" theme="gray">
                    <Entry content={this.props.project.technology} />
                </Section>
            </div>
        );
    }
}
