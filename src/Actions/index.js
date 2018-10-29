import { SAVINGS_SUBTRACT, SAVINGS_ADD, HISTORY_ADD, JAR_ADD } from "../constants";
import { v4 } from 'node-uuid';

export const jar_add = (jarList, label) => {
	const action = {
		type: JAR_ADD,
		id: v4(),
		label,
		jarList
	};
	return action;
};

export const savings_add = (jarId, jarList, value) => {
	const action = {
		type: SAVINGS_ADD,
		id: v4(),
		value,
		jarList,
		jarId
	};
	return action;
};

export const savings_subtract = (jarId,jarList, value) => {
	const action = {
		type: SAVINGS_SUBTRACT,
		id: v4(),
		value,
		jarList,
		jarId
	};
	return action;
};

export const history_add = (jar, transaction, value, historyList) => {
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