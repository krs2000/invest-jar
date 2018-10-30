import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'



class Home extends Component {


  componentDidUpdate() {
    // console.log(this.props)
  }
  componentDidMount() {
    // console.log(this.props)
  }

  returnJar = (x) => {
    return (
      <div className='jar-box' key={`jar-${x.id}`}>
        {/* <div className='default-star'>🟊</div> */}
        {/* <button className='properties-btn'>☰</button> */}
        <div className='jar-top'></div>
        <div className='jar-middle'></div>
        <div className='jar-bottom'>
        <div className='label'>{x.label}</div>
         <div className='value'>{x.account} {x.currency.sign}</div>
        </div>
        <div>
        </div>
      </div>)
  }


  render() {
    return (
      <div className='home'>
        <Sidebar activeLink={this.props.location.pathname} />
        <div id='main'>
          {this.props.jarList && this.props.jarList.map(item => {
            return (this.returnJar(item))
          })}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    jarList: state.jarList
  };
}
export default connect(mapStateToProps, {})(Home);