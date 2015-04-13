import {DomView} from '../shared/DomView';
import {Timeline} from '../shared/Timeline';

export class Car extends DomView {
    constructor(options) {
        super(options);

        this.model.carImageCount = 35;
        this.initTimeline();
    }

    setProperties() {

    }

    render() {
        this.el.attribute('src', 'assets/images/car/-1.jpeg')
    }

    initTimeline() {
        this.timeline = new Timeline({ timescale: 1 });
        this.time = {
            start: 0,
            end: 18000
        }
    }
}
