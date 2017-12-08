import React, { Component } from 'react';

import './carousel.css';
const LEFT = false;
const RIGHT = true;
export class Carousel extends Component {
    state = {
        x: 0,
        touchStartX: 0,
        currentX: 0,
        currentIndex: 0,
        direction: null
    }
    componentDidMount() {
        this.childCount = React.Children.count(this.props.children) - 1;
    }

    onTouchStart = (event) => {
        this.setState({
            touchStartX: event.touches[0].clientX,
        })
    }
    onTouchMove = (event) => {
        if (event.touches[0]) {
            const delteX = event.touches[0].clientX - this.state.touchStartX
            this.setState({
                x: delteX + this.state.currentX,
                direction: delteX > 0 ? RIGHT : LEFT
            })
        }
    }
    onTouchEnd = (event) => {
        const fator = this.state.direction === LEFT ? -0.25 : 0.25;
        let currentIndex = Math.round(this.state.x / 200 + fator);

        const needToMove = currentIndex * 200 - this.state.x;
        const speed = 15;
        const ary = new Array(speed).fill(needToMove / speed);
        requestAnimationFrame(() => this.animation(ary, currentIndex));
    }

    animation = (ary, currentIndex) => {
        if (ary.length <= 0) {
            if (currentIndex < -this.childCount) {
                this.setState({
                    currentX: 0,
                    x: 0,
                    currentIndex: 0
                })
            }
            if (currentIndex > 0) {
                this.setState({
                    currentX: -200 * this.childCount,
                    x: -200 * this.childCount,
                    currentIndex: this.childCount
                })
            }
            return
        }
        const front = ary.shift();
        this.setState({
            currentX: currentIndex * 200,
            x: this.state.x + front,
            currentIndex: currentIndex
        })
        requestAnimationFrame(() => this.animation(ary, currentIndex))
    }

    renderCarouselItem = () => {
        const { currentIndex } = this.state;
        return React.Children.map(this.props.children, (child, index) => {
            return (
                <div
                    style={{
                        height: 200,
                        width: 200,
                        backgroundColor: `#${234 * (index + 1)}`,
                        ...childCSS,
                    }}
                    
                    className='Carousel child'
                >
                    {child}
                </div>
            )
        })
    }
    render() {
        const head = this.props.children[0];
        const tail = this.props.children[this.props.children.length - 1];

        return (
            <div className='Carousel'>
                <div className='Carousel-wrapper'
                    style={{
                        height: 200,
                        width: (this.props.children.length + 2) * 200,
                        transform: `translateX(${this.state.x - 200}px)`
                    }}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                >
                    <div
                        style={{
                            height: 200,
                            width: 200,
                            backgroundColor: `#${234 * (this.props.children.length)}`,
                            ...childCSS,
                        }}
                        className='Carousel child'
                    >
                        {tail}
                    </div>
                    {this.renderCarouselItem()}
                    <div
                        style={{
                            height: 200,
                            width: 200,
                            backgroundColor: `#${234 * (1)}`,
                            ...childCSS,
                        }}
                        className='Carousel child'
                    >
                        {head}
                    </div>
                </div>
            </div>
        )
    }
}

function getPosition(e) {

}

const childCSS = {
    color: 'white',
    float: 'left'
}
