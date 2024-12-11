import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, input) => {
    if (err) console.log(err);

    const stones = input.trim().split(" ");

    const stonesAfterStep1 = processInput(stones, 25);
    console.log("11/01:", stonesAfterStep1.length);
    console.log("11/02:", processInput(stonesAfterStep1, 50, 25).length);
});

function processInput(stones: string[], blinks: number, blinkIndexOffset?: number) {
    for (let blink = 0; blink < blinks; blink++) {
        console.log(`iteration ${blink+1+(blinkIndexOffset ?? 0)}`);
        for (let i = stones.length-1; i >= 0; i--) {
            const stone = stones[i];

            if(stone === "0") {
                stones[i] = "1";
                continue;
            }
            const stoneStr = stone.toString();
            if(stoneStr.length % 2 === 0) {
                stones.splice(i, 1, stoneStr.substring(0, stoneStr.length/2), stoneStr.substring(stoneStr.length/2));
                continue;
            }

            stones[i] = (parseInt(stone) * 2024).toString();
        }
    }

    return stones;
}
