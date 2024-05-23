let Tikusjahat;
let Tikusbaik;
let score = 0;
let gameOver = false;
let countDownTime = 60;
let timerStarted = false;

const sound = new Audio("./Audio/smash.mp3");

window.onload = function() {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function() {
        startGame();
    });

    const cursor = document.querySelector(".cursor");
    window.addEventListener('mousemove', e => {
        cursor.style.top = e.pageY + 'px';
        cursor.style.left = e.pageX + 'px';
    });
    window.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    window.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });

    document.getElementById('restartPopupButton').addEventListener('click', function() {
        restartGame();
    });
};

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let hole = document.createElement("div");
        hole.id = i.toString();
        hole.addEventListener("click", selectHole);
        document.getElementById("board").appendChild(hole);
    }
    setInterval(TikusJ, 1300);
    setInterval(TikusB, 1100);
}

function getRandomHole() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function TikusJ() {
    if (gameOver) {
        return;
    }
    if (Tikusjahat) {
        Tikusjahat.innerHTML = "";
        Tikusjahat.classList.remove('active');
    }
    let tikus = document.createElement("img");
    tikus.src = "./Assets/tikus3.png";

    tikus.style.transform = "translateX(-10%)";
    tikus.style.transform = "translateY(17%)";
    tikus.style.width = "130px";
    tikus.style.height = "100px";

    let num = getRandomHole();
    if (Tikusbaik && Tikusbaik.id == num) {
        return;
    }
    Tikusjahat = document.getElementById(num);
    Tikusjahat.appendChild(tikus);
    Tikusjahat.classList.add('active');
}

function TikusB() {
    if (gameOver) {
        return;
    }
    if (Tikusbaik) {
        Tikusbaik.innerHTML = "";
    }
    let tikusX = document.createElement("img");
    tikusX.src = "./Assets/tikus1.png";

    tikusX.style.transform = "translateX(10%)";
    tikusX.style.transform = "translateY(5%)";
    tikusX.style.width = "160px";
    tikusX.style.height = "125px";

    let num = getRandomHole();
    if (Tikusjahat && Tikusjahat.id == num) {
        return;
    }
    Tikusbaik = document.getElementById(num);
    Tikusbaik.appendChild(tikusX);
}

function selectHole() {
    if (gameOver) {
        return;
    }
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    if (this == Tikusjahat && this.classList.contains('active')) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
        sound.play();
        this.classList.remove('active');
        this.firstChild.src = "./Assets/tikus2.png";
        setTimeout(() => {
            this.innerHTML = "";
        }, 500);

    } else if (this == Tikusbaik) {
        gameOver = true;
        sound.play();
        this.firstChild.src = "./Assets/tikus0.png";
        stopTimer();
        showGameOverPopup();
    }
}

function startTimer() {
    const interval = setInterval(function() {
        countDownTime--;
        document.getElementById('timer').innerText = countDownTime.toString();
        if (countDownTime <= 0 || gameOver) {
            clearInterval(interval);
            document.getElementById('timer').innerText = 'Time is up!';
            gameOver = true;
            showGameOverPopup();
        }
    }, 1000);
}

function stopTimer() {
    countDownTime = 0;
}

function restartGame() {
    score = 0;
    gameOver = false;
    countDownTime = 60;
    timerStarted = false;
    Tikusjahat = null;
    Tikusbaik = null;
    document.getElementById("score").innerText = score.toString();
    document.getElementById("timer").innerText = countDownTime.toString();

    let holes = document.querySelectorAll("#board > div");
    holes.forEach(hole => {
        hole.innerHTML = "";
        hole.classList.remove('active');
    });

    hideGameOverPopup();
    document.getElementById('startButton').style.display = 'none';
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
}

function showGameOverPopup() {
    document.getElementById('finalScore').innerText = "Final Score: " + score.toString();
    document.getElementById('gameOverPopup').style.display = "flex";
}

function hideGameOverPopup() {
    document.getElementById('gameOverPopup').style.display = "none";
}
