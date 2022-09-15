import BasicAccount from "./basicAccount";
import StudentAccount from "./studentAccount";
import PlatinumAccount from "./platinumAccount";

export default class Bank {
    constructor() {
        this._accArray = []
    }

    newAccount(name, type) {
        let account
        switch (type) {
            case 'basic':
                account = new BasicAccount(type)
                this._accArray.push(account)
                break
            case 'student':
                account = new StudentAccount(type)
                this._accArray.push(account)
                break
            case 'platinum':
                account = new PlatinumAccount(type)
        }
    }
}