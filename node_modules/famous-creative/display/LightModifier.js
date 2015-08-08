/**
 * Modifier that contains a WebGL Light
 */
import Modifier from './Modifier';

const Color = FamousPlatform.utilities.Color;

export default class LightModifier extends Modifier {
  constructor(node, options = {}) {
    super(node, options);
    if (options.position) this.setPosition(...options.position);
    if (options.rotation) this.setRotation(...options.rotation);
    if (options.visible) {
      this.mesh = new FamousPlatform.webglRenderables.Mesh(this.node);
      this.geometry = new FamousPlatform.webglGeometries.GeodesicSphere();
      this.mesh.setGeometry(this.geometry);
      this.mesh.setBaseColor('#ffffff');
      this
        .setSizeModeAbsolute()
        .setAbsoluteSize(40, 40, 40)
        .setMountPoint(0.5, 0.5, 0.5)
        .setOrigin(0.5, 0.5, 0.5);
    }
    this.light = new FamousPlatform.webglRenderables[`${(options.type === 'ambient') ? 'Ambient' : 'Point'}Light`](this.node);
    this.setLightColor(options.color);
  }

  /**
   * Sets the lights color.
   * @method  setLightColor
   * @param   {Color|String}  color  The color to set the light to.
   */
  setLightColor(color = '#ffffff') {
    this.lightColor = (Color.isColorInstance(color) === 'instance') ? color : new Color(color);
    this.light.setColor(this.lightColor);
    return this;
  }

  /**
   * Update the lights color with an optional transition and callback.
   * @method  updateLightColor
   * @param   {String}          color       The color that get's passed along to Color.set.
   * @param   {Object}          transition  The transition that get's passed along to Color.set.
   * @param   {Function}        callback    The callback function that get's passed along to Color.set.
   * @return  {LightModifier}   This {@link LightModifier} instance.
   */
  updateLightColor(color = '#ffffff', transition, callback) {
    this.lightColor.set(color, transition, callback);
    return this;
  }
}
