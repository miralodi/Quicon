function main() {

    let score1 = 0;
    let score2 = 0;

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


    try {
        getCards();
        document.addEventListener('keydown', compareCards);
    } catch (error) {

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


    function getCards() {
        let images = document.getElementById("file-container").dataset.files;
        images = JSON.parse(images);
        let middleCard = document.querySelector('.middle-card');
        middleCard.setAttribute('src', getRandomLink(images));
        let player1Cards = document.querySelectorAll('.player-1-card');
        let player2Cards = document.querySelectorAll('.player-2-card');
        getPlayerCards(player1Cards, middleCard);
        getPlayerCards(player2Cards, middleCard);


    }


    function compareCards(event) {
        let player_1_keys = document.getElementById('player_1').dataset.keys1;
        player_1_keys = JSON.parse(player_1_keys);
        let player_2_keys = document.getElementById('player_2').dataset.keys2;
        player_2_keys = JSON.parse(player_2_keys);
        let keyPressed = event.key.toUpperCase();
        let middleCard = document.querySelector('.middle-card');

        if (player_1_keys.includes(keyPressed)) {
            let card = document.querySelector(`#${keyPressed}`);
            if (middleCard.getAttribute('src') == card.getAttribute('src')) {
                score1++;
                document.querySelector('#score1').classList.add("match");
                setTimeout(function () {
                    document.querySelector('#score1').removeAttribute('class');
                    getCards();
                }, 200);
            } else {
                score1--;
                document.querySelector('#score1').classList.add("dismatch");
                setTimeout(function () {
                    document.querySelector('#score1').removeAttribute('class');
                }, 200);
            }
            document.querySelector('#score1').innerHTML = `Score: ${score1}`;
        }
        if (player_2_keys.includes(keyPressed)) {
            let card = document.querySelector(`#${keyPressed}`);
            if (middleCard.getAttribute('src') == card.getAttribute('src')) {
                score2++;
                document.querySelector('#score2').classList.add("match");
                setTimeout(function () {
                    document.querySelector('#score2').removeAttribute('class');
                    getCards();
                }, 200);
            } else {
                score2--;
                document.querySelector('#score2').classList.add("dismatch");
                setTimeout(function () {
                    document.querySelector('#score2').removeAttribute('class');
                }, 200);
            }
            document.querySelector('#score2').innerHTML = `Score: ${score2}`;
        }
    }

    function sleep(milliseconds) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }


}


main();