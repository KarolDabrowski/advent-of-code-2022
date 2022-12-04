import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';

const priorities = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const common = [];
async function loadInputData(): Promise<void> {
  const fileStream = createReadStream(join('src', '03', 'input.txt'));

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    const lineArray = Array.from(line);
    const half = Math.ceil(lineArray.length / 2);
    common.push(intersection(lineArray.slice(0, half), lineArray.slice(half)))
  }
}

loadInputData()
  .then(() => {
    const score = common.reduce((acc, curr) => acc + priorities.indexOf(curr), 0);
    console.log(score);
  });


function intersection(array1: string[], array2: string[]): string {
  const intersect = array1.filter(value => array2.includes(value));
  return [...new Set(intersect)].toString();
}
