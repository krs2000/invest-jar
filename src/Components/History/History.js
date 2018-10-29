import { Link } from 'react-router-dom';
import React from 'react';
import './History.css';

import { connect } from 'react-redux';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedHistoryList: [],
            sortedBy: 'date',
            sortedIsAsc: false,
        };
    }

    componentWillMount() {
        this.setState({ sortedHistoryList: this.props.historyList })
    }

    returnHistoryItem = (x) => {
        return (
            <div className='table-row' key={`history-${x.id}`}>
                <div>{x.label}</div>
                <div>{x.transaction}</div>
                <div>{x.date}</div>
                <div>{x.value}</div>
                <div>{x.account}</div>
            </div>
        )
    }

    sortTable = (type) => {
        const sortedHistoryList = this.state.sortedHistoryList;
               
          const compare = (a, b) => {
                if (a[type] < b[type] )
                    return this.state.sortedIsAsc ? 1 : 1;
                if (a[type]  > b[type] )
                    return this.state.sortedIsAsc ? -1: 1;
                return 0;}       

            sortedHistoryList.sort(compare);
        this.setState({ sortedHistoryList, sortedBy : type , sortedIsAsc: !this.state.sortedIsAsc  });
    }

    render() {
        return (
            <div>
                <div className='sidebar-header'> <Link to={`/`}>
                    <button className='return-btn'>🡄</button>
                </Link><h2>History</h2>
                </div>
                <div className='history'>
                    <div className='table-header'>
                        <div onClick={()=>this.sort()}>label</div>
                        <div onClick={()=>this.sortTable('transaction')}>type {this.state.sortedBy === 'transaction' ? this.state.sortedIsAsc ? '⬆' :'⬇' : '⬍' }</div>
                        <div onClick={()=>this.sortTable('date')}>date {this.state.sortedBy === 'date' ? this.state.sortedIsAsc ? '⬆' :'⬇' : '⬍' }</div>
                        <div onClick={()=>this.sortTable('value')}>value {this.state.sortedBy === 'value' ? this.state.sortedIsAsc ? '⬆' :'⬇' : '⬍' }</div>
                        <div onClick={()=>this.sortTable('account')}>saldo {this.state.sortedBy === 'account' ? this.state.sortedIsAsc ? '⬆' :'⬇' : '⬍' }</div>
                    </div>
                    { this.state.sortedHistoryList.map(item => {
                            return (this.returnHistoryItem(item))
                        })}
                </div>
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
export default connect(mapStateToProps, {})(History);



