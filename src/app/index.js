import {core, domRenderables, components, transitions} from 'famous';
import {View} from '../shared/View';
import {DomView} from '../shared/DomView';
import {Timeline} from '../shared/Timeline';
import {Car} from './Car';
import {Logo} from './Logo';
import {Title} from './Title';
import {FlipCard} from './FlipCard';
import Phrase from './PhraseService';
import UI from '../utils/UI';

const Curves  = transitions.Curves;

class App extends DomView {
    constructor(options) {
        super(options);
        this.renderViews();
        this.initFlipBook();
    }

    setProperties() {
        this.mountPoint.set(.5, .5);
        this.align.set(.5, .5);
        this.size.setAbsolute(420, 768);
    }

    render() {
        UI.setStyle(this, {
            'border': "1px solid #000000",
            'overflow': 'hidden'
        });
    }

    preloadImages() {
        /*for(var  i =0 ; i < 36; i++) {
            var image = new Image();
            image.src = 'images/car/' + i + '.jpeg';
        }*/
    }

    renderViews() {
        this.currentImage = 0;
        this.timelineInitialized = false;

        this.baseZPos = {
            top: 99,
            bottom: 110,
            next: 99,
            shadow: 100
        };

        this.renderFlipCardA();
        this.renderFlipCardB();
        this.renderFlipCardC();
        this.renderLogo();
        //this.renderShadow();
    }

    renderFlipCardA() {
        this.flipCardA = new FlipCard({
            node: this.node.addChild(),
            model: {
                order: 1,
                zPos: this.baseZPos.top
            }
        });

        this.flipCardA.el.addClass('card-a');

        this.flipCardA.rotation.set((180 * Math.PI) / 180);

        this.carA =  new Car({
            node: this.flipCardA.node.addChild(),
            tagName: 'img',
            model: {
                currentImage: this.currentImage
            }
        });

        this.titleA = new Title({
            tagName: 'h1',
            node: this.flipCardA.node.addChild(),
            model: {
                text: Phrase.getCurrentPhrase()
            }
         });
    }

    renderFlipCardB() {
        this.flipCardB = new FlipCard({
            node: this.node.addChild(),
            model: {
                order: 2,
                zPos: this.baseZPos.bottom
            }
        });

        this.flipCardB.el.addClass('card-b');


        this.carB =  new Car({
            node: this.flipCardB.node.addChild(),
            tagName: 'img',
            model: {
                currentImage: this.currentImage
            }
        });

        this.titleB = new Title({
            tagName: 'h1',
            node: this.flipCardB.node.addChild(),
            model: {
                text: Phrase.getCurrentPhrase()
            }
        });
    }

    renderFlipCardC() {
        this.currentImage++;

        this.flipCardC = new FlipCard({
            node: this.node.addChild(),
            model: {
                order: 3,
                zPos: this.baseZPos.next
            }
        });

        this.flipCardC.el.addClass('card-c');

        this.carC =  new Car({
            node: this.flipCardC.node.addChild(),
            tagName: 'img',
            model: {
                currentImage: this.currentImage
            }
        });

        this.titleC = new Title({
            tagName: 'h1',
            node: this.flipCardC.node.addChild(),
            model: {
                text: Phrase.getCurrentPhrase()
            }
        });
    }

    renderLogo() {
        this.logo = new DomView({
            node: this.node.addChild(),
            model: {}
        });

        this.logo.size.setAbsolute(250, 250);
        this.logo.position.setZ(200);
        this.logo.align.set(.5, 0);
        this.logo.mountPoint.set(.5, 0);
        this.logo.position.setY(75);
        this.logo.opacity.set(0);

        this.logoCircles = this.renderLogoImages([4, 5, 6, 7]);
        this.logoLetters = this.renderLogoImages([8, 9, 10]);
        this.logoQuadrants = this.renderLogoImages([0, 1, 2, 3]);
    }

    renderLogoImages(imageNumbers) {
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

            image.el.attribute('src', 'assets/images/logo/' + imageNumber + '.png');
            imageViews.push(image);
        });

        return imageViews;
    }

    renderShadow() {
        this.shadow = new DomView({
            node: this.node.addChild(),
            model: {}
        });

        this.shadow.position.setZ(this.baseZPos.shadow);
        this.shadow.size.setAbsolute(422, 385);
        this.shadow.align.set(0, 0);
        this.shadow.position.setY(385);
        this.shadow.opacity.set(0);

        this.shadow.el.property('background-color', '#000000');
        this.shadow.el.property('backface-visibility', 'visible');
    }

    initFlipBook() {
        const _this = this;
        let duration = 750;

        setTimeout(flipIt, duration);

        function flipIt() {
            //_this.shadow.opacity.set(.33);

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

            // Flip bottomCard to top
            bottomCard.view.rotation.setX((180 * Math.PI) / 180, {
                duration: duration
            }, function() {
                nextCard.view.advance(_this.baseZPos.bottom);
                topCard.view.advance(_this.baseZPos.next, true);
                bottomCard.view.advance(_this.baseZPos.top);
                topCard.car.updateImage(_this.currentImage);

                // 12 is the last iteration for the
                if(Phrase.getCurrentIndex() <  Phrase._letters.length) {
                    topCard.title.update(Phrase.getCurrentPhrase());
                } else {
                    topCard.title.opacity.set(0);
                    if(!_this.timelineInitialized) {
                        _this.initTimeline();
                    }
                }

                if(duration > 100) {
                    duration = duration * .85;
                }

                if(_this.currentImage < 35) {
                    setTimeout(flipIt(), duration);
                }
            });//TODO: Callback bug

            // Put in callback
            /*setTimeout(function() {
                nextCard.view.advance(_this.baseZPos.bottom);
                topCard.view.advance(_this.baseZPos.next, true);
                bottomCard.view.advance(_this.baseZPos.top);
                topCard.car.updateImage(_this.currentImage);

                if(Phrase.getCurrentIndex() <  12) {
                    topCard.title.update(Phrase.getCurrentPhrase());
                } else {
                    topCard.title.opacity.set(0);
                     if(!_this.timelineInitialized) {
                        _this.initTimeline();
                     }
                }

                if(duration > 100) { duration = duration * .85; }
                if(_this.currentImage < 35) { setTimeout(flipIt(), duration); }
            }, duration);*/

            //Shadow
            /*_this.shadow.size.setAbsolute(422, 0, 1, {
                duration: duration / 1.5
            }); //TODO: Callback needs to go here

            //TODO This needs to go in the callback
            setTimeout(function() {
                _this.shadow.position.setY(0, {
                    duration: duration / 2.5
                });

                _this.shadow.size.setAbsolute(422, 385, 1, {
                    duration: duration / 2.5
                });
            }, duration / 2);

            setTimeout(function() {
                _this.shadow.opacity.set(0);
            }, duration);*/
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

        this.time.end   = 2800;  // Finis

        this.registerLogoQuadrants();
        this.registerLogoCircles();
        this.registerLogoLetters();

        this.logo.opacity.set(1);

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
}

const root = core.Famous.createContext('body');

window.bmw = new App({
    node: root.addChild(),
    model: {}
});
