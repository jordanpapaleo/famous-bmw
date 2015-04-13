import {core, domRenderables, components} from 'famous';
import {View} from '../shared/View';
import {DomView} from '../shared/DomView';
import {Timeline} from '../shared/Timeline';
import {Car} from './Car';
import {Logo} from './Logo';
import {Title} from './Title';

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

    renderViews() {
        this.currentImage = 0;
        this.renderViewA();
        this.renderViewB();
        //this.initFlipBook();
    }

    renderViewA() {
        this.viewA = new View({
            node: this.node.addChild(),
            model: {}
        });
        this.viewA.origin.set(0, 0);
        this.viewA.position.setZ(100);

        let node = this.viewA.node;

        this.carA =  new DomView({
            node: node.addChild(),
            tagName: 'img',
            model: {}
        });

        this.carA.el.attribute('src', 'assets/images/car/' + this.currentImage + '.jpeg');

        /*this.titleA = new Title({
            node,
            model: {}
         });*/

        /*this.logoA = new Logo({
            node,
            model: {}
        });*/
    }

    renderViewB() {
        this.viewB = new View({
            node: this.node.addChild(),
            model: {}
        });
        this.viewB.origin.set(0, 0);
        let viewAPosZ = this.viewA.position.getZ();
        this.viewB.position.setZ(viewAPosZ - 1);

        let node = this.viewB.node;

        this.currentImage++;

        this.carB =  new Car({
            node: node.addChild(),
            tagName: 'img',
            model: {}
        });

        this.carB.el.attribute('src', 'assets/images/car/' + this.currentImage + '.jpeg');

        /*this.titleB = new Title({
            node,
            model: {}
        });*/

        /*this.logoB = new Logo({
            node,
            model: {}
        });*/
    }

    initFlipBook() {
        window.setVariableInterval = function(callbackFunc, timing) {
            let variableInterval = {
                interval: timing,
                callback: callbackFunc,
                stopped: false,
                runLoop: function() {
                    if (variableInterval.stopped) return;
                    var result = variableInterval.callback.call(variableInterval);
                    if (typeof result == 'number')
                    {
                        if (result === 0) return;
                        variableInterval.interval = result;
                    }
                    variableInterval.loop();
                },
                stop: function() {
                    this.stopped = true;
                    window.clearTimeout(this.timeout);
                },
                start: function() {
                    this.stopped = false;
                    return this.loop();
                },
                loop: function() {
                    this.timeout = window.setTimeout(this.runLoop, this.interval);
                    return this;
                }
            };

            return variableInterval.start();
        };

        const _this = this;
        let duration = 1000;


        function setDeceleratingTimeout(callback, factor, times) {
            var internalCallback = function(t, counter) {
                console.log('t',t);
                console.log('counter',counter);

                return function() {
                    if(--t > 0) {
                        setTimeout(internalCallback, ++counter * factor );
                        callback();
                    }
                }
            }(times, 0);

            setTimeout(internalCallback, factor);
        }

        //setDeceleratingTimeout( function(){ console.log( 'hi' );}, 10, 10 );
        //setDeceleratingTimeout( function(){ console.log( 'bye' );}, 1000, 10 );

        flipIt();

        function flipIt() {

            setTimeout(function() {
                let viewA = {
                    view: _this.viewA,
                    posZ: _this.viewA.position.getZ(),
                    car: _this.carA
                };

                let viewB = {
                    view: _this.viewB,
                    posZ: _this.viewB.position.getZ(),
                    car: _this.carB
                };

                let frontView, backView;

                if(viewA.posZ > viewB.posZ) {
                    frontView = viewA;
                    backView  = viewB;
                } else {
                    frontView = viewB;
                    backView  = viewA;
                }

                frontView.view.rotation.setX((90 * Math.PI) / 180, {
                    curve: 'easeOut',
                    duration: duration / 2
                });

                setTimeout(function() {
                    _this.currentImage++;
                    frontView.view.position.setZ(frontView.view.position.getZ() - 1);
                    backView.view.position.setZ(backView.view.position.getZ() + 1);
                    frontView.view.rotation.setX(0);
                    frontView.car.el.attribute('src', 'assets/images/car/' + _this.currentImage + '.jpeg');
                }, duration / 2);
            }, duration);

            setTimeout(function() {
                if(_this.currentImage <= 35) {
                    duration = duration * .75;
                    flipIt();
                }
            }, duration);
        }
    }
}

const root = new core.Context('body');

new App({
    node: root.addChild(),
    model: {}
});
