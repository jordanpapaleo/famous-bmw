import View             from 'famous-creative/display/View';
import Image            from './ImageService';


export class Car extends View {
    constructor(node, options) {
        super(node, options);

        this.model = options.model || {};

        this.setAlign(0, 1);
        this.setMountPoint(0, 1);
        this.setPositionZ(1);

        this.setSizeMode(0, 1);
        this.setProportionalSize(1, null);
        this.setAbsoluteSize(null, 280);

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
        this.setDOMAttributes({
            'src': `assets/images/car/${Image.getNext()}.jpg`
        });
    }
}
