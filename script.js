let currentInput = "0";
let previousInput = "";
let operator = null;

let lastOperator = null;
let lastOperand = null;

// 1. INITIALIZE DISPLAY ON LOAD
window.onload = () => {
    const savedTheme = localStorage.getItem('calculator-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateDisplay(); // Ensures the initial "0" is visible
};

function updateDisplay() {
    const outputElement = document.getElementById('output');
    if (!outputElement) return;

    let displayValue = currentInput;

    // 2. IMPROVED COMMA LOGIC
    // Only format if it's a normal number (no scientific 'e', no Error, no infinity)
    if (displayValue !== "Error" && !displayValue.includes('e') && displayValue !== "Infinity") {
        let parts = displayValue.split('.');
        // Add commas to the integer part using a regex
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        displayValue = parts.join('.');
    }

    outputElement.innerText = displayValue;

    // 3. SCALE FONT BASED ON THE FINAL FORMATTED STRING
    scaleOutputFont(displayValue.length);
}

function scaleOutputFont(length) {
    const display = document.getElementById('output');
    if (!display) return;
    
    // Smooth scaling steps for a high-end feel
    if (length > 16) {
        display.style.fontSize = "1.75rem";
    } else if (length > 13) {
        display.style.fontSize = "2rem";
    } else if (length > 10) {
        display.style.fontSize = "2.5rem";
    } else if (length > 8) {
        display.style.fontSize = "3.25rem";
    } else if (length > 6) {
        display.style.fontSize = "4rem";
    } else {
        display.style.fontSize = "4.5rem"; 
    }
}

function appendValue(val) {
    if (currentInput === "Error") currentInput = "0";
    
    // Decimal Blocker
    if (val === '.' && currentInput.includes('.')) return;

    // Digit Limiter (16 digits max)
    const pureDigits = currentInput.replace(/[.,-]/g, '');
    if (pureDigits.length >= 16) return;

    if (currentInput === "0" && val !== '.') {
        currentInput = val;
    } else {
        currentInput += val;
    }
    updateDisplay();
}

function deleteLast() {
    if (currentInput === "Error" || currentInput.length <= 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function setOperator(op, btnElement) {
    if (currentInput === "Error") return;
    
    // Allow chaining: 5 + 5 + ... (calculates 10 then sets next operator)
    if (previousInput !== "" && currentInput !== "") {
        calculate();
    }

    document.querySelectorAll('.orange').forEach(b => b.classList.remove('active-operator'));
    if (btnElement) btnElement.classList.add('active-operator');

    operator = op;
    previousInput = currentInput;
    currentInput = "0"; // Reset input for the next number
}

function calculate() {
    let res;
    let prev, curr;

    // Check if we are repeating the last operation (Hitting Enter again)
    if (!operator && lastOperator && lastOperand !== null) {
        prev = parseFloat(currentInput.replace(/,/g, ''));
        curr = lastOperand;
        operator = lastOperator; // Temporarily restore to use in switch
    } else if (operator && currentInput !== "") {
        // Standard calculation
        prev = parseFloat(previousInput.replace(/,/g, ''));
        curr = parseFloat(currentInput.replace(/,/g, ''));
        
        // Save these for the next time 'Enter' is pressed
        lastOperator = operator;
        lastOperand = curr;
    } else {
        return; // Nothing to calculate
    }

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+': res = prev + curr; break;
        case '-': res = prev - curr; break;
        case '*': res = prev * curr; break;
        case '/': 
            if (curr === 0) {
                currentInput = "Error";
                updateDisplay();
                return;
            }
            res = prev / curr; 
            break;
        default: return;
    }

    // Standard result formatting
    if (Math.abs(res) >= 1e16) {
        currentInput = res.toExponential(6); 
    } else {
        let formattedRes = parseFloat(res.toFixed(10));
        currentInput = formattedRes.toString();
        if (currentInput.length > 16) currentInput = res.toExponential(6);
    }

    // Reset standard operation variables but NOT the 'last' variables
    operator = null;
    previousInput = "";
    
    document.querySelectorAll('.orange').forEach(b => b.classList.remove('active-operator'));
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    
    // Wipe the repeat memory
    lastOperator = null;
    lastOperand = null;
    
    document.querySelectorAll('.orange').forEach(b => b.classList.remove('active-operator'));
    updateDisplay();
}

function toggleTheme() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('calculator-theme', newTheme);
}

function applyPercentage() {
    if (currentInput === "Error" || currentInput === "0") return;

    // Convert string to number, divide by 100
    let value = parseFloat(currentInput.replace(/,/g, ''));
    let result = value / 100;

    // Format result to avoid long floating point strings (e.g., 0.1 + 0.2 issues)
    if (Math.abs(result) < 1e-10 && result !== 0) {
        currentInput = result.toExponential(6);
    } else {
        currentInput = parseFloat(result.toFixed(10)).toString();
    }

    updateDisplay();
}

// UPDATE TO KEYBOARD SUPPORT
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.') appendValue(key);
    if (key === 'Enter') { event.preventDefault(); calculate(); }
    if (key === 'Backspace') deleteLast();
    if (key === 'Escape') clearDisplay();
    
    // ADDED: Percentage key support
    if (key === '%') applyPercentage();

    if (['+', '-', '*', '/'].includes(key)) {
        const buttons = Array.from(document.querySelectorAll('.orange'));
        const targetButton = buttons.find(btn => 
            btn.innerText === (key === '*' ? '×' : key === '/' ? '÷' : key)
        );
        setOperator(key, targetButton);
    }
});

