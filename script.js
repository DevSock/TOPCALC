const calculator = {
  firstOperand: null,
  operator: null,
  secondOperand: null,
  prevResult: null,
  operate: function () {
    if (this.firstOperand === null || !this.operator) return;
    if (this.secondOperand === null) {
      this.operator = null;
      setDisplayText(bottomDisplayElement, this.firstOperand);
      return;
    }

    const prevResult = this.operator(this.firstOperand, this.secondOperand);
    setDisplayText(topDisplayElement, "0");
    setDisplayText(bottomDisplayElement, prevResult);
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = null;
  },
};

const topDisplayElement = document.querySelector(".top-display");
const bottomDisplayElement = document.querySelector(".bottom-display");
const operators = document.querySelectorAll(".operator");
const operands = document.querySelectorAll(".operand");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const equals = () => calculator.operate();
function clear() {
  if (calculator.firstOperand === null) return;

  if (calculator.secondOperand !== null) {
    calculator.secondOperand = null;
    setDisplayText(bottomDisplayElement, topDisplayElement.textContent);
    setDisplayText(topDisplayElement, "0");
    return;
  } else if (calculator.operator) {
    calculator.operator = null;
    const displayText = bottomDisplayElement.textContent.slice(0, -2);
    setDisplayText(bottomDisplayElement, displayText);
    return;
  } else {
    calculator.firstOperand = null;
    setDisplayText(bottomDisplayElement, "0");
    return;
  }
}
function clearAll() {
  calculator.firstOperand = null;
  calculator.secondOperand = null;
  calculator.operator = null;
  setDisplayText(topDisplayElement, "0");
  setDisplayText(bottomDisplayElement, "0");
}

function setDisplayText(displayElement, text) {
  displayElement.textContent = text;
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

  if (calculator.firstOperand === null) {
    if (bottomDisplayElement.textContent !== "0") {
      calculator.firstOperand = +bottomDisplayElement.textContent;
      handleOperatorClick(event);
    } else {
      if (!calculator.prevResult) {
        calculator.firstOperand = 0;
        handleOperatorClick(event);
      }
    }
    return;
  }

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
      equals();
      return;
    case "c":
      clear();
      return;
    case "ac":
      clearAll();
      return;
  }

  if (!calculator.operator) {
    calculator.operator = operator;
    displayText = bottomDisplayElement.textContent.concat(
      " " + targetTextContent
    );
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
    calculator.operate();
    handleOperatorClick(event);
  }
}

operands.forEach((element) => {
  element.addEventListener("click", handleOperandClick);
});

operators.forEach((element) => {
  element.addEventListener("click", handleOperatorClick);
});
