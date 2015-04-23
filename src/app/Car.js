import {DomView} from '../shared/DomView';

export class Car extends DomView {
    setProperties() {
        this.mountPoint.set(0, 1);
        this.align.set(0, 1);
        this.setSize(['relative', 1], ['absolute', 280]);
        this.position.set(0, 0, 1);
    }

    render() {
        if(this.model.currentImage >= 0) {
            this.el.setAttribute('src', 'assets/images/car/' + this.model.currentImage + '.jpg');
        }

        this.setStyle(this, {
            'backface-visibility': 'hidden'
        });
    }

    updateImage(currentImage) {
        this.el.setAttribute('src', 'assets/images/car/' + currentImage + '.jpg');
    }
}
