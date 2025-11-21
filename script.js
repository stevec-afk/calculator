const keypad = document.getElementById('keypad');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

let expression = '';
let result = 0;
let prevOperand = '';
let currOperand = '';
let operator = '';
let pressedSubmit = false;

keypad.addEventListener('click', buttonClick);

function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    // console.log(target, action, value);

    switch (action) {
        case 'clear':
            clear();
            console.clear();
            break;
        case 'neg':
            if (expression == '' || expression == 0){
                return;
            }
            expression *= -1;
            break;
        case 'mod':
            expression = expression / 100;
            break;
        case 'decimal':
            decimal();
            break
        case 'backspace':
            expression = expression.slice(0, -1);
            break;
        case 'submit':
            if (operator === '' || currOperand === '') break;
            compute();
            expression = '';
            prevOperand = '';
            currOperand = result;
            expression = result;
            result = '';
            pressedSubmit = true;
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            chooseOperation(value);
            break;
        case 'number':
            if (pressedSubmit) clear(); 
            expression += value;
            currOperand += value;
            break;
    }    
    // Update the display
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
    console.log("prevOperand:",prevOperand,"Operator:",operator," currOperand:",currOperand)
}

function clear() {
    expression = '';
    result = '';
    prevOperand = '';
    currOperand = '';
    operator = '';
    pressedSubmit = false;
}

function decimal() {
    // If there is already a decimal, do nothing
    if (expression.includes('.')) return; 
    
    // If the current expression is blank, append a leading '0'
    if (expression === '') appendValue('0');

    expression =+ '.'; // Ok now you can do the thing
    return;
}

function evaluateExpression() {
    result = expression;
}

function chooseOperation(value) {
    if (operator != ''){
        compute();
        prevOperand = result;
        operator ='';
    } else {
        prevOperand = currOperand;
    }
    operator = value;
    currOperand = '';
    expression += value;
    pressedSubmit=false;
}

function compute() {
    let prev = parseFloat(prevOperand);
    let curr = parseFloat(currOperand);
    switch (operator){
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    operator = '';
}


    // appendValue(value);
    // result = expression;
    // expression = '';

    // if (expression ==='' && result !==''){
    //     expression += result + value;
    // } else if (expression !== '' && !isNaN(parseInt(expression.slice(-1)))){
    //     appendValue(value);
    // }
