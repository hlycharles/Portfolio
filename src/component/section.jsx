import React from "react";

import "./section.css";

export default class Section extends React.Component {
    render() {
        const theme = this.props.theme || "white";
        const className = `section section-${theme}`;
        return (
            <div className={className}>
                <h3 className="title">{this.props.title}</h3>
                {this.props.children}
            </div>
        );
    }
}
