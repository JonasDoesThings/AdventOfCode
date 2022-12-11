import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    // todo
});
