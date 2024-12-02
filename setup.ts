if (Deno.args.length !== 1) {
  console.error("Day number is required");
  Deno.exit(1);
}

const day = Deno.args[0];

const importLine = 'import { readFile } from "../utils.ts";\n';

await Deno.mkdir(`./day${day}`, { recursive: true });
await Deno.create(`./day${day}/input.txt`);
await Deno.create(`./day${day}/test.txt`);
await Deno.writeTextFile(`./day${day}/q1.ts`, importLine);
await Deno.writeTextFile(`./day${day}/q2.ts`, importLine);

console.log("\x1b[34m%s\x1b[0m", "Setup complete!");
