import React from "react";

import "./closeBtn.css";

export default class CloseBtn extends React.Component {
    render() {
        return (
            <div className="close-btn-container">
                <button className="close-btn" onClick={this.props.onClick}>
                    <img src="asset/close_btn.svg" className="close-btn-img" />
                </button>
            </div>
        );
    }
}
