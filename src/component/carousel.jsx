import React from "react";

import "./carousel.css";

import Section from "./section";

export default class Carousel extends React.Component {

    componentDidMount() {
        const w = window.innerWidth;
        const imgs = document.getElementsByClassName("carousel-img");
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.width = `${w * 0.35}px`;
            imgs[i].style.height = `${w * 0.35}px`;
        }
    }

    render() {
        return (
            <div className="carousel">
                <img src="asset/yosemite.jpg" className="carousel-img"/>
                <img src="asset/yosemite.jpg" className="carousel-img"/>
                <img src="asset/yosemite.jpg" className="carousel-img"/>
            </div>
        );
    }
}
