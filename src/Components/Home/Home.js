import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar'
import { jars_update } from '../../Actions';



class Home extends Component {

  toggleDefault = (x) => {

    this.props.jarList.forEach(jar => {
      if (jar.id !== x.id)
      jar.isDefault = false;
      else
      jar.isDefault =  !jar.isDefault;
    });
 
    this.props.jars_update(  this.props.jarList)
  }

  returnJar = (x) => {
    return (
      <div className='jar-box' key={`jar-${x.id}`}>
        {x.isDefault ? <div className='default-star'>🟊</div> : ''}
        <button className='properties-btn'
          onClick={() => this.toggleDefault(x)}
        >🟊</button>
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
export default connect(mapStateToProps, { jars_update })(Home);