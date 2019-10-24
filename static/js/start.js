function main() {
    highlight();
    time();
}

function highlight() {
    let players = document.querySelectorAll('.players');
    for (let player of players) {
        player.addEventListener('click', function () {
                this.select();
            }
        )
    }
}

function time() {
    let timer = document.querySelector('#time');
    let timeShow = document.querySelector('.time-value');
    let minutes = parseInt((timer.value) / 60);
    let seconds = parseInt(timer.value % 60);
    timeShow.innerHTML = `${minutes}:${seconds}`;
    timer.addEventListener('input', function () {
        minutes = parseInt((timer.value) / 60);
        seconds = timer.value % 60 === 0 ? "00" : parseInt(timer.value % 60);
        timeShow.innerHTML = `${minutes}:${seconds}`;
    });
}

main();