import { SAVINGS_SUBTRACT, SAVINGS_ADD, HISTORY_ADD } from "../constants";
import { v4 } from 'node-uuid';

export const savings_add = (jarList, value) => {
	const action = {
		type: SAVINGS_ADD,
		id: v4(),
		value,
		jarList
	};
	return action;
};

export const savings_subtract= (jarList, value) => {
	const action = {
		type: SAVINGS_SUBTRACT,
		id: v4(),
		value,
		jarList
	};
	return action;
};



export const history_add = (jar,transaction,value,historyList) => {
	const action = {
		type: HISTORY_ADD,
		id: v4(),
		transaction,
		jar,
		value,
		historyList
	};
	return action;
};