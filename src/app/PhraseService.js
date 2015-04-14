var Phrase = {
    _phrase: 'Hello Future',
    _currentIndex: 0,
    _currentPhrase: ''
};

Phrase._letters = Phrase._phrase.split('');

Phrase._getNextLetter = function() {
    if(this._letters[this._currentIndex]) {
        let currentLetter = this._letters[this._currentIndex];
        this._currentIndex++;
        return currentLetter;
    } else {
        return false;
    }
};

Phrase.getCurrentIndex = function() {
    return this._currentIndex;
};

Phrase.getCurrentPhrase = function() {
    let letter = this._getNextLetter();
    if(letter) {
        if(letter === ' ') {
            this._currentPhrase += '<br>';
            letter = this._getNextLetter()
        }

        this._currentPhrase += letter;
    }

    return this._currentPhrase;
};

export default Phrase;
