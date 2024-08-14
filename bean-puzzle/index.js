let arrLeft = Array(11).fill("orange");
let arrCenter = Array(3).fill("orange");
let arrRight = Array(11).fill("green");
let centerArrPosition = "left";
let gameStarted = false;

const ballTemplate = `<div class="ball"></div>`;

// Setting up level
const levels = ["easy", "medium", "hard"];
let currentLevelIndex = 0;

const updateCarousel = () => {
    levels.forEach((level, index) => {
        document.getElementById(level).classList.toggle('active', index === currentLevelIndex);
    });
};

document.getElementById('left-arrow').addEventListener('click', () => {
    currentLevelIndex = (currentLevelIndex - 1 + levels.length) % levels.length;
    updateCarousel();
});

document.getElementById('right-arrow').addEventListener('click', () => {
    currentLevelIndex = (currentLevelIndex + 1) % levels.length;
    updateCarousel();
});

function populateLeftContainer() {
  for (let i = 0; i < arrLeft.length; i++) {
    let idIndex = `#lp${i + 1}`;
    $(idIndex).empty();
    $(ballTemplate).addClass(arrLeft[i]).appendTo(idIndex);
  }
}

function populateRightContainer() {
  for (let i = 0; i < arrRight.length; i++) {
    let idIndex = `#rp${i + 1}`;
    $(idIndex).empty();
    $(ballTemplate).addClass(arrRight[i]).appendTo(idIndex);
  }
}

function populateCenterContainer() {
  let id = "lm";
  if (centerArrPosition == "right") {
    id = "rm";
  }
  for (let i = 0; i < arrCenter.length; i++) {
    let idIndex = `#${id + (i + 1)}`;
    $(idIndex).empty();
    $(ballTemplate).addClass(arrCenter[i]).appendTo(idIndex);
  }
}

function populateAll() {
  populateLeftContainer();
  populateRightContainer();
  populateCenterContainer();
}

function clearMiddlePart() {
  $("#lm1").removeClass("middle-parts border-left border-right");
  $("#lm2").removeClass("middle-parts border-left border-right");
  $("#lm3").removeClass("middle-parts border-left border-right");
  $("#rm1").removeClass("middle-parts border-left border-right");
  $("#rm2").removeClass("middle-parts border-left border-right");
  $("#rm3").removeClass("middle-parts border-left border-right");

  $("#lm1").empty();
  $("#lm2").empty();
  $("#lm3").empty();
  $("#rm1").empty();
  $("#rm2").empty();
  $("#rm3").empty();
}

function enableRightMiddlePart() {
  $("#rm1").addClass("middle-parts border-left border-right");
  $("#rm2").addClass("middle-parts border-left border-right");
  $("#rm3").addClass("middle-parts border-left border-right");
}

function enableLeftMiddlePart() {
  $("#lm1").addClass("middle-parts border-left border-right");
  $("#lm2").addClass("middle-parts border-left border-right");
  $("#lm3").addClass("middle-parts border-left border-right");
}

function right() {
  clearMiddlePart();
  enableRightMiddlePart();
  centerArrPosition = "right";
  populateCenterContainer();
}

function left() {
  clearMiddlePart();
  enableLeftMiddlePart();
  centerArrPosition = "left";
  populateCenterContainer();
}

function up() {
  if (centerArrPosition == "left") {
    // Remove the last element from arrCenter and insert it at the beginning of arrLeft
    arrLeft.unshift(arrCenter.pop());
    // Remove the last element from arrLeft and insert it at the end of arrCenter
    arrCenter.unshift(arrLeft.pop());
  }
  if (centerArrPosition == "right") {
    arrRight.unshift(arrCenter.pop());
    arrCenter.unshift(arrRight.pop());
  }
  populateAll();
}

function down() {
  if (centerArrPosition == "left") {
    // Remove the first element from arrLeft and insert it at the end of arrCenter
    arrCenter.push(arrLeft.shift());
    // Remove the first element from arrCenter and insert it at the end of arrLeft
    arrLeft.push(arrCenter.shift());
  }
  if (centerArrPosition == "right") {
    arrCenter.push(arrRight.shift());
    arrRight.push(arrCenter.shift());
  }
  populateAll();
}

function checkWin() {
  if (
    (arrLeft.join("") === "green".repeat(11) && arrRight.join("") === "orange".repeat(11))
    || (arrLeft.join("") === "orange".repeat(11) && arrRight.join("") === "green".repeat(11))
  ) {
    $("#success-overlay").show();
    gameStarted = false;
  }
}

function restart() {
  arrLeft = Array(11).fill("orange");
  arrCenter = Array(3).fill("orange");
  arrRight = Array(11).fill("green");
  centerArrPosition = "left";
  populateAll();
  $("#success-overlay").hide();
  $("#mute-button").hide();
  $("#overlay").show();
}

function movePiece(action) {
  if(!gameStarted) return;

  if (action === "up") {
    up();
  } else if (action === "down") {
    down();
  } else if (action === "left") {
    left();
  } else if (action === "right") {
    right();
  }
  checkWin();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    movePiece("left");
  } else if (event.key === "ArrowRight") {
    movePiece("right");
  } else if (event.key === "ArrowUp") {
    movePiece("up");
  } else if (event.key === "ArrowDown") {
    movePiece("down");
  }
});

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
const minSwipeDistance = 50;

function handleSwipe() {
  const swipeDistanceX = touchEndX - touchStartX;
  const swipeDistanceY = touchEndY - touchStartY;

  if (swipeDistanceX > minSwipeDistance) {
    movePiece("right");
  } else if (swipeDistanceX < -minSwipeDistance) {
    movePiece("left");
  }

  if (swipeDistanceY > minSwipeDistance) {
    movePiece("down");
  } else if (swipeDistanceY < -minSwipeDistance) {
    movePiece("up");
  }
}

document.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;
  handleSwipe();
});

// Overlay functionality
document.getElementById("play-button").addEventListener("click", function () {
  gameStarted = true;
  document.getElementById("overlay").style.display = "none";
  randomize();
  playMusic();
});

// Randomize the puzzle
function randomize() {
  let shuffleCount = 100;
  switch (currentLevelIndex) {
    case 0: shuffleCount = 200; break;
    case 1: shuffleCount = 500; break;
    case 2: shuffleCount = 1000; break;
  }

  for (let i = 0; i < shuffleCount; i++) {
    let random = Math.floor(Math.random() * 4);
    if (random === 0) {
      up();
    } else if (random === 1) {
      down();
    } else if (random === 2) {
      left();
    } else if (random === 3) {
      right();
    }
  }
}

// Initial things
$("#mute-button").hide();
$("#success-overlay").hide();

// Play background music
function playMusic() {
  var audio = document.getElementById("background-music");
  audio.volume = 0.1; // Set volume to minimal
  audio.play();

  $("#mute-button").show();
  document.getElementById("mute-icon").className = "fas fa-volume-up";
}

function toggleMute() {
  var audio = document.getElementById("background-music");
  audio.muted = !audio.muted;
  document.getElementById("mute-icon").className = !audio.muted
    ? "fas fa-volume-up"
    : "fas fa-volume-mute";
}

// Disable right-click and inspect element
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
  if (
    event.key === "F12" ||
    event.ctrlKey || event.shiftKey
  ) {
    event.preventDefault();
  }
});
