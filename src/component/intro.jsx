import React from "react";

import "./intro.css";

export default class Intro extends React.Component {

    componentDidMount() {
        // set intro section height based on window height
        const h = window.innerHeight;
        const introH = h * 0.6;
        document.getElementsByClassName("intro-wrapper")[0].style.height = `${introH}px`;
    }

    render() {
        return (
            <div className="intro-wrapper">
                <div className="intro">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
