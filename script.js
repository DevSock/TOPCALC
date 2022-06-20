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

  if (calculator.firstOperand === null) {
    calculator.firstOperand = +targetTextContent;
    setDisplayText(bottomDisplayElement, calculator.firstOperand);
    return;
  } else if (!calculator.operator) {
    calculator.firstOperand = +`${calculator.firstOperand}${targetTextContent}`;
    setDisplayText(bottomDisplayElement, calculator.firstOperand);
    return;
  } else if (calculator.secondOperand === null) {
    calculator.secondOperand = +targetTextContent;
    setDisplayText(topDisplayElement, bottomDisplayElement.textContent);
    setDisplayText(bottomDisplayElement, calculator.secondOperand);
    return;
  } else {
    calculator.secondOperand =
      +`${calculator.secondOperand}${targetTextContent}`;
    setDisplayText(bottomDisplayElement, calculator.secondOperand);
    return;
  }
}

function handleOperatorClick(event) {
  const targetTextContent = event.target.textContent;
  let displayText = null;
  let operator = null;

  switch (targetTextContent.toLowerCase()) {
    case "+":
      operator = add;
      break;
    case "-":
      operator = subtract;
      break;
    case "x":
      operator = multiply;
      break;
    case "÷":
      operator = divide;
      break;
    case "=":
      return;
    case "c":
      return;
    case "ac":
      return;
  }

  if (!calculator.operator) {
    calculator.operator = operator;
    displayText = bottomDisplayElement.textContent.concat(targetTextContent);
    setDisplayText(bottomDisplayElement, displayText);
    return;
  } else if (calculator.secondOperand === null) {
    calculator.operator = operator;
    displayText = bottomDisplayElement.textContent
      .slice(0, -1)
      .concat(targetTextContent);
    setDisplayText(bottomDisplayElement, displayText);
    return;
  } else {
    // operate(x, y, z);
    // handleOperatorClick(event);
  }
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return "Error";
  }
}

operands.forEach((element) => {
  element.addEventListener("click", handleOperandClick);
});

operators.forEach((element) => {
  element.addEventListener("click", handleOperatorClick);
});
