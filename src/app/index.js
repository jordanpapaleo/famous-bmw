import {core, domRenderables, components} from 'famous';
import {View} from '../shared/View';
import {DomView} from '../shared/DomView';
import {Timeline} from '../shared/Timeline';
import {Car} from './Car';
import {Logo} from './Logo';
import {Title} from './Title';
import {FlipCard} from './FlipCard';
import Phrase from './PhraseService';

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
        this.el.property('border', "1px solid #000000");
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

    }
}

const root = new core.Context('body');

new App({
    node: root.addChild(),
    model: {}
});
