import React from "react";

import "./intro.css";

export default class Intro extends React.Component {

    componentDidMount() {
        // set intro section height based on window height
        const h = window.innerHeight;
        const introH = h * 0.6;
        document.getElementById(this.props.id).style.height = `${introH}px`;
    }

    render() {
        return (
            <div className="intro-wrapper" id={this.props.id}>
                <div className="intro">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
