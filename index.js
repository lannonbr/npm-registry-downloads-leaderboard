const axios = require("axios").default;
const names = require("all-the-package-names");
const fs = require("fs");
const path = require("path");

async function run() {
  const nonScoped = names.filter((n) => !n.startsWith("@"));

  const chunkSize = 100;

  let chunks = [];

  for (let i = 0; i < nonScoped.length; i += chunkSize) {
    chunks.push(nonScoped.slice(i, i + chunkSize));
  }

  let lastChunk = fs.existsSync(path.join(__dirname, "last-chunk-written.txt"))
    ? parseInt(fs.readFileSync(path.join(__dirname, "last-chunk-written.txt")))
    : 0;

  if (!fs.existsSync(path.join(__dirname, "results"))) {
    fs.mkdirSync(path.join(__dirname, "results"));
  }

  for (let i = lastChunk; i < chunks.length; i++) {
    const chunk = chunks[i];
    const packageNames = chunk.join(",");

    const result = await fetchDownloads(packageNames);

    fs.writeFileSync(path.join(__dirname, "last-chunk-written.txt"), `${i}`);
    fs.writeFileSync(
      path.join(__dirname, "results", `chunk-${i}.json`),
      JSON.stringify(result)
    );

    await sleep(1000);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function fetchDownloads(str) {
  const { data } = await axios.get(
    `https://api.npmjs.org/downloads/range/last-week/${str}`,
    {
      headers: {
        "User-Agent":
          "npm registry downloads leaderboard 0.0.1 (https://github.com/lannonbr/npm-registry-downloads-leaderboard)",
      },
    }
  );

  return Object.entries(data).map((pkg) => {
    if (pkg[1] === null) {
      return {
        package: pkg[0],
        weekTotal: 0,
      };
    }
    const [, { downloads, package }] = pkg;
    return {
      package,
      weekTotal: downloads.reduce((a, b) => a + b.downloads, 0),
    };
  });
}

run();
