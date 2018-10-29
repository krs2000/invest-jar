import { SAVINGS_TRANSFER, SAVINGS_SUBTRACT, SAVINGS_ADD, HISTORY_ADD, JAR_ADD, HISTORY_ADD_MULTIPLE } from "../constants";
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

export const savings_subtract = (jarId, jarList, value) => {
	const action = {
		type: SAVINGS_SUBTRACT,
		id: v4(),
		value,
		jarList,
		jarId
	};
	return action;
};

export const savings_transfer = (jarId, secondJarId, jarList, value) => {
	const action = {
		type: SAVINGS_TRANSFER,
		id: v4(),
		value,
		jarList,
		jarId,
		secondJarId
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

export const history_add_multiple = (jars, transaction, value, historyList) => {
	const action = {
		type: HISTORY_ADD_MULTIPLE,
		id: v4(),
		transaction,
		jars,
		value,
		historyList
	};
	return action;
};