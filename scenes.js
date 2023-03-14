import { Pattern } from "./pattern.js";

export function twoGosperGuns(speedInMs) {
  const COLS = 95;
  const ROWS = 95;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);
  const gun1 = new Pattern(GOSPER_GLIDER_GUN, 58, 1);
  const gun2 = new Pattern(GOSPER_GLIDER_GUN, 1, 58);

  gun1.flipX();
  gun2.rotate();
  gun2.flipX();
  gun2.flipY();

  // gun1.flipX();
  // gun2.flipX();
  // gun2.rotate();
  // gun2.rotate();

  universe.populate(gun1);
  universe.populate(gun2);

  return universe;
}

export function twoSimkinGun(speedInMs) {
  const COLS = 100;
  const ROWS = 100;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);
  const gun2 = new SimkinGliderGun(4, 1);
  const gun1 = new SimkinGliderGun(60, 78);

  gun2.rotate();
  gun2.rotate();

  universe.populate(gun1);
  universe.populate(gun2);

  return universe;
}

export function empty(speedInMs) {
  const COLS = 95;
  const ROWS = 95;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);

  return universe;
}

export function galaxies(speedInMs) {
  const COLS = 100;
  const ROWS = 100;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);
  const galaxy2 = new Galaxy(20, 20);
  const galaxy1 = new Galaxy(60, 78);

  universe.populate(galaxy1);
  universe.populate(galaxy2);

  return universe;
}

export function test(speedInMs) {
  const COLS = 100;
  const ROWS = 100;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);
  const test1 = new Pattern(SPACE_SHIP_1, 10, 60);
  // const test2 = new Test(70, 60);

  universe.populate(test1);
  // universe.populate(test2);

  return universe;
}
