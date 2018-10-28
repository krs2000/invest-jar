import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'



class Home extends Component {
  

componentDidUpdate(){
  // console.log(this.props)
}
componentDidMount(){
  // console.log(this.props)
}


  render() {
    return (
      <div className='home'>
      <Sidebar activeLink={this.props.location.pathname}/>
        <div id='main'>
          <div className='jar-box'>
            {/* <div className='default-star'>🟊</div> */}
            {/* <button className='properties-btn'>☰
            </button> */}
            <div className='jar-top'></div>
            <div className='jar-middle'>
            </div>
            <div className='jar-bottom'>
              <div className='label'>{this.props.jarList.label}</div>
              <div className='value'>{this.props.jarList.account}</div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
	return {
		jarList: state.jarList[0]
	};
}
export default connect(mapStateToProps,  {})(Home);