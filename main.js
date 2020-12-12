const universeEl = document.getElementById("universe");
const nextButton = document.getElementById("next");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

const universe = twoSimkinGun();

nextButton.addEventListener("click", () => {
  universe.next();
});

stopButton.addEventListener("click", () => {
  universe.stop();
});

startButton.addEventListener("click", () => {
  universe.start();
});
