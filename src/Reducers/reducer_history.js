import { HistoryRecord } from '../Models/historyRecord'
import { HISTORY_ADD_PERCENT, HISTORY_ADD } from "../constants";

let initialState = [];





export default (state = initialState, action) => {
    let newState = [].concat(action.historyList);
    switch (action.type) {
        case HISTORY_ADD:
            newState = newState.concat([new HistoryRecord(
                action.transaction,
                action.value,
                action.jar
            )]);
            return newState;
        case HISTORY_ADD_PERCENT:
            action.jar.account -= action.value;
            newState = [new HistoryRecord(
                'Transfer Outband',
                action.value,
                action.jar 
            )].concat(newState)

            action.jarsOption.forEach(x => {
                newState =
                    [new HistoryRecord(
                        'Transfer Inbound',
                        action.value * x.percent * 0.01,
                        x.jar)].concat(newState)
            })



            return newState;
        default:
            return state;
    }
};