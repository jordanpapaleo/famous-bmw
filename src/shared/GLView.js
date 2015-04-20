import {webglRenderables, webglGeometries, webglMaterials, webglShaders, polyfills, utilities} from 'famous';
import {View} from '../shared/View';

const Mesh   = webglRenderables.Mesh;
const Light  = webglRenderables.AmbientLight;
const Sphere = webglGeometries.Sphere;
const Plane  = webglGeometries.Plane;
const Color  = utilities.Color;

export class GLView extends View {
    constructor(options) {
        super(options);
    }

    setProperties() {
        this.sphere  = new Sphere(this.node.addChild());
        this.plane = new Plane(this.node.addChild());

        this.mesh = new Mesh(this.dispatch);
        this.mesh.getGeometry();

        var colors = [];
        for(var i = 0; i < 4; i++) {
            var r = Math.random() * 255;
            var g = Math.random() * 255;
            var b = Math.random() * 255;

            var color = new Color([r, g, b]);
            colors.push(color);

            new Light(this.dispatch, color);
        }

        /**
         * Animate the light color every two seconds
         * to another set of random color values.
         */
        setInterval(function() {
            colors.forEach(function(color) {
                var r = Math.random() * 255;
                var g = Math.random() * 255;
                var b = Math.random() * 255;

                color.setRGB(r, g, b, {
                    duration: 1000
                });
            });
        }, 2000);
    }
}
