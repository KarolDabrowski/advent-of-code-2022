import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';

const priorities = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const common = [];

let lineCount = 1;

async function loadInputData(): Promise<void> {
  const fileStream = createReadStream(join('src', '03', 'input.txt'));

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let group = [];
  for await (const line of rl) {

    group.push(Array.from(line));
    if (lineCount % 3 === 0) {
      const firstIntersect = intersection(group[0], group[1]);
      const secondIntersect = intersection(group[2], firstIntersect);
      common.push(secondIntersect.toString());
      group = [];
    }
    lineCount++;
  }
}

loadInputData()
  .then(() => {
    const score = common.reduce((acc, curr) => acc + priorities.indexOf(curr), 0);
    console.log(score);
  });


function intersection(array1: string[], array2: string[]): string[] {
  const intersect = array1.filter(value => array2.includes(value));
  return [...new Set(intersect)];
}
