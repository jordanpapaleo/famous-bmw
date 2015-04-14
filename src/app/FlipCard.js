import {DomView} from '../shared/DomView';
import {Timeline} from '../shared/Timeline';
import UI from '../utils/UI';

export class FlipCard extends DomView {
    setProperties() {
        this.origin.set(0, 0);
        this.align.set(0, .5);
        this.position.setZ(this.model.zPos);
        this.size.setProportional(1,.5, 1);
    }

    render() {
        this.el.property('border-bottom', '1px solid gray');
    }

    advance(n, reset) {
        if(reset) {
            this.rotation.setX(0);
        }

        this.model.zSpace = n;
        this.position.setZ(n);

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

    setOrder(n) {
        this.model.order = n;
    }
}
