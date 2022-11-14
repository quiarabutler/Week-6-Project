const play_btn = document.getElementById("play-button")
play_btn.addEventListener("click", playWar)

class Card {
    constructor(suit, rank, score){
       this.suit = suit
       this.rank = rank
       this.score = score
    }
}
// This is for the value of each card and where the cards will go
class Deck {
    constructor(deckLength){
        this.deckLength = deckLength
        this.cards = [] 
        this.suits = [ "Spades", "Hearts", "Clubs", "Diamonds",]
        this.ranks = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King","Ace"]
    }
  
    createDeck(){
        for (let i=0; i < this.suits.length; i++){
            for (let j=0; j < 13; j++){
                this.cards.push(new Card(this.suits[i], this.ranks[j], j+2))
            }
        }
    } 
// This function is for shuffling the cards.

    shuffleDeck(){
        for(let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp
        }
    } 
}
// I am intializing all of the components that are neccessary for correct gameplay.
let player_one_score = 0 , player_two_score = 0
let firstGame = new Deck(52)
let deck = firstGame.cards
let playerOne = new Deck(26)  
let playerTwo = new Deck(26) 
let player_one_cards = [] 
let player_two_cards = [] 
let pot = new Deck(0)
// This function is for dealing the cards amongst the players.
let divideCards = (player1, player2, deck) => {
    function assignCards(deck, player){
        for (let i=0; i < player.deckLength; i++){
            player.cards.push(deck[0])
            deck.shift()
        }
    }
    assignCards(deck, player1)
    assignCards(deck, player2)
}
// These functions are for the gameplay.
function checkForWinner(player1, player2, beginRound){
    if (player_one_score > player_two_score && player1.cards.length == 0){
        console.log(`Player 1 Score: ${player_one_score} and Player 2 Score: ${player_two_score} `)
        console.log("Player 1 wins! Click Play! to play again.")
        resetGame()
    }
    else if (player_one_score < player_two_score && player2.cards.length == 0){
        console.log(`Player 1 Score: ${player_one_score} and Player 2 Score: ${player_two_score} `)
        console.log("Player 2 wins! Click Play! to play again.")
        resetGame()
    }
    else {
        beginRound(player1, player2)
    }
}

let roundWinner = (card1, card2, player, position) => console.log(`Player 1 had ${card1[position].rank} of ${card1[position].suit}, Player 2 had ${card2[position].rank} of ${card2[position].suit}. ${player} wins! `)

function compareCard(card1, player1, card2, player2, position){ 
    if (card1[position].score && card2[position].score){
        if (card1[position].score > card2[position].score){   
            player_one_score++
            roundWinner(card1, card2, "Player 1", position)
            checkForWinner(player1, player2, playRound)
        }
        else if (card1[position].score < card2[position].score){
            player_two_score++   
            roundWinner(card1, card2, "Player 2", position)    
            checkForWinner(player1, player2, playRound)
        }
        else {
            console.log(`Player 1 had ${card1[position].rank} of ${card1[position].suit}, Player 2 had ${card2[position].rank} of ${card2[position].suit}.`)  
            checkForWinner(player1, player2, playRound)      
        }
    }
    else{
        checkForWinner(player1, player2, playRound) 
    }
}

function playRound(player1, player2){
    player_one_cards = player1.cards.splice(0,1)
    player_two_cards = player2.cards.splice(0,1)    
    compareCard(player_one_cards, player1, player_two_cards, player2, 0)
}

const resetGame = () => {
    playerOne.cards = []
    playerTwo.cards = []
    player_one_score = 0 
    player_two_score = 0
} 
// This function is for starting the game. 
function playWar(){
    firstGame.createDeck()
    firstGame.shuffleDeck()
    divideCards(playerOne, playerTwo, firstGame.cards)
    checkForWinner(playerOne, playerTwo, playRound)
}

