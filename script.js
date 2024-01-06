'use strict';

const btnNumbers = document.querySelectorAll('.btn-number');
const btnOperators = document.querySelectorAll('.btn-operator');
const btnClear = document.getElementById('btnClear');
const btnRemove = document.getElementById('btnRemove');
const btnCalculate = document.getElementById('btnCalculate');
const btnDot = document.getElementById('btnDot');
const screenCalculator = document.getElementsByClassName('screen');
const screenHistory = document.getElementById('screen-history');
const screenInput = document.getElementById('screen-input');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;

btnNumbers.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

btnOperators.forEach((button) =>
    button.addEventListener('click', () => appendOperator(button.textContent))
)

window.addEventListener('keydown', keyboardInput)
btnDot.addEventListener('click', appendDot);
btnClear.addEventListener('click', clearScreen);
btnRemove.addEventListener('click', removeNumber);
btnCalculate.addEventListener('click', calculateOperation);

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendDot()
    if (e.key === '=' || e.key === 'Enter') calculateOperation()
    if (e.key === 'Backspace') removeNumber()
    if (e.key === 'Escape') clearScreen()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        appendOperator(e.key)
}

function appendDot() {
    if (screenInput.textContent === '') screenInput.textContent = '0';
    if (!screenInput.textContent.includes('.')) screenInput.textContent += '.';
}

function removeNumber() {
    screenInput.textContent = screenInput.textContent.toString().slice(0, -1);
}

function clearScreen() {
    currentOperator = null;
    screenInput.textContent = '0';
    screenHistory.textContent = '';
    firstOperand = '';
    secondOperand = '';
}

function appendNumber(number) {
    if (screenInput.textContent === '0') screenInput.textContent = '';
    screenInput.textContent += number;
}

function appendOperator(operator) {
    if (currentOperator !== null) calculateOperation();
    firstOperand = screenInput.textContent;
    currentOperator = operator;
    screenHistory.textContent = `${firstOperand} ${currentOperator}`;
    screenInput.textContent = '';
}

const add = (x, y) => x + y;
const substract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate(operator, x, y) {
    x = Number(x);
    y = Number(y);
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return substract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            if (y === 0) return null;
            return divide(x, y);
        default:
            return null;
    }
}

function calculateOperation() {
    if (currentOperator === null) return;
    if (currentOperator === '/' && screenInput.textContent === '0') {
        screenInput.textContent = "You can't divide by zero 😐";
        return;
    }
    secondOperand = screenInput.textContent;
    screenInput.textContent = Math.round(operate(currentOperator, firstOperand, secondOperand) * 1000) / 1000;
    screenHistory.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
}