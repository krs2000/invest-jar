import { Jar } from '../Models/jar'
import { SAVINGS } from "../constants";

let initialState = [new Jar("My Jar")];


export default (state = initialState, action) => {
    let newState = null;
    switch (action.type) {
        case SAVINGS:
            newState = [].concat(action.jarList);
            if(action.isInvest){
            newState[0].account += action.value;
            }else{
            newState[0].account -= action.value;
            }
            return newState;
        default:
            return state;
    }
};