// Get references to the buttons and input field
const mrButton = document.getElementById('mrButton');
const mcButton = document.getElementById('mcButton');
const mPlusButton = document.getElementById('mPlusButton');
const openParenButton = document.getElementById('openParenButton');
const closeParenButton = document.getElementById('closeParenButton');
const sevenButton = document.getElementById('sevenButton');
const eightButton = document.getElementById('eightButton');
const nineButton = document.getElementById('nineButton');
const divisionButton = document.getElementById('divisionButton');
const clearButton = document.getElementById('clearButton');
const fourButton = document.getElementById('fourButton');
const fiveButton = document.getElementById('fiveButton');
const sixButton = document.getElementById('sixButton');
const multiplyButton = document.getElementById('multiplyButton');
const clearEntryButton = document.getElementById('clearEntryButton');
const oneButton = document.getElementById('oneButton');
const twoButton = document.getElementById('twoButton');
const threeButton = document.getElementById('threeButton');
const subtractButton = document.getElementById('subtractButton');
const sqrtButton = document.getElementById('sqrtButton');
const signButton = document.getElementById('signButton');
const zeroButton = document.getElementById('zeroButton');
const decimalButton = document.getElementById('decimalButton');
const addButton = document.getElementById('addButton');
const equalButton = document.getElementById('equalButton');
const transferButton = document.getElementById('transferButton');
const output = document.getElementById('output');

// Add event listeners to the buttons
mrButton.addEventListener('click', memoryRecall);
mcButton.addEventListener('click', memoryClear);
mPlusButton.addEventListener('click', memorySum);
openParenButton.addEventListener('click', function () {
  appendOperator('(');
});
closeParenButton.addEventListener('click', function () {
  appendOperator(')');
});
sevenButton.addEventListener('click', function () {
  appendValue('7');
});
eightButton.addEventListener('click', function () {
  appendValue('8');
});
nineButton.addEventListener('click', function () {
  appendValue('9');
});
divisionButton.addEventListener('click', function () {
  appendOperator('/');
});
clearButton.addEventListener('click', clearDisplay);
fourButton.addEventListener('click', function () {
  appendValue('4');
});
fiveButton.addEventListener('click', function () {
  appendValue('5');
});
sixButton.addEventListener('click', function () {
  appendValue('6');
});
multiplyButton.addEventListener('click', function () {
  appendOperator('*');
});
clearEntryButton.addEventListener('click', clearEntry);
oneButton.addEventListener('click', function () {
  appendValue('1');
});
twoButton.addEventListener('click', function () {
  appendValue('2');
});
threeButton.addEventListener('click', function () {
  appendValue('3');
});
subtractButton.addEventListener('click', function () {
  appendOperator('-');
});
sqrtButton.addEventListener('click', calculateSquareRoot);
signButton.addEventListener('click', changeSign);
zeroButton.addEventListener('click', function () {
  appendValue('0');
});
decimalButton.addEventListener('click', appendDecimalPoint);
addButton.addEventListener('click', function () {
  appendOperator('+');
});
equalButton.addEventListener('click', calculate);
transferButton.addEventListener('click', copyToClipboard);

let displayValue = '';
let equalsPressed = false; // Track if equals button was pressed

function appendValue(value) {
  if (equalsPressed) {
    clearDisplay();
    equalsPressed = false;
  }
  displayValue += value;
  updateDisplay();
}

function appendOperator(operator) {
  if (equalsPressed) {
    equalsPressed = false;
  }
  displayValue += operator;
  updateDisplay();
}

function calculate() {
  try {
    const powerRegex = /\d+\*\*\d+/g;
    if (displayValue.match(powerRegex)) {
      throw new Error('Power operation not allowed');
    }

    const result = Function(`return ${displayValue}`)();
    displayValue = result.toString();
    updateDisplay();
    equalsPressed = true;
  } catch (error) {
    displayValue = 'Error';
    updateDisplay();
    equalsPressed = true;
  }
}

function calculateSquareRoot() {
  try {
    const value = parseFloat(displayValue);
    if (value >= 0) {
      const result = Math.sqrt(value);
      displayValue = result.toFixed(6);
      updateDisplay();
    } else {
      displayValue = 'Error';
      updateDisplay();
    }
    equalsPressed = true;
  } catch (error) {
    displayValue = 'Error';
    updateDisplay();
    equalsPressed = true;
  }
}

function clearDisplay() {
  displayValue = '';
  updateDisplay();
}

function clearEntry() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

function changeSign() {
  displayValue = (-1 * parseFloat(displayValue)).toString();
  updateDisplay();
}

function appendDecimalPoint() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function memoryRecall() {
  displayValue += output.value;
  updateDisplay();
}

function memoryClear() {
  displayValue = '';
  updateDisplay();
}

function memorySum() {
  displayValue += output.value;
  updateDisplay();
}

function copyToClipboard() {
  output.select();
  document.execCommand('copy');
}

function updateDisplay() {
  output.value = displayValue;
}

// Initialize display
updateDisplay();
