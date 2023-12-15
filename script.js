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

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendDot()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key))
}
