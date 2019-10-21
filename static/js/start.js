function main() {
    highlight();
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

main();