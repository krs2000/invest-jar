import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div id="sidebar">
          <button className="history-btn">History ◕</button>
          <button className="invest-btn">Invest 🡅</button>
          <button className="cash-out-btn">Cash Out 🡇</button>
        </div>
        <div id="main">
          <div className="jar-box">
            <div className="default-star">🟊</div>
            <button className="properties-btn">☰
            </button>
            <div className="jar-top"></div>
            <div className="jar-middle">
            </div>
            <div className="jar-bottom">
              <div className="label">Jar</div>
              <div className="value">1020</div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


