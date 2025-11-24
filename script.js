const keypad = document.getElementById('keypad');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

let result = 0;
let prevOperand = '';
let currOperand = '';
let operator = '';
let pressedSubmit = false;
let expression = '';

// One function to handle all the clicks! 
// (1 handler vs 20 is better for performance)
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
            // Technically should also update the display here. Meh.
            break;
        case 'mod':
            expression = expression / 100;
            currOperand = currOperand / 100;
            break;
        case 'decimal':
            decimal();
            break
        case 'backspace':
            if (currOperand !== ''){
                currOperand = currOperand.slice(0, -1);
                expression = expression.slice(0, -1);
            }
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
            // JS freaks out over decimals so we need to check to see 
            // if JS thinks its a string or not and conv as needed.
            try{  
                expression.slice(-1); // if it throws an error...
            }
            catch(err){
                // ...then convert to a string
                expression = expression.toString(); 
            }
            finally {
                if (!isNaN(expression.slice(-1))){
                    // if operater is blank, map currOperand to prev, 
                    // else if operator already exists, map result to prev instead.
                    // (behavior should be different)
                    prevOperand = (operator === '') ? currOperand : result;
                    operator = value; 
                    expression += operator; 
                    currOperand = '';
                    compute();
                }
            }
            break;
        case 'number':
            // If user just pressed submit, then start over fresh
            if (pressedSubmit){
                clear();
                pressedSubmit = false;
            }
            currOperand += value;
            expression += value;
            compute();
            break;
    }   
    
    // Update the display in the DOM
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
    if (expression.includes('.')) return; 
    if (expression === '') appendValue('0');
    expression += '.'; 
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
                result = Number((prev + curr).toFixed(10));
                break;
            case '-':
                result = Number((prev - curr).toFixed(10));
                break;
            case '*':
                result = Number((prev * curr).toFixed(10));
                break;
            case '/':
                result = Number((prev / curr).toFixed(10));
                break;
            default:
                return;
        }
        if (!Number.isFinite(result)){
            result = "Ya can't do that!"
            console.log("https://media1.tenor.com/m/wkTHtO_TCFcAAAAd/hockey-you-cant-do-that.gif")
        }
    }
}