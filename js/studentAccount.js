import Account from "./account.js";

export default class StudentAccount extends Account {
    constructor(number, owner, type) {
        super();
        this._freeStatement = 1
        this._freeTransfer = 1
        this._withdrawLimit = 300
    }

    withdraw(value) {
        if (value > this._withdrawLimit) return
        if (value <= this._balance) {
            this._balance -= value
            let info = {
                date: new Date(),
                value: value,
                balanceAfter: this._balance
            }
            this._statement.push(info)
        }
    }
}