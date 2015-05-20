import View             from 'famous-creative/display/View';
import Timeline         from 'famous-creative/animation/Timeline';

import {FlipCard}       from './FlipCard';
import Image            from './ImageService';
import Phrase           from './PhraseService';

import {Logo}           from './Logo';

//Famous Components
const Curves            = FamousPlatform.transitions.Curves;
const Famous            = FamousPlatform.core.Famous;
const PointLight = FamousPlatform.webglRenderables.PointLight;
const Color = FamousPlatform.utilities.Color;
const AmbientLight = FamousPlatform.webglRenderables.AmbientLight;

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
        this.renderShadows();
        this.renderClosingText();
        this.renderSky();

        this.logo = new Logo(this.addChild());
        this.pointLightA = new View(this.node.addChild());
        this.pointLightA.pointLightA = new PointLight(this.pointLightA.addChild());
        this.pointLightA.pointLightA.setColor(new Color('#eeeeee'));
        this.pointLightA.setPosition(500, -500, 4000);

        this.pointLightB = new View(this.node.addChild());
        this.pointLightB.pointLight = new PointLight(this.pointLightB.addChild());
        this.pointLightB.pointLight.setColor(new Color('#aaaaaa'));
        this.pointLightB.setPosition(-100, -3000, -4000);

        this.ambientLight = new View(this.node.addChild());
        this.ambientLight.ambientLight = new AmbientLight(this.ambientLight.addChild());
        this.ambientLight.ambientLight.setColor(new Color('#111111'));


        // this.initFlipBook();
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

    renderShadows() {
        const properties = {
            'z-index': this.baseZPos.shadow,
            'background-color': '#000000',
            'backface-visibility': 'visible'
        };

        //SHADOW TOP
        this.shadowTop = new View(this.addChild());

        this.shadowTop.setAlign(0, 0);
        this.shadowTop.setMountPoint(0, 0);
        this.shadowTop.setOpacity(0);

        this.shadowTop.setSizeModeRelative();
        this.shadowTop.setProportionalSize(1, .5);
        //this.shadowTop.setSizeModeAbsolute();
        //this.shadowTop.setAbsoluteSize(420, 384);
        this.shadowTop.setPositionZ(this.baseZPos.shadow);
        this.shadowTop.createDOMElement({
            properties,
            tagName: 'div',
            classes: ['shadow-top']
        });

        //SHADOW BOTTOM
        this.shadowBottom = new View(this.addChild());

        this.shadowBottom.setAlign(0, .5);
        this.shadowBottom.setMountPoint(0, 0);
        this.shadowBottom.setOpacity(.33);

        //TODO put this back once the size issue is resolved
        //this.shadowTop.setSizeModeRelative();
        //this.shadowTop.setProportionalSize(1, .5);
        this.shadowBottom.setSizeModeAbsolute();
        this.shadowBottom.setAbsoluteSize(420, 384);

        this.shadowBottom.setPositionZ(this.baseZPos.shadow);

        this.shadowBottom.createDOMElement({
            properties,
            tagName: 'div',
            classes: ['shadow-bottom']
        });
    }

    renderClosingText() {
        const properties = {
            'text-align': 'center',
                'font-size': '26px',
                'line-height': '1',
                'z-index': '200'
        };

        //CLOSING TEXT 1
        this.closingText1 = new View(this.addChild());
        this.closingText1.setOpacity(0);
        this.closingText1.setPositionY(535);
        this.closingText1.setPositionZ(200);

        this.closingText1.createDOMElement({
            properties: {
                'text-align': 'center',
                'font-size': '26px',
                'line-height': '1',
                'z-index': '200'
            },
            tagName: 'div',
            content: 'SEE HOW WE BROUGHT<br>TOMMORROW TO TODAY'
        });

        //CLOSING TEXT 2
        this.closingText2 = new View(this.addChild());
        this.closingText2.setOpacity(0);
        this.closingText2.setPositionY(600);
        this.closingText2.setPositionZ(200);

        this.closingText2.createDOMElement({
            properties: {
                'text-align': 'center',
                'font-size': '26px',
                'line-height': '1',
                'z-index': '200',
                'color': 'rgb(255,255,255)'
            },
            tagName: 'div',
            content: 'HELLO FUTURE<br><strong>The all new electric BMW i3</strong>'
        });
    }

    renderSky() {
        this.sky = new View(this.addChild());
        this.sky.createDOMElement({
            properties: {
                'background-color': 'rgb(255, 255, 255)',
                'z-index': -200
            },
            classes: ['background-sky']
        });

        this.sky.setSizeModeRelative();
        this.sky.setProportionalSize(1, 1);
        this.sky.setPositionZ(-200);
    }

    initFlipBook() {
        this.duration = 750;
        this.clock.setTimeout(this.flipCard.bind(this), 2000);
        this.flipCount = 0;
        this.timelineInitialized = false;
    }

    flipCard() {
        let topCard, bottomCard, nextCard;
        let flipDuration = this.duration;
        this.flipCount++;

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

        // This is to get rid of the phantom image seen at high speeds in the flip animation
        if(this.duration < 50) {
            flipDuration = 0;
            this.shadowBottom.hide();
            this.shadowTop.hide();
        } else {
            // Each shadow is only active for half the time of the card flip
            let shadowDuration = this.duration / 2;
            // Fade out bottom shadow for the first half of the flip animation
            this.shadowBottom.haltOpacity();
            this.shadowBottom.setOpacity(.33, { duration: 0}, () => {
                this.shadowBottom.setOpacity(0, {
                    duration: shadowDuration
                }, () => {
                    // Fade in top shadow for the second half of the flip animation
                    this.shadowTop.haltOpacity();
                    this.shadowTop.setOpacity(.33, {
                        duration: shadowDuration
                    });
                });
            });
        }

        // The bottom card gets flipped to the top
        bottomCard.setRotationX((180 * Math.PI) / 180, {
            duration: flipDuration
        }, () => {
            if(this.duration > 50) {
                this.duration *= .8;
            }

            if(this.flipCount === 12 && !this.timelineInitialized) {
                this.registerTimelinePaths();
            }

            if(this.flipCount < 35) {
                this.shadowTop.haltOpacity();
                this.shadowTop.setOpacity(0, {duration: 0}, () => {
                    this.advanceCard(nextCard);
                    this.advanceCard(topCard);
                    this.advanceCard(bottomCard);
                    this.clock.setTimeout(this.flipCard.bind(this), this.duration);
                });
            }
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

    registerTimelinePaths() {
        this.timelineInitialized = true;
        this.timeline = new Timeline({ timescale: 1 });

        this.time = {};
        this.time.start = 0;
        this.time.quad = {
            duration: 300,
            a: 250,
            b: 400,
            c: 550,
            d: 700
        };

        this.time.circles = {
            a: [700, 1000, 1200],
            b: [1100, 1400, 1700],
            c: [1100, 1400, 1700],
            d: [1400, 1800]
        };

        this.time.letters = {
            a: [1800, 2200],
            b: [2100, 2500],
            c: [2400, 2800]
        };

        this.time.car = {
            a: [3000, 4000],
            b: [5000, 6000]
        };

        this.time.logo = {
            a: [4000, 4250, 4500]
        };

        this.time.closingText = {
            a: [3100, 4250, 4900],
            b: [5000, 5500]
        };

        this.time.end   = 7500;  // Finis

        this.registerCar();
        this.registerClosingText();
        this.registerSky();
        this.registerFlipCard();

        this.timeline.set(this.time.end, { duration: this.time.end });
    }

    registerFlipCard() {
        this.timeline.registerPath({
            handler: (val) => {
                if(val >= this.time.car.b[0]) {
                    this.flipCards[0].setDOMProperties({
                        'background-color': 'rgba(0, 0, 0, 0)'
                    });
                }
            },
            path: [
                [0, 0],
                [this.time.end, this.time.end]
            ]
        })
    }

    registerCar() {
        let lastCard = this.flipCards[0];

        this.timeline.registerPath({
            handler: (val) => {
                lastCard.car.setPosition(...val);
            },
            path: [
                [this.time.start, [0, 0]],
                [this.time.car.a[0], [0, 0]],
                [this.time.car.a[1], [400, -600], Curves.outCirc],
                [this.time.car.b[0], [400, -825]],
                [this.time.car.b[1], [0, -375], Curves.inCirc]
            ]
        });

        this.timeline.registerPath({
            handler: (time) => {
                if(!this.hasOwnProperty('hasUpdatedImage')) {
                    this.hasUpdatedImage = false;
                }

                if(time >= this.time.car.b[0]) {
                    lastCard.car.updateImage('orange_mirrored');
                    lastCard.car.setScale(1, 1);
                    lastCard.car.setSizeModeAbsolute();
                    lastCard.car.setAbsoluteSize(550, 367);
                }
            },
            path: [
                [0, 0],
                [this.time.end, this.time.end]
            ]
        });
    }

    registerSky() {
        this.timeline.registerPath({
            handler: (val) => {
                this.sky.setDOMProperties({
                    'background-color': 'rgb(' + Math.floor(val[0]) + ', ' + Math.floor(val[1]) + ', ' + Math.floor(val[2]) + ')'
                })
            },
            path: [
                [this.time.car.b[0] + 0,    [255, 255, 255]],
                [this.time.car.b[0] + 50,  [255, 248, 224]],
                [this.time.car.b[0] + 100,  [255, 213, 78]],
                [this.time.car.b[0] + 150,  [255, 154, 0]],
                [this.time.car.b[0] + 200,  [229, 95,  21]],
                [this.time.car.b[0] + 250,  [205, 41,  103]],
                [this.time.car.b[1], [0, 0, 0]]
            ]
        })
    }

    registerClosingText() {
        //Closing text 1
        this.timeline.registerPath({
            handler: (val) => {
                this.closingText1.setOpacity(val);
            },
            path: [
                [this.time.start, 0],
                [this.time.closingText.a[0], 0],
                [this.time.closingText.a[1], 1],
                [this.time.closingText.a[2], 0]
            ]
        });

        let ypos = this.closingText1.position.getY();
        this.timeline.registerPath({
            handler: (val) => {
                this.closingText1.setPosition(...val)
            },
            path: [[this.time.start, [0, ypos]],
                [this.time.closingText.a[1], [0, ypos]],
                [this.time.closingText.a[2], [0, ypos + 100]]]
        });

        //Closing text 2
        this.timeline.registerPath({
            handler: (val) => {
                this.closingText2.setOpacity(val);
            },
            path: [
                [this.time.start, 0],
                [this.time.closingText.b[0], 0],
                [this.time.closingText.b[1], 1]
            ]
        });
    }
}

const rootNode = FamousPlatform.core.Famous.createContext('body');
let camera = new FamousPlatform.components.Camera(rootNode);
// camera.setDepth(20000);
camera.set(FamousPlatform.components.Camera.PINHOLE_PROJECTION, 1000);

window.app = new App(rootNode.addChild(), {});
