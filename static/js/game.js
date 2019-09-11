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

    getCards()

}


function retry() {
    window.location.reload();
}


function getRandomLink(images) {
    return images[Math.floor(Math.random() * images.length)];
}


function highlight(event) {
    event.target.select();
}


function getPlayerCards(playerCards, middleCard) {
    let randomIndex = Math.floor(Math.random() * playerCards.length);
    let images = document.getElementById("file-container").dataset.files;
    images = JSON.parse(images);
    images.splice(images.indexOf(middleCard.getAttribute('src')), 1);
    for (let i = 0; i < playerCards.length; i++) {
        if (i == randomIndex) {
            playerCards[i].src = middleCard.getAttribute('src');
        } else {
            let newCard = getRandomLink(images);
            playerCards[i].src = newCard;
            images.splice(images.indexOf(newCard), 1);
        }
    }
}


function getCards(){
    let images = document.getElementById("file-container").dataset.files;
    images = JSON.parse(images);
    let middleCard = document.querySelector('.middle-pic');
    middleCard.setAttribute('src', getRandomLink(images));
    let player1Cards = document.querySelectorAll('.player-1-card');
    let player2Cards = document.querySelectorAll('.player-2-card');
    getPlayerCards(player1Cards, middleCard);
    getPlayerCards(player2Cards, middleCard);
}


main();