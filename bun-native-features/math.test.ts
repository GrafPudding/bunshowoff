import { describe, test, expect, beforeAll } from "bun:test";

describe("Math Operations", () => {
  test("addition works", () => {
    expect(2 + 2).toBe(4);
  });
  
  test("multiplication works", () => {
    expect(3 * 5).toBe(15);
  });
});

describe("String Operations", () => {
  test("string length", () => {
    expect("Bun".length).toBe(3);
  });
  
  test("string uppercase", () => {
    expect("bun".toUpperCase()).toBe("BUN");
  });
});

// Run with: bun test