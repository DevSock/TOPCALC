const operatorFunctions = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "÷": (a, b) => a / b,
};

const specialOperators = {
  isSpecialOperator: (key) => (key in specialOperators ? 1 : 0),
  "=": () => {
    if (calculator.firstOperand === null) return;

    if (calculator.secondOperand !== null) {
      if (calculator.operator === operatorFunctions["÷"]) {
        specialOperators.ac();
        setDisplayText("The answer is 42", bottomDisplayElement, false);
        return;
      }

      const result = calculator.operator(
        +calculator.firstOperand,
        +calculator.secondOperand
      );
      setDisplayText(result, bottomDisplayElement, false);
      setDisplayText("0", topDisplayElement, false);
      calculator.firstOperand = null;
      calculator.operator = null;
      calculator.secondOperand = null;
      return;
    } else if (calculator.operator !== null) {
      const textToUpdate = bottomDisplayElement.textContent.slice(0, -2);
      setDisplayText(textToUpdate, bottomDisplayElement, false);
      calculator.operator = null;
      return;
    }
  },
  ac: () => {
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.secondOperand = null;
    setDisplayText("0", topDisplayElement, false);
    setDisplayText("0", bottomDisplayElement, false);
  },
  c: () => {
    if (calculator.secondOperand !== null) {
      calculator.secondOperand = null;
      const textToUpdate = topDisplayElement.textContent;
      setDisplayText(textToUpdate, bottomDisplayElement, false);
      setDisplayText("0", topDisplayElement, false);
      return;
    } else {
      if (calculator.operator !== null) calculator.operator = null;
      if (calculator.firstOperand !== null) calculator.firstOperand = null;
      setDisplayText("0", bottomDisplayElement, false);
    }
  },
  ".": () => {
    const bottomDisplayText = bottomDisplayElement.textContent;
    if (
      bottomDisplayText.includes(".") ||
      bottomDisplayText === "The answer is 42"
    )
      return;
    setDisplayText(".", bottomDisplayElement, true);
  },
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
  if (
    displayElement === topDisplayElement &&
    text.charAt(text.length - 3) === "."
  )
    text = text.replace(".", "");

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
  if (bottomDisplayElement.textContent === "The answer is 42") return;

  if (calculator.firstOperand === null) {
    if (bottomDisplayElement.textContent !== "0") {
      calculator.firstOperand = bottomDisplayElement.textContent;
      handleOperatorClick(event);
    }
    return;
  }

  if (calculator.secondOperand !== null) {
    calculator.calculate();
    handleOperatorClick(event);
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
