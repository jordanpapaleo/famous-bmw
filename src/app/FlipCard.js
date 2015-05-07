import View     from 'famous-creative/display/View';

export class FlipCard extends View {
    constructor(node, options) {
        super(node, options);

        this.setMountPoint(0, 0);
        this.setAlign(0, .5);
        this.setOrigin(0, 0);
        this.setSizeMode(0, 0);
        this.setSizeProportional(1, .5);
        this.setPositionZ(this.model.zPos);

        this.createDOMElement({
            classes: [`card-${this.model.alphaId}`],
            properties: {
                'z-index': this.model.zPos,
                'background-color': '#FFFFFF'
            }
        });
    }

    advance(zPos) {
        this.model.zPos = zPos;
        this.setPositionZ(zPos);

        this.setDOMProperties({
            'z-index': zPos
        });

        switch(this.model.order) {
            case 1:
                this.model.order = 3;
                break;
            case 2:
                this.model.order = 1;
                break;
            case 3:
                this.model.order = 2;
                break;
            default:
        }
    }

    getOrder() {
        return this.model.order;
    }
}
