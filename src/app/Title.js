import {View} from '../shared/View';
import {Timeline} from '../shared/Timeline';

export class Title extends View {
    constructor(options) {
        super(options);

        this.model.title = "Hello Future";
        this.model.letters = this.model.title.split('');
        console.info('this.model.letters', this.model.letters);

        this.initTimeline();
    }

    renderLetterViews() {

    }

    initTimeline() {
        this.timeline = new Timeline({ timescale: 1 });
        this.time = {
            start: 0,
            end: 8000
        }
    }
}
