import View             from 'famous-creative/display/View';
import Image            from './ImageService';

export class Car extends View {
    constructor(node, options) {
        super(node);

        this.model = options;

        this.setAlign(.5, .9);
        this.setMountPoint(.5, 1);
        this.setOrigin(.5, .5);
        this.setPositionZ(1);

        this.setSizeMode(0, 1);
        this.setProportionalSize(1, null);
        this.setAbsoluteSize(null, 280);
        this.setScale(1.2, 1.2);

        this.createDOMElement({
            tagName: 'img',
            attributes: {
                'src': `assets/images/car/${this.model.currentImage}.jpg`
            },
            classes: ['car-image'],
            properties: {
                'backface-visibility': 'hidden'
            }
        });
    }

    advanceImage() {
        if(Image.getCurrent() < Image.getMax()) {
            this.setDOMAttributes({
                'src': `assets/images/car/${Image.getNext()}.jpg`
            });
        }
    }

    updateImage(img) {
        this.setDOMAttributes({
            'src': `assets/images/car/${img}`
        });
    }
}
