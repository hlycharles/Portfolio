import React from "react";

import "./entry.css";

export default class Entry extends React.Component {
    render() {
        return (
            <div className="entry">
                <h4 className="subtitle">{this.props.title}</h4>
                <h5>{this.props.content}</h5>
            </div>
        );
    }
}
