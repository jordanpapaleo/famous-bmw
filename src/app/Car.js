import View     from 'famous-creative/display/View';

export class Car extends View {
    constructor(node, options) {
        super(node, options);

        this.setMountPoint(0, 1);
        this.setAlign(0, 1);
        this.setSizeMode(0, 1);
        this.setProportionalSize(1, null);
        this.setAbsoluteSize(null, 280);
        this.setPositionZ(1);

        this.createDOMElement({
            attributes: {
                'src': `assets/images/car/${this.model.currentImage}.jpg`
            },
            classes: ['car-image'],
            properties: {
                'backface-visibility': 'hidden'
            }
        });
    }

    updateImage(currentImage) {
        this.setDOMAttributes({
            'src': `assets/images/car/${currentImage}'.jpg`
        });
    }
}
