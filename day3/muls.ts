const filename = Deno.args[0];
const text = await Deno.readTextFile(filename);

let sum: number = 0;
for (const match of text.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)) {
    const x = +match[1], y = +match[2];
    sum += x * y;
}

console.log(sum);
