export const readFile = async (path: string): Promise<string> => {
  try {
    const content = await Deno.readTextFile(path);
    if (!content) {
      throw new Error("File is empty");
    }
    return content;
  } catch (error) {
    console.error("Error reading file", error);
    Deno.exit(1);
  }
};
