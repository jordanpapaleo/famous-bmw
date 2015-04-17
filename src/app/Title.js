import {DomView} from '../shared/DomView';
import UI from '../utils/UI';

export class Title extends DomView {
    setProperties() {
        this.mountPoint.set(.5, .5);
        this.align.set(.5, .5);
        this.size.setAbsolute(420, 200, 1);
        this.origin.set(.5, .5);
        this.rotation.setX((180 * Math.PI) / 180);
    }

    render() {
        this.el.content(this.model.text);

        UI.setStyle(this, {
            'text-align': 'center',
            'backface-visibility': 'hidden',
            'background-color': '#FFFFFF',
            'font-size': '70px',
            'font-weight': '300',
            'margin': '0',
            'box-sizing': 'border-box',
            'text-transform': 'uppercase'
        });
    }

    update(titleString) {
        this.el.content(titleString);
    }
}
