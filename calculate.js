const { parse } = require("csv-parse/sync");
const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.join(__dirname, "downloads.csv"));

const data = parse(file)
  .slice(1)
  .map(([name, number]) => [name, +number])
  .filter((row) => row[1] > 0);

const totalDownloads = data.reduce((a, b) => a + b[1], 0);

function calculateTop(numbers) {
  for (let num of numbers) {
    const res = data.slice(0, num).reduce((a, b) => a + b[1], 0);
    console.log(
      `Top ${num}: ${res.toLocaleString("en-US")}, (${(
        (res / totalDownloads) *
        100
      ).toFixed(2)}%)`
    );
  }
}

console.log("All downloads: ", totalDownloads.toLocaleString("en-US"));
calculateTop([
  10, 20, 50, 100, 200, 250, 500, 1000, 1500, 2000, 2500, 5000, 10_000, 20_000,
  50_000,
]);
