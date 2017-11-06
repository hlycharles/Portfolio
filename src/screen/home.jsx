import React from "react";

import Header from "../component/header";
import Intro from "../component/intro";
import Section from "../component/section";
import Entry from "../component/entry";
import Carousel from "../component/carousel";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Intro>
                    <h2 className="title intro-text">Luyao Hou</h2>
                    <h5 className="intro-text">Hello</h5>
                </Intro>
                <Section title="Instagram" padding={false}>
                    <Carousel />
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
        );
    }
}
