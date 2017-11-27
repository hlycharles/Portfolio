import React from "react";
import $ from "jquery";

import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from '../component/carousel';
import CloseBtn from "../component/closeBtn";

export default class Work extends React.Component {

    render() {
        if (!this.props.shouldDisplay) {
            return null;
        }        
        return (
            <div className="work-container">
                {/* work introduction */}
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
            </div>
        );
    }
}
