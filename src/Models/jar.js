import { v4 } from 'node-uuid';

export class Jar {
    id;
    label;
    account;
    constructor(label) {
        this.id = v4();
        this.label = label;
        this.account = 0;
      }
}