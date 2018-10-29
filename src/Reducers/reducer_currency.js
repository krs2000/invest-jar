import { Currency } from '../Models/currency'
import { SET_CURRENCIES } from "../constants";

const dollar = new Currency(
    'dollar', '$')
const euro = new Currency(
    'euro', '€')

let initialState = [dollar, euro];

export default (state = initialState, action) => {
    let newState = null;
    switch (action.type) {
        case SET_CURRENCIES:
        // left for future feature
        //         newState = state.concat([]);
        //     return newState;
        default:
            return state;
    };
}