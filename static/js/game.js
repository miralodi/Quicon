function main() {

    let score1 = 0;
    let score2 = 0;

    let counter = {};
    window.addEventListener("load", timer(counter, gameOver));
    document.querySelector('#restart').addEventListener('click', retry);
    getCards();
    document.addEventListener('keydown', compareCards);


    function retry() {
        window.location.reload();
    }


    function getRandomLink(images) {
        return images[Math.floor(Math.random() * images.length)];
    }


    function getPlayerCards(playerCards, middleCard) {
        let randomIndex = Math.floor(Math.random() * playerCards.length);
        let images = document.querySelector("#file-container").dataset.files;
        images = JSON.parse(images);
        images.splice(images.indexOf(middleCard.getAttribute('src')), 1);
        for (let i = 0; i < playerCards.length; i++) {
            if (i === randomIndex) {
                playerCards[i].src = middleCard.getAttribute('src');
            } else {
                let newCard = getRandomLink(images);
                playerCards[i].src = newCard;
                images.splice(images.indexOf(newCard), 1);
            }
        }
    }


    function getCards() {
        let images = document.querySelector("#file-container").dataset.files;
        images = JSON.parse(images);
        let middleCard = document.querySelector('.middle-card');
        middleCard.setAttribute('src', getRandomLink(images));
        let player1Cards = document.querySelectorAll('.player-1-card');
        let player2Cards = document.querySelectorAll('.player-2-card');
        getPlayerCards(player1Cards, middleCard);
        getPlayerCards(player2Cards, middleCard);
    }


    function compareCards() {
        let player1Data = document.querySelector('#player-1').dataset;
        let player2Data = document.querySelector('#player-2').dataset;
        score1 = handlePlayerKeyPress(player1Data, score1);
        score2 = handlePlayerKeyPress(player2Data, score2);
    }


    function handlePlayerKeyPress(playerData, score) {
        let playerKeys = JSON.parse(playerData.keys);
        let playerId = playerData.userId;

        let keyPressed = event.key.toUpperCase();
        let middleCard = document.querySelector('.middle-card');

        if (middleCard.dataset.foundIt === '1') {
            return score;
        }

        if (playerKeys.includes(keyPressed)) {
            let card = document.querySelector(`#${keyPressed}`);
            if (middleCard.getAttribute('src') === card.getAttribute('src')) {
                middleCard.dataset.foundIt = '1';
                score++;
                document.querySelector(`#score${playerId}`).classList.add("match", "bg-success");
                setTimeout(function () {
                    document.querySelector(`#score${playerId}`).classList.remove("match", "bg-success");
                    middleCard.dataset.foundIt = '0';
                    getCards();
                }, 200);
            } else {
                score--;
                document.querySelector(`#score${playerId}`).classList.add("dismatch", "bg-danger");
                setTimeout(function () {
                    document.querySelector(`#score${playerId}`).classList.remove("dismatch", "bg-danger");
                }, 200);
            }
            document.querySelector(`#score${playerId}`).innerHTML = `${score}`;
        }
        return score;
    }


    function gameOver() {
        document.removeEventListener("keydown", compareCards);
        const player1 = document.querySelector('#score1').dataset.player1;
        const player2 = document.querySelector('#score2').dataset.player2;
        let winnerHeader = document.querySelector('#winner-header');
        let modalBody = document.querySelector('#winner');
        if (score1 !== score2) {
            modalBody.innerHTML = `${score1 > score2 ? player1 : player2}!`;
            winnerHeader.innerHTML = 'The winner is...'
        } else {
            modalBody.innerHTML = 'It is a tie!';
        }
        $('#winnerModal').modal('show');
    }


    function timer(counter, gameOver) {
        return function () {
            const time = document.querySelector('#timer').dataset.time;
            counter.end = time.slice(0, 1) * 60 + parseInt(time.slice(2));
            // Get the containers
            counter.min = document.querySelector("#cd-min");
            counter.sec = document.querySelector("#cd-sec");

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

                    if (secs < 6 && mins === 0) {
                        coloringTimer();
                    }

                    // Update HTML
                    counter.min.innerHTML = mins;
                    counter.sec.innerHTML = (secs < 10 ? '0' : '') + secs;

                }, 1000);
            }
        };
    }

    function coloringTimer() {
        let timer = document.querySelector('#timer');
        timer.classList.add('red-colored');
        setTimeout(function () {
            timer.classList.remove('red-colored')
        }, 500);
    }
}


main();