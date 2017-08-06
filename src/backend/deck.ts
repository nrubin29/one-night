import Card from "../common/card";
import shuffle = require("shuffle-array");

class Deck {
    index = 0;

    constructor(public cards: Card[]) {
        shuffle(this.cards);
    }

    dealCard(): Card {
        return this.cards[this.index++];
    }
}

export = Deck;