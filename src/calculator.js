#!/usr/bin/env node

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

// Supported operations:
// addition (+)
// subtraction (-)
// multiplication (*, x)
// division (/)
// modulo (%)
// power (^, **)
// square root (sqrt)
const SUPPORTED_OPERATIONS_MESSAGE =
  "Use addition, subtraction, multiplication, division, modulo, power, or square root.";

const OPERATIONS = {
  "+": {
    label: "addition",
    calculate: add,
    arity: 2,
  },
  "-": {
    label: "subtraction",
    calculate: subtract,
    arity: 2,
  },
  "*": {
    label: "multiplication",
    calculate: multiply,
    arity: 2,
  },
  x: {
    label: "multiplication",
    calculate: multiply,
    arity: 2,
  },
  "/": {
    label: "division",
    calculate: divide,
    arity: 2,
  },
  "%": {
    label: "modulo",
    calculate: modulo,
    arity: 2,
  },
  "^": {
    label: "power",
    calculate: power,
    arity: 2,
  },
  "**": {
    label: "power",
    calculate: power,
    arity: 2,
  },
  sqrt: {
    label: "square root",
    calculate: squareRoot,
    arity: 1,
  },
  addition: {
    label: "addition",
    calculate: add,
    arity: 2,
  },
  subtraction: {
    label: "subtraction",
    calculate: subtract,
    arity: 2,
  },
  multiplication: {
    label: "multiplication",
    calculate: multiply,
    arity: 2,
  },
  division: {
    label: "division",
    calculate: divide,
    arity: 2,
  },
  modulo: {
    label: "modulo",
    calculate: modulo,
    arity: 2,
  },
  power: {
    label: "power",
    calculate: power,
    arity: 2,
  },
  "square root": {
    label: "square root",
    calculate: squareRoot,
    arity: 1,
  },
  "square-root": {
    label: "square root",
    calculate: squareRoot,
    arity: 1,
  },
};

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error("Square root is not defined for negative numbers.");
  }

  return Math.sqrt(value);
}

function normalizeOperation(operation) {
  return operation.trim().toLowerCase();
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}". Please provide a valid number.`);
  }

  return parsedValue;
}

function calculate(...inputs) {
  let operationInput;
  let values;

  if (inputs.length === 2) {
    [operationInput, ...values] = inputs;
  } else if (inputs.length === 3) {
    const [leftInput, nextOperationInput, rightInput] = inputs;
    operationInput = nextOperationInput;
    values = [leftInput, rightInput];
  } else {
    throw new Error(
      "Invalid input. Use <first-number> <operation> <second-number> for binary operations or <operation> <number> for square root.",
    );
  }

  const operationKey = normalizeOperation(operationInput);
  const operation = OPERATIONS[operationKey];

  if (!operation) {
    throw new Error(`Unsupported operation: "${operationInput}". ${SUPPORTED_OPERATIONS_MESSAGE}`);
  }

  if (values.length !== operation.arity) {
    throw new Error(
      `Operation "${operationInput}" expects ${operation.arity} number${operation.arity === 1 ? "" : "s"}.`,
    );
  }

  if (operation.arity === 1) {
    const operand = parseNumber(values[0], "number");

    return {
      operand,
      operands: [operand],
      operator: operationInput,
      operation: operation.label,
      result: operation.calculate(operand),
    };
  }

  const left = parseNumber(values[0], "first number");
  const right = parseNumber(values[1], "second number");

  return {
    left,
    operands: [left, right],
    right,
    operator: operationInput,
    operation: operation.label,
    result: operation.calculate(left, right),
  };
}

function printUsage() {
  console.log("Usage: node src/calculator.js <first-number> <operation> <second-number>");
  console.log("   or: node src/calculator.js <operation> <number>");
  console.log("Example: node src/calculator.js 8 + 2");
  console.log("Example: node src/calculator.js sqrt 81");
  console.log(
    "Supported operations: +, -, *, x, /, %, ^, **, sqrt, addition, subtraction, multiplication, division, modulo, power, square root",
  );
}

async function promptForMissingValues() {
  const rl = readline.createInterface({ input, output });

  try {
    const operation = await rl.question("Operation (+, -, *, /, %, ^, sqrt): ");
    const normalizedOperation = normalizeOperation(operation);
    const selectedOperation = OPERATIONS[normalizedOperation];

    if (selectedOperation?.arity === 1) {
      const number = await rl.question("Number: ");

      return [operation, number];
    }

    const firstNumber = await rl.question("First number: ");
    const secondNumber = await rl.question("Second number: ");

    return [firstNumber, operation, secondNumber];
  } finally {
    rl.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const values = args.length === 2 || args.length === 3 ? args : await promptForMissingValues();

  try {
    const calculation = calculate(...values);
    const expression =
      calculation.operands.length === 1
        ? `${calculation.operator} ${calculation.operand}`
        : `${calculation.left} ${calculation.operator} ${calculation.right}`;

    console.log(`${expression} = ${calculation.result}`);
    console.log(`Operation: ${calculation.operation}`);
  } catch (error) {
    console.error(error.message);
    printUsage();
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  OPERATIONS,
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  normalizeOperation,
  parseNumber,
  calculate,
  printUsage,
  promptForMissingValues,
  main,
};
