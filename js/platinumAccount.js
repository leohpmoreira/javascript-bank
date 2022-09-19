import Account from "./account.js";

export default class PlatinumAccount extends Account {
    constructor(number, holder, type) {
        super(number, holder, type);
    }
}