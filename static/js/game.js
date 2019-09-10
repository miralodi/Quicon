let players = document.querySelectorAll('.players');
for (let player of players) {
    player.addEventListener('click', highlight)
}

function highlight(event) {
    event.target.select();
}