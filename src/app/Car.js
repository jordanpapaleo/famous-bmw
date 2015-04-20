import {DomView} from '../shared/DomView';
import UI from '../utils/UI';

export class Car extends DomView {
    setProperties() {
        this.size.setAbsolute(420, 280);
    }

    render() {
        if(this.model.currentImage >= 0) {
            this.el.attribute('src', 'assets/images/car/' + this.model.currentImage + '.jpg');
        }

        UI.setStyle(this, {
            'backface-visibility': 'hidden'
        });
    }

    updateImage(currentImage) {
        this.el.attribute('src', 'assets/images/car/' + currentImage + '.jpg');
    }
}
