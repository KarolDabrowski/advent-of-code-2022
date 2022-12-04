import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';

let calories: number[] = [];
let biggestCalorieBaggage = 0;
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

    if (line === '') {
      const total = calories.reduce((a, b) => a + b, 0);
      biggestCalorieBaggage = biggestCalorieBaggage < total
        ? total
        : biggestCalorieBaggage;
      calories = [];
      continue;
    }

    calories.push(+line);
    // console.log(`Line from file: ${line}`);
  }

}


loadInputData()
  .then(() => {
    console.log(biggestCalorieBaggage);
  });
