const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.join(__dirname, "results"));
console.log(files.length);

let largeJSON = [];

for (let fileName of files) {
  const file = require(`./results/${fileName}`);
  largeJSON.push(...file);
}

largeJSON = largeJSON.sort((a, b) => b.weekTotal - a.weekTotal);

console.log(
  "1 million",
  largeJSON.filter((a) => a.weekTotal > 1_000_000).length
);
console.log(
  "2 million",
  largeJSON.filter((a) => a.weekTotal > 2_000_000).length
);
console.log(
  "5 million",
  largeJSON.filter((a) => a.weekTotal > 5_000_000).length
);
console.log(
  "10 million",
  largeJSON.filter((a) => a.weekTotal > 10_000_000).length
);
console.log(
  "20 million",
  largeJSON.filter((a) => a.weekTotal > 20_000_000).length
);
console.log(
  "50 million",
  largeJSON.filter((a) => a.weekTotal > 50_000_000).length
);
console.log(
  "100 million",
  largeJSON.filter((a) => a.weekTotal > 100_000_000).length
);
console.log(
  "150 million",
  largeJSON.filter((a) => a.weekTotal > 150_000_000).length
);
console.log(
  "200 million",
  largeJSON.filter((a) => a.weekTotal > 200_000_000).length
);
