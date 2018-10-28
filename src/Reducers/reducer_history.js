import { HistoryRecord } from '../Models/historyRecord'
import { HISTORY_ADD } from "../constants";

let initialState = [];

export default (state = initialState, action) => {
    let newState = null;
    switch (action.type) {
        case HISTORY_ADD:
            newState = [new HistoryRecord(
                    action.value,
                    action.jar.label,
                    action.transaction,
                     action.jar.account)].concat(action.historyList);
                  
            return newState;
        default:
            return state;
    }
};