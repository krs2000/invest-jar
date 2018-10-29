import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import { savings_subtract, savings_add, history_add, jar_add, savings_transfer, history_add_multiple, set_currencies } from '../../Actions';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            optionA: '',
            optionB: '',
            isError: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({
                value: '',
                optionA: '',
                optionB: '',
                isError: false
            });
        }
    }

    handleValue = (e) => {
        this.setState({ value: e.target.value });
    }

    handleOptionA = (e) => {
        this.setState({ optionA: e.target.value });
    }

    handleOptionB = (e) => {
        this.setState({ optionB: e.target.value });
    }

    canWidraw = () => {
        if (this.state.optionA !== '' && this.state.value)
            return this.state.value <= this.props.jarList[this.state.optionA].account ? true : false
        else
            return false
    }

    canAdd = () => {
        return this.state.value ? true : false
    }

    canTransfer = () => {
        return (this.state.value && this.state.optionA && this.state.optionBthis.props.jarList[this.state.optionA].account > this.props.jarList[this.state.optionB].account  ) ? true : false
    }

    canInvest = () => {
        return (this.state.optionA !== '' && this.state.value) ? true : false
    }



    handleSubmit = (e) => {
        if (this.props.activeLink === '/invest' && this.canInvest()) {
            this.props.savings_add(this.props.jarList[this.state.optionA].id, this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[this.state.optionA], 'Invest', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')

        } else if (this.props.activeLink === '/widraw' && this.canWidraw()) {
            this.props.savings_subtract(this.props.jarList[this.state.optionA].id, this.props.jarList, Number(this.state.value))
            this.props.history_add(this.props.jarList[this.state.optionA], 'Widraw', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')
        } else if (this.props.activeLink === '/add' && this.canAdd()) {
            this.props.jar_add(this.props.jarList, this.state.value)
            this.props.history.push('/')
        } else if (this.props.activeLink === '/transfer' && this.canTransfer()) {
            this.props.savings_transfer(this.props.jarList[this.state.optionA].id, this.props.jarList[this.state.optionB].id, this.props.jarList, Number(this.state.value))
            this.props.history_add_multiple([this.props.jarList[this.state.optionA], this.props.jarList[this.state.optionB]], 'Transfer', Number(this.state.value), this.props.historyList)
            this.props.history.push('/')
        }else{
            this.setState({isError: true})
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



    returnInvestSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Add Investment')}
                <input className={ !this.state.isError ? 'input' : 'input warning'} value={this.state.value} type='number' placeholder='How much?' min='0'
                    onChange={this.handleValue}
                />
                <select className={ !this.state.isError ? 'input' : 'input warning'} value={this.state.optionA} onChange={this.handleOptionA}>
                    <option disabled hidden value=''>Choose jar</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}
                </select>
            </div>
        )
    }

    returnWidrawSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Widraw')}
                <input className={ !this.state.isError ? 'input' : 'input warning'} type='number' placeholder='How much?'
                    onChange={this.handleValue}
                    min='0'
                    value={this.state.value}
                />
                <select className={ !this.state.isError ? 'input' : 'input warning'} value={this.state.optionA} onChange={this.handleOptionA}>
                    <option disabled hidden value=''>Choose jar</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}</select>
            </div>
        )
    }

    returnTransferSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Transfer')}
                <input className={ !this.state.isError ? 'input' : 'input warning'} type='number' placeholder='How much?'
                    onChange={this.handleValue}
                    min='0'
                    value={this.state.value}
                />
                <select className={ !this.state.isError ? 'input' : 'input warning'} value={this.state.optionA} onChange={this.handleOptionA}>
                    <option disabled hidden value=''>From</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}</select>
                <select className={ !this.state.isError ? 'input' : 'input warning'} value={this.state.optionB} onChange={this.handleOptionB}>
                    <option disabled hidden value=''>To</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}</select>
            </div>
        )
    }

    returnAddSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Add Jar')}
                <input className={ !this.state.isError ? 'input' : 'input warning'} type='text' placeholder='Label?'
                    onChange={this.handleValue}
                    value={this.state.value}
                />
                <select className={ !this.state.isError ? 'input' : 'input warning'} value={this.state.optionB} onChange={this.handleOptionB}>
                    <option disabled hidden value=''>To</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.label}</option>)
                    })}</select>
            </div>
        )
    }

    returnHeader = (header) => {
        return (
            <div>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>back</button>
                </Link><h2>{header}</h2></div>
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
                {this.props.activeLink === '/invest' && this.returnInvestSidebar()}
                {this.props.activeLink === '/widraw' && this.returnWidrawSidebar()}
                {this.props.activeLink === '/add' && this.returnAddSidebar()}
                {this.props.activeLink === '/transfer' && this.returnTransferSidebar()}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        jarList: state.jarList,
        historyList: state.historyList,
        currenciesList: state.currenciesList
    };
}

export default withRouter(connect(mapStateToProps, { set_currencies, savings_transfer, savings_subtract, savings_add, history_add, jar_add, history_add_multiple })(Sidebar));



