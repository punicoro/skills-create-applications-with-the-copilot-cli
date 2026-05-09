#!/usr/bin/env node

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

// Supported operations:
// addition (+)
// subtraction (-)
// multiplication (*, x)
// division (/)
// modulo (%)
// power (^)
// square root (sqrt)
const OPERATIONS = {
  "+": {
    label: "addition",
    calculate: add,
  },
  "-": {
    label: "subtraction",
    calculate: subtract,
  },
  "*": {
    label: "multiplication",
    calculate: multiply,
  },
  x: {
    label: "multiplication",
    calculate: multiply,
  },
  "/": {
    label: "division",
    calculate: divide,
  },
  "%": {
    label: "modulo",
    calculate: modulo,
  },
  "^": {
    label: "power",
    calculate: power,
  },
  sqrt: {
    label: "square root",
    calculate: squareRoot,
    unary: true,
  },
  squareroot: {
    label: "square root",
    calculate: squareRoot,
    unary: true,
  },
  addition: {
    label: "addition",
    calculate: add,
  },
  subtraction: {
    label: "subtraction",
    calculate: subtract,
  },
  multiplication: {
    label: "multiplication",
    calculate: multiply,
  },
  division: {
    label: "division",
    calculate: divide,
  },
  modulo: {
    label: "modulo",
    calculate: modulo,
  },
  power: {
    label: "power",
    calculate: power,
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
    throw new Error("Square root of a negative number is not allowed.");
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

function calculate(leftInput, operationInput, rightInput) {
  const operationKey = normalizeOperation(operationInput);
  const operation = OPERATIONS[operationKey];

  if (!operation) {
    throw new Error(
      `Unsupported operation: "${operationInput}". Use addition, subtraction, multiplication, division, modulo, power, or square root.`,
    );
  }

  const left = parseNumber(leftInput, "first number");
  const right = operation.unary ? undefined : parseNumber(rightInput, "second number");
  const result = operation.unary ? operation.calculate(left) : operation.calculate(left, right);

  return {
    left,
    right,
    operator: operationInput,
    operation: operation.label,
    result,
  };
}

function printUsage() {
  console.log("Usage: node src/calculator.js <first-number> <operation> [second-number]");
  console.log("Example: node src/calculator.js 8 + 2");
  console.log("Square root example: node src/calculator.js 9 sqrt");
  console.log(
    "Supported operations: +, -, *, /, %, ^, sqrt, addition, subtraction, multiplication, division, modulo, power, squareroot",
  );
}

async function promptForMissingValues() {
  const rl = readline.createInterface({ input, output });

  try {
    const firstNumber = await rl.question("First number: ");
    const operation = await rl.question("Operation (+, -, *, /, %, ^, sqrt): ");
    const secondNumber = await rl.question("Second number: ");

    return [firstNumber, operation, secondNumber];
  } finally {
    rl.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const values = args.length >= 2 && args.length <= 3 ? args : await promptForMissingValues();

  try {
    const calculation = calculate(values[0], values[1], values[2]);
    if (calculation.right === undefined) {
      console.log(`${calculation.operator} ${calculation.left} = ${calculation.result}`);
    } else {
      console.log(
        `${calculation.left} ${calculation.operator} ${calculation.right} = ${calculation.result}`,
      );
    }
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
