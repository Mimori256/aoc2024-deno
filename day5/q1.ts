import { readFile } from "../utils.ts";

const createRules = (str: string): Map<string, string[]> => {
  const map = new Map<string, string[]>();
  for (const line of str.split("\r\n")) {
    const [key, value] = line.split("|");
    if (map.has(key)) {
      map.set(key, [...map.get(key)!, value]);
    } else {
      map.set(key, [value]);
    }
  }
  return map;
};

const createUpdates = (str: string): string[][] => {
  const result: string[][] = [];
  for (const line of str.split("\r\n")) {
    result.push(line.split(","));
  }
  result.pop();
  return result;
};

const isValidUpdate = (
  update: string[],
  rules: Map<string, string[]>,
): boolean => {
  const printedList: string[] = [];
  for (const page of update) {
    if (!rules.has(page)) {
      printedList.push(page);
      continue;
    }
    for (const printedPage of printedList) {
      if (rules.get(page)!.includes(printedPage)) {
        return false;
      }
    }
    printedList.push(page);
  }
  return true;
};

const getMiddlePage = (update: string[]): number => {
  return Number(update[Math.floor(update.length / 2)]);
};

const main = async () => {
  const args = Deno.args;
  const data = await readFile(args[0]);
  const [s1, s2] = data.split("\r\n\r\n");
  const rules = createRules(s1);
  const updates = createUpdates(s2);
  const result = updates
    .filter((update) => isValidUpdate(update, rules))
    .map((update) => getMiddlePage(update))
    .reduce((acc, curr) => acc + curr, 0);
  console.log(result);
};

main();
