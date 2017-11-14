import React from "react";

import "./header.css";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "full",
        };
    }

    componentWillMount() {
        this.checkWindowSize();
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkWindowSize.bind(this));
    }

    render() {
        return (this.state.type === "full") ? this.renderFullHeader() : this.renderLiteHeader();
    }

    renderFullHeader() {
        return (
            <div className="header">
                <div className="social-link">
                    <button className="header-btn insta-btn">
                        <img className="btn-img" src="asset/insta.png" />
                    </button>
                </div>
                <button className="header-btn home-btn" onClick={this.handleSwitchScreen("Home").bind(this)}>
                    <img className="btn-img" src="asset/home.png" />
                </button>
                <div className="page-link">
                    <button className="page-btn" onClick={this.handleSwitchScreen("Work").bind(this)}>
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
                    <button className="header-btn insta-btn">
                        <img className="btn-img" src="asset/insta.png" />
                    </button>
                </div>
                <div className="page-link">
                    <button className="page-btn" onClick={this.handleSwitchScreen("Work").bind(this)}>
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

    checkWindowSize() {
        const type = (window.innerWidth <= 992) ? "lite" : "full";
        this.setState({
            type: type,
        });
    }
}
