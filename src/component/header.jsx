import React from "react";

import "./header.css";

export default class Header extends React.Component {

    render() {
        return (this.props.renderType === "full") ? this.renderFullHeader() : this.renderLiteHeader();
    }

    renderFullHeader() {
        return (
            <div className="header">
                {/* social media links */}
                <div className="social-link">
                    <button className="header-btn insta-btn" onClick={this.handleInstaClick.bind(this)}>
                        <img className="btn-img" src="asset/insta.png" />
                    </button>
                </div>
                {/* home button */}
                <button className="header-btn home-btn" onClick={this.handleSwitchScreen("Home").bind(this)}>
                    <img className="btn-img" src="asset/home.png" />
                </button>
                {/* links to sections on home page */}
                <div className="page-link">
                    <button className="page-btn" onClick={this.props.onShowWork}>
                        <h5>Work</h5>
                    </button>
                    <button className="page-btn" onClick={this.props.onShowProject}>
                        <h5>Projects</h5>
                    </button>
                    <button className="page-btn" onClick={this.handleResumeClick.bind(this)}>
                        <h5>Resume</h5>
                    </button>
                </div>
            </div>
        );
    }

    // remove home button on smaller screens
    renderLiteHeader() {
        return  (
            <div className="header">
                {/* social media links */}
                <div className="social-link">
                    <button className="header-btn insta-btn" onClick={this.handleInstaClick.bind(this)}>
                        <img className="btn-img" src="asset/insta.png" />
                    </button>
                </div>
                {/* links to sections on home page */}
                <div className="page-link">
                    <button className="page-btn" onClick={this.props.onShowWork}>
                        <h5>Work</h5>
                    </button>
                    <button className="page-btn" onClick={this.props.onShowProject}>
                        <h5>Projects</h5>
                    </button>
                    <button className="page-btn" onClick={this.handleResumeClick.bind(this)}>
                        <h5>Resume</h5>
                    </button>
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

    handleResumeClick() {
        window.open("data/resume.pdf", "_blank");
    }
}
