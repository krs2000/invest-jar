import { combineReducers } from "redux";
import jarList from "./reducer_jars";
import historyList from "./reducer_history";
import currencyList from "./reducer_currency";

export default combineReducers({
    jarList,
    historyList,
    currencyList
});