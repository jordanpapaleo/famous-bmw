import {DomView} from '../shared/DomView';

export class Title extends DomView {
    setProperties() {
        this.mountPoint.set(.5, .5);
        this.align.set(.5, .5);
        this.origin.set(.5, .5);

        this.setSize(['relative', 1], ['relative', 1]);

        // Flip the card backwards to be ready for the
        // rotation up to the top position
        this.rotation.set((180 * Math.PI) / 180, 0, 0);
        this.position.setZ(-1);
    }

    render() {
        this.el.setContent(this.model.text);
        this.el.addClass('title-text');
        this.setStyle({
            'backface-visibility': 'hidden',
            'background-color': '#FFFFFF',
            'box-sizing': 'border-box',
            'font-size': '70px',
            'font-weight': '300',
            'margin': '0',
            'padding-top': '100px',
            'text-align': 'center',
            'text-transform': 'uppercase'
        });
    }

    updatePhrase(titleString) {
        this.el.setContent(titleString);
    }
}
