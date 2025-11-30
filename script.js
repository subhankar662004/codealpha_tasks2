let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function clear() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero');
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        if (button.classList.contains('number')) {
            appendNumber(id);
        } else if (button.classList.contains('operator')) {
            appendOperator(button.textContent);
        } else if (id === 'clear') {
            clear();
        } else if (id === 'equals') {
            calculate();
        } else if (id === 'decimal') {
            if (!currentInput.includes('.')) {
                appendNumber('.');
            }
        }
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        if (!currentInput.includes('.')) {
            appendNumber('.');
        }
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        let op = key;
        if (key === '*') op = '×';
        if (key === '/') op = '÷';
        appendOperator(op);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
    }
});
