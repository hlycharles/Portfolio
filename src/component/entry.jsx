import React from "react";

import "./entry.css";
import { getProjectIcons } from "../util/data.js";

export default class Entry extends React.Component {
    render() {
        const imgs = [];
        if (this.props.name != null) {
            const icons = getProjectIcons(this.props.name);
            for (let i = 0; i < icons.length; i++) {
                const icon = icons[i];
                imgs.push(<img src={`asset/${icon}`} className="entry-img" key={i} />);
            }
        }
        return (
            <div className="entry">
                <div className="entry-title">
                    <h4 className="subtitle">{this.props.title}</h4>
                    <div className="entry-imgs">{imgs}</div>
                </div>
                <h5>{this.props.content}</h5>
            </div>
        );
    }
}
