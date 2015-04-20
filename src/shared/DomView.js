import {components, domRenderables} from 'famous';
import {View} from '../shared/View';
import UI from '../utils/UI';

export class DomView extends View {
    constructor(options) {
        options = options || {};
        super(options);

        options.tagName = (options.hasOwnProperty('tagName')) ? options.tagName : 'div';

        this.el = new domRenderables.HTMLElement(this.dispatch, {
            tagName: options.tagName
        });

        this.render();
    }

    render() {
        // Extending class overrides
    }

    onGlobalEvent(evName, fn) {
        if(!this.eventHandler) {
            this.eventHandler = new components.EventHandler(this.dispatch);
        }

        this.eventHandler.on(evName, fn);
    }

    onDomEvent(evName, methods, properties, fn) {
        var i;

        if(properties instanceof Array) {
            if(!(evName instanceof Array)) {
                evName = [evName];
            }

            for(i = 0; i < evName.length; i++) {
                this.el.on(evName[i], methods, properties);
                this.dispatch.registerTargetedEvent(evName[i], fn);
            }
        } else {
            if(!(evName instanceof Array)) {
                evName = [evName];
            }
            for(i = 0; i < evName.length; i++) {
                this.el.on(evName[i], methods);
                this.dispatch.registerTargetedEvent(evName[i], properties);
            }
        }
    }

    setStyle(properties) {
        properties = properties || {};
        UI.setStyle(this, properties);
    }
}
