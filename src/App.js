import React, { Component } from 'react';
import { Carousel } from './Carousel/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>我靠，Carousel组件</h1>
        <Carousel>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
        </Carousel>
      </div>
    );
  }
}

export default App;
