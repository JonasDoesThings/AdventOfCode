import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const chars = data.trim().split("\n").map(s => s.split(""));
    let count = 0;
    for (let row = 0; row < chars.length; row++) {
        for (let col = 0; col < chars[row].length; col++) {
            if(chars[row][col] === "A") {
                const leftLegMet = (
                    (chars[row-1]?.[col-1] === "M" && chars[row+1]?.[col+1] === "S")
                  || (chars[row-1]?.[col-1] === "S" && chars[row+1]?.[col+1] === "M")
                );
                const rightLegMet = (
                    (chars[row-1]?.[col+1] === "M" && chars[row+1]?.[col-1] === "S")
                  || (chars[row-1]?.[col+1] === "S" && chars[row+1]?.[col-1] === "M")
                );

                if(leftLegMet && rightLegMet) count++;
            }
        }
    }

    console.log("04/02:", count);
});
