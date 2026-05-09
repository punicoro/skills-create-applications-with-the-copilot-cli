const {
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
} = require("../calculator");

describe("calculator arithmetic functions", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("subtracts two numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("multiplies two numbers", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("divides two numbers", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("throws for division by zero", () => {
    expect(() => divide(20, 0)).toThrow("Division by zero is not allowed.");
  });

  test("returns the remainder using modulo", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("returns the remainder from the extended-operations example", () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test("throws for modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("raises a base to an exponent", () => {
    expect(power(2, 8)).toBe(256);
  });

  test("raises a base to an exponent from the extended-operations example", () => {
    expect(power(2, 3)).toBe(8);
  });

  test("returns the square root of a number", () => {
    expect(squareRoot(81)).toBe(9);
  });

  test("returns the square root from the extended-operations example", () => {
    expect(squareRoot(16)).toBe(4);
  });

  test("rejects square root of a negative number", () => {
    expect(() => squareRoot(-1)).toThrow("Square root is not defined for negative numbers.");
  });
});

describe("calculator helpers", () => {
  test("normalizes operation names with surrounding whitespace", () => {
    expect(normalizeOperation("  Addition  ")).toBe("addition");
  });

  test("parses numeric string input", () => {
    expect(parseNumber("12.5", "value")).toBe(12.5);
  });

  test("rejects invalid numeric input", () => {
    expect(() => parseNumber("abc", "value")).toThrow(
      'Invalid value: "abc". Please provide a valid number.',
    );
  });
});

describe("calculate", () => {
  test("calculates addition from the image example", () => {
    expect(calculate("2", "+", "3")).toMatchObject({
      left: 2,
      right: 3,
      operator: "+",
      operation: "addition",
      result: 5,
    });
  });

  test("calculates subtraction from the image example", () => {
    expect(calculate("10", "-", "4")).toMatchObject({
      left: 10,
      right: 4,
      operator: "-",
      operation: "subtraction",
      result: 6,
    });
  });

  test("calculates multiplication from the image example", () => {
    expect(calculate("45", "*", "2")).toMatchObject({
      left: 45,
      right: 2,
      operator: "*",
      operation: "multiplication",
      result: 90,
    });
  });

  test("calculates division from the image example", () => {
    expect(calculate("20", "/", "5")).toMatchObject({
      left: 20,
      right: 5,
      operator: "/",
      operation: "division",
      result: 4,
    });
  });

  test("accepts named operations", () => {
    expect(calculate("8", "multiplication", "2").result).toBe(16);
  });

  test("accepts x as multiplication", () => {
    expect(calculate("7", "x", "6").result).toBe(42);
  });

  test("calculates modulo", () => {
    expect(calculate("10", "%", "3")).toMatchObject({
      left: 10,
      right: 3,
      operator: "%",
      operation: "modulo",
      result: 1,
    });
  });

  test("calculates modulo from the extended-operations example", () => {
    expect(calculate("5", "%", "2")).toMatchObject({
      left: 5,
      right: 2,
      operator: "%",
      operation: "modulo",
      result: 1,
    });
  });

  test("calculates power", () => {
    expect(calculate("2", "**", "8")).toMatchObject({
      left: 2,
      right: 8,
      operator: "**",
      operation: "power",
      result: 256,
    });
  });

  test("calculates power with ^ from the extended-operations example", () => {
    expect(calculate("2", "^", "3")).toMatchObject({
      left: 2,
      right: 3,
      operator: "^",
      operation: "power",
      result: 8,
    });
  });

  test("calculates square root", () => {
    expect(calculate("sqrt", "81")).toMatchObject({
      operand: 81,
      operator: "sqrt",
      operation: "square root",
      result: 9,
    });
  });

  test("calculates square root from the extended-operations example", () => {
    expect(calculate("sqrt", "16")).toMatchObject({
      operand: 16,
      operator: "sqrt",
      operation: "square root",
      result: 4,
    });
  });

  test("accepts square-root as a square root alias", () => {
    expect(calculate("square-root", "16").result).toBe(4);
  });

  test("rejects unsupported operations", () => {
    expect(() => calculate("2", "unknown", "3")).toThrow(
      'Unsupported operation: "unknown". Use addition, subtraction, multiplication, division, modulo, power, or square root.',
    );
  });

  test("rejects invalid first number", () => {
    expect(() => calculate("bad", "+", "3")).toThrow(
      'Invalid first number: "bad". Please provide a valid number.',
    );
  });

  test("rejects invalid second number", () => {
    expect(() => calculate("2", "+", "bad")).toThrow(
      'Invalid second number: "bad". Please provide a valid number.',
    );
  });

  test("rejects division by zero", () => {
    expect(() => calculate("8", "/", "0")).toThrow("Division by zero is not allowed.");
  });

  test("rejects modulo by zero", () => {
    expect(() => calculate("8", "%", "0")).toThrow("Modulo by zero is not allowed.");
  });

  test("rejects square root of a negative number", () => {
    expect(() => calculate("sqrt", "-9")).toThrow(
      "Square root is not defined for negative numbers.",
    );
  });

  test("rejects invalid square root input", () => {
    expect(() => calculate("sqrt", "not-a-number")).toThrow(
      'Invalid number: "not-a-number". Please provide a valid number.',
    );
  });

  test("rejects missing operand for binary operations", () => {
    expect(() => calculate("+", "2")).toThrow('Operation "+" expects 2 numbers.');
  });
});
