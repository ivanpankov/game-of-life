const universeEl = document.getElementById("universe");
const nextButton = document.getElementById("next");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const COLS = 60;
const ROWS = 60;

class Universe {
  data = [];
  currentGeneration = new Set();
  isRunning = false;
  rootEl = null;
  cols = 0;
  rows = 0;

  constructor(rootEl, cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.rootEl = rootEl;

    rootEl.addEventListener("click", this.toggleCell.bind(this));

    for (let row = 0; row < rows; row += 1) {
      const rowEl = document.createElement("div");
      const rowArr = [];

      for (let col = 0; col < cols; col += 1) {
        const cellEl = document.createElement("div");
        cellEl.dataset.row = row;
        cellEl.dataset.col = col;
        cellEl.dataset.live = "0";
        rowEl.appendChild(cellEl);
        rowArr.push(cellEl);
      }

      rootEl.appendChild(rowEl);
      this.data.push(rowArr);
    }
  }

  toggleCell(ev) {
    const el = ev.target;
    const { live } = el.dataset;
    if (live === "1") {
      this.makeDead(el);
    } else {
      this.makeLive(el);
    }
  }

  makeDead(el) {
    this.currentGeneration.delete(el);
    el.classList.remove("live");
    el.dataset.live = "0";
  }

  makeLive(el) {
    this.currentGeneration.add(el);
    el.classList.add("live");
    el.dataset.live = "1";
  }

  getNeighbors(row, col) {
    const neighbors = [];

    for (let r = row - 1; r <= row + 1; r += 1) {
      for (let c = col - 1; c <= col + 1; c += 1) {
        const cell = this.data[r][c];
        const isSame = row === r && col === c;

        if (cell && !isSame) {
          neighbors.push(cell);
        }
      }
    }

    return neighbors;
  }

  getLiveNeighbors(row, col) {
    return this.getNeighbors(row, col).filter((el) => el.dataset.live === "1");
  }

  getDeadNeighbors(row, col) {
    return this.getNeighbors(row, col).filter((el) => el.dataset.live === "0");
  }

  getLiveNeighborsCount(row, col) {
    const liveNeighbors = this.getLiveNeighbors(row, col);
    return liveNeighbors.reduce((acc, el) => {
      const live = +el.dataset.live;
      return acc + live;
    }, 0);
  }

  stop() {
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    const that = this;

    const intervalId = setInterval(() => {
      if (this.isRunning) {
        window.requestAnimationFrame(that.next.bind(that));
      } else {
        clearInterval(intervalId);
      }
    }, 300);
  }

  next() {
    const nextGeneration = new Set();
    const goingToDie = new Set();

    // find who wants to be born
    for (let el of this.currentGeneration) {
      const { row, col } = el.dataset;
      const deadNeighbors = this.getDeadNeighbors(+row, +col);

      for (let i = 0, l = deadNeighbors.length; i < l; i += 1) {
        const deadNeighbor = deadNeighbors[i];
        const { row, col } = deadNeighbor.dataset;
        const liveNeighborsCount = this.getLiveNeighborsCount(+row, +col);

        if (liveNeighborsCount === 3) {
          nextGeneration.add(deadNeighbor);
        }
      }
    }

    // find wo is going to die
    for (let el of this.currentGeneration) {
      const { row, col } = el.dataset;
      const liveNeighborsCount = this.getLiveNeighborsCount(+row, +col);

      if (liveNeighborsCount < 2 || liveNeighborsCount > 3) {
        goingToDie.add(el);
      }
    }

    // kill by under/over population
    for (let el of goingToDie) {
      this.makeDead(el);
    }

    //   // born new items
    for (let el of nextGeneration) {
      this.makeLive(el);
    }
  }
}

const universe = new Universe(universeEl, COLS, ROWS);

nextButton.addEventListener("click", () => {
  universe.next();
});

stopButton.addEventListener("click", () => {
  universe.stop();
});

startButton.addEventListener("click", () => {
  universe.start();
});
