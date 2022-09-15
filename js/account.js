export default class Account {
    constructor(number, owner, type) {
        this._number = number
        this._owner = owner
        this._type = type
        this._balance = 0
        this._statement = []
    }

    withdraw(value) {
        if(value <= this._balance) {
            this._balance -= value
            let info = {
                date: new Date(),
                value: value,
                balanceAfter: this._balance
            }
            this._statement.push(info)
        }
    }

    deposit(value) {
        this._balance += value
        let info = {
            date: new Date(),
            value: value,
            balanceAfter: this._balance
        }
        this._statement.push(info)
    }
}