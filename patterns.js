class Pattern {
  constructor(items = "", x = 0, y = 0) {
    this.items = items.map((str) => {
      return str.split("").map((char) => {
        return char.toLowerCase() === "x" ? 1 : 0;
      });
    });
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

const GRID = [
  "123456789|123456789|123456789|",
  "2        |         |         |",
  "3        |         |         |",
  "4        |         |         |",
  "5        |         |         |",
  "6        |         |         |",
  "7        |         |         |",
  "8        |         |         |",
  "9        |         |         |",
  "---------|---------|---------|",
];

class Block extends Pattern {
  constructor(x, y) {
    const items = ["xx", "xx"];
    super(items, x, y);
  }
}

class Blinker extends Pattern {
  constructor(x, y) {
    const items = [["x"], ["x"], ["x"]];
    super(items, x, y);
  }
}

class GosperGliderGun extends Pattern {
  constructor(x, y) {
    const items = [
      "                        x           ",
      "                      x x           ",
      "            xx      xx            xx",
      "           x   x    xx            xx",
      "xx        x     x   xx              ",
      "xx        x   x xx    x x           ",
      "          x     x       x           ",
      "           x   x                    ",
      "            xx                      ",
    ];
    super(items, x, y);
  }
}

class SimkinGliderGun extends Pattern {
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

class Gun extends Pattern {
  constructor(x, y) {
    const items = ["xxxxxxxx xxxxx   xxx      xxxxxxx xxxxx"];
    super(items, x, y);
  }
}
