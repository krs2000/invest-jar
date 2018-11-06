import { Currency } from '../Models/currency'
import { SET_CURRENCIES } from "../constants";

const dollar = new Currency(
    'dollar', '$')
const euro = new Currency(
    'euro', '€')
const bitcoin = new Currency(
    'bitcoin', '₿ ')
const etherum = new Currency(
    'etherum', 'Ξ')

let initialState = [dollar, euro, bitcoin, etherum];

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