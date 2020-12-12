function twoGosperGuns(speedInMs) {
  const COLS = 95;
  const ROWS = 95;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);
  const gun1 = new GosperGliderGun(58, 1);
  const gun2 = new GosperGliderGun(1, 58);

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

function twoSimkinGun(speedInMs) {
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

function empty(speedInMs) {
  const COLS = 95;
  const ROWS = 95;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);

  return universe;
}
