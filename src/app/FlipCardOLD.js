import View             from 'famous-creative/display/View';
import {Car}            from './Car';
import {Title}          from './Title';

export class FlipCard extends View {
    constructor(node, options) {
        super(node, options);

        this.model = options.model || {};

        this.setMountPoint(0, 0);
        this.setAlign(0, .5);
        this.setOrigin(0, 0);
        this.setPositionZ(this.model.zPos);

        this.setSizeModeRelative();
        this.setProportionalSize(1, .5);

        this.createDOMElement({
            classes: [`card-${this.model.alphaId}`],
            properties: {
                'z-index': this.model.zPos,
                'background-color': '#FFFFFF'
            }
        });

        this.renderCar();
        this.renderTitle();
    }

    get order() {
        return this.model.order;
    }

    set order(i) {
        this.model.order = i;
    }

    renderCar() {
        this.car =  new Car(this.addChild(), {
            model: {
                alphaId: this.model.alphaId,
                currentImage: this.model.image
            }
        });
    }

    renderTitle() {
        this.title = new Title(this.addChild(), {
            model: {
                alphaId: this.model.alphaId,
                text: this.model.letter
            }
        });
    }

    advance() {
        let zPos;

        switch(this.order) {
            case 1: // Was at top, advance to next
                zPos = 99;
                this.setRotationX(0);
                this.car.advanceImage();
                this.title.updatePhrase();
                this.order = 3;
                break;
            case 2: // Was at bottom, advance to top
                zPos = 99;
                this.order = 1;
                break;
            case 3:// Was at next, advance to bottom
                zPos = 101;
                this.order = 2;
                break;
            default:

        }

        this.model.zPos = zPos;
        this.setPositionZ(zPos);
        this.setDOMProperties({
            'z-index': zPos
        });
    }
}
