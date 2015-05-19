import View             from 'famous-creative/display/View';
import Timeline         from 'famous-creative/animation/Timeline';
import {FlipCard}       from './FlipCard';
import Image            from './ImageService';
import Phrase           from './PhraseService';

//Famous Components
const Curves            = FamousPlatform.transitions.Curves;
const Famous            = FamousPlatform.core.Famous;

class App extends View {
    constructor(options) {
        super(options);

        this.setMountPoint(.5, .5);
        this.setAlign(.5, .5);
        this.setSizeModeAbsolute();
        this.setAbsoluteSize(420, 768);

        this.baseZPos = {
            top: 99,
            bottom: 101,
            next: 99,
            shadow: 100
        };

        this.createDOMElement({
            properties: {
                'border': '1px solid #000000',
                'overflow': 'hidden'
            }
        });
        this.clock = Famous.getClock();

        this.renderFlipCards();
        this.initFlipBook();
    }

    renderFlipCards() {
        this.flipCards = [];
        let cardConfigs = [
            {
                alphaId: 'A',
                order: 1,
                zPos: this.baseZPos.top,
                image: Image.getCurrent(),
                letter: Phrase.getCurrentPhrase()
            },
            {
                alphaId: 'B',
                order: 2,
                zPos: this.baseZPos.bottom,
                image: Image.getCurrent(),
                letter: Phrase.getCurrentPhrase()
            },
            {
                alphaId: 'C',
                order: 3,
                zPos: this.baseZPos.next,
                image: Image.getNext(),
                letter: Phrase.getCurrentPhrase()
            }
        ];

        cardConfigs.forEach((config) => {
            this.flipCards.push(new FlipCard(this.addChild(), config));
        });

        this.flipCards[0].setRotationX((180 * Math.PI) / 180);
    }

    initFlipBook() {
        this.duration = 1000;
        setTimeout(this.flipCard.bind(this), this.duration);
        this.testI = 0;
    }

    flipCard() {
        let topCard, bottomCard, nextCard;

        // Determine where each card based on its order property
        this.flipCards.forEach(function(card) {
            switch(card.order) {
                case 1:
                    topCard = card;
                    break;
                case 2:
                    bottomCard = card;
                    break;
                case 3:
                    nextCard = card;
                    break;
            }
        });

        window.bc = bottomCard;
        window.tc = topCard;
        window.nc = nextCard;

        // The bottom card gets flipped to the top
        bottomCard.setRotationX((180 * Math.PI) / 180, {
            duration: this.duration
        }, () => {
            this.advanceCard(nextCard);
            this.advanceCard(topCard);
            this.advanceCard(bottomCard);
        });
    }

    advanceCard(card) {
        let zPos;

        if(card.order === 1) {          // Was at top, advance to next
            zPos = this.baseZPos.next;
            card.order = 3;
            card.setRotationX(0);
            card.car.advanceImage();
            card.title.updatePhrase();
        } else if(card.order === 2) {   // Was at bottom, advance to top
            zPos = this.baseZPos.top;
            card.order = 1;
        } else if(card.order === 3) {   // Was at next, advance to bottom
            zPos = this.baseZPos.bottom;
            card.order = 2;
        }

        card.setPositionZ(zPos);
        card.setDOMProperties({
            'z-index': zPos
        });
    }
}

const rootNode = FamousPlatform.core.Famous.createContext('body');
let camera = new FamousPlatform.components.Camera(rootNode);
camera.setDepth(20000);

window.app = new App(rootNode.addChild(), {});
