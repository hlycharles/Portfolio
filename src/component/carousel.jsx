import React from "react";

import "./carousel.css";

import Section from "./section";

export default class Carousel extends React.Component {

    componentDidMount() {
        const imgs = this.props.imgs;
        if (imgs.length == 0) {
            return;
        }
        // calculate maximum height width ratio
        let maxHwRatio = -1;
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].hwRatio > maxHwRatio) {
                maxHwRatio = imgs[i].hwRatio;
            }
        }
        // calculate the maximum height needed
        const w = window.innerWidth;
        const imgW = (maxHwRatio >= 1.5) ? w * 0.3 : w * 0.35;
        const imgH = imgW * maxHwRatio;

        const imgElems = document.getElementsByClassName("carousel-img");
        for (let i = 0; i < imgElems.length; i++) {
            imgElems[i].style.width = `${imgW}px`;
            imgElems[i].style.height = `${imgH}px`;
        }
    }

    render() {
        if (this.props.imgs == null || this.props.imgs.length == 0) {
            return null;
        }
        const imgs = [];
        for (let i = 0; i < this.props.imgs.length; i++) {
            const img = this.props.imgs[i];
            imgs.push(<img src={`asset/${img.src}`} className="carousel-img" key={i} />);
        }
        return (
            <div className="carousel">{imgs}</div>
        );
    }
}
