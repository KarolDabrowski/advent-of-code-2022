import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';

// const shapeScore = {
//   x: 1,
//   y: 2,
//   z: 3
// }

// const roundScore = {
//   loss: 0,
//   draw: 3,
//   win: 6
// }
// rock A,X
// paper B,Y
// scissors C,Z

const scores = {
  'A X': 3 + 1,
  'A Y': 6 + 2,
  'A Z': 0 + 3,
  'B X': 0 + 1,
  'B Y': 3 + 2,
  'B Z': 6 + 3,
  'C X': 6 + 1,
  'C Y': 0 + 2,
  'C Z': 3 + 3,
}

let score = 0;
async function loadInputData(): Promise<void> {
  const fileStream = createReadStream(join('src', '02', 'input.txt'));

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    score += +scores[line];
  }
}

loadInputData()
  .then(() => {
    console.log(score);
  });
