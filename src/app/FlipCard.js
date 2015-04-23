import {DomView} from '../shared/DomView';

export class FlipCard extends DomView {
    setProperties() {
        this.mountPoint.set(0, 0);
        this.align.set(0, .5);
        this.origin.set(0, 0);
        this.setSize(['relative', 1], ['relative', .5]);
        this.position.setZ(this.model.zPos);
    }

    render() {
        this.setStyle({
            'zIndex': this.model.zPos,
            'backgroundColor': '#FFFFFF'
        });
    }

    advance(n, reset) {
        if(reset) {
            this.rotation.setX(0);
        }

        this.model.zPos = n;
        this.position.setZ(n);

        this.setStyle({
            'z-index': this.model.zPos
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
