import * as fs from "fs";

fs.readFile(process.argv[2] ?? "in.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    const [rules, pages] = data.trim().split("\n\n").map(s => s.split("\n"));
    const rulesMap = rules.reduce((acc, rule) => {
        acc[rule.split("|")[0]] = [...(acc[rule.split("|")[0]] ?? []), rule.split("|")[1]];
        return acc;
    }, {} as Record<string, string[]>);

    let sum = 0;
    pages.forEach((pageStr) => {
        const page = pageStr.split(",");
        let sortedPage = [...page];
        sortedPage = sortedPage.sort((a, b) => {
            if(!(a in rulesMap)) return 0;
            if(rulesMap[a].includes(b)) return -1;
            return 0;
        });

        if(sortedPage.join("") !== page.join("")) {
            sum += parseInt(sortedPage[Math.floor(page.length/2)]);
        }
    });

    console.log("05/02:", sum);
});
