import {components} from 'famous';

export class View {
    constructor(options) {
        options = options || {};

        this.node = options.node;
        this.model = options.model || {};
        this.dispatch = this.node.getDispatch();

        this.align = new components.Align(this.dispatch);
        this.mountPoint = new components.MountPoint(this.dispatch);
        this.origin = new components.Origin(this.dispatch);

        this.opacity = new components.Opacity(this.dispatch);
        this.position = new components.Position(this.dispatch);
        this.rotation = new components.Rotation(this.dispatch);
        this.scale = new components.Scale(this.dispatch);
        this.size = new components.Size(this.dispatch);

        this.setProperties();
    }

    setProperties() {
        //Override
    }
}
