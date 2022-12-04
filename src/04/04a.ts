import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';

let count = 0;
async function loadInputData(): Promise<void> {
  const fileStream = createReadStream(join('src', '04', 'input.txt'));

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.


  for await (const line of rl) {
    const pairs = line.split(',');
    const [a1, a2] = pairs[0].split('-');
    const [b1, b2] = pairs[1].split('-');

    //a --****--
    //b ********
    if (+a1 >= +b1 && +a2 <= +b2) {
      count++;
      continue;
    }

    //a ********
    //b --****--
    if (+a1 <= +b1 && +a2 >= +b2) {
      count++;
      continue;
    }
  }
}

loadInputData()
  .then(() => {
    console.log(count);
  });
