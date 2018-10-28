import { Jar } from '../Models/jar'
import { SAVINGS_ADD, SAVINGS_SUBTRACT } from "../constants";

let initialState = [new Jar("My Jar")];

export default (state = initialState, action) => {
    let newState = [].concat(action.jarList);;
    switch (action.type) {
        case SAVINGS_ADD:
                newState[0].account += action.value;
            return newState;
        case SAVINGS_SUBTRACT:
                newState[0].account -= action.value; 
            return newState;
        default:
            return state;
    }
};