import { readFile } from "../utils.ts";

const args = Deno.args;

if (args.length < 1) {
  console.log("File path is required");
  Deno.exit(1);
}

const filePath = args[0];
const fileContent = await readFile(filePath);
const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;

const matches = fileContent.match(regex);

if (!matches) {
  console.log("No matches found");
  Deno.exit(1);
}

let isDo = true;

const result = matches.reduce((acc, match) => {
  if (match === "do()") {
    isDo = true;
    return acc;
  } else if (match === "don't()") {
    isDo = false;
    return acc;
  }
  if (!isDo) {
    return acc;
  }
  const [a, b] = match.slice(4, -1).split(",");

  return acc + parseInt(a, 10) * parseInt(b, 10);
}, 0);

console.log(result);
