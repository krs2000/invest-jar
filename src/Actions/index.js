import { SAVINGS_TRANSFER, SAVINGS_SUBTRACT, SAVINGS_ADD, HISTORY_ADD, JAR_ADD, HISTORY_ADD_MULTIPLE, SET_CURRENCIES } from "../constants";
import { v4 } from 'node-uuid';


//JARS 
export const jar_add = (jarList, label) => {
	const action = {
		type: JAR_ADD,
		id: v4(),
		label,
		jarList
	};
	return action;
};

//SAVINGS
export const savings_add = (jarId, jarList, value) => {
	const action = {
		id: v4(),
		type: SAVINGS_ADD,
		value,
		jarList,
		jarId
	};
	return action;
};

export const savings_subtract = (jarId, jarList, value) => {
	const action = {
		id: v4(),
		type: SAVINGS_SUBTRACT,
		value,
		jarList,
		jarId
	};
	return action;
};

export const savings_transfer = (jarId, secondJarId, jarList, value) => {
	const action = {
		id: v4(),
		type: SAVINGS_TRANSFER,
		value,
		jarList,
		jarId,
		secondJarId
	};
	return action;
};

//HISTORY
export const history_add = (jar, transaction, value, historyList) => {
	const action = {
		id: v4(),
		type: HISTORY_ADD,
		transaction,
		jar, 
		value,
		historyList
	};
	return action;
};

export const history_add_multiple = (jars, transaction, value, historyList) => {
	const action = {
		id: v4(),
		type: HISTORY_ADD_MULTIPLE,
		transaction,
		jars,
		value,
		historyList
	};
	return action;
};

//CURRENCIES

export const set_currencies = () => {
	const action = {
	};
	return action;
};