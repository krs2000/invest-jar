import moment from 'moment'
import { v4 } from 'node-uuid';
export class HistoryRecord {
    id;
    value;
    label;
    type;
    date;
    account;
    constructor(value, label, transaction, account) {
        this.id = v4();
        this.label = label;
        this.account = account;
        this.transaction = transaction;
        this.date = moment().format("YYYY-MM-DD HH:mm:ss");
        this.value = value;
        this.account = account;
    }
}