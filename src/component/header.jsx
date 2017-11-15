import React from "react";

import "./header.css";

export default class Header extends React.Component {

    render() {
        return (this.props.renderType === "full") ? this.renderFullHeader() : this.renderLiteHeader();
    }

    renderFullHeader() {
        return (
            <div className="header">
                <div className="social-link">
                    <button className="header-btn insta-btn" onClick={this.handleInstaClick.bind(this)}>
                        <img className="btn-img" src="asset/insta.png" />
                    </button>
                </div>
                <button className="header-btn home-btn" onClick={this.handleSwitchScreen("Home").bind(this)}>
                    <img className="btn-img" src="asset/home.png" />
                </button>
                <div className="page-link">
                    <button className="page-btn">
                        <h5>Work</h5>
                    </button>
                    <button className="page-btn"><h5>Projects</h5></button>
                    <button className="page-btn"><h5>Resume</h5></button>
                </div>
            </div>
        );
    }

    renderLiteHeader() {
        return  (
            <div className="header">
                <div className="social-link">
                    <button className="header-btn insta-btn" onClick={this.handleInstaClick.bind(this)}>
                        <img className="btn-img" src="asset/insta.png" />
                    </button>
                </div>
                <div className="page-link">
                    <button className="page-btn">
                        <h5>Work</h5>
                    </button>
                    <button className="page-btn"><h5>Projects</h5></button>
                    <button className="page-btn"><h5>Resume</h5></button>
                </div>
            </div>
        );
    }

    handleSwitchScreen(screen) {
        return () => {
            this.props.onSwitchScreen(screen);
        }
    }

    handleInstaClick() {
        window.open("https://www.instagram.com/hlycharles/", "_blank");
    }
}
