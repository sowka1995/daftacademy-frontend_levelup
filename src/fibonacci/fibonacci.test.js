const fib = require('./fibonacci');

const numShouldBeInteger= "'num' should be integer.";
const numShouldBeGreaterOrEqualToZero = "'num' should be greater or equal to 0.";

describe('Fibonacci function unit tests', () => {

  test('should be defined', () => {
    expect(fib).toBeDefined();
  });

  test(`when passing number less than 0 should throw "${numShouldBeGreaterOrEqualToZero}"`, () => {
    expect(() => fib(-1)).toThrowError(new Error(numShouldBeGreaterOrEqualToZero));
  });

  test(`when passing not a integer should throw "${numShouldBeInteger}"`, () => {
    expect(() => fib(0.000000000000000001)).toThrowError(new Error(numShouldBeInteger));    
    expect(() => fib("0")).toThrowError(new Error(numShouldBeInteger));
    expect(() => fib("test")).toThrowError(new Error(numShouldBeInteger));
    expect(() => fib({})).toThrowError(new Error(numShouldBeInteger));
    expect(() => fib()).toThrowError(new Error(numShouldBeInteger));
  });

  test('should return correct arrays', () => {
    expect(fib(0)).toEqual([0]);
    expect(fib(1)).toEqual([0,1]);
    expect(fib(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });

});