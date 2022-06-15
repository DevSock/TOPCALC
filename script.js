const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  secondOperand: null,
};

const topDisplayElement = document.querySelector(".top-display");
const bottomDisplayElement = document.querySelector(".bottom-display");
const operators = document.querySelectorAll(".operator");
const operands = document.querySelectorAll(".operand");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function setDisplayText(displayElement, operand) {
  displayElement.textContent = operand;
}

function handleOperandClick(event) {
  const targetTextContent = event.target.textContent;

  if (!calculator.firstOperand) {
    calculator.firstOperand = +targetTextContent;
    setDisplayText(bottomDisplayElement, calculator.firstOperand);
    return;
  } else if (!calculator.operator) {
    calculator.firstOperand = +`${calculator.firstOperand}${targetTextContent}`;
    setDisplayText(bottomDisplayElement, calculator.firstOperand);
    return;
  } else if (!calculator.secondOperand) {
    calculator.secondOperand = +targetTextContent;
    setDisplayText(topDisplayElement, calculator.firstOperand);
    setDisplayText(bottomDisplayElement, calculator.secondOperand);
    return;
  } else {
    calculator.secondOperand =
      +`${calculator.secondOperand}${targetTextContent}`;
    setDisplayText(bottomDisplayElement, calculator.secondOperand);
    return;
  }
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error";
  }
}

operands.forEach((element) => {
  element.addEventListener("click", handleOperandClick);
});
