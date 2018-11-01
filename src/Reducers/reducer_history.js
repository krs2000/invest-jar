import { HistoryRecord } from '../Models/historyRecord'
import { HISTORY_ADD_MULTIPLE, HISTORY_ADD } from "../constants";

let initialState = [];

export default (state = initialState, action) => {
    let newState = null;
    switch (action.type) {
        case HISTORY_ADD:
            newState = [new HistoryRecord(
                action.transaction,
                action.value,
                action.jar)].concat(action.historyList);
            return newState;
            case HISTORY_ADD_MULTIPLE:
            const newItems = [];
            console.log(action.jars)
            action.jars.forEach((x,index)=> newItems.push(new HistoryRecord(
               (index === 0 ? 'Transfer Outbound' : 'Transfer Inbound'),
                action.value * x.percent * 0.01,
                x.jar
              )))
            newState = newItems.concat(action.historyList);

            return newState;
        default:
            return state;
    }
};