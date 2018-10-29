import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import { savings_subtract, savings_add, history_add, jar_add } from '../../Actions';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            select: 0
        };
    }


    handleValue = (e) => {
        this.setState({ value: e.target.value });
    }

    handleSelect = (e) => {
        this.setState({ select: e.target.value });
    }

    canWidraw = () => {
        return this.state.value <= this.props.jarList[this.state.select].account ? true : false
    }

    canAdd = () => {
        return this.state.value ? true : false
    }

    handleSubmit = (e) => {
        if (this.props.activeLink === '/invest') {
            this.props.savings_add(this.props.jarList[this.state.select].id, this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[this.state.select], 'Invest', Number(this.state.value), this.props.historyList)
        } else if (this.props.activeLink === '/widraw' && this.canWidraw()) {
            this.props.savings_subtract(this.props.jarList[this.state.select].id, this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[this.state.select], 'Widraw', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')
        } else if (this.props.activeLink === '/add') {
            this.props.jar_add(this.props.jarList, this.state.value)
        }
    };


    returnSidebar = () => {
        return (
            <div className='sidebar'>
                <Link to={`add`}>
                    <button className="grey-btn">Add ✚</button>
                </Link>
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
                <Link to={`/`}>
                    <button className='blue-btn w-100'
                        onClick={this.handleSubmit}
                    >Confirm</button>
                </Link>
                <input className='input' type='number' placeholder='0' min='0'
                    onChange={this.handleValue}
                />
                <select className='input' value={this.state.select} onChange={this.handleSelect}>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}
                </select>
            </div>
        )
    }

    returnSidebarWidraw = () => {
        return (
            <div className='sidebar'>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>🡄</button>
                </Link><h2>Widraw</h2></div>
                <button className='blue-btn w-100'
                    onClick={this.handleSubmit}
                >Confirm</button>
                <input className={this.canWidraw() ? 'input' : 'input warning'} type='number' placeholder='How much?'
                    onChange={this.handleValue}
                    min='0'
                />
                <select className='input' value={this.state.select} onChange={this.handleSelect}>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}</select>
            </div>
        )
    }


    returnSidebarAdd = () => {
        return (
            <div className='sidebar'>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>🡄</button>
                </Link><h2>Add Jar</h2></div>
                <input className={this.canAdd() ? 'input' : 'input warning'} type='text' placeholder='Label?'
                    onChange={this.handleValue}
                />
                <button className='blue-btn w-100'
                    onClick={this.handleSubmit}
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
                {this.props.activeLink === '/add' && this.returnSidebarAdd()}
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
export default withRouter(connect(mapStateToProps, { savings_subtract, savings_add, history_add, jar_add })(Sidebar));



