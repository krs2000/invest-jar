import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import { savings_subtract, savings_add, history_add, jar_add, savings_transfer, history_add_percent, set_currencies } from '../../Actions';
import { connect } from 'react-redux';
import { Jar } from '../../Models/jar';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            optionA: '',
            optionB: '',
            isError: false,
            percentSum: 100
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({
                value: '',
                optionA: '',
                optionB: '',
                isError: false,
                percentSum: 100
            });
        }
    }

    isDefaultJar = () => {
        let defaultJar;
        this.props.jarList.forEach(x => {
            if (x.isDefault) {
                defaultJar = x;
            }
        })
        return defaultJar;
    }

    handleInput = (e) => {
        this.setState({ value: e.target.value });
    }

    handlePercentB = (e, index) => {
        let percentSum = 0;
        this.state.optionB.forEach(x => percentSum += x.percent)
        const newOptionB = this.state.optionB

        if (percentSum < 100) {
            newOptionB[index].percent = Number(e.target.value);
            this.setState({ optionB: newOptionB });
        } else {
            newOptionB[index].percent = Number(e.target.value) - 1;
            this.setState({ optionB: newOptionB });
        }
        percentSum = 0;
        this.state.optionB.forEach(x => percentSum += x.percent)
        this.setState({ percentSum });
    }

    handleOptionA = (e) => {
        if (this.props.activeLink === '/transfer') {
            const optionA = this.props.jarList.find(x => x.id === e.target.value)
            this.setState({
                optionA: optionA,
                optionB: [{
                    jar: new Jar('', optionA.currency, false),
                    percent: 100
                }],

            });
        } else
            this.setState({ optionA: e.target.value });
    }

    handleOptionB = (e, index) => {

        if (this.props.activeLink === '/transfer') {
            const newOptionB = [].concat(this.state.optionB)
            newOptionB[index].jar = this.props.jarList.find(x => x.id === e.target.value);
            this.setState({ optionB: newOptionB });
        } else {
            this.setState({ optionB: e.target.value });
        }
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
            this.props.jar_add(this.props.jarList, this.state.value, this.props.currencyList[this.state.optionA])
            this.props.history.push('/')
        } else if (this.props.activeLink === '/transfer' && this.canTransfer()) {
            let defaultJar = [];
            if (this.isDefaultJar() && this.state.percentSum !== 100) {
                defaultJar = [{
                    jar: this.isDefaultJar(),
                    percent: 100 - this.state.percentSum
                }]
            }
            let options = this.state.optionB.concat(defaultJar)
            const optionA = JSON.parse(JSON.stringify(this.state.optionA))
            this.props.savings_subtract(this.state.optionA.id, this.props.jarList, Number(this.state.value))
            this.props.savings_transfer(options, this.props.jarList, Number(this.state.value))
            this.props.history_add_percent(optionA, options, Number(this.state.value), this.props.historyList)

            this.props.history.push('/')
        } else {
            this.setState({ isError: true })
        }
    };


    addOption = () => {
        this.setState({
            optionB: this.state.optionB.concat([{ jar: new Jar('', this.state.optionA.currency, false), percent: 0 }]),
        });
    }

    addButtonVisible = () => {
        let isVisible = true;
        this.state.optionB.forEach(x => x.jar.label ? null : isVisible = false);
        if (this.state.optionB.length + 1 === this.props.jarList.filter((x) => x.currency.id === this.state.optionA.currency.id).length)
            isVisible = false;
        return isVisible;
    }

    //CAN GUARDS
    canWidraw = () => {
        if (this.state.optionA && this.state.value)
            return this.state.value <= this.props.jarList[this.state.optionA].account ? true : false
        else
            return false
    }

    canAdd = () => {
        return this.state.value && this.state.optionA ? true : false
    }

    canTransfer = () => {
        if (this.state.value <= this.state.optionA.account && (this.state.percentSum === 100 || this.isDefaultJar()) ? true : false) {
            let block = false;
            this.state.optionB.forEach(x => !x.jar.label ? block = true : '')

            return (!block)
        }
    }

    canInvest = () => {
        return (this.state.optionA && this.state.value) ? true : false
    }

    returnInvestSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Add Investment')}
                <input
                    className={!this.state.isError ? 'input' : 'input warning'}
                    value={this.state.value}
                    type='number'
                    placeholder='How much?'
                    min='0'
                    onChange={this.handleInput} />
                <select
                    className={!this.state.isError ? 'input' : 'input warning'}
                    value={this.state.optionA}
                    onChange={this.handleOptionA}>
                    <option
                        disabled
                        hidden
                        value=''>Choose jar</option>
                    {this.props.jarList && this.props.jarList.map((x, index) => {
                        return (
                            <option
                                value={index}
                                key={`label-${x.id}`}>{x.currency.sign} {x.label}</option>)
                    })}
                </select>
            </div>
        )
    }

    returnWidrawSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Widraw')}
                <input
                    className={!this.state.isError ? 'input' : 'input warning'}
                    type='number'
                    placeholder='How much?'
                    onChange={this.handleInput}
                    min='0'
                    value={this.state.value} />
                <select
                    className={!this.state.isError ? 'input' : 'input warning'}
                    value={this.state.optionA}
                    onChange={this.handleOptionA}>
                    <option disabled hidden value=''>Choose jar</option>
                    {this.props.jarList.map((x, index) => {
                        return (<option value={index} key={`label-${x.id}`}>{x.currency.sign} {x.label}</option>)
                    })}
                </select>
            </div>
        )
    }



    returnAddSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Add Jar')}
                <input
                    className={!this.state.isError ? 'input' : 'input warning'}
                    type='text'
                    placeholder='Label?'
                    onChange={this.handleInput}
                    value={this.state.value}
                />
                <select
                    className={!this.state.isError ? 'input' : 'input warning'}
                    value={this.state.optionA}
                    onChange={this.handleOptionA}>
                    <option disabled hidden value=''>Currency</option>
                    {this.props.jarList && this.props.currencyList.map((x, index) => {
                        return (<option value={index} key={`currency-${x.id}`}>{x.name} {x.sign}</option>)
                    })}</select>
            </div>
        )
    }

    filter = (id, i) => {
        const arr = [];
        this.state.optionB.forEach((x, index) => {
            if (index < i) {
                arr.push(x.jar.id)
            }
        })
        if (!arr.includes(id))
            return id
    }



    returnTransferSidebar = () => {
        return (
            <div className='sidebar'>
                {this.returnHeader('Transfer')}
                <input
                    className={!this.state.isError ? 'input' : 'input warning'}
                    type='number'
                    placeholder='How much?'
                    onChange={this.handleInput}
                    min='0'
                    value={this.state.value}
                />
                <select
                    className={!this.state.isError ? 'input' : 'input warning'}
                    value={this.state.optionA ? this.state.optionA.id : ''}
                    onChange={this.handleOptionA}>
                    <option disabled hidden value=''>From</option>
                    {this.props.jarList
                        .map((x) => {
                            return (<option value={x.id}
                                key={`label-${x.id}`}>{x.currency.sign} {x.label}</option>)
                        })}</select>
                {this.state.optionA && this.state.optionB.map((x, index) => {
                    return (
                        <div key={`optionB-${index}`} >
                            <select className={!this.state.isError ? 'input option-b' : 'input warning option-b'}
                                value={this.state.optionB[index].jar.label ? this.state.optionB[index].jar.id : ''}
                                onChange={(e) => this.handleOptionB(e, index)}>
                                <option disabled hidden value=''>To</option>
                                {this.props.jarList
                                    .filter((x) => x.currency.id === this.state.optionA.currency.id && x.id !== this.state.optionA.id && this.filter(x.id, index))
                                    .map(x => {
                                        return (<option value={x.id} key={`label-${x.id}`}>{x.label}</option>)
                                    })

                                }
                            </select>
                          <input
                                className={!this.state.isError ? 'input option-percent' : 'input warning  option-percent'}
                                type='number'
                                value={this.state.optionB[index].percent}
                                placeholder='%'
                                onChange={(e) => this.handlePercentB(e, index)}
                                min='0'
                                onKeyPress={(e) => e.preventDefault()}
                            />
                        <label >%</label>
                        </div>)
                })}
                <div className='plus-row'> {this.state.optionA && this.isDefaultJar() && this.state.percentSum < 100 && (100 - this.state.percentSum) + '% to default jar'}
                    {this.state.optionA && this.addButtonVisible() && <button className='plus-btn'
                        onClick={this.addOption}>+</button>}</div>
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
                {this.props.activeLink === '/' && returnSidebar(this.props.jarList)}
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
        currencyList: state.currencyList
    };
}

export default withRouter(connect(mapStateToProps, { set_currencies, savings_transfer, savings_subtract, savings_add, history_add, jar_add, history_add_percent })(Sidebar));


const returnSidebar = (jarList) => {
    return (
        <div className='sidebar'>
            <Link to={`add`}>
                <button className="grey-btn">Add Jar</button>
            </Link>
            <Link to={`history`}>
                <button className='grey-btn'>History</button>
            </Link>
            <Link to={`transfer`}>
                {jarList.length > 1 ? <button className="grey-btn">Transfer</button> : ''}
            </Link>
            <Link to={`invest`}>
                {jarList.length > 0 ? <button className='green-btn'>Invest</button> : ''}
            </Link>
            <Link to={`widraw`}>
                {jarList.length > 0 ? <button className='red-btn'>Widraw</button> : ''}
            </Link>
        </div>
    )
}
