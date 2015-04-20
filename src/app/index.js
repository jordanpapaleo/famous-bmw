import {core, transitions} from 'famous';
import {DomView} from '../shared/DomView';
import {GLView} from '../shared/GLView';
import {Timeline} from '../shared/Timeline';
import {Car} from './Car';
import {Title} from './Title';
import {FlipCard} from './FlipCard';
import Phrase from './PhraseService';
import UI from '../utils/UI';

const Curves   = transitions.Curves;
const Famous   = core.Famous;

class App extends DomView {
    constructor(options) {
        super(options);

        this.clock = Famous.getClock();

        this.currentImage = 0;
        this.timelineInitialized = false;

        this.baseZPos = {
            top: 99,
            bottom: 101,
            next: 99,
            shadow: 100
        };

        this.renderFlipCards();
        this.renderLogo();
        this.renderClosingText();
        this.renderShadow();
        this.initFlipBook();

        this.gl = new GLView({
            node: this.node.addChild()
        });
    }

    setProperties() {
        this.mountPoint.set(.5, .5);
        this.align.set(.5, .5);
        this.size.setAbsolute(420, 768);
    }

    render() {
        UI.setStyle(this, {
            'border': '1px solid #000000',
            'overflow': 'hidden'
        });
    }

    renderFlipCards() {
        this.flipCardA = this.flipCardFactory({
            alphaId: 'A',
            model: {
                order: 1,
                zPos: this.baseZPos.top
            }
        });

        // Flip the card to the top position
        this.flipCardA.rotation.set((180 * Math.PI) / 180);

        this.flipCardB = this.flipCardFactory({
            alphaId: 'B',
            model: {
                order: 2,
                zPos: this.baseZPos.bottom
            }
        });

        //We need to bump the image between these B and C
        this.currentImage++;

        this.flipCardC = this.flipCardFactory({
            alphaId: 'C',
            model: {
                order: 3,
                zPos: this.baseZPos.next
            }
        });
    }

    flipCardFactory(config) {
        let flipCard = new FlipCard({
            model: config.model,
            node: this.node.addChild()
        });

        flipCard.el.addClass('card-' + config.alphaId);

        this['car' + config.alphaId] =  new Car({
            node: flipCard.node.addChild(),
            tagName: 'img',
            model: {
                currentImage: this.currentImage
            }
        });

        this['title' + config.alphaId] = new Title({
            tagName: 'h1',
            node: flipCard.node.addChild(),
            model: {
                text: Phrase.getCurrentPhrase()
            }
        });

        return flipCard;
    }

    renderLogo() {
        this.logo = new DomView({
            node: this.node.addChild(),
            model: {}
        });

        this.logo.opacity.set(0);
        this.logo.size.setAbsolute(225, 225);
        this.logo.position.setZ(200);
        this.logo.el.property('z-index', 200);
        this.logo.align.set(.5, 0);
        this.logo.mountPoint.set(.5, 0);
        this.logo.origin.set(.5, .5);
        this.logo.position.setY(75);

        this.logoCircles = this.logoImageFactory([4, 5, 6, 7]);
        this.logoLetters = this.logoImageFactory([8, 9, 10]);
        this.logoQuadrants = this.logoImageFactory([0, 1, 2, 3]);
    }

    logoImageFactory(imageNumbers) {
        const _this = this;
        let imageViews = [];

        imageNumbers.forEach(function(imageNumber) {
            let image = new DomView({
                tagName: 'img',
                node: _this.logo.node.addChild(),
                model: {
                    imageNumber
                }
            });

            //image.el.attribute('src', 'assets/images/logo/' + imageNumber + '.png');
            image.el.attribute('src', 'assets/svg/logo/' + imageNumber + '.svg');
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

        this.closingText1 = this.textFactory({
            tagName: '',
            content: 'SEE HOW WE BROUGHT<br>TOMMORROW TO TODAY',
            styles: textStyles
        });

        this.closingText1.position.setY(535);
        this.closingText1.opacity.set(0);

        this.closingText2 = this.textFactory({
            tagName: '',
            content: 'HELLO FUTURE<br><strong>The all new electric BMW i3</strong>',
            styles: textStyles
        });

        this.closingText2.position.setY(600);
        this.closingText2.opacity.set(0);
    }

    textFactory(config) {
        let text =  new DomView({
            tagName: config.tagName || '',
            node: this.node.addChild()
        });

        UI.setStyle(text, config.styles);
        text.el.content(config.content);
        return text;
    }

    renderShadow() {
        this.shadowTop = new DomView({
            node: this.node.addChild()
        });

        this.shadowTop.setStyle({
            'z-index': this.baseZPos.shadow,
            'background-color': '#000000',
            'backface-visibility': 'visible'
        });

        this.shadowTop.position.setZ(this.baseZPos.shadow);
        this.shadowTop.size.setProportional(1, .5);
        this.shadowTop.mountPoint.set(0, 1);
        this.shadowTop.align.set(0, .5);
        this.shadowTop.opacity.set(0);

        this.shadowBottom = new DomView({
            node: this.node.addChild()
        });

        this.shadowBottom.setStyle({
            'z-index': this.baseZPos.shadow,
            'background-color': '#000000',
            'backface-visibility': 'visible'
        });

        this.shadowBottom.position.setZ(this.baseZPos.shadow);
        this.shadowBottom.size.setProportional(1, .5);
        this.shadowBottom.mountPoint.set(0, 0);
        this.shadowBottom.align.set(0, .5);
        this.shadowBottom.opacity.set(.33);
    }

    initFlipBook() {
        const _this = this;
        let duration = 1000; //750
        let isLastFlip = false;

        this.clock.setTimeout(flipIt, duration);

        function flipIt() {
            _this.currentImage++;

            // Determine what cards are where
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
                //The top card has 180 degree rotation
                if(card.order === 1) {
                    topCard = card;
                } else if(card.order === 2) {
                    bottomCard = card;
                } else if(card.order === 3) {
                    nextCard = card;
                }
            });

            _this.clock.setTimeout(function() {
                _this.shadowTop.opacity.set(.33, {
                    duration
                });
            }, duration / 2);

            _this.shadowBottom.opacity.set(0, {
                duration: duration / 2
            }, function() {
                _this.clock.setTimeout(function() {
                    if(!isLastFlip) {
                        _this.shadowBottom.opacity.set(.33);
                    }
                }, duration / 2);
            });

            // Flip bottomCard to top
            bottomCard.view.rotation.setX((180 * Math.PI) / 180, {
                duration,
                curve: Curves.linear
            }, function() {
                //On the last card we just want to flip the card, NOT advance or recurse flipIt
                if(!isLastFlip) {
                    _this.shadowTop.opacity.set(0);

                    nextCard.view.advance(_this.baseZPos.bottom);
                    topCard.view.advance(_this.baseZPos.next, true);
                    bottomCard.view.advance(_this.baseZPos.top);
                    topCard.car.updateImage(_this.currentImage);

                    if (Phrase.getCurrentIndex() < 12) {
                        topCard.title.update(Phrase.getCurrentPhrase());
                    } else {
                        topCard.title.opacity.set(0);

                        if (!_this.timelineInitialized) {
                            _this.initTimeline();
                        }
                    }

                    if (duration > 25) {
                        duration = duration * .80;
                    }

                    if (_this.currentImage === 35) {
                        isLastFlip = true;
                    }

                    _this.clock.setTimeout(flipIt, duration);
                } else {
                    _this.shadowBottom.opacity.set(0);
                    _this.shadowTop.opacity.set(0);
                }
            });
        }
    }

    initTimeline() {
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

            _this.timeline.registerComponent({
                component: quadrant.position,
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

            _this.timeline.registerComponent({
                component: circle.scale,
                path: scale
            });

            _this.timeline.registerComponent({
                component: circle.opacity,
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

            _this.timeline.registerComponent({
                component: letter.opacity,
                path: opacity
            });
        });
    }

    registerCar() {
        const _this = this;

        this.timeline.registerComponent({
            component: this.carA.position,
            path: [
                [this.time.start, [0, 0]],
                [this.time.car.a[0], [0, 0]],
                [this.time.car.a[1], [400, -600], Curves.outCirc],
                [this.time.car.b[0], [400, -825]],
                [this.time.car.b[1], [-50, -375], Curves.inCirc]
            ]
        });

        this.timeline.registerCallback({
            time: this.time.car.a[0],
            direction: 1,
            fn: function() {
                //FLip card A is the view that holds the animating car
                _this.flipCardA.position.setZ(102);
                _this.flipCardA.setStyle({
                    'z-index': _this.baseZPos.bottom + 1
                });
            }
        });

        this.timeline.registerCallback({
            time: this.time.car.b[0],
            direction: 1,
            fn: function() {
                _this.carA.updateImage('orange_mirrored');
                _this.carA.size.setAbsolute(550, 367);
            }
        });
    }

    registerLogo() {
        this.timeline.registerComponent({
            component: this.logo.opacity,
            path: [
                [this.time.start, 0],
                [this.time.quad.a - 1, 0],
                [this.time.quad.a, 1]
            ]
        });

        this.timeline.registerComponent({
            component: this.logo.scale,
            path: [
                [this.time.start, [1, 1, 1]],
                [this.time.logo.a[0], [1, 1, 1]],
                [this.time.logo.a[1], [.75, .75, .75], Curves.outCubic],
                [this.time.logo.a[2], [.8, .8, .8]]
            ]
        });

        this.timeline.registerComponent({
            component: this.logo.position,
            path: [
                [this.time.start, [0, 75, 0]],
                [this.time.logo.a[0], [0, 75, 0]],
                [this.time.logo.a[2], [0, 350, 0], Curves.easeIn]
            ]
        });
    }

    registerClosingText() {
        this.timeline.registerComponent({
            component: this.closingText1.opacity,
            path: [
                [this.time.start, 0],
                [this.time.closingText.a[0], 0],
                [this.time.closingText.a[1], 1],
                [this.time.closingText.a[2], 0]
            ]
        });

        this.timeline.registerComponent({
            component: this.closingText1.position,
            path: [
                [this.time.start, [0, this.closingText1.position.getY()]],
                [this.time.closingText.a[1], [0, this.closingText1.position.getY()]],
                [this.time.closingText.a[2], [0, this.closingText1.position.getY() + 100]]
            ]
        });

        this.timeline.registerComponent({
            component: this.closingText2.opacity,
            path: [
                [this.time.start, 0],
                [this.time.closingText.b[0], 0],
                [this.time.closingText.b[1], 1]
            ]
        });
    }
}

const root = core.Famous.createContext('body');

window.bmw = new App({
    node: root.addChild(),
    model: {}
});
