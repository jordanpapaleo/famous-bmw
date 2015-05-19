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

    advance(zPos, needsUpdate) {
        this.model.zPos = zPos;
        this.setPositionZ(zPos);
        this.setDOMProperties({
            'z-index': zPos
        });

        if(needsUpdate) {
            this.setRotationX(0);
            this.car.advanceImage();
            this.title.updatePhrase();
        }

        switch(this.model.order) {
            case 1:
                this.model.order = 3;
                break;
            case 2:
                this.model.order = 1;
                break;
            case 3:
                this.model.order = 2;
                break;
            default:
        }
    }

    getOrder() {
        return this.model.order;
    }
}
