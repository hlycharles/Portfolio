import React from "react";

import "./intro.css";

export default class Intro extends React.Component {

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
