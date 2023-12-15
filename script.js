'use strict';

const btnNumbers = document.querySelectorAll('.btn-number');
const btnOperators = document.querySelectorAll('.btn-operator');
const btnClear = document.getElementById('btnClear');
const btnRemove = document.getElementById('btnRemove');
const btnCalculate = document.getElementById('btnCalculate');
const screenCalculator = document.getElementsByClassName('screen');
const screenHistory = document.getElementById('screen-history');
const screenInput = document.getElementById('screen-input');

btnNumbers.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

btnOperators.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

window.addEventListener('keydown', keyboardInput)
btnDot.addEventListener('click', appendDot);
btnClear.addEventListener('click', clearScreen);
btnRemove.addEventListener('click', removeElement);
btnCalculate.addEventListener('click', calculateOperation);