import { readFile } from "../utils.ts";

const createMatrix = (input: string): string[][] => {
  return input.split("\r\n").map((line) => line.split(""));
};

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

const isCrossedMAS = (matrix: string[][]): boolean => {
  return (
    matrix[0][0] === "M" &&
    matrix[1][1] === "A" &&
    matrix[2][2] === "S" &&
    matrix[0][2] === "M" &&
    matrix[2][0] === "S"
  );
};

const main = async () => {
  const args = Deno.args;
  const fileContent = await readFile(args[0]);
  const matrix = createMatrix(fileContent);
  let count = 0;
  for (let i = 0; i < matrix[0].length - 2; i++) {
    for (let j = 0; j < matrix.length - 2; j++) {
      let threeSquare = matrix
        .slice(i, i + 3)
        .map((row) => row.slice(j, j + 3));
      for (let k = 0; k < 4; k++) {
        if (isCrossedMAS(threeSquare)) {
          count++;
        }
        threeSquare = rotate90(threeSquare);
      }
    }
  }
  console.log(count);
};

main();
