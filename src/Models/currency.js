import { v4 } from 'node-uuid';

export class Currency {
    id;
    name;
    sign;
    constructor(name, sign) {
        this.id = v4();
        this.name = name;
        this.sign = sign;
    }
}