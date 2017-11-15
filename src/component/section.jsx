import React from "react";

import "./section.css";

export default class Section extends React.Component {
    render() {
        const theme = this.props.theme || "white";
        const padding = (this.props.padding == null || this.props.padding) ? "pad" : "nopad";
        const className = `section section-${theme} section-${padding}`;
        return (
            <div className={className}>
                {this.props.title != null && <h3 className="title">{this.props.title}</h3>}
                {this.props.children}
            </div>
        );
    }
}
