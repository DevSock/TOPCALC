const calculator = {
  displayValue: "0",
  firstOperand: null,
  secondOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const preOperatorElement = document.querySelector(".pre-operator");
const postOperatorElement = document.querySelector(".post-operator");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function setDisplayText(displayElement, operand) {
  displayElement.textContent = operand;
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
