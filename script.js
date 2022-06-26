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

      let result = `${calculator.operator(
        +calculator.firstOperand,
        +calculator.secondOperand
      )}`;

      if (result.length >= 15 && result.includes(".")) {
        result = `${Math.round(+result * 1000) / 1000}`;
      }

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
  delete: () => {
    if (calculator.firstOperand === null) return;

    const currentOperand =
      calculator.secondOperand === null
        ? calculator.firstOperand
        : calculator.secondOperand;

    if (currentOperand === calculator.secondOperand) {
      if (currentOperand.length === 1) {
        calculator.secondOperand = null;
        const textToUpdate = topDisplayElement.textContent;
        setDisplayText(textToUpdate, bottomDisplayElement, false);
        setDisplayText("0", topDisplayElement, false);
        return;
      }
      updateCalcOperand(currentOperand.slice(0, -1), 1, false);
      return;
    } else if (calculator.operator !== null) {
      calculator.operator = null;
      const textToUpdate = bottomDisplayElement.textContent.slice(0, -2);
      setDisplayText(textToUpdate, bottomDisplayElement, false);
      return;
    } else {
      if (currentOperand.length === 1) {
        calculator.firstOperand = null;
        setDisplayText("0", bottomDisplayElement, false);
        return;
      }
      updateCalcOperand(currentOperand.slice(0, -1), 0, false);
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
  if (shouldAppend && bottomDisplayElement.textContent.length >= 15) return;

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

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const spoofedEvent = { target: {} };
  switch (e.code.toLowerCase()) {
    case "digit0":
    case "numpad0":
      spoofedEvent.target.textContent = "0";
      handleOperandClick(spoofedEvent);
      break;
    case "digit1":
    case "numpad1":
      spoofedEvent.target.textContent = "1";
      handleOperandClick(spoofedEvent);
      break;
    case "digit2":
    case "numpad2":
      spoofedEvent.target.textContent = "2";
      handleOperandClick(spoofedEvent);
      break;
    case "digit3":
    case "numpad3":
      spoofedEvent.target.textContent = "3";
      handleOperandClick(spoofedEvent);
      break;
    case "digit4":
    case "numpad4":
      spoofedEvent.target.textContent = "4";
      handleOperandClick(spoofedEvent);
      break;
    case "digit5":
    case "numpad5":
      spoofedEvent.target.textContent = "5";
      handleOperandClick(spoofedEvent);
      break;
    case "digit6":
    case "numpad6":
      spoofedEvent.target.textContent = "6";
      handleOperandClick(spoofedEvent);
      break;
    case "digit7":
    case "numpad7":
      spoofedEvent.target.textContent = "7";
      handleOperandClick(spoofedEvent);
      break;
    case "digit8":
    case "numpad8":
      spoofedEvent.target.textContent = "8";
      handleOperandClick(spoofedEvent);
      break;
    case "digit9":
    case "numpad9":
      spoofedEvent.target.textContent = "9";
      handleOperandClick(spoofedEvent);
      break;
    case "minus":
    case "numpadsubtract":
      spoofedEvent.target.textContent = "-";
      handleOperatorClick(spoofedEvent);
      break;
    case "numpadadd":
      spoofedEvent.target.textContent = "+";
      handleOperatorClick(spoofedEvent);
      break;
    case "numpaddmultiply":
      spoofedEvent.target.textContent = "x";
      handleOperatorClick(spoofedEvent);
      break;
    case "numpaddivide":
      spoofedEvent.target.textContent = "÷";
      handleOperatorClick(spoofedEvent);
      break;
    case "enter":
    case "numpadenter":
      spoofedEvent.target.textContent = "=";
      handleOperatorClick(spoofedEvent);
      break;
    case "period":
    case "numpaddecimal":
      spoofedEvent.target.textContent = ".";
      handleOperatorClick(spoofedEvent);
      break;
    case "backspace":
      spoofedEvent.target.textContent = "Delete";
      handleOperatorClick(spoofedEvent);
      break;
  }
});
