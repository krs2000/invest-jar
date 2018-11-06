import { JARS_UPDATE, SAVINGS_TRANSFER, SAVINGS_SUBTRACT, SAVINGS_ADD, HISTORY_ADD, JAR_ADD, HISTORY_ADD_PERCENT, SET_CURRENCIES } from "../constants";
import { v4 } from 'node-uuid';


//JARS 
export const jar_add = (jarList, label, currency) => {
	const action = {
		type: JAR_ADD,
		id: v4(),
		label,
		jarList,
		currency
	};
	return action;
};

export const jars_update = (jarList) => {
	const action = {
		type: JARS_UPDATE,
		id: v4(),
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

export const savings_transfer = (jarsOptions,jarList, value) => {
	const action = {
		id: v4(),
		type: SAVINGS_TRANSFER,
		value,
		jarList,
		jarsOptions
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

export const history_add_percent = (jar, jarsOption, value, historyList) => {
	const action = {
		id: v4(),
		type: HISTORY_ADD_PERCENT,
		jarsOption,
		value,
		historyList,
		jar
	};
	return action;
};

//CURRENCIES

export const set_currencies = () => {
	const action = {
		id: v4(),
		type: SET_CURRENCIES
	};
	return action;
};