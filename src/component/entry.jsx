import React from "react";

import "./entry.css";

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
        const titleElem = <h4 className="subtitle">{this.props.title}</h4>;
        return (
            <div className="entry">
                {this.props.title != null && 
                    <div className="entry-title">
                        {
                            this.props.onClick == null ?
                            titleElem :
                            <button onClick={this.props.onClick}>{titleElem}</button>
                        }
                        {imgs.length > 0 && <div className="entry-imgs">{imgs}</div>}
                    </div>
                }
                <p className="entry-content">{this.props.content}</p>
            </div>
        );
    }

    parseImgs(props) {
        let imgs = [];
        if (this.props.imgs != null) {
            imgs = this.props.imgs;
        }
        this.setState({
            imgs: imgs,
        });
    }
}
