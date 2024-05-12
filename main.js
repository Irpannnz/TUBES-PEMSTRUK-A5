let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();

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

    // event listener untuk tombol restart
    document.getElementById('restartButton').addEventListener('click', function() {
        restartGame();
    });
};

function setGame() {
    // Menyiapkan grid pada HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); 
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); 
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); 
        gameOver = true;
        showRestartButton(); // Menampilkan tombol restart saat permainan berakhir
    }
}

function restartGame() {
    // Reset semua variabel ke nilai awal
    score = 0;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;
    document.getElementById("score").innerText = score.toString(); // Mengatur ulang tampilan skor

    // Hapus gambar-gambar yang ada di setiap tile
    let tiles = document.querySelectorAll("#board > div");
    tiles.forEach(tile => {
        tile.innerHTML = "";
    });

    hideRestartButton(); // Sembunyikan tombol restart saat permainan dimulai kembali
}

function showRestartButton() {
    document.getElementById("restartButton").style.display = "block";
}

function hideRestartButton() {
    document.getElementById("restartButton").style.display = "none";
}
