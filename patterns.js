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
