
(function createDeck(){

    document.getElementById("med").addEventListener('click',mediumGame);
    document.getElementById("ez").addEventListener('click',easyGame);
    document.getElementById("hrd").addEventListener('click',hardGame);
    let end,mode,shufling;

    function mediumGame(){ 
        document.getElementById("med").setAttribute('disabled','disabled');
        document.getElementById("ez").setAttribute('disabled','disabled');
        document.getElementById("hrd").setAttribute('disabled','disabled');
        let i = 1;
        while(i<=8){
            document.querySelector('.card-game').innerHTML += `
            <div class="card-memory medium" id="${i}">
            <img class="front-card" src="img/diamonds/${i}.svg" alt="${i} Of Diamonds">
            <img class="back-card" src="img/back.svg" alt="Back Face">
            </div>
            <div class="card-memory medium" id="${i}">
            <img class="front-card" src="img/diamonds/${i}.svg" alt="${i} Of Diamonds">
            <img class="back-card" src="img/back.svg" alt="Back Face">
            </div>
            `
            i++;
        }
        shufling = 16;
        end = 8;
        mode = "MEDIUM";
        main(end, mode, shufling);
    }

    function easyGame(){ 
        document.getElementById("med").setAttribute('disabled','disabled');
        document.getElementById("ez").setAttribute('disabled','disabled');
        document.getElementById("hrd").setAttribute('disabled','disabled');
        let i = 1;
        while(i<=4){
            document.querySelector('.card-game').innerHTML += `
            <div class="card-memory easy" id="${i}">
            <img class="front-card" src="img/diamonds/${i}.svg" alt="${i} Of Diamonds">
            <img class="back-card" src="img/back.svg" alt="Back Face">
            </div>
            <div class="card-memory easy" id="${i}">
            <img class="front-card" src="img/diamonds/${i}.svg" alt="${i} Of Diamonds">
            <img class="back-card" src="img/back.svg" alt="Back Face">
            </div>
            `
            i++;
        }
        shufling = 8;
        end = 4;
        mode = "EASY";
        main(end, mode, shufling);
    }

    function hardGame(){ 
        document.getElementById("med").setAttribute('disabled','disabled');
        document.getElementById("ez").setAttribute('disabled','disabled');
        document.getElementById("hrd").setAttribute('disabled','disabled');
        let i = 1;
        while(i<=12){
            document.querySelector('.card-game').innerHTML += `
            <div class="card-memory hard" id="${i}">
            <img class="front-card" src="img/diamonds/${i}.svg" alt="${i} Of Diamonds">
            <img class="back-card" src="img/back.svg" alt="Back Face">
            </div>
            <div class="card-memory hard" id="${i}">
            <img class="front-card" src="img/diamonds/${i}.svg" alt="${i} Of Diamonds">
            <img class="back-card" src="img/back.svg" alt="Back Face">
            </div>
            `
            i++;
        }
        shufling = 24;
        end = 12;
        mode = "HARD";
        main(end, mode, shufling);

    }

    function main(finish, mode, shufling){
        const cards = document.querySelectorAll('.card-memory');
        cards.forEach(card => card.addEventListener('click', flippedCard));

        let hasFlippedCard = false;
        let started = false;
        let firstCard, secondCard, time,start;
        let moves = 0;
        let counter = 0;

        function flippedCard(){
            moves++;
            if(!started) {
                timeStart();
                started = true;
            }
    
            document.querySelector('.container').innerHTML = `<h2>Moves made: ${moves}</h2>
            <h2>Time elapsed: ${timePassed()}</h2>`;
 
            this.classList.toggle('flipped');
            if(!hasFlippedCard){
                //first card
                hasFlippedCard = true;
                firstCard = this;
            } else {
                //second card
                hasFlippedCard = false;
                secondCard = this;
        
                disableAllOtherCards();
                matchChecking();
                
            }
        
        }
    
        // Checks if there is a match
        function matchChecking(){
        
            // check if there is a match
            if(firstCard.id === secondCard.id) {
                counter++;
                disableCards();
                if(counter === finish){
                    setTimeout(() => {
                        EndGame();
                    },1000);
                } 
            } else unflipFalseCards();
            setTimeout(() => {enableAllOtherCards()}, 1100);
            
        }
        
        // Disables cards so they can not be clicked
        function disableCards(){
            firstCard.removeEventListener('click', flippedCard);
            secondCard.removeEventListener('click',flippedCard);
        }
        
        function unflipFalseCards(){
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
            }, 1000);
        }
        
        function disableAllOtherCards(){
            cards.forEach(card => card.removeEventListener('click',flippedCard));
        }
        
        function enableAllOtherCards(){
            cards.forEach(card => {
                if(!card.classList.contains('flipped')){
                    card.addEventListener('click', flippedCard);
                }
            });
        }
        
        (function shuffle(){
            cards.forEach(card => {
                let randomPos = Math.floor(Math.random() * shufling);
                card.style.order = randomPos;
            });
        })();
        
        function restartGame(){
            location.reload();
        }
        
        function timeStart(){
            start = new Date();

        }
        function timePassed(){
            let present = new Date();
            time = Math.abs(present.getTime()-start.getTime());
            time = Math.ceil(time / 1000);
            
            return time;
        }
        
        function EndGame(){
            alert(`
                Congratulations you have ended the ${mode} mode!\n
                You have made ${moves} moves\n
                And you lasted ${timePassed()} seconds`);
            
        }  
        
        document.getElementById("restart").addEventListener('click', restartGame);
        }
})();



