let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-game");
let resetBtn = document.querySelector("#reset");
let msg = document.querySelector("#msg");

let turnO = true;
let gameActive = true;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && gameActive) {
            if (turnO) {
                box.innerText = "O";
                box.classList.add("player-o");
                box.classList.remove("player-x");
            } else {
                box.innerText = "X";
                box.classList.add("player-x");
                box.classList.remove("player-o");
            }
            box.disabled = true;
            const isWinner = checkWinner();
            if (!isWinner) {
                turnO = !turnO;
                // Optional: Update player turn message
                let turnMsg = document.querySelector("#turn-msg");
                if (turnMsg) turnMsg.innerText = `Player ${turnO ? "O" : "X"}'s turn`;
            }
        }
    });
});

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} wins!`;
    msg.classList.remove("hide");
    gameActive = false;

    // Optional: Clear turn message
    let turnMsg = document.querySelector("#turn-msg");
    if (turnMsg) turnMsg.innerText = "";
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [pos1, pos2, pos3] = pattern;
        const val1 = boxes[pos1].innerText;
        const val2 = boxes[pos2].innerText;
        const val3 = boxes[pos3].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1);
            for (let i of pattern) {
                boxes[i].classList.add("winning-box");
            }
            return true;
        }
    }

    // Check for draw
    let allFilled = [...boxes].every((box) => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "It's a draw!";
        msg.classList.remove("hide");
        gameActive = false;

        let turnMsg = document.querySelector("#turn-msg");
        if (turnMsg) turnMsg.innerText = "";
    }

    return false;
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("player-o", "player-x");
    }
};

const resetGame = () => {
    turnO = true;
    gameActive = true;
    enableBoxes();
    msg.classList.add("hide");

    // Remove winning animation
    boxes.forEach((box) => {
        box.classList.remove("winning-box");
    });

    // Optional: Reset turn message
    let turnMsg = document.querySelector("#turn-msg");
    if (turnMsg) turnMsg.innerText = "Player O's turn";
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
