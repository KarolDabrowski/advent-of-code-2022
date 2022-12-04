import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
// A - rock 1
// B - paper 2
// C - scissors 3

// X- lose 0
// Y- draw 3
// Z - win 6

// A Y
// B X
// C Z

const scores = {
  'A X': 0 + 3,
  'A Y': 3 + 1,
  'A Z': 6 + 2,
  'B X': 0 + 1,
  'B Y': 3 + 2,
  'B Z': 6 + 3,
  'C X': 0 + 2,
  'C Y': 3 + 3,
  'C Z': 6 + 1
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
