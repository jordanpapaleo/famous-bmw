import {DomView} from '../shared/DomView';

export class Car extends DomView {
    setProperties() {
        this.mountPoint.set(0, 1);
        this.align.set(0, 1);
        this.setSize(['relative', 1], ['absolute', 280]);
        this.position.setZ(1);
    }

    render() {
        this.el.setAttribute('src', 'assets/images/car/' + this.model.currentImage + '.jpg');
        this.el.addClass('car-image');
        this.setStyle(this, {
            'backface-visibility': 'hidden'
        });
    }

    updateImage(currentImage) {
        this.el.setAttribute('src', 'assets/images/car/' + currentImage + '.jpg');
    }
}
