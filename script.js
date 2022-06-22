const operatorFunctions = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "÷": (a, b) => a / b,
};

const specialOperators = {
  isSpecialOperator: (key) => (key in specialOperators ? 1 : 0),
  "=": () => {},
  ac: () => {},
  c: () => {},
  ".": () => {},
};

const calculator = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
  calculate: specialOperators["="],
};

const topDisplayElement = document.querySelector(".top-display");
const bottomDisplayElement = document.querySelector(".bottom-display");
const operators = document.querySelectorAll(".operator");
const operands = document.querySelectorAll(".operand");

function setDisplayText(text, displayElement, shouldAppend) {
  if (shouldAppend) {
    const appendedText = displayElement.textContent.concat(text);
    displayElement.textContent = appendedText;
    return;
  }
  displayElement.textContent = text;
}

function updateCalcOperand(value, calcOperand, shouldAppend) {
  setDisplayText(value, bottomDisplayElement, shouldAppend);
  const newOperand = `${+bottomDisplayElement.textContent}`;
  !calcOperand
    ? (calculator.firstOperand = newOperand)
    : (calculator.secondOperand = newOperand);
}

function updateCalcOperator(value, operatorFunction, isReplacing) {
  const currentBottomText = bottomDisplayElement.textContent;
  calculator.operator = operatorFunction;

  if (isReplacing) {
    const textToAppend = currentBottomText.slice(0, -1).concat(value);
    setDisplayText(textToAppend, bottomDisplayElement, false);
    return;
  }
  setDisplayText(` ${value}`, bottomDisplayElement, true);
}

function handleOperandClick(event) {
  const clickedNumber = event.target.textContent;
  if (calculator.secondOperand !== null) {
    updateCalcOperand(clickedNumber, 1, true);
    return;
  } else if (calculator.operator !== null) {
    bottomText = bottomDisplayElement.textContent;
    setDisplayText(bottomText, topDisplayElement, false);
    updateCalcOperand(clickedNumber, 1, false);
    return;
  } else if (calculator.firstOperand !== null) {
    updateCalcOperand(clickedNumber, 0, true);
    return;
  } else {
    updateCalcOperand(clickedNumber, 0, false);
  }
}

function handleOperatorClick(event) {
  const clickedOperatorText = event.target.textContent.toLowerCase();
  let clickedOperatorFunction = operatorFunctions[clickedOperatorText];

  if (specialOperators.isSpecialOperator(clickedOperatorText)) {
    specialOperators[clickedOperatorText]();
    return;
  }

  if (calculator.firstOperand === null) return;

  if (calculator.secondOperand !== null) {
    calculator.calculate();
    // handleOperatorClick();
  } else if (calculator.operator !== null) {
    updateCalcOperator(clickedOperatorText, clickedOperatorFunction, true);
    return;
  } else {
    updateCalcOperator(clickedOperatorText, clickedOperatorFunction, false);
  }
}

operands.forEach((element) => {
  element.addEventListener("click", handleOperandClick);
});

operators.forEach((element) => {
  element.addEventListener("click", handleOperatorClick);
});
