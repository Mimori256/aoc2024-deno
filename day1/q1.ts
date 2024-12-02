import { readFile } from "../utils.ts";

const args = Deno.args;
const inputFile = args[0];

const content = await readFile(inputFile);
const lines = content.split("\n").filter((line) => line.trim() !== "");
const first_column: number[] = [];
const second_column: number[] = [];

for (const line of lines) {
  if (line === "") {
    continue;
  }
  const columns = line.split("  ").map((column) => parseInt(column));
  first_column.push(columns[0]);
  second_column.push(columns[1]);
}

first_column.sort();
second_column.sort();

let sum = 0;

for (let i = 0; i < first_column.length; i++) {
  sum += Math.abs(first_column[i] - second_column[i]);
}

console.log(sum);
