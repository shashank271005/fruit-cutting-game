const fruits = [ 
    { name: 'kiwi', img: 'img/kiwi no bg.png'},
    { name: 'pear', img: 'img/file (3).png'},
    { name: 'banana', img: 'img/banana.png' },
    { name: 'watermelon', img: 'img/watermelon no bg.png' },
    { name: 'strawberry', img: 'img/file (2).png' }
];

const cutFruits = [
    { name: 'kiwi', img: 'img/kiwi no background.png' },
    { name: 'pear', img: 'img/pear no bg.png' },
    { name: 'banana', img: 'img/banana no bg.png' },
    { name: 'watermelon', img: 'img/watermelon (1).png' },
    { name: 'strawberry', img: 'img/strawberry sliced.png' }
];

const cutSound = new Audio('./slice.mp3');
const bombSound = new Audio('./bomb2.mp3'); 
const backgroundMusic = new Audio('./05. Dance of the Dragon Fruit.mp3'); 



const bomb = { img: 'img/bomb png.png' }; 
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
let score = 0;
let fallenFruitsCount = 0; 
let gameActive = true;

let fruitInterval;
let bombInterval;

function startGame() {
    backgroundMusic.loop = true; 
    backgroundMusic.volume = 0.5; 
    backgroundMusic.play(); 
    fruitInterval = setInterval(spawnFruit, 700); 
    bombInterval = setInterval(spawnBomb, 3000); 
}

function spawnFruit() {
    const fruitIndex = Math.floor(Math.random() * fruits.length);
    const fruit = document.createElement('img');
    fruit.className = 'fruit';
    fruit.src = fruits[fruitIndex].img;
    fruit.dataset.name = fruits[fruitIndex].name; 
    fruit.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    fruit.style.top = '0px'; 

    gameArea.appendChild(fruit);

    let fallInterval = setInterval(() => {
        let currentTop = parseInt(fruit.style.top);
        if (currentTop < gameArea.clientHeight - 100) {
            fruit.style.top = (currentTop + 10) + 'px'; 
        } else {
            clearInterval(fallInterval);
            gameArea.removeChild(fruit); 
            fallenFruitsCount++; 

            if (fallenFruitsCount > 2) {
                endGame(); 
            }
        }
    }, 20); 

    fruit.addEventListener('click', () => cutFruit(fruit, fruitIndex, fallInterval));
}

function cutFruit(fruit, fruitIndex, fallInterval) {
    score++;
    scoreDisplay.innerText = `Live Score: ${score}`;

    const cutFruit = document.createElement('img');
    cutFruit.className = 'fruit cut';
    cutFruit.src = cutFruits[fruitIndex].img; 
    cutFruit.style.left = fruit.style.left;
    cutFruit.style.top = fruit.style.top;

    gameArea.appendChild(cutFruit);
    clearInterval(fallInterval); 
    gameArea.removeChild(fruit); 

    cutSound.currentTime = 0;
    cutSound.play();

    let cutFruitFallInterval = setInterval(() => {
        let currentTop = parseInt(cutFruit.style.top);
        if (currentTop < gameArea.clientHeight - 100) {
            cutFruit.style.top = (currentTop + 10) + 'px';
        } else {
            clearInterval(cutFruitFallInterval);
            gameArea.removeChild(cutFruit);
        }
    }, 20);
}

function spawnBomb() {
    const bombElement = document.createElement('img');
    bombElement.className = 'bomb';
    bombElement.src = bomb.img;

    bombElement.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    bombElement.style.top = '0px'; 

    gameArea.appendChild(bombElement);

    let fallInterval = setInterval(() => {
        let currentTop = parseInt(bombElement.style.top);
        if (currentTop < gameArea.clientHeight - 100) {
            bombElement.style.top = (currentTop + 10) + 'px'; 
        } else {
            clearInterval(fallInterval);
            gameArea.removeChild(bombElement); 
        }
    }, 20); 

    bombElement.addEventListener('click', () => {
        clearInterval(fruitInterval);
        clearInterval(bombInterval);
        bombSound.currentTime = 0;
        bombSound.play();
        setTimeout(() => endGame(), 1000);
    });
}

document.addEventListener('mousemove', (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    const fruitsList = document.querySelectorAll('.fruit');
    fruitsList.forEach(fruit => {
        const fruitRect = fruit.getBoundingClientRect();
        if (
            cursorX > fruitRect.left &&
            cursorX < fruitRect.right &&
            cursorY > fruitRect.top &&
            cursorY < fruitRect.bottom
        ) {
            fruit.click(); 
        }
    });

    const bombsList = document.querySelectorAll('.bomb');
    bombsList.forEach(bomb => {
        const bombRect = bomb.getBoundingClientRect();
        if (
            cursorX > bombRect.left &&
            cursorX < bombRect.right &&
            cursorY > bombRect.top &&
            cursorY < bombRect.bottom
        ) {
            bombSound.currentTime = 0;
            bombSound.play();
            clearInterval(fruitInterval);
            clearInterval(bombInterval);
            gameArea.removeChild(bomb);
            setTimeout(() => endGame(), 1000);
        }
    });
});


document.addEventListener('touchmove', (event) => {
    event.preventDefault(); 

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    const fruitsList = document.querySelectorAll('.fruit');
    fruitsList.forEach(fruit => {
        const fruitRect = fruit.getBoundingClientRect();
        if (
            touchX > fruitRect.left &&
            touchX < fruitRect.right &&
            touchY > fruitRect.top &&
            touchY < fruitRect.bottom
        ) {
            fruit.click(); 
        }
    });

    const bombsList = document.querySelectorAll('.bomb');
    bombsList.forEach(bomb => {
        const bombRect = bomb.getBoundingClientRect();
        if (
            touchX > bombRect.left &&
            touchX < bombRect.right &&
            touchY > bombRect.top &&
            touchY < bombRect.bottom
        ) {
            bombSound.currentTime = 0;
            bombSound.play();
            clearInterval(fruitInterval);
            clearInterval(bombInterval);
            gameArea.removeChild(bomb);
            setTimeout(() => endGame(), 1000);
        }
    });
});

function endGame() {
    gameActive = false; 
    clearInterval(fruitInterval); 
    clearInterval(bombInterval); 
    localStorage.setItem('liveScore', score);
    window.location.href = "gameover.html";
}

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();


startGame();
