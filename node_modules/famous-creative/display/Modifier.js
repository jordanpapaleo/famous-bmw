const Align = FamousPlatform.components.Align;
const FamousEngine = FamousPlatform.core.FamousEngine;
const MountPoint = FamousPlatform.components.MountPoint;
const Opacity = FamousPlatform.components.Opacity;
const Origin = FamousPlatform.components.Origin;
const Position = FamousPlatform.components.Position;
const Rotation = FamousPlatform.components.Rotation;
const Scale = FamousPlatform.components.Scale;
const Size = FamousPlatform.components.Size;

const radiansMultiplier = Math.PI / 180;
const degreesMultiplier = 180 / Math.PI;

/**
 * Converts degrees to radians.
 * @method  toRadians
 * @class   Modifier
 * @private
 * @param   {Number}  degrees  The degree value to convert.
 * @return  {Number}  The converted value in radians.
 */
function toRadians(degrees) {
  if (degrees === undefined) return null;
  return degrees * radiansMultiplier;
}

/**
 * Converts radians to degrees.
 * @method  toRadians
 * @class   Modifier
 * @private
 * @param   {Number}  radians  The radian value to convert.
 * @return  {Number}  The converted value in degrees.
 */
function toDegrees(radians) {
  if (radians === undefined) return null;
  return radians * degreesMultiplier;
}

function noConversion(value) {
  return value;
}

export default class Modifier {
  /**
   * Base class which contains all modifiers and contains no visual components.
   * @method  constructor
   * @class   Modifier
   * @param   {Node}    node                  The {@link Node} to attach this Modifier to.
   * @param   {Object}  <options>             Optional options.
   * @param   {Object}  <options.useDegrees>  Accept degrees when calling rotation methods, otherwise use radians.
   */
  constructor(node, options = {}) {
    this.node = node;
    this.options = options;
    this.id = this.node.getLocation();
    if (options.useDegrees) {
      this.setRotationVal = toRadians;
      this.getRotationVal = toDegrees;
    } else {
      this.setRotationVal = noConversion;
      this.getRotationVal = noConversion;
    }
  }

  // ---------------------------------------------------------------------------
  // helpers for Size enums
  static get RELATIVE_SIZE() { return Size.RELATIVE; }
  static get ABSOLUTE_SIZE() { return Size.ABSOLUTE; }
  static get RENDER_SIZE() { return Size.RENDER; }
  static get DEFAULT_SIZE() { return Size.DEFAULT; }

  // ---------------------------------------------------------------------------
  // Getter functions for this.node
  getChildren() { return this.node.getChildren(); }
  getComputedValue() { return this.getComputedValue(); }
  getId() { return this.node.getLocation(); }
  getParent() { return this.node.getParent(); }
  getValue() { return this.node.getValue(); }

  // ---------------------------------------------------------------------------
  // State info for this.node
  isMounted() { return this.node.isMounted(); }
  isShown() { return this.node.isShown(); }

  // ---------------------------------------------------------------------------
  // Scene graph modifiers
  addChild(child) { return this.node.addChild(child); }
  removeChild(child) { return this.node.removeChild(child); }
  // Attach this node and it's subtree by setting it as a child of the passed in parent.
  attachTo(parent) {
    parent.addChild(this.node);
    this.node.show();
    return this;
  }
  // Detach this node from the scene graph by removing it as a child of its parent.
  detach() {
    this.getParent().removeChild(this.node);
    return this;
  }
  hide() {
    this.node.hide();
    return this;
  }
  show() {
    this.node.show();
    return this;
  }

  // ---------------------------------------------------------------------------
  // Update functions for this.node
  requestUpdate(requester) {
    FamousEngine.requestUpdate(requester || this);
    return this;
  }
  requestUpdateOnNextTick(requester) {
    FamousEngine.requestUpdateOnNextTick(requester || this);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for align
  validateAlign() {
    if (!this.align) this.align = new Align(this.node);
  }
  haltAlign() {
    this.validateAlign();
    this.align.halt();
    return this;
  }
  // Align getters
  getAlignValue() {
    this.validateAlign();
    return this.align.getValue();
  }
  getAlignX() {
    this.validateAlign();
    return this.align.getX();
  }

  getAlignY() {
    this.validateAlign();
    return this.align.getY();
  }
  getAlignZ() {
    this.validateAlign();
    return this.align.getZ();
  }
  // Align setters
  setAlignValue() {
    this.validateAlign();
    this.align.setValue(...arguments);
    return this;
  }
  setAlign() {
    this.validateAlign();
    this.align.set(...arguments);
    return this;
  }
  setAlignX() {
    this.validateAlign();
    this.align.setX(...arguments);
    return this;
  }
  setAlignY() {
    this.validateAlign();
    this.align.setY(...arguments);
    return this;
  }
  setAlignZ() {
    this.validateAlign();
    this.align.setZ(...arguments);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for mount point
  validateMountPoint() {
    if (!this.mountpoint) this.mountpoint = new MountPoint(this.node);
  }
  haltMountPoint() {
    this.validateMountPoint();
    this.mountpoint.halt();
    return this;
  }
  // MountPoint getters
  getMountPointValue() {
    this.validateMountPoint();
    return this.mountpoint.getValue();
  }
  getMountPointX() {
    this.validateMountPoint();
    return this.mountpoint.getX();
  }
  getMountPointY() {
    this.validateMountPoint();
    return this.mountpoint.getY();
  }
  getMountPointZ() {
    this.validateMountPoint();
    return this.mountpoint.getZ();
  }
  // MountPoint setters
  setMountPointValue() {
    this.validateMountPoint();
    this.mountpoint.setValue(...arguments);
    return this;
  }
  setMountPoint() {
    this.validateMountPoint();
    this.mountpoint.set(...arguments);
    return this;
  }
  setMountPointX() {
    this.validateMountPoint();
    this.mountpoint.setX(...arguments);
    return this;
  }
  setMountPointY() {
    this.validateMountPoint();
    this.mountpoint.setY(...arguments);
    return this;
  }
  setMountPointZ() {
    this.validateMountPoint();
    this.mountpoint.setZ(...arguments);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for opacity
  validateOpacity() {
    if (!this.opacity) this.opacity = new Opacity(this.node);
  }
  haltOpacity() {
    this.validateOpacity();
    this.opacity.halt();
    return this;
  }
  // Opacity getters
  getOpacityValue() {
    this.validateOpacity();
    return this.opacity.getValue();
  }
  getOpacity() {
    this.validateOpacity();
    return this.opacity.get();
  }
  // Opacity setters
  setOpacityValue() {
    this.validateOpacity();
    this.opacity.setValue(...arguments);
    return this;
  }
  setOpacity() {
    this.validateOpacity();
    this.opacity.set(...arguments);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for origin
  validateOrigin() {
    if (!this.origin) this.origin = new Origin(this.node);
  }
  haltOrigin() {
    this.validateOrigin();
    this.origin.halt();
    return this;
  }
  // Origin getters
  getOriginValue() {
    this.validateOrigin();
    return this.origin.getValue();
  }
  getOriginX() {
    this.validateOrigin();
    return this.origin.getX();
  }
  getOriginY() {
    this.validateOrigin();
    return this.origin.getY();
  }
  getOriginZ() {
    this.validateOrigin();
    return this.origin.getZ();
  }
  // Origin setters
  setOriginValue() {
    this.validateOrigin();
    this.origin.setValue(...arguments);
    return this;
  }
  setOrigin() {
    this.validateOrigin();
    this.origin.set(...arguments);
    return this;
  }
  setOriginX() {
    this.validateOrigin();
    this.origin.setX(...arguments);
    return this;
  }
  setOriginY() {
    this.validateOrigin();
    this.origin.setY(...arguments);
    return this;
  }
  setOriginZ() {
    this.validateOrigin();
    this.origin.setZ(...arguments);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for position
  validatePosition() {
    if (!this.position) this.position = new Position(this.node);
  }
  haltPosition() {
    this.validatePosition();
    this.position.halt();
    return this;
  }
  // Position getters
  getPositionValue() {
    this.validatePosition();
    return this.position.getValue();
  }
  getPositionX() {
    this.validatePosition();
    return this.position.getX();
  }
  getPositionY() {
    this.validatePosition();
    return this.position.getY();
  }
  getPositionZ() {
    this.validatePosition();
    return this.position.getZ();
  }
  // Position setters
  setPositionValue() {
    this.validatePosition();
    this.position.setValue(...arguments);
    return this;
  }
  setPosition() {
    this.validatePosition();
    this.position.set(...arguments);
    return this;
  }
  setPositionX() {
    this.validatePosition();
    this.position.setX(...arguments);
    return this;
  }
  setPositionY() {
    this.validatePosition();
    this.position.setY(...arguments);
    return this;
  }
  setPositionZ() {
    this.validatePosition();
    this.position.setZ(...arguments);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for rotation
  validateRotation() {
    if (!this.rotation) this.rotation = new Rotation(this.node);
  }
  haltRotation() {
    this.validateRotation();
    this.rotation.halt();
    return this;
  }
  // Rotation getters
  getRotationValue() {
    this.validateRotation();
    let val = this.rotation.getValue();
    val.x = this.getRotationVal(val.x);
    val.y = this.getRotationVal(val.y);
    val.z = this.getRotationVal(val.z);
    return val;
  }
  getRotationX() {
    this.validateRotation();
    return this.getRotationVal(this.rotation.getX());
  }
  getRotationY() {
    this.validateRotation();
    return this.getRotationVal(this.rotation.getY());
  }
  getRotationZ() {
    this.validateRotation();
    return this.getRotationVal(this.rotation.getZ());
  }
  // Rotation setters
  setRotationValue(state = {}) {
    this.validateRotation();
    state.x = this.setRotationVal(state.x);
    state.y = this.setRotationVal(state.y);
    state.z = this.setRotationVal(state.z);
    this.rotation.setValue(state);
    return this;
  }
  setRotation(x, y, z, options, callback) {
    this.validateRotation();
    this.rotation.set(this.setRotationVal(x), this.setRotationVal(y), this.setRotationVal(z), options, callback);
    return this;
  }
  setRotationX(val, options, callback) {
    this.validateRotation();
    this.rotation.setX(this.setRotationVal(val), options, callback);
    return this;
  }
  setRotationY(val, options, callback) {
    this.validateRotation();
    this.rotation.setY(this.setRotationVal(val), options, callback);
    return this;
  }
  setRotationZ(val, options, callback) {
    this.validateRotation();
    let value = this.setRotationVal(val);
    this.rotation.setZ(value, options, callback);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for scale
  validateScale() {
    if (!this.scale) this.scale = new Scale(this.node);
  }
  haltScale() {
    this.validateScale();
    this.scale.halt();
    return this;
  }
  // Scale getters
  getScaleValue() {
    this.validateScale();
    return this.scale.getValue();
  }
  getScaleX() {
    this.validateScale();
    return this.scale.getX();
  }
  getScaleY() {
    this.validateScale();
    return this.scale.getY();
  }
  getScaleZ() {
    this.validateScale();
    return this.scale.getZ();
  }
  // Scale setters
  setScaleValue() {
    this.validateScale();
    this.scale.setValue(...arguments);
    return this;
  }
  setScale() {
    this.validateScale();
    this.scale.set(...arguments);
    return this;
  }
  setScaleX() {
    this.validateScale();
    this.scale.setX(...arguments);
    return this;
  }
  setScaleY() {
    this.validateScale();
    this.scale.setY(...arguments);
    return this;
  }
  setScaleZ() {
    this.validateScale();
    this.scale.setZ(...arguments);
    return this;
  }

  // ---------------------------------------------------------------------------
  // helpers for size
  validateSize() {
    if (!this.size) this.size = new Size(this.node);
  }
  haltSize() {
    this.validateSize();
    this.size.halt();
    return this;
  }
  // Size getters
  getSizeValue() {
    this.validateSize();
    return this.size.getValue();
  }
  getSize() {
    this.validateSize();
    return this.size.get();
  }
  // Size setters
  setSizeValue() {
    this.validateSize();
    this.size.setValue(...arguments);
    return this;
  }
  setDifferentialSize() {
    this.validateSize();
    this.size.setDifferential(...arguments);
    return this;
  }
  setProportionalSize() {
    this.validateSize();
    this.size.setProportional(...arguments);
    return this;
  }
  setAbsoluteSize() {
    this.validateSize();
    this.size.setAbsolute(...arguments);
    return this;
  }
  setSizeMode(x, y, z) {
    this.node.setSizeMode(x, y, z);
    return this;
  }
  setSizeModeAbsolute() {
    this.node.setSizeMode(Size.ABSOLUTE, Size.ABSOLUTE, Size.ABSOLUTE);
    return this;
  }
  setSizeModeRelative() {
    this.node.setSizeMode(Size.RELATIVE, Size.RELATIVE, Size.RELATIVE);
    return this;
  }
  setSizeModeRender() {
    this.node.setSizeMode(Size.RENDER, Size.RENDER, Size.RENDER);
    return this;
  }

  // ---------------------------------------------------------------------------
  // Convenience Methods
  moveTopLeft() {
    this.setAlign(0, 0, 0.5).setMountPoint(0, 0, 0.5).setOrigin(0, 0, 0.5);
    return this;
  }
  moveTopCenter() {
    this.setAlign(0.5, 0, 0.5).setMountPoint(0.5, 0, 0.5).setOrigin(0.5, 0, 0.5);
    return this;
  }
  moveTopRight() {
    this.setAlign(1, 0, 0.5).setMountPoint(1, 0, 0.5).setOrigin(1, 0, 0.5);
    return this;
  }
  moveCenterLeft() {
    this.setAlign(0, 0.5, 0.5).setMountPoint(0, 0.5, 0.5).setOrigin(0, 0.5, 0.5);
    return this;
  }
  moveCenter() {
    this.setAlign(0.5, 0.5, 0.5).setMountPoint(0.5, 0.5, 0.5).setOrigin(0.5, 0.5, 0.5);
    return this;
  }
  moveCenterRight() {
    this.setAlign(1, 0.5, 0.5).setMountPoint(1, 0.5, 0.5).setOrigin(1, 0.5, 0.5);
    return this;
  }
  moveBottomLeft() {
    this.setAlign(0, 1, 0.5).setMountPoint(0, 1, 0.5).setOrigin(0, 1, 0.5);
    return this;
  }
  moveBottomCenter() {
    this.setAlign(0.5, 1, 0.5).setMountPoint(0.5, 1, 0.5).setOrigin(0.5, 1, 0.5);
    return this;
  }
  moveBottomRight() {
    this.setAlign(1, 1, 0.5).setMountPoint(1, 1, 0.5).setOrigin(1, 1, 0.5);
    return this;
  }
}
