import Account from "./account";

export default class BasicAccount extends Account {
    constructor(number, owner, type,) {
        super();
        this._freeStatement = 3
        this._freeTransfer = 3
        this._withdrawLimit = 1000
    }


}