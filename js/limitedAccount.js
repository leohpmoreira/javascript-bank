import Account from "./account.js";

export default class LimitedAccount extends Account {
    constructor(number, holder, type, freeStatement, freeTransfer, withdrawLimit) {
        super(number, holder, type);
        this._freeStatement = freeStatement
        this._freeTransfer = freeTransfer
        this._withdrawLimit = withdrawLimit
        this._statementCounter = 0
        this._transferCounter = 0
    }

    get freeStatement() {
        return this._freeStatement;
    }

    get freeTransfer() {
        return this._freeTransfer;
    }

    get withdrawLimit() {
        return this._withdrawLimit;
    }

    get statementCounter() {
        return this._statementCounter;
    }

    get transferCounter() {
        return this._transferCounter;
    }

    get statement() {
        this._statementCounter += 1
        if (this._statementCounter > this._freeStatement) {
            this.withdraw(0.50, 'Extra Statement Fee')
        }
        return this._statement;
    }

    withdraw(amount, type) {
        let value = parseFloat(amount)
        if (value > this._withdrawLimit) return 'Higher amount than defined limit'
        if (value > this._balance) return 'Insufficient funds'
        this._balance -= value
        this.storeStatement(value, type)
        if (type === 'Transfer out') {
            this._transferCounter += 1
            if (this._transferCounter >= this._transferCounter) {
                this.withdraw(0.50, 'Extra Transfer Fee')
            }
        }
        return 'Success'
    }

    resetLimit() {
        this._transferCounter = 0
        this._statementCounter = 0
    }
}