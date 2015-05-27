import Timeline         from 'famous-creative/animation/Timeline';
import View             from 'famous-creative/display/View';

import FamousEngine     from 'famous-creative/scaffolding/FamousEngine';

import {FlipCard}       from './FlipCard';
import {Logo}           from './Logo';
import Image            from './ImageService';
import Phrase           from './PhraseService';

//Famous Components
const Curves            = FamousPlatform.transitions.Curves;
const Famous            = FamousPlatform.core.Famous;

//GL Components
const AmbientLight      = FamousPlatform.webglRenderables.AmbientLight;
const Color             = FamousPlatform.utilities.Color;
const PointLight        = FamousPlatform.webglRenderables.PointLight;

class App extends View {
    constructor(node) {
        super(node);

        let camera = new FamousPlatform.components.Camera(this.node);
        camera.setDepth(1000);

        this.setAlign(.5, .5).setMountPoint(.5, .5);
        this.setSizeModeAbsolute().setAbsoluteSize(420, 768);

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

        this.clock = FamousPlatform.core.FamousEngine.getClock();

        this.renderFlipCards();
        this.renderShadows();
        this.renderClosingText();
        this.renderSky();
        this.renderLogo();

        /*this.headlights = new View(this.addChild());
        this.headlights.setAlign(0.5, 0, 0).setMountPoint(0.5, 0, 0);
        this.headlights.setSizeMode(0, 1);
        this.headlights.setProportionalSize(1, null);
        this.headlights.setAbsoluteSize(null, 280);
        this.headlights.createDOMElement({
            tagName: 'img',
            classes: ['headlights'],
            attributes: {
                'src': `assets/images/car/headlights.png`
            },
            properties: {
                'z-index': 600
            }
        });

        this.headlights.setPositionY(45);
        this.headlights.setPositionZ(600);*/

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

    renderLogo() {
        this.logo = new Logo(this.addChild());

        this.pointLightA = new View(this.node.addChild());
        this.pointLightA.pointLight = new PointLight(this.pointLightA.addChild());
        this.pointLightA.pointLight.setColor(new Color('#eeeeee'));
        this.pointLightA.setPosition(500, -500, -100);

        this.pointLightB = new View(this.node.addChild());
        this.pointLightB.pointLight = new PointLight(this.pointLightB.addChild());
        this.pointLightB.pointLight.setColor(new Color('#CCCCCC'));
        this.pointLightB.setPosition(-200, -200, 50);

        this.pointLightC = new View(this.node.addChild());
        this.pointLightC.pointLight = new PointLight(this.pointLightC.addChild());
        this.pointLightC.pointLight.setColor(new Color('#CCCCCC'));
        this.pointLightC.setPosition(200, 300, 1500);

        this.ambientLight = new View(this.node.addChild());
        this.ambientLight.ambientLight = new AmbientLight(this.ambientLight.addChild());
        this.ambientLight.ambientLight.setColor(new Color('#555555'));
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

            if(this.flipCount === 10 && !this.timelineInitialized) {
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
        this.registerLogo();
        this.timeline.set(20000, { duration: 20000});
        //this.timeline.set(20000, { duration: 5000});
    }

    registerLogo() {
        const logoQuadrants = [
            this.logo.geometries.second,
            this.logo.geometries.fourth,
            this.logo.geometries.first,
            this.logo.geometries.third
        ];

        let time = {
            a: [0, 250, 500, 750],
            end: 1750
        };

        logoQuadrants.forEach((quadrant, i) => {
            let x, y, startTime;
            const offset = 400;

            switch(i) {
                case 0:  // top left
                    startTime = time.a[0];//this.time.quad.a;
                    x = -offset;
                    y = -offset;
                    break;
                case 1: // bottom right
                    startTime = time.a[1];//this.time.quad.b;
                    x = offset;
                    y = offset;
                    break;
                case 2: // top right
                    startTime = time.a[2];//this.time.quad.c;
                    x = offset;
                    y = -offset;
                    break;
                case 3: // bottom left
                    startTime = time.a[3]; //this.time.quad.d;
                    x = -offset;
                    y = offset;
                    break;
            }

            this.timeline.registerPath({
                handler: (val) => {
                    quadrant.setPosition(...val);
                },
                path: [
                    [0, [x, y, 0]],
                    [startTime, [x, y, 0], Curves.inOutBack],
                    [startTime + 1000, [0, 0, 0]]
                ]
            });

            this.timeline.registerPath({
               handler: (t) => {
                   if(t >= 200) {
                       quadrant.setOpacity(1, {
                           duration: 250
                       });
                   }
               },
                path: [
                    [0, 0],
                    [time.end, time.end]
                ]
            });

            let rotX = Math.PI * 0 / 180;
            let rotY = Math.PI * 360 / 180;
            let rotZ = Math.PI * 0 / 180;

            this.timeline.registerPath({
                handler: (val) => {
                    quadrant.setRotation(...val);
                },
                path: [
                    [startTime, [rotX, rotY, rotZ]],
                    [startTime + 1000, [0, 0, 0]]
                ]
            });
        });

        this.registerLoadOutsideCylinder(time.end);
    }

    registerLoadOutsideCylinder(startTime) {
        startTime = (startTime) ? startTime : 0;
        let time = {
            a: [startTime],
            end: startTime + 1000
        };

        let hasScaled = false;
        this.timeline.registerPath({
            handler: (t) => {
                if (!hasScaled && t >= time.a[0]) {
                    hasScaled = true;

                    this.logo.geometries.outsideCyl.setScale(0, 0, 0, {duration: 0}, () => {
                        this.logo.geometries.outsideCyl.setScale(1, 1, 1, {
                            duration: 1000,
                            curve: Curves.outBack
                        });
                        this.logo.geometries.outsideCyl.setOpacity(1, {
                            duration: 800
                        });
                    });
                }
            },
            path: [
                [startTime, startTime],
                [time.end, time.end]
            ]
        });

        this.registerRotateAssembleLogo(time.end);
    };

    registerRotateAssembleLogo(startTime) {
        startTime = (startTime) ? startTime : 0;
        let phaseDuration = 1750;
        let endTime = startTime + phaseDuration;

        this.timeline.registerPath({
            handler: (val) => {
                this.logo.setRotationY(val);
            },
            path: [
                [startTime, 0, Curves.easeOut],
                [startTime + 500, Math.PI * 90 /180],
                [startTime + 1250, Math.PI * 90 /180, Curves.outBack],
                [endTime, 0]
            ]
        });

        let isScrewed = false;
        this.timeline.registerPath({
            handler: (time) => {
                if(!isScrewed && time >= startTime + 500) {
                    isScrewed = true;

                    this.logo.quads.setRotationZ(Math.PI * 1440 / 180, {
                        duration: 750
                    });

                    this.logo.quads.setPositionZ(0, {
                        duration: 750,
                        curve: Curves.inBack
                    });
                }
            },
            path: [
                [startTime, startTime],
                [endTime, endTime]
            ]
        });

        this.registerAddOuterRingInsideCyl(endTime);
    }

    registerAddOuterRingInsideCyl(startTime) {
        startTime = (startTime) ? startTime : 0;
        let phaseDuration = 1500;
        let endTime = startTime + phaseDuration;

        this.logo.geometries.outerRing.setPositionZ(1000);
        this.logo.geometries.insideCyl.setPositionZ(1000);
        this.logo.geometries.innerRing.setPositionZ(-500);

        let hasScaledDown = false;
        let hasScaledUp = false;
        this.timeline.registerPath({
            handler: (time) => {
                if(!hasScaledDown && time >= startTime) {
                    hasScaledDown = true;
                    this.logo.geometries.outerRing.setOpacity(1, { duration: 1000 });

                    this.logo.geometries.outerRing.setPositionZ(0, {
                        duration: 1000,
                        curve: Curves.easeIn
                    });

                    this.logo.geometries.insideCyl.setOpacity(1, { duration: 750 });

                    this.logo.geometries.insideCyl.setPositionZ(0, {
                        duration: 750,
                        curve: Curves.easeIn
                    });
                }

                if(!hasScaledUp && time >= startTime + 1000) {
                    hasScaledUp = true;
                    this.logo.geometries.innerRing.setOpacity(1);
                    this.logo.geometries.innerRing.setPositionZ(0, {
                        duration: 500,
                        curve: Curves.outBack
                    });
                }
            },
            path: [
                [startTime, startTime],
                [endTime, endTime]
            ]
        });

        this.registerLetterEntry(endTime);
    }

    registerLetterEntry(startTime) {
        startTime = (startTime) ? startTime : 0;
        let phaseDuration = 1500;
        let endTime = startTime + phaseDuration;

        let B = this.logo.geometries.B, M = this.logo.geometries.M, W = this.logo.geometries.W;

        B.setPositionZ(100);
        M.setPositionZ(100);
        W.setPositionZ(100);

        let hasLoadedLetters = false;
        this.timeline.registerPath({
            handler: (time) => {
                if(!hasLoadedLetters && time >= startTime) {
                    hasLoadedLetters = true;

                    B.setOpacity(1, { duration: 250});
                    B.setPositionZ(0, { duration: 250});

                    setTimeout(function() {
                        M.setOpacity(1, { duration: 250});
                        M.setPositionZ(0, { duration: 250});
                    }, 250);

                    setTimeout(function() {
                        W.setOpacity(1, { duration: 250});
                        W.setPositionZ(0, { duration: 250});
                    }, 500);
                }
            },
            path: [
                [startTime, startTime],
                [endTime, endTime]
            ]
        });

        this.registerCar(endTime);
        this.registerClosingText(endTime);
        this.registerSky(endTime);
    }

    registerCar(startTime) {
        startTime = (startTime) ? startTime : 0;
        let time = {
            a: [startTime, startTime + 1000],
            b: [startTime + 2000, startTime + 3000],
            end: startTime + 3000
        };

        let lastCard = this.flipCards[0];

        this.timeline.registerPath({
            handler: (val) => {
                lastCard.car.setPosition(...val);
            },
            path: [
                [startTime, [0, 0]],
                [time.a[1], [400, -600], Curves.outCirc],
                [time.b[0], [400, -825]],
                [time.b[1], [0, -375], Curves.inCirc]
            ]
        });

        let hasUpdatedImage = false;
        this.timeline.registerPath({
            handler: (t) => {
                if(!hasUpdatedImage && t >= time.b[0]) {
                    hasUpdatedImage = true;
                    lastCard.car.updateImage('orange_mirrored_alt.png');
                    lastCard.car.setScale(1, 1);
                    lastCard.car.setSizeModeAbsolute();
                    lastCard.car.setAbsoluteSize(550, 367);
                }
            },
            path: [
                [0, 0],
                [time.end, time.end]
            ]
        });

        let isOpacitated = false;
        this.timeline.registerPath({
            handler: (t) => {
                if(!isOpacitated && t >= startTime) {
                    isOpacitated = true;
                    this.flipCards.forEach(function(card) {
                        card.setDOMProperties({
                            'background-color': 'rgba(0, 0, 0, 0)'
                        })
                    });

                    this.registerLogoDrop(t);
                }
            },
            path: [
                [startTime, startTime],
                [time.end, time.end]
            ]
        })
    }

    registerLogoDrop(startTime) {
        startTime = (startTime) ? startTime : 0;
        let time = {
            a: [startTime + 1500, startTime + 3000],
            end: startTime + 300
        };

        let logo = {
            z: this.logo.getPositionZ(),
            y: this.logo.getPositionY(),
            x: this.logo.getPositionX()
        };

        this.timeline.registerPath({
            handler: (val) => {
                this.logo.setPosition(...val);
            },
            path: [
                [startTime,  [logo.x, logo.y, logo.z], Curves.easeIn],
                [time.a[0],  [logo.x, 250,    logo.z], Curves.easeOut],
                [time.a[1],  [logo.x, 365,    logo.z]]
            ]
        });

        this.timeline.registerPath({
            handler: (val) => {
                this.logo.setScale(...val)
            },
            path: [
                [startTime,  [1, 1, 1], Curves.easeOut],
                [time.a[0], [.7, .7, .7], Curves.easeIn],
                [time.a[1], [.9, .9, .9]]
            ]
        })
    }

    registerSky(startTime) {
        startTime = (startTime) ? startTime : 0;
        let time = {
            a: [startTime, startTime + 1000],
            b: [startTime + 2000, startTime + 3000],
            end: startTime + 3000
        };

        this.timeline.registerPath({
            handler: (val) => {
                this.sky.setDOMProperties({
                    'background-color': 'rgb(' + Math.floor(val[0]) + ', ' + Math.floor(val[1]) + ', ' + Math.floor(val[2]) + ')'
                })
            },
            path: [
                [time.b[0] + 0,    [255, 255, 255]],
                [time.b[0] + 50,   [255, 248, 224]],
                [time.b[0] + 100,  [255, 213, 78]],
                [time.b[0] + 150,  [255, 154, 0]],
                [time.b[0] + 200,  [229, 95,  21]],
                [time.b[0] + 250,  [205, 41,  103]],
                [time.b[1],        [0, 0, 0]]
            ]
        })
    }

    registerClosingText(startTime) {
        //7500
        startTime = (startTime) ? startTime : 0;
        let time = {
            a: [startTime + 500, startTime + 1500, startTime + 3000],
            b: [startTime + 2700, startTime + 3500]
        };

        //Closing text 1
        this.timeline.registerPath({
            handler: (val) => {
                this.closingText1.setOpacity(val);
            },
            path: [
                [startTime, 0],
                [time.a[0], 0],
                [time.a[1], 1],
                [time.a[2], 0]
            ]
        });

        let ypos = this.closingText1.position.getY();
        this.timeline.registerPath({
            handler: (val) => {
                this.closingText1.setPosition(...val)
            },
            path: [[startTime, [0, ypos]],
                [time.a[1], [0, ypos], Curves.easeOut],
                [time.a[2], [0, ypos + 100]]]
        });

        //Closing text 2
        this.timeline.registerPath({
            handler: (val) => {
                this.closingText2.setOpacity(val);
            },
            path: [
                [startTime, 0],
                [time.b[0], 0],
                [time.b[1], 1]
            ]
        });
    }
}

FamousEngine.init();
FamousEngine.createScene('#app');

window.app = new App(FamousEngine.addChild('#app'));
