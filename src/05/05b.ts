import { join } from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';


// [T]             [P]     [J]
// [F]     [S]     [T]     [R]     [B]
// [V]     [M] [H] [S]     [F]     [R]
// [Z]     [P] [Q] [B]     [S] [W] [P]
// [C]     [Q] [R] [D] [Z] [N] [H] [Q]
// [W] [B] [T] [F] [L] [T] [M] [F] [T]
// [S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
// [Q] [Q] [B] [D] [J] [W] [H] [R] [J]
//  1   2   3   4   5   6   7   8   9

const stacks = [
  Array.from('QSWCZVFT'),
  Array.from('QRB'),
  Array.from('BZTQPMS'),
  Array.from('DVFRQH'),
  Array.from('JGLDBSTP'),
  Array.from('WRTZ'),
  Array.from('HQMNSFRJ'),
  Array.from('RNFHW'),
  Array.from('JZTQPRB')
]

//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// const stacks = [
//   Array.from('ZN'),
//   Array.from('MCD'),
//   Array.from('P')
// ]

async function loadInputData(): Promise<void> {
  const fileStream = createReadStream(join('src', '05', 'input.txt'));

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let skip = 10;

  for await (const line of rl) {
    if (skip) {
      skip -= 1;
      continue;
    }
    // 'move 1 from 2 to 1'.split(' ')
    // => ['move', '1', 'from', '2', 'to', '1']
    //        0     1      2     3     4    5
    const commands = line.split(' ');
    const amount = +commands[1];
    const source = +commands[3] - 1;
    const dest = +commands[5] - 1;

    const crates = stacks[source] ? stacks[source].splice(stacks[source].length - amount, stacks[source].length) : null;
    if (!stacks[dest]) { stacks[dest] = []; }

    if (crates) {
      stacks[dest] = [...stacks[dest], ...crates];
    }
  }
}

loadInputData()
  .then(() => {
    const word = stacks.map(x => x[x.length - 1]).join('');
    console.log(word);
  });
