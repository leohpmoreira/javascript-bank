import LimitedAccount from "./limitedAccount.js";

export default class StudentAccount extends LimitedAccount {
    constructor(number, holder, type) {
        super(number, holder, type, 1, 1, 300);
    }
}