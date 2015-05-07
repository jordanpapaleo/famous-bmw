import View       from 'famous-creative/display/View';
import Timeline   from 'famous-creative/animation/Timeline';
import {Car}      from './Car';
import {Title}    from './Title';
import {FlipCard} from './FlipCard';
import Phrase     from './PhraseService';

const GestureHandler = FamousPlatform.components.GestureHandler;
const Curves         = FamousPlatform.transitions.Curves;

class App extends View {
    constructor(options) {
        super(options);

        this.setMountPoint(.5, .5);
        this.setAlign(.5, .5);
        this.setSizeMode(1, 1);
        this.setAbsoluteSize(420, 768);

        this.clock = Famous.getClock();
        this.currentImage = 0;
        this.timelineInitialized = false;
        this.baseZPos = {
            top: 99,
            bottom: 101,
            next: 99,
            shadow: 100
        };

        this.render();
        this.initFlipBook();
    }

    render() {
        this.createDOMElement({
            properties: {
                'border': '1px solid #000000',
                'overflow': 'hidden'
            }
        });

        this.renderFlipCards();
        this.renderLogo();
        this.renderClosingText();
        this.renderShadows();
    }

    renderFlipCards() {
        this.flipCardA = this.flipCardFactory({
            model: {
                alphaId: 'A',
                order: 1,
                zPos: this.baseZPos.top,
                image: this.currentImage,
                letter: Phrase.getCurrentPhrase()
            }
        });

        // Flip the card to the top position
        this.flipCardA.setRotationX((180 * Math.PI) / 180);

        this.flipCardB = this.flipCardFactory({
            model: {
                alphaId: 'B',
                order: 2,
                zPos: this.baseZPos.bottom,
                image: this.currentImage,
                letter: Phrase.getCurrentPhrase()
            }
        });

        // We need to bump the image between these B and C but not A and B
        // as the image side of card A is not visible at the start of the rotation
        this.currentImage++;

        this.flipCardC = this.flipCardFactory({
            model: {
                alphaId: 'C',
                order: 3,
                zPos: this.baseZPos.next,
                image: this.currentImage,
                letter: Phrase.getCurrentPhrase()
            }
        });
    }

    flipCardFactory(config) {
        let flipCard = new FlipCard({
            model: config.model,
            node: this.node.addChild()
        });

        this['car' + config.model.alphaId] =  new Car({
            node: flipCard.node.addChild(),
            tagName: 'img',
            model: {
                alphaId: config.model.alphaId,
                currentImage: config.model.image
            }
        });

        this['title' + config.model.alphaId] = new Title({
            tagName: 'h1',
            node: flipCard.node.addChild(),
            model: {
                alphaId: config.model.alphaId,
                text: config.model.letter
            }
        });

        return flipCard;
    }

    renderLogo() {
        this.logo = new View(this.node.addChild());
        this.logo.setOpacity(0);
        this.logo.setSizeMode(1, 1);
        this.logo.setAbsoluteSize(225, 225);
        this.logo.setPositionZ(200);
        this.logo.setAlign(.5, 0);
        this.logo.setMountPoint(.5, 0);
        this.logo.setOrigin(.5, .5);
        this.logo.setPositionY(75);

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

        imageNumbers.forEach(function(imageNumber) {
            let image = new View({
                node: this.logo.node.addChild(),
                model: {
                    imageNumber
                }
            }.bind(this));

            image.createDOMElement({
                tagName: 'img',
                attributes: {
                    'src': `assets/svg/logo/${imageNumber}.svg`
                }
            });

            imageViews.push(image);
        });

        return imageViews;
    }

    renderClosingText() {
        const textStyles = {
            'text-align': 'center',
            'font-size': '26px',
            'line-height': '1',
            'z-index': '200'
        };

        //CLOSING TEXT 1
        this.closingText1 = new View(this.node.addChild());
        this.closingText1.setOpacity(0);
        this.closingText1.setPositionY(535);

        this.closingText1.createDOMElement({
            tagName: 'div',
            styles: textStyles,
            content: 'SEE HOW WE BROUGHT<br>TOMMORROW TO TODAY'
        });

        //CLOSING TEXT 2
        this.closingText2 = new View(this.node.addChild());
        this.closingText2.setOpacity(0);
        this.closingText2.setPositionY(600);

        this.closingText2.createDOMElement({
            tagName: 'div',
            styles: textStyles,
            content: 'HELLO FUTURE<br><strong>The all new electric BMW i3</strong>'
        });
    }

    renderShadows() {
        //SHADOW TOP
        this.shadowTop = new View(this.node.addChild());
        this.shadowTop.setMountPoint(0, 0);
        this.shadowTop.setAlign(0, 0);
        this.shadowTop.setOpacity(0);
        this.shadowTop.setSizeMode(0, 0);
        this.shadowTop.setPositionalSize(1, .5);
        this.shadowTop.setPositionZ(this.baseZPos.shadow);

        this.shadowTop.createDOMElement({
            tagName: 'div',
            properties: {
                'z-index': this.baseZPos.shadow,
                'background-color': '#000000',
                'backface-visibility': 'visible'
            },
            classes: ['shadow-top']
        });

        //SHADOW BOTTOM
        this.shadowBottom = new View(this.node.addChild());
        this.shadowBottom.setMountPoint(0, 0);
        this.shadowBottom.setAlign(0, .5);
        this.shadowBottom.setOpacity(.33);
        this.shadowTop.setSizeMode(0, 0);
        this.shadowTop.setPositionalSize(1, .5);
        this.shadowBottom.setPositionZ(this.baseZPos.shadow);

        this.shadowBottom.createDOMElement({
            tagName: 'div',
            properties: {
                'z-index': this.baseZPos.shadow,
                'background-color': '#000000',
                'backface-visibility': 'visible'
            },
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

    //TODO  Do some sort of math to control the duration of the timeline
    // so it does not finish early when timings are adjusted in the flip.

    initFlipBook2() {
        const _this = this;
        let duration = 750;
        let isLastFlip = false;
        let isTitleComplete = false;

        const cards = [{
            view: _this.flipCardA,
            car: _this.carA,
            title: _this.titleA
        }, {
            view: _this.flipCardB,
            car: _this.carB,
            title: _this.titleB
        }, {
            view: _this.flipCardC,
            car: _this.carC,
            title: _this.titleC
        }];

        this.clock.setTimeout(startCardSequence, duration);

        function startCardSequence() {
            let topCard = {}, bottomCard = {}, nextCard = {};

            cards.forEach(function(card) {
                switch(card.view.getOrder()) {
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

            applyShadows();
            flipCard(topCard, bottomCard, nextCard);

            //Timeout to allow for the card to flip
            _this.clock.setTimeout(function() {
                if (duration > 50) {
                    duration = duration * .8;
                }

                if(!_this.timelineInitialized && isTitleComplete) {
                    _this.registerTimelinePaths();
                }

                if (_this.currentImage === 35) {
                    isLastFlip = true;
                }

                _this.clock.setTimeout(startCardSequence, duration);
            }, duration);
        }

        function flipCard(topCard, bottomCard, nextCard) {
            bottomCard.view.setRotationX((180 * Math.PI) / 180, {
                duration,
                curve: Curves.linear
            }, function() {
                nextCard.view.advance(_this.baseZPos.bottom);
                topCard.view.advance(_this.baseZPos.next);
                bottomCard.view.advance(_this.baseZPos.top);

                _this.currentImage++;
                updateNextCard(topCard);
            });
        }

        function applyShadows() {
            if(!isTitleComplete) {
                _this.shadowTop.node.show();
                _this.shadowBottom.node.show();
            }

            _this.clock.setTimeout(function() {
                _this.shadowTop.setOpacity(.33, {
                    duration
                });
            }, duration / 2);

            _this.shadowBottom.setOpacity(0, {
                duration: duration / 2
            }, function() {
                _this.clock.setTimeout(function() {
                    if(!isLastFlip) {
                        _this.shadowBottom.setOpacity(.33);
                    }
                }, duration / 2);
            });

            if(isLastFlip) {
                _this.shadowBottom.node.hide();
                _this.shadowTop.node.hide();
            }
        }

        function updateNextCard(card) {
            card.node.rotation.setX(0);
            card.car.updateImage(_this.currentImage);

            if (Phrase.getCurrentIndex() < 12) {
                card.title.updatePhrase(Phrase.getCurrentPhrase());
            } else {
                isTitleComplete = true;
            }
        }
    }

    initFlipBook() {
        const _this = this;
        let duration = 750;
        let isLastFlip = false;
        let isBlar = false;

        this.clock.setTimeout(flipIt, duration);

        function flipIt() {
            /* In order to advance cards the app needs to determine card position
               - Top Card is the card showing the Words
               - Bottom Card is the card showing the car image
               - Next Card is the card in queue to show the car image
            */
            let topCard = {}, bottomCard = {}, nextCard = {};

            let cards = [{
                view: _this.flipCardA,
                order: _this.flipCardA.getOrder(),
                car: _this.carA,
                title: _this.titleA
            }, {
                view: _this.flipCardB,
                order: _this.flipCardB.getOrder(),
                car: _this.carB,
                title: _this.titleB
            }, {
                view: _this.flipCardC,
                order: _this.flipCardC.getOrder(),
                car: _this.carC,
                title: _this.titleC
            }];

            cards.forEach(function(card) {
                if(card.order === 1) {
                    topCard = card;
                } else if(card.order === 2) {
                    bottomCard = card;
                } else if(card.order === 3) {
                    nextCard = card;
                }
            });

            if(!isBlar) {
                _this.shadowTop.node.show();
                _this.shadowBottom.node.show();
            }

            _this.clock.setTimeout(function() {
                _this.shadowTop.setOpacity(.33, {
                    duration
                });
            }, duration / 2);

            _this.shadowBottom.setOpacity(0, {
                duration: duration / 2
            }, function() {
                _this.clock.setTimeout(function() {
                    if(!isLastFlip) {
                        _this.shadowBottom.setOpacity(.33);
                    }
                }, duration / 2);
            });

            // Flip bottomCard to top
            bottomCard.view.rotation.setX((180 * Math.PI) / 180, {
                duration,
                curve: Curves.linear
            }, function() {
                //On the last card, after the flip we do NOT want to advance the cards or recurse flipIt()
                if(isLastFlip) {
                    _this.shadowBottom.node.hide();
                    _this.shadowTop.node.hide();
                    return;
                }
//debugger;
                _this.shadowTop.node.hide();
                _this.shadowBottom.node.hide();
                _this.shadowTop.setOpacity(0);

                nextCard.view.advance(_this.baseZPos.bottom);
                topCard.view.advance(_this.baseZPos.next, true);
                bottomCard.view.advance(_this.baseZPos.top);

                _this.currentImage++;
                topCard.car.updateImage(_this.currentImage);

                if (Phrase.getCurrentIndex() < 12) {
                    topCard.title.updatePhrase(Phrase.getCurrentPhrase());
                } else {
                    topCard.title.node.hide();
                    _this.shadowTop.setOpacity(0);
                    _this.shadowTop.node.hide(); //TODO Not sure if I like this or not

                    if(!_this.timelineInitialized) {
                        _this.registerTimelinePaths();
                    }
                }

                if (duration > 25) {
                    duration = duration * .8;
                }

                if (_this.currentImage === 35) {
                    isLastFlip = true;
                }

                _this.clock.setTimeout(flipIt, duration);
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

        this.registerLogoQuadrants();
        this.registerLogoCircles();
        this.registerLogoLetters();
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

            switch(quadrant.model.imageNumber) {
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

            circle.origin.set(.5, .5);

            switch(circle.model.imageNumber) {
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

            switch (letter.model.imageNumber) {
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
                    this.carA.setSizeMode(1, 1);
                    this.carA.setAbsolutePosition(550, 367);
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

const root = core.Famous.createContext('body');
let camera = new FamousPlatform.components.Camera(rootNode);
camera.setDepth(20000);

window.app = new App({
    node: root.addChild(),
    model: {}
});
