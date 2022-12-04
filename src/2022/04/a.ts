import * as fs from "fs";

fs.readFile('in.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let ranges = data.trim().split("\n").map(line => line.split(",")).map(val => val.map(val2 => val2.split("-").map(val3 => parseInt(val3))));
    console.log(ranges.filter(val => ((val[0][0] <= val[1][0] && val[0][1] >= val[1][1]) || (val[1][0] <= val[0][0] && val[1][1] >= val[0][1]))).length);
});
