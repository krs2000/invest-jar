import { combineReducers } from "redux";
import jarList from "./reducer_jars";
import historyList from "./reducer_history";

export default combineReducers({
    jarList,
    historyList
});