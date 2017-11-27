import React from "react";

import "./entry.css";

export default class Entry extends React.Component {

    render() {
        const imgs = [];
        if (this.props.imgs != null) {
            for (let i = 0; i < this.props.imgs.length; i++) {
                imgs.push(<img src={`asset/${this.props.imgs[i]}`} className="entry-img" key={i} />);
            }
        }
        const titleElem = <h4 className="subtitle">{this.props.title}</h4>;
        const btnClass = (imgs.length === 0) ? "wide" : "short";
        return (
            <div className="entry">
                {this.props.title != null && 
                    <div className="entry-title">
                        {
                            // make title a button if the component is clickable
                            this.props.onClick == null ?
                            titleElem :
                            <button className={btnClass} onClick={this.props.onClick}>{titleElem}</button>
                        }
                        {imgs.length > 0 && <div className="entry-imgs">{imgs}</div>}
                    </div>
                }
                <p className="entry-content">{this.props.content}</p>
            </div>
        );
    }
}
