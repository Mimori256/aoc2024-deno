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

const counter = new Map<number, number>();

for (const num of second_column) {
  counter.set(num, (counter.get(num) || 0) + 1);
}

let similarities = 0;

for (const num of first_column) {
  if (counter.has(num)) {
    similarities += num * counter.get(num)!;
  }
}

console.log(similarities);
