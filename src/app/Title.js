import View             from 'famous-creative/display/View';
import Phrase           from './PhraseService';

export class Title extends View {
    constructor(node, options) {
        super(node);

        this.model = options;

        this.setAlign(.5, .5);
        this.setMountPoint(.5, .5);
        this.setOrigin(.5, .5);

        this.setSizeModeRelative();
        this.setProportionalSize(1, 1);

        // Flip the card backwards to be ready for the rotation up to the top position
        this.setRotation((180 * Math.PI) / 180, 0, 0);
        this.setPositionZ(-1);

        this.createDOMElement({
            tagName: 'h1',
            classes: ['title-text'],
            content: this.model.text,
            properties: {
                'backface-visibility': 'hidden',
                'box-sizing': 'border-box',
                'font-size': '70px',
                'font-weight': '300',
                'margin': '0',
                'padding-top': '100px',
                'text-align': 'center',
                'text-transform': 'uppercase'
            }
        });
    }

    updatePhrase() {
        if(Phrase.getCurrentIndex() === 12) {
            this.setOpacity(0);
        } else {
            this.setDOMContent(Phrase.getCurrentPhrase());
        }
    }
}
