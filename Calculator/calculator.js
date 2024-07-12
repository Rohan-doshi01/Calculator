document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.calculator-display');
    const buttons = document.querySelectorAll('.btn');
    const toggleButton = document.querySelector('.toggle-btn');
    const colorPicker = document.querySelector('#color-picker');
    const calculator = document.querySelector('.calculator');
    
    // Function to update colors
    function updateColors(color) {
        display.style.color = color;
        buttons.forEach(button => button.style.color = color);
        toggleButton.style.color = color;
    }

    // Initialize color picker
    colorPicker.addEventListener('input', function() {
        updateColors(this.value);
    });

    // Calculator logic
    let displayValue = '';

    function updateDisplay() {
        display.value = displayValue;
    }

    function clearDisplay() {
        displayValue = '';
        updateDisplay();
    }

    function calculateResult() {
        try {
            displayValue = eval(displayValue);
            updateDisplay();
        } catch (e) {
            displayValue = 'Error';
            updateDisplay();
        }
    }

    function appendToDisplay(value) {
        displayValue += value;
        updateDisplay();
    }

    function performScientificOperation(operation) {
        switch (operation) {
            case 'sin':
                displayValue = Math.sin(eval(displayValue));
                break;
            case 'cos':
                displayValue = Math.cos(eval(displayValue));
                break;
            case 'tan':
                displayValue = Math.tan(eval(displayValue));
                break;
            case 'log':
                displayValue = Math.log10(eval(displayValue));
                break;
            case 'sqrt':
                displayValue = Math.sqrt(eval(displayValue));
                break;
            case '^':
                displayValue += '**';
                break;
        }
        updateDisplay();
    }

    // Toggle between basic and scientific calculator
    toggleButton.addEventListener('click', function() {
        const basicButtons = document.querySelector('.calculator-buttons.basic');
        const scientificButtons = document.querySelector('.calculator-buttons.scientific');
        calculator.classList.toggle('scientific-mode');
        if (calculator.classList.contains('scientific-mode')) {
            basicButtons.style.display = 'grid';
            scientificButtons.style.display = 'grid';
            this.textContent = 'Basic';
        } else {
            basicButtons.style.display = 'grid';
            scientificButtons.style.display = 'none';
            this.textContent = 'Scientific';
        }
    });

    // Event delegation for calculator buttons
    document.querySelectorAll('.calculator-buttons').forEach(buttonsContainer => {
        buttonsContainer.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('btn')) {
                const value = target.getAttribute('data-value');
                if (value === 'C') {
                    clearDisplay();
                } else if (value === '=') {
                    calculateResult();
                } else if (['sin', 'cos', 'tan', 'log', 'sqrt', '^'].includes(value)) {
                    performScientificOperation(value);
                } else if (value === 'backspace') {
                    displayValue = displayValue.slice(0, -1);
                    updateDisplay();
                } else {
                    appendToDisplay(value);
                }
            }
        });
    });
});
