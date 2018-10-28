import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import { savings_subtract, savings_add, history_add } from '../../Actions';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }


    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    canWidraw = () => {
        return this.state.value <= this.props.jarList[0].account ? true : false
    }

    handleSubmit = (e) => {
        if (this.props.activeLink === '/invest') {
            this.props.savings_add(this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[0] , 'Invest', Number(this.state.value), this.props.historyList)
        } else if (this.canWidraw()) {
            this.props.savings_subtract(this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[0] , 'Widraw', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')
        }
    };


    returnSidebar = () => {
        return (
            <div className='sidebar'>
                <Link to={`history`}>
                    <button className='grey-btn'>History ◕</button>
                </Link>
                <Link to={`invest`}>
                    <button className='green-btn'>Invest 🡅</button>
                </Link>
                <Link to={`widraw`}>
                    <button className='red-btn'>Widraw 🡇</button>
                </Link>
            </div>
        )
    }

    returnSidebarInvest = () => {
        return (
            <div className='sidebar'>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>🡄</button>
                </Link><h2>Add Investment</h2></div>
                <input className='input' type='number' placeholder='0' min='0'
                    onChange={this.handleChange}
                />
                <Link to={`/`}>
                    <button className='blue-btn w-100'
                        onClick={this.handleSubmit}
                    >Confirm</button>
                </Link>
            </div>
        )
    }

    returnSidebarWidraw = () => {
        return (
            <div className='sidebar'>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>🡄</button>
                </Link><h2>Widraw</h2></div>
                <input className={this.canWidraw() ? 'input' : 'input warning'} type='number' placeholder='How much?'
                    onChange={this.handleChange}
                    min='0'
                />
                <button className='blue-btn w-100'
                    onClick={this.handleSubmit}
                    disabled={!this.canWidraw()}
                >Confirm</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.activeLink === '/' && this.returnSidebar()}
                {this.props.activeLink === '/invest' && this.returnSidebarInvest()}
                {this.props.activeLink === '/widraw' && this.returnSidebarWidraw()}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        jarList: state.jarList,
        historyList: state.historyList
    };
}
export default withRouter(connect(mapStateToProps, { savings_subtract, savings_add, history_add })(Sidebar));



