import React from "react";

import "./header.css";

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="social-link">
                    <button className="header-btn insta-btn">
                        <img className="btn-img" src="asset/insta.png" />
                    </button>
                </div>
                <button className="header-btn home-btn">
                    <img className="btn-img" src="asset/home.png" />
                </button>
                <div className="page-link">
                    <button className="page-btn"><h5>Work</h5></button>
                    <button className="page-btn"><h5>Projects</h5></button>
                    <button className="page-btn"><h5>Resume</h5></button>
                </div>
            </div>
        );
    }
}