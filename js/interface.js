import Bank from "./bank.js";

let banking = new Bank()

// Menu elements
const menuDiv = document.getElementById('menuDiv')
const newAccountBtn = document.getElementById('newAccountBtn')
const wireTransferBtn = document.getElementById('wireTransferBtn')
const movementBtn = document.getElementById('movementBtn')
const statementBtn = document.getElementById('statementBtn')
const resetMonthBtn = document.getElementById('resetMonthBtn')

// New account elements
const newAccountDiv = document.getElementById('newAccountDiv')
const newHolder = document.getElementById('newHolder')
const newBasicRadio = document.getElementById('newBasicRadio')
const newStudentRadio = document.getElementById('newStudentRadio')
const newPlatinumRadio = document.getElementById('newPlatinumRadio')
const rejectNewBtn = document.getElementById('rejectNewBtn')
const acceptNewBtn = document.getElementById('acceptNewBtn')

// Movement elements
const movementDiv = document.getElementById('movementDiv')
const movAccNumber = document.getElementById('movAccNumber')
const depositRadio = document.getElementById('depositRadio')
const withdrawalRadio = document.getElementById('withdrawalRadio')
const movValue = document.getElementById('movValue')
const rejectMovBtn = document.getElementById('rejectMovBtn')
const acceptMovBtn = document.getElementById('acceptMovBtn')

// Funds transfer elements
const transferDiv = document.getElementById('transferDiv')
const transAccNumberOut = document.getElementById('transAccNumberOut')
const transAccNumberIn = document.getElementById('transAccNumberIn')
const transValue = document.getElementById('transValue')
const rejectTransBtn = document.getElementById('rejectTransBtn')
const acceptTransBtn = document.getElementById('acceptTransBtn')

// Statement elements
const statementDiv = document.getElementById('statementDiv')
const statAccNumber = document.getElementById('statAccNumber')
const rejectStatBtn = document.getElementById('rejectStatBtn')
const acceptStatBtn = document.getElementById('acceptStatBtn')
const statTableBody = document.getElementById('statTableBody')

/* Event listeners */

    /* Menu elements */
newAccountBtn.addEventListener('click', () => {
    hideMenuDiv()
    showNewAccDiv()
})

wireTransferBtn.addEventListener('click', () => {
    hideMenuDiv()
    showTransferDiv()
})

movementBtn.addEventListener('click', () => {
    hideMenuDiv()
    showMovementDiv()
})

statementBtn.addEventListener('click', () => {
    hideMenuDiv()
    showStatementDiv()
})

resetMonthBtn.addEventListener('click', () => {
    banking.resetMonth()
    alert('Monthly limits has been reset')
})

    /* New account elements */

rejectNewBtn.addEventListener('click', () => {
    hideNewAccDiv()
    showMenuDiv()
})

acceptNewBtn.addEventListener('click', () => {
    if (newHolder.value === '') {
        alert('Missing account holder\'s name')
        return
    }
    if (newBasicRadio.checked) {
        banking.newAccount(newHolder.value, 'Basic')
    }
    else {
        if (newStudentRadio.checked) {
            banking.newAccount(newHolder.value, 'Student')
        }
        else {
            if (newPlatinumRadio.checked) {
                banking.newAccount(newHolder.value, 'Platinum')
            }
            else {
                alert('Account type not selected')
                return
            }
        }
    }
    hideNewAccDiv()
    showMenuDiv()
})

    /* Funds transfer elements */

rejectTransBtn.addEventListener('click', () => {
    hideTransferDiv()
    showMenuDiv()
})

acceptTransBtn.addEventListener('click', () => {
    if (transAccNumberIn.value === transAccNumberOut.value) {
        alert('You can\'t make transfers between the same account')
        return
    }
    if (transValue.value === '') {
        alert('Invalid value')
        return
    }
    const error = banking.transfer(transAccNumberOut.value, transAccNumberIn.value, transValue.value)
    if (error !== 'Success') {
        alert(error)
        return
    }
    hideTransferDiv()
    showMenuDiv()
})

    /* Movement elements */

rejectMovBtn.addEventListener('click', () => {
    hideMovementDiv()
    showMenuDiv()
})

acceptMovBtn.addEventListener('click', () => {
    let error
    if (movValue.value === '') {
        alert('Invalid value')
        return
    }
    if (depositRadio.checked) {
        error = banking.accountDeposit(movAccNumber.value, movValue.value)
    }
    else {
        if (withdrawalRadio.checked) {
            error = banking.accountWithdraw(movAccNumber.value, movValue.value)
        }
        else {
            alert('Invalid operation type')
            return
        }
    }
    if (error !== 'Success') {
        alert(error)
    }
    hideMovementDiv()
    showMenuDiv()
})

    /* Statement elements */

rejectStatBtn.addEventListener('click', () => {
    hideStatementDiv()
    showMenuDiv()
})

acceptStatBtn.addEventListener('click', () => {
    updateStatement(statAccNumber.value)
})

/* Interface functions */

function hideMenuDiv() {
    menuDiv.style.display = 'none'
}

function showMenuDiv() {
    menuDiv.style.display = 'flex'
}

function hideNewAccDiv() {
    newAccountDiv.style.display = 'none'
    newHolder.value = ''
    newPlatinumRadio.checked = false
    newStudentRadio.checked = false
    newBasicRadio.checked = false
}

function showNewAccDiv() {
    newAccountDiv.style.display = 'flex'
}

function hideTransferDiv() {
    transferDiv.style.display = 'none'
    transValue.value = ''
    removeOptions()
}

function showTransferDiv() {
    updateSelect(transAccNumberOut)
    updateSelect(transAccNumberIn)
    transferDiv.style.display = 'flex'
}

function hideMovementDiv() {
    movementDiv.style.display = 'none'
    movValue.value = ''
    depositRadio.checked = false
    withdrawalRadio.checked = false
    removeOptions()
}

function showMovementDiv() {
    updateSelect(movAccNumber)
    movementDiv.style.display = 'flex'
}

function hideStatementDiv() {
    statementDiv.style.display = 'none'
    statTableBody.innerHTML = ''
    removeOptions()
}

function showStatementDiv() {
    statementDiv.style.display = 'flex'
    updateSelect(statAccNumber)
}

function updateStatement(acc) {
    const statement = banking.accountStatement(acc)
    statement.forEach(statement => {
        let row = statTableBody.insertRow()
        let date = row.insertCell(0)
        date.innerHTML = statement.date
        let type = row.insertCell(1)
        type.innerHTML = statement.type
        let value = row.insertCell(2)
        value.innerHTML = statement.value
        let balance = row.insertCell(3)
        balance.innerHTML = statement.balanceAfter
    })
}

function updateSelect(element) {
    banking.accArray.forEach(acc => {
        let option = document.createElement('option')
        option.value = acc.number
        option.innerHTML = acc.number
        element.appendChild(option)
    })
}

function removeOptions() {
    let options = document.getElementsByTagName('option')
    while (options.length > 0) {
        options[0].parentNode.removeChild(options[0])
    }
}

banking.newAccount('Anthony', 'Platinum')
banking.newAccount('Joseph', 'Student')
banking.newAccount('Marcus', 'Basic')
banking.newAccount('Brad', 'Student')
banking.newAccount('Anthony', 'Platinum')
