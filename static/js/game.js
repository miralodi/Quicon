function main() {

    let score1 = 0;
    let score2 = 0;

    let counter = {};
    window.addEventListener("load", function () {
        const time = document.getElementById('time').dataset.time;
        counter.end = time.slice(0, 1) * 60 + parseInt(time.slice(2));
        // Get the containers
        counter.min = document.getElementById("cd-min");
        counter.sec = document.getElementById("cd-sec");

        // Start if not past end date
        if (counter.end > 0) {
            counter.ticker = setInterval(function () {
                // Stop if passed end time
                counter.end--;
                if (counter.end <= 0) {
                    clearInterval(counter.ticker);
                    gameOver();
                }

                // Calculate remaining time
                let secs = counter.end;
                let mins = Math.floor(secs / 60); // 1 min = 60 secs
                secs -= mins * 60;

                // Update HTML
                counter.min.innerHTML = mins;
                counter.sec.innerHTML = (secs < 10 ? '0' : '') + secs;

            }, 1000);
        }
    });


    try {
        document.getElementById('restart').addEventListener('click', retry);
        let players = document.querySelectorAll('.players');
        for (let player of players) {
            player.addEventListener('click', highlight)
        }
        getCards();
        document.addEventListener('keydown', compareCards);
    } catch (error) {
        console.log(error.message);
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


        let player_1_data = document.getElementById('player_1').dataset;
        let player_2_keys = document.getElementById('player_2').dataset;
        score1 = handlePlayerKeyPress(player_1_data, score1);
        score2 = handlePlayerKeyPress(player_2_keys, score2);
    }

    function handlePlayerKeyPress(playerData, score) {
        let player_keys = JSON.parse(playerData.keys);
        let player_id = JSON.parse(playerData.userId);

        let keyPressed = event.key.toUpperCase();
        let middleCard = document.querySelector('.middle-card');

        if (middleCard.dataset.foundIt === '1') {
            return score;
        }

        if (player_keys.includes(keyPressed)) {
            let card = document.querySelector(`#${keyPressed}`);
            if (middleCard.getAttribute('src') === card.getAttribute('src')) {
                middleCard.dataset.foundIt = '1';
                score++;
                document.querySelector(`#score${player_id}`).classList.add("match", "bg-success");
                setTimeout(function () {
                    document.querySelector(`#score${player_id}`).classList.remove("match", "bg-success");
                    middleCard.dataset.foundIt = '0';
                    getCards();
                }, 200);
            } else {
                score--;
                document.querySelector(`#score${player_id}`).classList.add("dismatch", "bg-danger");
                setTimeout(function () {
                    document.querySelector(`#score${player_id}`).classList.remove("dismatch", "bg-danger");
                }, 200);
            }
            document.querySelector(`#score${player_id}`).innerHTML = `${score}`;
        }
        return score;
    }

    function gameOver() {
        document.removeEventListener("keydown", compareCards);
        let winnerMessageContainer = document.createElement("div");
        const player1 = document.getElementById('score1').dataset.player1;
        const player2 = document.getElementById('score2').dataset.player2;
        let gameOverMessage;
        if (score1 !== score2) {
            const winner = score1 > score2 ? player1 : player2;
            gameOverMessage = `The winner is ${winner}!`;
        } else {
            gameOverMessage = 'It is a tie!';
        }
        winnerMessageContainer.innerHTML = `<h4>${gameOverMessage}</h4>`;
        winnerMessageContainer.classList.add("game-over-message", "card", "p-2", "shadow", "bg-primary", "text-light");
        const container = document.getElementById("middle-display");
        container.insertBefore(winnerMessageContainer, container.children[1]);
        const toRemove = document.getElementById("middle-card");
        container.removeChild(toRemove);
    }

}


main();