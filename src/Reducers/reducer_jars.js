import { Jar } from '../Models/jar'
import { SAVINGS_ADD, SAVINGS_SUBTRACT, JAR_ADD, SAVINGS_TRANSFER } from "../constants";

let initialState = [new Jar("My Jar")];

export default (state = initialState, action) => {
    let newState = [].concat(action.jarList);
    switch (action.type) {
        case SAVINGS_ADD:
            newState.forEach(x => {
                if (x.id === action.jarId) {
                    x.account += action.value
                }
            })
            return newState;
        case SAVINGS_SUBTRACT:
            newState.forEach(x => {
                if (x.id === action.jarId) {
                    x.account -= action.value
                }
            })
            return newState;
        case SAVINGS_TRANSFER:
            newState.forEach(x => {
                if (x.id === action.jarId)
                 x.account -= action.value 
                if (x.id === action.secondJarId) 
                 x.account += action.value 
            })
            return newState;
        case JAR_ADD:
            newState = newState.concat(new Jar(action.label))
            return newState;
        default:
            return state;
    }
};