function main() {

    let score1 = 0;
    let score2 = 0;

    let counter = {};
    window.addEventListener("load", function () {
        const time = document.getElementById('time').dataset.time;
        console.log(typeof (time))
        counter.end = time.slice(0, 2) * 60 + parseInt(time.slice(3));
        console.log(counter.end)
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
                if (secs.toString().length == 1) {
                    counter.sec.innerHTML = `0${secs}`;
                } else {
                    counter.sec.innerHTML = secs;
                }
            }, 1000);
        }
    });


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
                document.querySelector('#score1').classList.add("match", "bg-success");
                setTimeout(function () {
                    document.querySelector('#score1').classList.remove("match", "bg-success");
                    getCards();
                }, 200);
            } else {
                score1--;
                document.querySelector('#score1').classList.add("dismatch", "bg-danger");
                setTimeout(function () {
                    document.querySelector('#score1').classList.remove("dismatch", "bg-danger");
                }, 200);
            }
            document.querySelector('#score1').innerHTML = `${score1}`;
        }
        if (player_2_keys.includes(keyPressed)) {
            let card = document.querySelector(`#${keyPressed}`);
            if (middleCard.getAttribute('src') == card.getAttribute('src')) {
                score2++;
                document.querySelector('#score2').classList.add("match", "bg-success");
                setTimeout(function () {
                    document.querySelector('#score2').classList.remove("match", "bg-success");
                    getCards();
                }, 200);
            } else {
                score2--;
                document.querySelector('#score2').classList.add("dismatch", "bg-danger");
                setTimeout(function () {
                    document.querySelector('#score2').classList.remove("dismatch","bg-danger" );
                }, 200);
            }
            document.querySelector('#score2').innerHTML = `${score2}`;
        }
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