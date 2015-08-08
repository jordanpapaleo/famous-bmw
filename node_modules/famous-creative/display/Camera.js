import Modifier from './Modifier';

export default class Camera extends Modifier {
  /**
   * Creates a Camera and attaches it to the {@link Node}.
   * @method  constructor
   * @param   {Node}       [node]         The node to attach the Camera to.
   * @param   {Object}     options        Options to pass along to the Camera.
   * @param   {Number}     options.depth  The depth to set the Camera to. Defaults to 2000.
   * @return  {Modifier}   The {@link Modifier} that contains the Camera.
   */
  constructor(node, options = {}) {
    super(node, options);

    options.depth = options.depth || 2000;

    this.camera = new FamousPlatform.components.Camera(node);
    this.camera.setDepth(options.depth);
  }

  getValue() { this.camera.getValue(...arguments); }
  setValue() { this.camera.setValue(...arguments); }
  set() { this.camera.set(...arguments); }
  setDepth() { this.camera.setDepth(...arguments); }
  setFrustum() { this.camera.setFrustum(...arguments); }
  setFlat() { this.camera.setFlat(...arguments); }
}
