import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';

let calories: number[] = [];
let firstThreeBiggestCalorieBaggage: number[] = [];
async function loadInputData(): Promise<void> {
  const fileStream = createReadStream(join('src', '01', 'input.txt'));

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(line);
    if (line === '') {
      const total = calories.reduce((a, b) => a + b, 0);
      firstThreeBiggestCalorieBaggage.push(total)

      // console.log(firstThreeBiggestCalorieBaggage)
      firstThreeBiggestCalorieBaggage = firstThreeBiggestCalorieBaggage
        .sort(function (a, b) {
          return a - b;
        })
        .reverse()
        .slice(0, 3)
      calories = [];
      continue;
    }

    calories.push(+line);
  }
}


loadInputData()
  .then(() => {
    // console.log(firstThreeBiggestCalorieBaggage);
    console.log(firstThreeBiggestCalorieBaggage.reduce((a, b) => a + b, 0));
  });
