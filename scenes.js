function twoGuns(speedInMs) {
  const COLS = 95;
  const ROWS = 95;

  const universe = new Universe(universeEl, COLS, ROWS, speedInMs);
  const gun1 = new GosperGliderGun(58, 1);
  const gun2 = new GosperGliderGun(1, 58);

  gun1.flipX();
  gun2.rotate();
  gun2.flipX();
  gun2.flipY();

  universe.populate(gun1);
  universe.populate(gun2);

  return universe;
}
