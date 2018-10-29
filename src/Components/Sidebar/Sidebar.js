import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import { savings_subtract, savings_add, history_add, jar_add, savings_transfer, history_add_multiple } from '../../Actions';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            select: 'default',
            selectSecond: 'default'
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({
                value: '',
                select: 'default',
                selectSecond: 'default'
            });
        }
    }

    handleValue = (e) => {
        this.setState({ value: e.target.value });
    }

    handleSelect = (e) => {
        this.setState({ select: e.target.value });
    }

    handleSelectSecond = (e) => {
        this.setState({ selectSecond: e.target.value });
    }

    canWidraw = () => {
        if (this.state.select !== 'default' && this.state.value)
            return this.state.value <= this.props.jarList[this.state.select].account ? true : false
        else
            return false
    }

    canAdd = () => {
        return this.state.value ? true : false
    }

    canTransfer = () => {
        return (this.state.select !== this.state.selectSecond && this.state.value && this.state.select !== 'default' && this.state.selectSecond !== 'default') ? true : false
    }

    canInvest = () => {
        return (this.state.select !== 'default' && this.state.value) ? true : false
    }



    handleSubmit = (e) => {
        if (this.props.activeLink === '/invest' && this.canInvest()) {
            this.props.savings_add(this.props.jarList[this.state.select].id, this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[this.state.select], 'Invest', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')

        } else if (this.props.activeLink === '/widraw' && this.canWidraw()) {
            this.props.savings_subtract(this.props.jarList[this.state.select].id, this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[this.state.select], 'Widraw', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')
        } else if (this.props.activeLink === '/add' && this.canAdd()) {
            this.props.jar_add(this.props.jarList, this.state.value)
            this.props.history.push('/')
        } else if (this.props.activeLink === '/transfer' && this.canTransfer()) {
            this.props.savings_transfer(this.props.jarList[this.state.select].id, this.props.jarList[this.state.selectSecond].id, this.props.jarList, Number(this.state.value))
            this.props.history_add_multiple([this.props.jarList[this.state.select], this.props.jarList[this.state.selectSecond]], 'Transfer', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')
        }
    };


    returnSidebar = () => {
        return (
            <div className='sidebar'>
                <Link to={`add`}>
                    <button className="grey-btn">Add Jar</button>
                </Link>
                <Link to={`history`}>
                    <button className='grey-btn'>History</button>
                </Link>
                <Link to={`transfer`}>
                    {this.props.jarList.length > 1 ? <button className="grey-btn">Transfer</button> : ''}
                </Link>
                <Link to={`invest`}>
                    {this.props.jarList.length > 0 ? <button className='green-btn'>Invest</button> : ''}
                </Link>
                <Link to={`widraw`}>
                    {this.props.jarList.length > 0 ? <button className='red-btn'>Widraw</button> : ''}
                </Link>
            </div>
        )
    }

    returnSidebarInvest = () => {
        return (
            <div className='sidebar'>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>back</button>
                </Link><h2>Add Investment</h2></div>
                <button className='blue-btn w-100'
                    onClick={this.handleSubmit}
                >Confirm</button>
                <input className='input' value={this.state.value} type='number' placeholder='How much?' min='0'
                    onChange={this.handleValue}
                />
                <select className='input' value={this.state.select} onChange={this.handleSelect}>
                    <option disabled hidden value='default'>Select Jar</option>
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
                    <button className='return-btn'>back</button>
                </Link><h2>Widraw</h2></div>
                <button className='blue-btn w-100'
                    onClick={this.handleSubmit}
                >Confirm</button>
                <input className={this.canWidraw() || this.state.select === 'default' ? 'input' : 'input warning'} type='number' placeholder='How much?'
                    onChange={this.handleValue}
                    min='0'
                    value={this.state.value}
                />
                <select className={this.canWidraw() || this.state.select === 'default' ? 'input' : 'input warning'} value={this.state.select} onChange={this.handleSelect}>
                    <option disabled hidden value='default'>Select Jar</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}</select>
            </div>
        )
    }

    returnSidebarTransfer = () => {
        return (
            <div className='sidebar'>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>back</button>
                </Link><h2>Transfer</h2></div>
                <button className='blue-btn w-100'
                    onClick={this.handleSubmit}
                >Confirm</button>
                <input className={this.canWidraw() || (this.state.selectSecond === 'default' && this.state.select === 'default') ? 'input' : 'input warning'} type='number' placeholder='How much?'
                    onChange={this.handleValue}
                    min='0'
                    value={this.state.value}
                />
                <select className={this.state.select !== this.state.selectSecond || (this.canWidraw() || (this.state.selectSecond === 'default' && this.state.select === 'default')) ? 'input' : 'input warning'} value={this.state.select} onChange={this.handleSelect}>
                    <option disabled hidden value='default'>From</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}</select>
                <select className={this.state.select !== this.state.selectSecond || (this.state.selectSecond !== 'default' || (this.state.selectSecond === 'default' && this.state.select === 'default')) ? 'input' : 'input warning'} value={this.state.selectSecond} onChange={this.handleSelectSecond}>
                    <option disabled hidden value='default'>To</option>
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
                    <button className='return-btn'>back</button>
                </Link><h2>Add Jar</h2></div>
                <input className={this.canAdd() ? 'input' : 'input warning'} type='text' placeholder='Label?'
                    onChange={this.handleValue}
                    value={this.state.value}
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
                {this.props.activeLink === '/transfer' && this.returnSidebarTransfer()}
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

export default withRouter(connect(mapStateToProps, { savings_transfer, savings_subtract, savings_add, history_add, jar_add, history_add_multiple })(Sidebar));



