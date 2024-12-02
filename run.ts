if (Deno.args.length < 2) {
  console.log("Please provide the day and solution number");
  Deno.exit(1);
}

const day = Deno.args[0];
const solution = Deno.args[1];
const test = Deno.args.length === 3 && Deno.args[2] === "t";

const inputFile = test ? `day${day}/test.txt` : `day${day}/input.txt`;

if (solution !== "1" && solution !== "2") {
  console.log("Please provide a valid solution number");
  Deno.exit(1);
}

const process = new Deno.Command("deno", {
  args: ["run", "--allow-all", `day${day}/q${solution}.ts`, inputFile],
  stdout: "piped",
  stderr: "piped",
});

const { code, stdout, stderr } = await process.output();

await Deno.stdout.write(stdout);
await Deno.stderr.write(stderr);

Deno.exit(code);
