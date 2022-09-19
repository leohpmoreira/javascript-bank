export default class Account {
    constructor(number, owner, type) {
        this._number = number
        this._holder = owner
        this._type = type
        this._balance = 0
        this._statement = []
    }

    get number() {
        return this._number;
    }

    get owner() {
        return this._holder;
    }

    get type() {
        return this._type;
    }

    get balance() {
        return this._balance;
    }

    get statement() {
        return this._statement;
    }

    storeStatement(value, type) {
        let info = {
            date: new Date().toISOString().substring(0,10),
            type: type,
            value: (Math.round(value * 100) / 100).toFixed(2),
            balanceAfter: (Math.round(this._balance * 100) / 100).toFixed(2)
        }
        this._statement.push(info)
    }

    withdraw(value, type) {
        if (value <= this._balance) {
            this._balance -= value
            this.storeStatement(value, type)
            return 'Success'
        }
        else {
            return 'Insufficient funds'
        }
    }

    deposit(value, type) {
        this._balance += value
        this.storeStatement(value, type)
    }
}