import moment from 'moment';
import { v4 } from 'node-uuid';


export class HistoryRecord {
    id;
    date;
    type;
    value;
    jar;
    constructor(transaction, value, jar) {
        this.id = v4();
        this.date = moment().format("YYYY-MM-DD HH:mm:ss");
        this.transaction = transaction;
        this.value = value;
        this.jar = jar;
    }
}