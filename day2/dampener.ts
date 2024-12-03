import { assertGreater, assertEquals } from "jsr:@std/assert";

const filename = Deno.args[0];
const text = await Deno.readTextFile(filename);

const reports: number[number[]] = text.split(/\s*\n\s*/).filter(x => x !== '').map((line) => {
    return line.split(/\s+/).filter(x => x !== '').map(x => +x);
});
assertEquals(reports.length, filename === 'example.txt' ? 6 : 1000);

function reportIsSafe(report: number[number[]]): boolean {
    const increasing = report.reduce((prev, next) => prev === null || prev >= next ? null : next) !== null;
    const decreasing = report.reduce((prev, next) => prev === null || prev <= next ? null : next) !== null;
    const slowly = report.reduce((prev, next) => prev === null || Math.abs(prev - next) > 3 ? null : next) !== null
    return (increasing || decreasing) && slowly;
}

let numSafe = 0;
for (const report of reports) {
    assertGreater(report.length, 0);

    let isSafe = reportIsSafe(report);
    for (let idxToRemove = 0; !isSafe && idxToRemove < report.length; ++idxToRemove) {
        const dampenedReport = [ ...report.slice(0, idxToRemove), ...report.slice(idxToRemove + 1) ]
        isSafe = reportIsSafe(dampenedReport);
    }

    if (isSafe) {
        numSafe += 1;
    }
}

console.log(numSafe);
