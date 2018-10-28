import { SAVINGS } from "../constants";


export const savings = (jarList, value, isInvest) => {
	const action = {
		type: SAVINGS,
        value,
		jarList,
		isInvest
	};
	return action;
};
