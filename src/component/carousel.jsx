import React from "react";

import "./carousel.css";

import Section from "./section";

export default class Carousel extends React.Component {

    componentDidMount() {
        const imgs = this.props.imgs;
        if (imgs.length == 0) {
            return;
        }
        // calculate the maximum height needed
        const w = window.innerWidth;
        const imgW = w * 0.35;
        let imgH = -1;
        for (let i = 0; i < imgs.length; i++) {
            const h = imgW * imgs[i].hwRatio;
            if (h > imgH) {
                imgH = h;
            }
        }
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
