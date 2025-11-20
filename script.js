const keypad = document.getElementById('keypad');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

let expression = '';
let result = '';

keypad.addEventListener('click', buttonClick);

function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    // console.log(target, action, value);
    switch (action) {
        case 'clear':
            clear();
            break;
        case 'neg':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break
        case 'number':
            appendValue(value);
            break;
        case 'backspace':
            backspace();
            break;
        case 'submit':
            evaluateExpression();
            expression = '';
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            operator(value);
            break;
    }    
    updateDisplay();
}

function updateDisplay(){
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear() {
    expression = '';
    result = '';
}

function negate() {
    if (expression == '' || expression == 0){
        return;
    }
    expression *= -1;
}

function percentage() {
    expression = expression / 100;
}

function decimal() {
    return;
}

function appendValue(value) {
    expression += value;
}

function backspace() {
    expression = expression.slice(0, -1);
}

function evaluateExpression() {
    result = expression;
}

function operator(value) {
    if (expression ==='' && result !==''){
        expression += result + value;
    } else if (expression !== '' && !isNaN(parseInt(expression.slice(-1)))){
        appendValue(value);
    }
}