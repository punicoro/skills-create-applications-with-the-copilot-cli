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

  test("returns modulo for two numbers", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("throws for modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("returns power for base and exponent", () => {
    expect(power(2, 3)).toBe(8);
  });

  test("returns square root for positive number", () => {
    expect(squareRoot(16)).toBe(4);
  });

  test("throws for square root of negative number", () => {
    expect(() => squareRoot(-1)).toThrow("Square root of a negative number is not allowed.");
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

  test("calculates power", () => {
    expect(calculate("2", "^", "4")).toMatchObject({
      left: 2,
      right: 4,
      operator: "^",
      operation: "power",
      result: 16,
    });
  });

  test("calculates square root", () => {
    expect(calculate("9", "sqrt")).toMatchObject({
      left: 9,
      right: undefined,
      operator: "sqrt",
      operation: "square root",
      result: 3,
    });
  });

  test("rejects unsupported operations", () => {
    expect(() => calculate("2", "&", "3")).toThrow(
      'Unsupported operation: "&". Use addition, subtraction, multiplication, division, modulo, power, or square root.',
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

  test("rejects square root of negative number", () => {
    expect(() => calculate("-4", "sqrt")).toThrow(
      "Square root of a negative number is not allowed.",
    );
  });
});
