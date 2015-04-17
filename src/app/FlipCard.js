import {DomView} from '../shared/DomView';

export class FlipCard extends DomView {
    setProperties() {
        this.origin.set(0, 0);
        this.align.set(0, .5);

        this.position.setZ(this.model.zPos);
        this.size.setProportional(1, .5, 1);
    }

    render() {
        this.setStyle({
            'z-index': this.model.zPos,
            'background-color': '#FFFFFF'
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
