let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('.restart');
let newbtn = document.querySelector('.renew');
let msgcon = document.querySelector('.msgcontainer');
let msg = document.querySelector('.message');
let turnO = true;

//  Score count kare
let oWins = 0;
let xWins = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    enableboxes();
    msgcon.classList.add('hide');
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText !== "") return; 

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
})

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const updateScore = () => {
    document.getElementById('score').innerText = `O: ${oWins} | X: ${xWins}`;
};


const showWinner = (winner) => {
    if (winner === "O") {
        oWins++;
    } else if (winner === "X") {
        xWins++;
    }

    msg.innerText = `Congratulations, You win!😎👩 (O: ${oWins} | X: ${xWins})`;
    msgcon.classList.remove('hide');
    disableboxes();
    updateScore();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log(pos1val + " wins");
                showWinner(pos1val);
            }
        }
    }
};

newbtn.addEventListener('click', resetGame);
resetbtn.addEventListener('click', resetGame);
