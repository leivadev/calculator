'use strict';

//calculator functionality

const btnNumbers = document.querySelectorAll('.btn-number');
const btnOperators = document.querySelectorAll('.btn-operator');
const btnClear = document.getElementById('btnClear');
const btnRemove = document.getElementById('btnRemove');
const btnCalculate = document.getElementById('btnCalculate');

const btnPlus = document.getElementById('btnPlus');
const btnMinus = document.getElementById('btnMinus');
const btnMultiply = document.getElementById('btnMultiply');
const btnDivide = document.getElementById('btnDivide');

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
    if (screenInput.textContent.length < 12) screenInput.textContent += number;
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
        case btnPlus.textContent:
            return add(x, y);
        case btnMinus.textContent:
            return substract(x, y);
        case btnMultiply.textContent:
            return multiply(x, y);
        case btnDivide.textContent:
            if (y === 0) return null;
            return divide(x, y);
        default:
            return null;
    }
}

function calculateOperation() {
    if (currentOperator === null) return;
    if (currentOperator === btnDivide.textContent && screenInput.textContent === '0') {
        screenInput.textContent = "You can't divide by zero 😐";
        return;
    }
    secondOperand = screenInput.textContent;
    if (secondOperand === '') secondOperand = '0';
    screenInput.textContent = Math.round(operate(currentOperator, firstOperand, secondOperand) * 1000) / 1000;
    screenHistory.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
}

//theme mode toggle functionality

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const button = document.querySelector("[data-theme-toggle]");
const iconElement = document.getElementById("icon");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }

    return "light";
}

button.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    const newIcon = newTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    iconElement.className = newIcon;
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    currentThemeSetting = newTheme;
});