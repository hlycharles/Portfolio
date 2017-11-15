import React from "react";

import "./entry.css";
import { getProjectIcons } from "../util/data.js";

export default class Entry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
        };
    }

    componentWillMount() {
        this.parseImgs(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.parseImgs(nextProps);
    }

    render() {
        const imgs = [];
        for (let i = 0; i < this.state.imgs.length; i++) {
            imgs.push(<img src={`asset/${this.state.imgs[i]}`} className="entry-img" key={i} />);
        }
        return (
            <div className="entry">
                <div className="entry-title">
                    <h4 className="subtitle">{this.props.title}</h4>
                    {imgs.length > 0 && <div className="entry-imgs">{imgs}</div>}
                </div>
                <h5>{this.props.content}</h5>
            </div>
        );
    }

    parseImgs(props) {
        const imgs = [];
        if (props.name != null) {
            const icons = getProjectIcons(props.name);
            for (let i = 0; i < icons.length; i++) {
                const icon = icons[i];
                imgs.push(icon);
            }
        }
        this.setState({
            imgs: imgs,
        });
    }
}
