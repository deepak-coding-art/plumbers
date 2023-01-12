const container = document.getElementById("container");
const maxHoles = 3;
const holes = [];
const holesStatus = [];
let lastClick = 0;

function createBg() {
  const blocks = 20;
  const background = document.createElement("div");
  background.setAttribute("class", "background");
  background.setAttribute("id", "background");
  for (let i = 0; i < blocks; i++) {
    for (let j = 0; j < blocks; j++) {
      const block = document.createElement("img");
      block.setAttribute("class", "block");
      block.setAttribute("src", "./assets/bg-tile.png");
      background.appendChild(block);
    }
  }
  container.appendChild(background);
}

function createPipe() {
  const pipeContainer = document.createElement("div");
  pipeContainer.setAttribute("class", "pipe-container");
  pipeContainer.setAttribute("id", "pipe-container");
  const pipe = document.createElement("img");
  pipe.setAttribute("class", "pipe");
  pipe.setAttribute("id", "pipe");
  pipe.setAttribute("src", "./assets/pipes.png");
  pipeContainer.appendChild(pipe);
  container.appendChild(pipeContainer);
}

function createHole() {
  if (holes.length < maxHoles) {
    const pipeContainer = document.getElementById("pipe-container");
    const hole = document.createElement("div");
    hole.setAttribute("class", `holes hole-number-${holes.length}`);
    if (holes.length === 0) {
      hole.style.left = `5%`;
      hole.style.top = `23%`;
    } else if (holes.length === 1) {
      hole.style.left = `5%`;
      hole.style.top = `81%`;
    } else if (holes.length === 2) {
      hole.style.left = `94%`;
      hole.style.top = `40%`;
    }
    hole.style.width = `1.5%`;
    hole.addEventListener("click", (e) => {
      const number = parseInt(e.target.className.split("-").at(-1));
      lastClick = number;
      holesStatus[number] = false;
      let completed = false;
      if (holesStatus.length >= maxHoles) {
        holesStatus.every((hole, index) => {
          if (!hole && index === maxHoles - 1) {
            if (lastClick === 0) {
              holesStatus[1] = true;
            } else if (lastClick === 1) {
              holesStatus[2] = true;
            } else if (lastClick === 2) {
              holesStatus[0] = true;
            }
            update();
          }
          return !hole;
        });
      } else {
        createHole();
        update();
      }
      update();
    });
    pipeContainer.appendChild(hole);
    holes.push(hole);
    holesStatus.push(true);
  }
}

function update() {
  holes.forEach((hole, index) => {
    if (!holesStatus[index]) {
      hole.innerHTML = "";
      const seal = document.createElement("img");
      seal.setAttribute("class", `seal seal-number-${index}`);
      seal.setAttribute("src", "./assets/seal.png");
      seal.style.width = `400%`;
      seal.style.transform = `translate(-50%, -50%)`;
      hole.appendChild(seal);
      holesStatus[index] = false;
    } else {
      hole.innerHTML = "";
      const spray = document.createElement("img");
      spray.setAttribute("class", `spray spray-${index}`);
      spray.setAttribute("src", "./assets/spray.png");

      hole.appendChild(spray);
    }
  });
}

window.addEventListener("load", () => {
  // createBg();
  createPipe();
  createHole();
  update();
});
