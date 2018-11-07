import { Currency } from '../Models/currency'
import { SET_CURRENCIES } from "../constants";

const dollar = new Currency(
    'dollar', '$')
const euro = new Currency(
    'euro', '€')
const pound = new Currency(
    'pound', '£')


let initialState = [dollar, euro, pound];

export default (state = initialState, action) => {
    // let newState = null;
    switch (action.type) {
        case SET_CURRENCIES:
            // left for future feature
            //         newState = state.concat([]);
            //     return newState;
            break;
        default:
            return state;
    };
}