export class Pattern {
  constructor(items = "", x = 0, y = 0) {
    this.items = items
      .split("\n")
      .map((row) => row.split("").map((c) => (c === "O" ? 1 : 0)));

    console.log(this.items);
    this.x = x;
    this.y = y;
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  translateTo(x, y) {
    this.x = x;
    this.y = y;
  }

  flipY() {
    this.items.reverse();
  }

  flipX() {
    this.items.forEach((row) => {
      row.reverse();
    });
  }

  rotate() {
    const result = [];
    for (let i = 0, l = this.items[0].length; i < l; i += 1) {
      const row = this.items.map((e) => e[i]).reverse();
      result.push(row);
    }

    this.items = result;
  }
}

export const BLOCK = `
00
00
`;

export const BLINKER = `000`;

export const GOSPER_GLIDER_GUN = `
  ........................O...........
  ......................O.O...........
  ............OO......OO............OO
  ...........O...O....OO............OO
  OO........O.....O...OO..............
  OO........O...O.OO....O.O...........
  ..........O.....O.......O...........
  ...........O...O....................
  ............OO......................
`;

export class SimkinGliderGun extends Pattern {
  constructor(x, y) {
    const items = [
      "xx     xx         |         |2   ",
      "xx     xx         |         |3   ",
      "                  |         |4   ",
      "    xx            |         |5   ",
      "    xx            |         |6   ",
      "                  |         |7   ",
      "        |         |         |8   ",
      "        |         |         |9   ",
      "--------|---------|          ----",
      "23456789|123456789|   xx xx      ",
      "        |         |  x     x     ",
      "        |         |  x      x  xx",
      "        |         |  xxx   x   xx",
      "        |         |       x      ",
      "        |         |              ",
      "        |         |              ",
      "        |                   |8   ",
      "        |           xx      |9   ",
      "--------|--------   x       |----",
      "23456789|12345678    xxx    |1234",
      "        |              x    |2   ",
    ];
    super(items, x, y);
  }
}

export const GUN = `OOOOOOOO.OOOOO...OOO......OOOOOOO.OOOOO`;

export class Galaxy extends Pattern {
  constructor(x, y) {
    const items = [
      "xxxxxx xx",
      "xxxxxx xx",
      "       xx",
      "xx     xx",
      "xx     xx",
      "xx     xx",
      "xx       ",
      "xx xxxxxx",
      "xx xxxxxx",
    ];
    super(items, x, y);
  }
}

// 56P6H1V0
export const SPACE_SHIP_1 = `
.....OOO..........OOO.....
OOO.O.......OO.......O.OOO
....O...O..O..O..O...O....
....O.....O....O.....O....
..........OO..OO..........
.......O...O..O...O.......
.......O.O......O.O.......
........OOOOOOOOOO........
..........O....O..........
........O........O........
.......O..........O.......
........O........O........
`;
