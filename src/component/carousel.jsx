import React from "react";
import $ from "jquery";

import "./carousel.css";

import Section from "./section";

export default class Carousel extends React.Component {

    componentDidMount() {
        this.setImgSize(this.props.imgs);
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize.bind(this));
    }

    componentDidUpdate() {
        // update image size when carousel updates
        this.setImgSize(this.props.imgs);
    }

    render() {
        if (this.props.imgs == null || this.props.imgs.length == 0) {
            return null;
        }
        const imgs = [];
        for (let i = 0; i < this.props.imgs.length; i++) {
            const img = this.props.imgs[i];
            // image can be from a url or local source
            const uri = (!!img.isUrl) ? img.src : `asset/${img.src}`;
            imgs.push(<img src={uri} className="carousel-img" key={i} />);
        }
        return (
            <div className="carousel" id={this.props.id}>{imgs}</div>
        );
    }

    setImgSize(imgs) {
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

        // set image width based on window and image size
        let imgW = 0;
        if (this.props.renderType == null || this.props.renderType === "full") {
            imgW = (maxHwRatio >= 1.5) ? w * 0.3 : w * 0.35;
        } else {
            imgW = (maxHwRatio >= 1.5) ? w * 0.5 : w * 0.6;
        }
        const imgH = imgW * maxHwRatio;

        $(`#${this.props.id}.carousel > img`).width(imgW);
        $(`#${this.props.id}.carousel > img`).height(imgH);
    }

    handleResize() {
        this.setImgSize(this.props.imgs);
    }
}
