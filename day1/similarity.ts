import { assertEquals } from "jsr:@std/assert";

const filename = Deno.args[0];
const text = await Deno.readTextFile(filename);
const numbers = text.split(/\s+/).filter(x => x !== '').map(x => +x);

let left: number[] = [], right: number[] = [];

for (let i = 0; i < numbers.length; i += 2) {
    left.push(numbers[i]);
    right.push(numbers[i + 1]);
}

assertEquals(left.length, filename === 'example.txt' ? 6 : 1000);
assertEquals(right.length, filename === 'example.txt' ? 6 : 1000);

let similarity = 0;
for (const num of left) {
    similarity += num * right.filter(n => n === num).length;
}

console.log(similarity);
