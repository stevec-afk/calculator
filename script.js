const keypad = document.getElementById('keypad');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

let result = 0;
let prevOperand = '';
let currOperand = '';
let operator = '';
let pressedSubmit = false;
let expression = '';

keypad.addEventListener('click', buttonClick);

function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    switch (action) {
        case 'clear':
            clear();
            console.clear();
            break;
        case 'neg':
            currOperand *= -1;
            break;
        case 'mod':
            expression = expression / 100;
            currOperand = currOperand / 100;
            break;
        case 'decimal':
            decimal();
            break
        case 'backspace':
            // if (isNaN(expression.slice(-1)) && operator !== ''){
            //     expression = expression.slice(0, -1);
            //     operator = '';
            // } else {
                if (currOperand !== ''){
                    currOperand = currOperand.slice(0, -1);
                    expression = expression.slice(0, -1);
                }
            //}
            break;
        case 'submit':
            expression = result;
            currOperand = result;
            result = '';
            prevOperand = '';
            operator = '';
            pressedSubmit = true;
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            try{  
                expression.slice(-1);
            }
            catch(err){
                expression = expression.toString();
            }
            finally {
                if (!isNaN(expression.slice(-1))){
                    // if operater is blank, map currOperand to prev, 
                    // else if operator already exists, map result to prev instead.
                    prevOperand = (operator === '') ? currOperand : result;
                    operator = value; 
                    expression += operator; 
                    currOperand = '';
                    compute();
                }
            }
            break;
        case 'number':
            if (pressedSubmit){
                clear();
                pressedSubmit = false;
            }
            currOperand += value;
            expression += value;
            compute();
            break;
    }   
    
    //prevOperand + operator + currOperand
    // Update the display in HTML
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
    console.log("prevOperand:",prevOperand,"Operator:",operator," currOperand:",currOperand, "result: ",result)
}

function clear() {
    result = '';
    prevOperand = '';
    currOperand = '';
    operator = '';
    pressedSubmit = false;
    expression = '';
}

function decimal() {
    // If there is already a decimal, do nothing
    if (expression.includes('.')) return; 
    
    // If the current expression is blank, append a leading '0'
    if (expression === '') appendValue('0');

    expression += '.'; // Ok now you can do the thing
    currOperand += '.';
    return;
}
function compute() {
    // Check if we can actually do math yet
    if (prevOperand === '' || currOperand === '' || operator === ''){
        return; 
    } else {
        // do the math
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
    }
}

// Update the calculator state, depending on what was pressed
function update(action, value){
    if (action === 'number'){
        currOperand += value;
        return;
    } else if (action ==='submit'){ 
        prevOperand = '';
        currOperand = result;
        result = '';
        pressedSubmit = true;
    } else {
        operator = value;
        currOperand = '';
        pressedSubmit=false;
    }
}

