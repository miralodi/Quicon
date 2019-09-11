function main() {

    try {
        document.getElementById('restart').addEventListener('click', retry);
    } catch (error) {
    }

    try {
        let players = document.querySelectorAll('.players');
        for (let player of players) {
            player.addEventListener('click', highlight)
        }
    } catch (error) {
    }

}

function retry() {
    window.location.reload();
}

function getRandomLink() {
    let images = document.getElementById("file-container").dataset.files;
    images = JSON.parse(images);
    let randomLink = images[Math.floor(Math.random() * images.length)];
    return randomLink
}

function highlight(event) {
    event.target.select();
}

main();