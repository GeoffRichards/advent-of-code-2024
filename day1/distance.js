const filename = Deno.args[0];
const text = await Deno.readTextFile(filename);
const numbers = text.split(/\s+/).filter(x => x !== '').map(x => +x);

let left = [], right = [];

for (let i = 0; i < numbers.length; i += 2) {
    left.push(numbers[i]);
    right.push(numbers[i + 1]);
}

left = left.sort();
right = right.sort();

let distance = 0;
for (let i = 0; i < left.length; ++i) {
    distance += Math.abs(left[i] - right[i]);
}

console.log(distance);
