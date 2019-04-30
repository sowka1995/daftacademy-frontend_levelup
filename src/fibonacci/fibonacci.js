function fib(num) {
  if (!Number.isSafeInteger(num)) {
    throw new Error("'num' should be integer.");
  }
  if (num < 0) {
    throw new Error("'num' should be greater or equal to 0.");
  }
  if (num === 0) return [0];
  if (num === 1) return [0, 1];

  const results = [0, 1];
  for (let n = 2; n <= num; n++) {
    results.push(results[n-1] + results[n-2]);
  }
  return results;
}

module.exports = fib;
