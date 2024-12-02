import { readFile } from "../utils.ts";

const isSafeReport = (numbers: number[]) => {
  if (numbers.length < 2) {
    return false;
  }

  const isIncreasing = numbers[0] < numbers[1];

  for (let i = 0; i < numbers.length - 1; i++) {
    const diff = numbers[i] - numbers[i + 1];
    if (Math.abs(diff) > 3 || diff === 0) {
      return false;
    }
    if (isIncreasing && diff > 0) {
      return false;
    }
    if (!isIncreasing && diff < 0) {
      return false;
    }
  }
  return true;
};

const isSafeReportWithOneRemove = (numbers: number[]) => {
  if (isSafeReport(numbers)) {
    return true;
  }

  for (let i = 0; i < numbers.length - 1; i++) {
    const newNumbers = numbers.slice();
    newNumbers.splice(i, 1);
    if (isSafeReport(newNumbers)) {
      return true;
    }
  }
  return false;
};

const args = Deno.args;

if (args.length < 1) {
  console.log("File path is required");
  Deno.exit(1);
}

const filePath = args[0];
const fileContent = await readFile(filePath);
const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

const safeReports = lines
  .map((line) => {
    const numbers = line.split(/\s+/).map((num) => parseInt(num, 10));
    return isSafeReportWithOneRemove(numbers);
  })
  .filter((isSafe) => isSafe).length;

console.log(`Safe reports: ${safeReports}`);
