import BasicAccount from "./basicAccount.js";
import StudentAccount from "./studentAccount.js";
import PlatinumAccount from "./platinumAccount.js";

export default class Bank {
    constructor() {
        this._accArray = []
    }

    get accArray() {
        return this._accArray;
    }

    newAccount(holder, type) {
        let number
        let found
        do {
            number = Math.round((Math.random() * (99999999 - 10000000)) + 10000000)
            found = this._accArray.some(acc => acc.number === parseInt(number))
        } while (found)
        switch (type) {
            case 'Basic':
                this._accArray.push(new BasicAccount(number, holder, type))
                break
            case 'Student':
                this._accArray.push(new StudentAccount(number, holder, type))
                break
            case 'Platinum':
                this._accArray.push(new PlatinumAccount(number, holder, type))
                break
        }
        this._accArray.sort((a, b) => a.number - b.number)
    }

    transfer(outNumber, inNumber, value) {
        const indexOut = this._accArray.findIndex(acc => acc.number === parseInt(outNumber))
        const indexIn = this._accArray.findIndex(acc => acc.number === parseInt(inNumber))
        if (indexOut === -1 || indexIn === -1) {
            return 'Invalid account number'
        }
        if (this._accArray[indexOut].balance < value) {
            return 'Not enough funds'
        }
        this._accArray[indexOut].withdraw(value, 'Transfer out')
        this._accArray[indexIn].deposit(value, 'Transfer in')
        return 'Success'
    }

    accountDeposit(number, value) {
        const index = this._accArray.findIndex(acc => acc.number === parseInt(number))
        if (index === -1) return 'Invalid account number'
        this._accArray[index].deposit(value, 'Deposit')
        return 'Success'
    }

    accountWithdraw(number, value) {
        const index = this._accArray.findIndex(acc => acc.number === parseInt(number))
        if (index === -1) return 'Invalid Account number'
        return this._accArray[index].withdraw(value, 'Withdraw')
    }

    accountStatement(number) {
        const index = this._accArray.findIndex(acc => acc.number === parseInt(number))
        if (index === -1) return
        return this._accArray[index].statement
    }

    resetMonth() {
        console.log(this._accArray)
        this._accArray.forEach(acc => {
            if (acc.type === 'Basic' || acc.type === 'Student') {
                acc.resetLimit()
            }
        })
        console.log(this._accArray)
    }
}
