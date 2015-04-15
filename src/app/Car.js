import {DomView} from '../shared/DomView';
import {Timeline} from '../shared/Timeline';
import UI from '../utils/UI';

export class Car extends DomView {
    setProperties() {
        this.size.setProportional(1, 1, 1);
    }

    render() {
        if(this.model.currentImage >= 0) {
            this.el.attribute('src', 'assets/images/car/' + this.model.currentImage + '.jpeg');
        }

        UI.setStyle(this, {
            'backface-visibility': 'hidden'
        });
    }

    updateImage(currentImage) {
        this.el.attribute('src', 'assets/images/car/' + currentImage + '.jpeg');
    }
}
