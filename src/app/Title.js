import View     from 'famous-creative/display/View';

export class Title extends View {
    constructor(node, options) {
        super(node, options);

        this.setMountPoint(.5, .5);
        this.setAlign(.5, .5);
        this.setOrigin(.5, .5);
        this.setSizeMode(0, 0);
        this.setProportionalSize(1, 1);

        // Flip the card backwards to be ready for the
        // rotation up to the top position
        this.setRotation((180 * Math.PI) / 180, 0, 0);
        this.setPositionZ(-1);

        this.createDOMElement({
            classes: ['title-text'],
            content: this.model.text,
            properties: {
                'backface-visibility': 'hidden',
                'background-color': '#FFFFFF',
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

    updatePhrase(titleString) {
        this.setDOMContent(titleString);
    }
}
