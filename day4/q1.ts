import { readFile } from "../utils.ts";

const XMAS = "XMAS";

const rotate90 = (matrix: string[][]): string[][] => {
  const n = matrix.length;
  const rotated = Array.from({ length: n }, () => Array(n).fill(""));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - i - 1] = matrix[i][j];
    }
  }

  return rotated;
};

const createMatrix = (input: string): string[][] => {
  return input.split("\r\n").map((line) => line.split(""));
};

const countXmas = (matrix: string[]): number => {
  const xmasCount = matrix.join("").split(XMAS).length - 1;
  return xmasCount;
};

const parseDiagnal = (matrix: string[][]): string[] => {
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  const rows = matrix.length;
  const cols = matrix[0].length;
  const result: string[] = [];

  for (let d = 0; d < rows + cols - 1; d++) {
    const temp: string[] = [];
    const rowStart = d < cols ? 0 : d - cols + 1;
    const colStart = d < cols ? d : cols - 1;

    let row = rowStart;
    let col = colStart;

    while (row < rows && col >= 0) {
      temp.push(matrix[row][col]);
      row++;
      col--;
    }

    if (d % 2 === 0) {
      result.push(...temp.reverse());
    } else {
      result.push(...temp);
    }

    if (d < rows + cols - 2) {
      result.push(".");
    }
  }

  return result;
};

const main = async () => {
  const args = Deno.args;
  const fileContent = await readFile(args[0]);
  let matrix = createMatrix(fileContent);
  let count = 0;
  for (let i = 0; i < 4; i++) {
    const m = matrix.map((row) => row.concat(["."]));
    count += countXmas(m.flat());
    count += countXmas(parseDiagnal(m));
    matrix = rotate90(matrix);
  }
  console.log(count);
};

main();
