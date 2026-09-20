console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

music.loop = true;
music.volume = 0.25;
audioTurn.volume = 0.7;
gameover.volume = 1;

let turn = "X";
let gameOver = false;

const startMusic = () => {
    music.currentTime = 0;
    music.play().catch(() => {});
};

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const drawWinLine = (combination) => {
    const boxes = document.querySelectorAll(".box");
    const line = document.querySelector(".line");
    const container = document.querySelector(".container");

    const firstBox = boxes[combination[0]];
    const lastBox = boxes[combination[2]];

    const firstRect = firstBox.getBoundingClientRect();
    const lastRect = lastBox.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const startX = firstRect.left + firstRect.width / 2 - containerRect.left;
    const startY = firstRect.top + firstRect.height / 2 - containerRect.top;
    const endX = lastRect.left + lastRect.width / 2 - containerRect.left;
    const endY = lastRect.top + lastRect.height / 2 - containerRect.top;

    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    const length = Math.hypot(endX - startX, endY - startY);

    line.style.width = `${length}px`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.opacity = "1";
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const e of wins) {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            gameOver = true;
            document.querySelector(".imgbox img").style.width = "200px";
            gameover.currentTime = 0;
            gameover.play().catch(() => {});
            drawWinLine(e);
            return;
        }
    }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        startMusic();
        if (boxtext.innerText === "" && !gameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.currentTime = 0;
            audioTurn.play().catch(() => {});
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn;
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    startMusic();
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });

    turn = "X";
    gameOver = false;
    document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn;
    document.querySelector(".imgbox img").style.width = "0px";
    document.querySelector(".line").style.opacity = "0";
    document.querySelector(".line").style.width = "0px";
});

window.addEventListener("click", startMusic, { once: true });
