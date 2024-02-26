const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//input box 값 가져오기
function getUserNumberInput() {
  return parseFloat(userInput.value);
}

//계산식 제작 및 표출하기
function createAndWriteOutPut(operator, resultBeforeCalc, calcNumber) {
  const calDescription = `${resultBeforeCalc}${operator}${calcNumber}`;
  outputResult(currentResult, calDescription); //from vendor.js
}

function writeToLog(operationIdentifier, prevResult, number, newResult) {
  const logEntry = {
    operation: operationIdentifier,
    number: number,
    prevResult: prevResult,
    result: newResult
  };
  logEntries.push(logEntry);
}

function calculateResult(calculateType) {
  const enteredNumber = getUserNumberInput();
  if (
    (calculateType !== 'ADD' &&
      calculateType !== 'SUBTRACT' &&
      calculateType !== 'MULTIPLY' &&
      calculateType !== 'DIVIDE') ||
    !enteredNumber
  ) {
    return;
  }
  const initalResult = currentResult;
  let mathOperator;
  if (calculateType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculateType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculateType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else if (calculateType === 'DIVIDE') {
    currentResult /= enteredNumber;
    mathOperator = '/';
  }
  createAndWriteOutPut(mathOperator, initalResult, enteredNumber);
  writeToLog(calculateType, initalResult, enteredNumber, currentResult);
}

function add() {
  calculateResult('ADD');
}

function subtract() {
  calculateResult('SUBTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
}

function divide() {
  calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
