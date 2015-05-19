import View             from 'famous-creative/display/View';
import Timeline         from 'famous-creative/animation/Timeline';
import {FlipCard}       from './FlipCard';
import Image            from './ImageService';
import Phrase           from './PhraseService';

//Famous Components
const GestureHandler    = FamousPlatform.components.GestureHandler;
const Curves            = FamousPlatform.transitions.Curves;
const Famous            = FamousPlatform.core.Famous;

class App extends View {
    constructor(options) {
        super(options);

        this.setMountPoint(.5, .5);
        this.setAlign(.5, .5);
        this.setSizeModeAbsolute();
        this.setAbsoluteSize(420, 768);
        this.clock = Famous.getClock();
        this.timelineInitialized = false;
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

        this.renderFlipCards();
        //this.renderLogo();
        this.renderClosingText();
        this.renderShadows();

        this.initFlipBook();
    }

    renderFlipCards() {
        this.flipCardA = new FlipCard(this.addChild(), {
            model: {
                alphaId: 'A',
                order: 1,
                zPos: this.baseZPos.top,
                image: Image.getCurrent(),
                letter: Phrase.getCurrentPhrase()
            }
        });

        this.flipCardB = new FlipCard(this.addChild(), {
            model: {
                alphaId: 'B',
                order: 2,
                zPos: this.baseZPos.bottom,
                image: Image.getCurrent(),
                letter: Phrase.getCurrentPhrase()
            }
        });

        this.flipCardC = new FlipCard(this.addChild(), {
            model: {
                alphaId: 'C',
                order: 3,
                zPos: this.baseZPos.next,
                image: Image.getNext(),
                letter: Phrase.getCurrentPhrase()
            }
        });

        // Flip the card to the top position
        this.flipCardA.setRotationX((180 * Math.PI) / 180);
    }

    /*renderLogo() {
        this.logo = new View(this.addChild());
        this.logo.setAlign(.5, 0);
        this.logo.setMountPoint(.5, 0);
        this.logo.setOrigin(.5, .5);
        this.logo.setPositionY(75);

        this.logo.setOpacity(0);
        this.logo.setSizeModeAbsolute();
        this.logo.setAbsoluteSize(225, 225);
        this.logo.setPositionZ(200);

        this.createDOMElement({
            properties: {
                'z-index': 200
            }
        });

        this.logoCircles = this.logoImageFactory([4, 5, 6, 7]);
        this.logoLetters = this.logoImageFactory([8, 9, 10]);
        this.logoQuadrants = this.logoImageFactory([0, 1, 2, 3]);
    }

    logoImageFactory(imageNumbers) {
        let imageViews = [];

        imageNumbers.forEach((imageNumber) => {
            let image = new View(this.logo.addChild(), {
                model: {
                    imageNumber
                }
            });

            image.createDOMElement({
                tagName: 'img',
                attributes: {
                    'src': `assets/svg/logo/${imageNumber}.svg`
                }
            });

            imageViews.push(image);
        });

        return imageViews;
    }*/

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

        this.closingText1.createDOMElement({
            properties,
            tagName: 'div',
            content: 'SEE HOW WE BROUGHT<br>TOMMORROW TO TODAY'
        });

        //CLOSING TEXT 2
        this.closingText2 = new View(this.addChild());
        this.closingText2.setOpacity(0);
        this.closingText2.setPositionY(600);

        this.closingText2.createDOMElement({
            properties,
            tagName: 'div',
            content: 'HELLO FUTURE<br><strong>The all new electric BMW i3</strong>'
        });
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

        this.shadowTop.setSizeModeRelative();
        this.shadowTop.setProportionalSize(1, .5);
        this.shadowBottom.setPositionZ(this.baseZPos.shadow);

        this.shadowBottom.createDOMElement({
            properties,
            tagName: 'div',
            classes: ['shadow-bottom']
        });
    }

    /*
    * Sort Cards to determine their current position
    *   -
    * Flip Bottom Card to the top, hiding the Top Card, revealing the Next Card
    *   - Fade bottom shadow out at 1/2 the animation duration
    *   - Fade top shadow in at 1/2 the animation duration
    *   - Set top shadow opacity to 0
    *   CARDS HAVE MOVED
    * Advance all cards to their next position
    *   - Next Card needs to become the Bottom Card
    *   - Top Card needs to become the Next Card
    *       - Update car image
    *       - Update phrase
    *   - Bottom Card needs to become the Top Card
    * */

    //TODO  Do some sort of math to control the duration of the time line
    // so it does not finish early when timings are adjusted in the flip.

    initFlipBook() {
        let duration = 2000;
        let isLastFlip = false;
        let isTitleComplete = false;

        const cards = [this.flipCardA, this.flipCardB, this.flipCardC];

        this.clock.setTimeout(startCardSequence.bind(this), duration);

        function startCardSequence() {
            let topCard, bottomCard, nextCard;

            // Determine where each card based on its order property
            cards.forEach(function(card) {
                switch(card.getOrder()) {
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

            // Each shadow is only active for half the time of the card flip
            let shadowDuration = duration / 2;

            // Fade out bottom shadow for the first half of the flip animation
            this.shadowBottom.setOpacity(0, {
                duration: shadowDuration
            }, () => {
                // Fade in top shadow for the second half of the flip animation
                this.shadowTop.setOpacity(.33, {
                    duration: shadowDuration
                });
            });

            bottomCard.setRotationX((180 * Math.PI) / 180, {
                duration
            }, () => {
                this.shadowTop.setOpacity(0);
                nextCard.advance(this.baseZPos.bottom);
                topCard.advance(this.baseZPos.next, true);
                bottomCard.advance(this.baseZPos.top);
                this.shadowBottom.setOpacity(.33);

                //Speed up the flip
                if (duration > 100) {
                    //duration = duration * .8;
                }

                // Once the title has finished showing, start the logo
                if (!this.timelineInitialized && isTitleComplete) {
                    this.registerTimelinePaths();
                }

                // Once the last card has flipped
                if (Image.getCurrent() === Image.getMax()) {
                    isLastFlip = true;
                } else {
                    this.clock.setTimeout(startCardSequence.bind(this), duration);
                }

                debugger;
            });
        }
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
            a: [3100, 4250, 4500],
            b: [4400, 4600]
        };

        this.time.end   = 7500;  // Finis

        //this.registerLogoQuadrants();
        //this.registerLogoCircles();
        //this.registerLogoLetters();
        this.registerCar();
        this.registerLogo();
        this.registerClosingText();

        this.timeline.set(this.time.end, { duration: this.time.end });
    }

    registerLogoQuadrants() {
        const _this = this;

        this.logoQuadrants.forEach(function(quadrant, i) {
            let x, y, startTime;
            const offset = 400;

            switch(quadrant.options.model.imageNumber) {
                case 0:  // top left
                    startTime = _this.time.quad.a;
                    x = -offset;
                    y = -offset;
                    break;
                case 1: // bottom right
                    startTime = _this.time.quad.b;
                    x = offset;
                    y = offset;
                    break;
                case 2: // top right
                    startTime = _this.time.quad.c;
                    x = offset;
                    y = -offset;
                    break;
                case 3: // bottom left
                    startTime = _this.time.quad.d;
                    x = -offset;
                    y = offset;
                    break;
                default:
                    x = 0;
                    y = 0;
                    break;
            }

            let endTime = startTime + _this.time.quad.duration;

            _this.timeline.registerPath({
                handler: (val) => {
                    quadrant.setPosition(...val);
                },
                path: [
                    [0, [x, y]],
                    [startTime, [x, y]],
                    [endTime, [0, 0], Curves.outQuad]
                ]
            });
        });
    }

    registerLogoCircles() {
        const _this = this;

        this.logoCircles.forEach(function(circle) {
            let scale, opacity;

            circle.setOrigin(.5, .5);

            switch(circle.options.model.imageNumber) {
                case 4: // Large black ring
                    scale = [
                        [_this.time.start, [.25, .25]],
                        [_this.time.circles.a[0], [.25, .25]],
                        [_this.time.circles.a[1], [1.1, 1.1]],
                        [_this.time.circles.a[2], [1, 1]]
                    ];
                    opacity = [
                        [_this.time.start, 0],
                        [_this.time.circles.a[0], 0],
                        [_this.time.circles.a[2], 1]
                    ];
                    break;
                case 5: // black outline
                    scale = [
                        [_this.time.start, [1.25, 1.25]],
                        [_this.time.circles.b[0], [1.25, 1.25]],
                        [_this.time.circles.b[1], [.8, .8]],
                        [_this.time.circles.b[2], [1, 1]]
                    ];
                    opacity = [
                        [_this.time.start, 0],
                        [_this.time.circles.b[0] - 50, 0],
                        [_this.time.circles.b[0], .5],
                        [_this.time.circles.b[2], 1]
                    ];
                    break;
                case 6: // gradient outline
                    scale = [
                        [_this.time.start, [.25, .25]],
                        [_this.time.circles.c[0], [.25, .25]],
                        [_this.time.circles.c[1], [1.2, 1.2]],
                        [_this.time.circles.c[2], [1, 1]]
                    ];
                    opacity = [
                        [_this.time.start, 0],
                        [_this.time.circles.c[0] - 50, 0],
                        [_this.time.circles.c[0], .5],
                        [_this.time.circles.c[2], 1]
                    ];
                    break;
                case 7: //Grey center circle
                    scale = [
                        [_this.time.start, [.5, .5]],
                        [_this.time.circles.d[0], [.5, .5]],
                        [_this.time.circles.d[1], [1, 1]]
                    ];
                    opacity = [
                        [_this.time.start, 0],
                        [_this.time.circles.d[0], 0],
                        [_this.time.circles.d[1], 1]
                    ];
                    break;
                default:
                    scale = [];
                    opacity = [];
                    break;
            }

            _this.timeline.registerPath({
                handler: (val) => {
                    circle.setScale(...val);
                },
                path: scale
            });

            _this.timeline.registerPath({
                handler: (val) => {
                    circle.setOpacity(...val);
                },
                path: opacity
            });
        });
    }

    registerLogoLetters() {
        const _this = this;
        this.logoLetters.forEach(function(letter) {
            let opacity;

            switch (letter.options.model.imageNumber) {
                case 8: // Large black ring
                    opacity = [
                        [_this.time.start, 0],
                        [_this.time.letters.a[0], 0],
                        [_this.time.letters.a[1], 1]
                    ];
                    break;
                case 9: // black outline
                    opacity = [
                        [_this.time.start, 0],
                        [_this.time.letters.b[0], 0],
                        [_this.time.letters.b[1], 1]
                    ];
                    break;
                case 10: // gradient outline
                    opacity = [
                        [_this.time.start, 0],
                        [_this.time.letters.c[0], 0],
                        [_this.time.letters.c[1], 1]
                    ];
                    break;
                default:
                    opacity = [];
                    break;
            }

            _this.timeline.registerPath({
                handler: (val) => {
                    letter.setOpacity(...val);
                },
                path: opacity
            });
        });
    }

    registerCar() {
        const _this = this;

        this.timeline.registerPath({
            handler: (val) => {
                this.carA.setPosition(...val);
            },
            path: [
                [this.time.start, [0, 0]],
                [this.time.car.a[0], [0, 0]],
                [this.time.car.a[1], [400, -600], Curves.outCirc],
                [this.time.car.b[0], [400, -825]],
                [this.time.car.b[1], [-50, -375], Curves.inCirc]
            ]
        });

        this.timeline.registerPath({
            handler: (time) => {
                if(time >= this.time.car.a[0]) {
                    //Flip card A is the view that holds the animating car
                    this.flipCardA.setPositionZ(102);
                    this.flipCardA.setDOMProperties({
                        'z-index': this.baseZPos.bottom + 1
                    });
                }
            },
            path: [
                [0, 0],
                [this.time.end, this.time.end]
            ]
        });

        this.timeline.registerPath({
            handler: (time) => {
                if(time >= this.time.car.b[0]) {
                    this.carA.updateImage('orange_mirrored');
                    this.carA.setSizeModeAbsolute();
                    this.carA.setAbsoluteSize(550, 367);
                }
            },
            path: [
                [0, 0],
                [this.time.end, this.time.end]
            ]
        });
    }

    registerLogo() {
        this.timeline.registerPath({
            handler: (val) => {
                this.logo.setOpacity(...val);
            },
            path: [
                [this.time.start, 0],
                [this.time.quad.a - 1, 0],
                [this.time.quad.a, 1]
            ]
        });

        this.timeline.registerPath({
            handler: (val) => {
                this.logo.setScale(...val);
            },
            path: [
                [this.time.start, [1, 1, 1]],
                [this.time.logo.a[0], [1, 1, 1]],
                [this.time.logo.a[1], [.75, .75, .75], Curves.outCubic],
                [this.time.logo.a[2], [.8, .8, .8]]
            ]
        });

        this.timeline.registerPath({
            handler: (val) => {
                this.logo.setPosition(...val);
            },
            path: [
                [this.time.start, [0, 75, 0]],
                [this.time.logo.a[0], [0, 75, 0]],
                [this.time.logo.a[2], [0, 350, 0], Curves.easeIn]
            ]
        });
    }

    registerClosingText() {
        this.timeline.registerPath({
            handler: (val) => {
                this.closingText1.setOpacity(...val);
            },
            path: [
                [this.time.start, 0],
                [this.time.closingText.a[0], 0],
                [this.time.closingText.a[1], 1],
                [this.time.closingText.a[2], 0]
            ]
        });

        this.timeline.registerPath({
            handler: (val) => {
                this.closingText1.setPosition(...val)
            },
            path: [[this.time.start, [0, this.closingText1.position.getY()]],
                [this.time.closingText.a[1], [0, this.closingText1.position.getY()]],
                [this.time.closingText.a[2], [0, this.closingText1.position.getY() + 100]]]
        });

        this.timeline.registerPath({
            handler: (val) => {
                this.closingText2.setOpacity(...val);
            },
            path: [
                [this.time.start, 0],
                [this.time.closingText.b[0], 0],
                [this.time.closingText.b[1], 1]
            ]
        });
    }
}

const rootNode   = FamousPlatform.core.Famous.createContext('body');
let camera = new FamousPlatform.components.Camera(rootNode);
camera.setDepth(20000);

window.app = new App(rootNode.addChild(), {});

