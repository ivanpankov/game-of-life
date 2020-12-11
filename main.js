const universeEl = document.getElementById("universe");
const nextButton = document.getElementById("next");
const COLS = 60;
const ROWS = 60;

const universe = new Universe(universeEl, COLS, ROWS);

nextButton.addEventListener("click", () => {
  universe.next();
});

function Universe(rootEl, cols, rows) {
  this.rootEl = rootEl;
  this.cols = cols;
  this.rows = rows;
  this.data = [];
  this.currentGeneration = new Set();
  this.isRunning = false;

  for (let row = 0; row < rows; row += 1) {
    const _row = {
      el: document.createElement("div"),
      cells: [],
    };

    for (let col = 0; col < cols; col += 1) {
      const cEl = document.createElement("div");
      cEl.dataset.row = row;
      cEl.dataset.col = col;

      const _cell = {
        el: cEl,
        val: 0,
      };

      _row.cells.push(_cell);
      _row.el.appendChild(_cell.el);
    }

    this.data.push(_row);
    rootEl.appendChild(_row.el);
  }

  rootEl.addEventListener("click", (ev) => {
    let el = ev.target;
    const row = +el.dataset.row;
    const col = +el.dataset.col;

    this.toggleCell(row, col);
  });
}

Universe.prototype.getCell = function (row, col) {
  const _row = this.data[row];
  const _cell = _row.cells[col];
  return _cell;
};

Universe.prototype.toggleCell = function (row, col) {
  const _cell = this.getCell(row, col);

  if (_cell.val) {
    this.currentGeneration.delete(_cell);
    _cell.val = 0;
    _cell.el.classList.remove("live");
  } else {
    this.currentGeneration.add(_cell);
    _cell.val = 1;
    _cell.el.classList.add("live");
  }
};

Universe.prototype.getNeighbors = function (row, col) {
  const neighbors = [];

  for (let r = row - 1; r <= row + 1; r += 1) {
    const _row = this.data[r];
    if (!_row) continue;

    for (let c = col - 1; c <= col + 1; c += 1) {
      const _cell = _row.cells[c];
      if (!_cell || (row === r && col === c)) continue;

      neighbors.push(_cell);
    }
  }

  return neighbors;
};

Universe.prototype.getLiveNeighborsCount = function (row, col) {
  const neighbors = this.getLiveNeighbors(row, col);

  return neighbors.reduce((acc, _cell) => {
    return acc + _cell.val;
  }, 0);
};

Universe.prototype.getLiveNeighbors = function (row, col) {
  return this.getNeighbors(row, col).filter((_cell) => _cell.val === 1);
};

Universe.prototype.getDeadNeighbors = function (row, col) {
  return this.getNeighbors(row, col).filter((_cell) => _cell.val === 0);
};

Universe.prototype.makeDead = function (_cell) {
  this.currentGeneration.delete(_cell);
  _cell.val = 0;
  _cell.el.classList.remove("live");
};

Universe.prototype.makeLive = function (_cell) {
  this.currentGeneration.add(_cell);
  _cell.val = 1;
  _cell.el.classList.add("live");
};

Universe.prototype.next = function () {
  const nextGeneration = new Set();
  const goingToDie = new Set();

  // find who wants to be born
  for (let _cell of this.currentGeneration) {
    const row = +_cell.el.dataset.row;
    const col = +_cell.el.dataset.col;
    const neighbors = this.getDeadNeighbors(row, col);

    neighbors.forEach((c) => {
      nextGeneration.add(c);
    });
  }

  // find who is going to be born
  for (let _cell of nextGeneration) {
    const row = +_cell.el.dataset.row;
    const col = +_cell.el.dataset.col;
    const liveNeighborsCount = this.getLiveNeighborsCount(row, col);

    if (liveNeighborsCount !== 3) {
      nextGeneration.delete(_cell);
    }
  }

  // find wo is going to die
  for (let _cell of this.currentGeneration) {
    const row = +_cell.el.dataset.row;
    const col = +_cell.el.dataset.col;
    const liveNeighborsCount = this.getLiveNeighborsCount(row, col);

    if (liveNeighborsCount < 2 || liveNeighborsCount > 3) {
      goingToDie.add(_cell);
    }
  }

  // kill by under/over population
  for (let _cell of goingToDie) {
    this.makeDead(_cell);
  }

  // born new items
  for (let _cell of nextGeneration) {
    this.makeLive(_cell);
  }

  console.log(this.nextGeneration);
};

Universe.prototype.start = function () {
  const that = this;
  this.isRunning = true;

  const intervalId = setInterval(() => {
    if (this.isRunning) {
      window.requestAnimationFrame(that.next());
    } else {
      clearInterval(intervalId);
    }
  });
};

Universe.prototype.stop = function () {
  this.isRunning = false;
  this.init();
};

Universe.prototype.pause = function () {
  this.isRunning = false;
};
