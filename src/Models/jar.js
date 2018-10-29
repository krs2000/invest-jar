import { v4 } from 'node-uuid';

export class Jar {
    id;
    account;
    label;
    currency;
    constructor(label, currency) {
        this.id = v4();
        this.account = 0;
        this.label = label;
        this.currency = currency;
      }
}