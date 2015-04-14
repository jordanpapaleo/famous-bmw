import {DomView} from '../shared/DomView';
import {Timeline} from '../shared/Timeline';
import UI from '../utils/UI';

export class Car extends DomView {
    setProperties() {
        this.size.setProportional(1, 1, 1);
    }

    render() {
        this.el.attribute('src', 'assets/images/car/' + this.model.currentImage + '.jpeg');

        UI.setStyle(this, {
            'backface-visibility': 'hidden',
            //'box-shadow': '0px 0px 28px 8px rgba(0,0,0,0.75)'
        });
    }

    updateImage(currentImage) {
        this.el.attribute('src', 'assets/images/car/' + currentImage + '.jpeg');
    }
}
