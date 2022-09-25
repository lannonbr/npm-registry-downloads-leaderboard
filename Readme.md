# NPM Registry downloads leaderboard

A project to examine the top packages on the npm registry. To start I looked at all non-scoped packages on the registry which equates to ~1.4 million packages as of the date when I ran this.

To view the dataset collected as of Sept 24, 2022, visit the downloads.csv file. Do note due to the size of npm registry the file is over 30MB.

## Setup

```bash
npm install
node index.js # hit API and collect data in "results" folder
node analyze.js # parse through results folder
```

Since I ratelimited this to have a 1 second sleep between requests, the `index.js` script took about 7 hours to run. You possibly could decrease the sleep time, but I'd recommend against doing such as it could possibly result in an IP ban if you send too many requests at once.

As well, if it ever crashes when running, it will cache the last chunk it processed and continue on with the next one.
