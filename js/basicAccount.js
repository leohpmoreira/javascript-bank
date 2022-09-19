import LimitedAccount from "./limitedAccount.js";

export default class BasicAccount extends LimitedAccount {
    constructor(number, holder, type) {
        super(number, holder, type, 3, 3, 1000);
    }
}