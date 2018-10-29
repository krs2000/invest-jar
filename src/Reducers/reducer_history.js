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
            action.jars.forEach((x , index)=> newItems.push(new HistoryRecord(
                action.value,
                x.label,
                index === 0 ? 'Transfer Inbound' : 'Transfer Outbound',
                x.account)))
            newState = newItems.concat(action.historyList);

            return newState;
        default:
            return state;
    }
};