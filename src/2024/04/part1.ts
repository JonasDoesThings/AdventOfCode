import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const validNeedles = ["XMAS", "SAMX"];
    const chars = data.trim().split("\n").map(s => s.split(""));
    let count = 0;
    for (let row = 0; row < chars.length; row++) {
        for (let col = 0; col < chars[row].length; col++) {
            if(chars[row][col] === "X") {
                const tmpStrs = ["", "", "", "", "", "", "", ""];
                for (let i = 0; i < "XMAS".length; i++) {
                    tmpStrs[0] += chars[row][col+i];
                    tmpStrs[1] += chars[row][col-i];
                    tmpStrs[2] += chars[row - i]?.[col];
                    tmpStrs[3] += chars[row + i]?.[col];
                    tmpStrs[4] += chars[row + i]?.[col + i];
                    tmpStrs[5] += chars[row + i]?.[col - i];
                    tmpStrs[6] += chars[row - i]?.[col + i];
                    tmpStrs[7] += chars[row - i]?.[col - i];
                }

                count += tmpStrs.filter(s => validNeedles.includes(s)).length;
            }
        }
    }

    console.log("04/01:", count);
});
