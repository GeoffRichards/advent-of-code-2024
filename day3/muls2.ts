class Parser {
    src: string;
    pos: number;

    constructor(src: string) {
        this.src = src;
        this.pos = 0;
    }

    match(re: RegExp) {
        if (!re.sticky) {
            throw new TypeError("match regex must be sticky");
        }
        re.lastIndex = this.pos;
        const m = re.exec(this.src);
        if (m) {
            this.pos += m[0].length;
        }
        return m;
    }

    eof(): boolean {
        return this.pos >= this.src.length;
    }
}

const filename = Deno.args[0];
const parser = new Parser(await Deno.readTextFile(filename));

let sum: number = 0, mulEnabled: boolean = true;
while (!parser.eof()) {
    let match;
    if (match = parser.match(/mul\((\d{1,3}),(\d{1,3})\)/y)) {
        if (mulEnabled) {
            sum += match[1] * match[2];
        }
    }
    else if (parser.match(/do\(\)/y)) {
        mulEnabled = true;
    }
    else if (parser.match(/don't\(\)/y)) {
        mulEnabled = false;
    }
    else if (!parser.match(/[^md]+|./y)) {
        throw new Error(`can't match anything at ${parser.pos}`);
    }
}

console.log(sum);
