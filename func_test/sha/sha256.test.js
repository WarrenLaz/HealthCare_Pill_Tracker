const fs = require('fs');
const path = require('path');
const sha256 = require('./sha256');

const resultsFile = path.join(__dirname, 'results.txt');

// Function to log results to a file
function logResult(testName, input, hash) {
  const logEntry = `${testName} | Input: ${input} | Hash: ${hash}\n`;
  fs.appendFileSync(resultsFile, logEntry, 'utf8');
}

describe('sha256 function', () => {
  beforeAll(() => {
    // Clear file before running tests
    fs.writeFileSync(resultsFile, 'SHA-256 Test Results\n=====================\n', 'utf8');
  });

  test('Hashes "hello" correctly', () => {
    const input = 'hello';
    const hash = sha256(input);
    logResult('Test: Hash "hello"', input, hash);
    expect(hash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });

  test('Hashes an empty string correctly', () => {
    const input = '';
    const hash = sha256(input);
    logResult('Test: Hash empty string', input, hash);
    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });

  test('Hashes "The quick brown fox jumps over the lazy dog" correctly', () => {
    const input = 'The quick brown fox jumps over the lazy dog';
    const hash = sha256(input);
    logResult('Test: Hash quick brown fox', input, hash);
    expect(hash).toBe('d7a8fbb307d7809469ca9abcb0082e4f8d5651e46bdeabff4a46f7f62a5a6a75');
  });

  test('Produces different hashes for different inputs', () => {
    const input1 = 'foo';
    const input2 = 'bar';
    const hash1 = sha256(input1);
    const hash2 = sha256(input2);
    logResult('Test: Hash "foo"', input1, hash1);
    logResult('Test: Hash "bar"', input2, hash2);
    expect(hash1).not.toBe(hash2);
  });

  test('Handles numeric inputs by converting to string', () => {
    const input = 123;
    const hash = sha256(input);
    logResult('Test: Hash 123', input.toString(), hash);
    expect(hash).toBe(sha256('123'));
  });

  test('Handles long strings correctly', () => {
    const input = 'a'.repeat(1000);
    const hash = sha256(input);
    logResult('Test: Hash long string (1000 "a"s)', '(1000 chars)', hash);
    expect(hash).toBe('41edece42bfb7bf00f5a1f1d1a73b946dc2c3796b2e040cd3dd4d326a7425489');
  });
});
