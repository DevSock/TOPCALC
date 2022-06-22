const calculator = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
};

const topDisplayElement = document.querySelector(".top-display");
const bottomDisplayElement = document.querySelector(".bottom-display");
const operators = document.querySelectorAll(".operator");
const operands = document.querySelectorAll(".operand");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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

function handleOperandClick(event) {
  const clickedNumber = event.target.textContent;
  console.log(
    `firstOperand: ${calculator.firstOperand}\nsecondOperand: ${calculator.secondOperand}`
  );
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
  const clickedOperatorText = event.target.textContent;
  let clickedOperatorFunction;
}

operands.forEach((element) => {
  element.addEventListener("click", handleOperandClick);
});

operators.forEach((element) => {
  element.addEventListener("click", handleOperatorClick);
});
