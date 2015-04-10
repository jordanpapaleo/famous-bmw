import Align from '../node_modules/famous/node_modules/famous-components/src/Align';
import Camera from '../node_modules/famous/node_modules/famous-components/src/Camera';
import EventEmitter from '../node_modules/famous/node_modules/famous-components/src/EventEmitter';
import EventHandler from '../node_modules/famous/node_modules/famous-components/src/EventHandler';
import HTMLElement from '../node_modules/famous/node_modules/famous-dom-renderables/src/HTMLElement';
import MountPoint from '../node_modules/famous/node_modules/famous-components/src/MountPoint';
import Opacity from '../node_modules/famous/node_modules/famous-components/src/Opacity';
import Origin from '../node_modules/famous/node_modules/famous-components/src/Origin';
import Position from '../node_modules/famous/node_modules/famous-components/src/Position';
import Rotation from '../node_modules/famous/node_modules/famous-components/src/Rotation';
import Scale from '../node_modules/famous/node_modules/famous-components/src/Scale';
import Size from '../node_modules/famous/node_modules/famous-components/src/Size';
import {extend} from '../src/utils/Utilities';

export class View {
  constructor(node, options) {
    this.node = node;
    this.dispatch = node.getDispatch();
    this.options = extend(options, this.constructor.DEFAULT_OPTIONS);
  }

  addChild() {
    return this.node.addChild();
  }

  //helpers for size stuff!!!
  validateSize() {
    if(!this.size) this.size = new Size(this.dispatch);
    return this.size;
  }
  setDifferentialSize() {
    this.validateSize();
    this.size.setDifferential.apply(this.size, arguments);
    return this;
  }
  setProportionalSize() {
    this.validateSize();
    this.size.setProportional.apply(this.size, arguments);
    return this;
  }
  setAbsoluteSize () {
    this.validateSize();
    this.size.setAbsolute.apply(this.size, arguments);
    return this;
  }
  getSize() {
    return this.validateSize();
  }

  //helpers for align!
  validateAlign() {
    if(!this.align) this.align = new Align(this.dispatch);
    return this.align;
  }
  setAlign() {
    this.validateAlign();
    this.align.set.apply(this.align, arguments);
    return this;
  }
  setAlignX() {
    this.validateAlign();
    this.align.setX.apply(this.align, arguments);
    return this;
  }
  setAlignY() {
    this.validateAlign();
    this.align.setY.apply(this.align, arguments);
    return this;
  }
  setAlignZ() {
    this.validateAlign();
    this.align.setZ.apply(this.align, arguments);
    return this;
  }
  getAlign() {
    return this.validateAlign();
  }

  //helpers for origin
  validateOrigin() {
    if(!this.origin) this.origin = new Origin(this.dispatch);
    return this.origin;
  }
  setOrigin() {
    this.validateOrigin();
    this.origin.set.apply(this.origin, arguments);
    return this;
  }
  setOriginX() {
    this.validateOrigin();
    this.origin.setX.apply(this.origin, arguments);
    return this;
  }
  setOriginY() {
    this.validateOrigin();
    this.origin.setY.apply(this.origin, arguments);
    return this;
  }
  setOriginZ() {
    this.validateOrigin();
    this.origin.setZ.apply(this.origin, arguments);
    return this;
  }
  getOrigin() {
    return this.validateOrigin();
  }

  //helpers for mount point
  validateMountPoint() {
    if(!this.mountpoint) this.mountpoint = new MountPoint(this.dispatch);
    return this.mountpoint;
  }
  setMountPoint() {
    this.validateMountPoint();
    this.mountpoint.set.apply(this.mountpoint, arguments);
    return this;
  }
  setMountPointX() {
    this.validateMountPoint();
    this.mountpoint.setX.apply(this.mountpoint, arguments);
    return this;
  }
  setMountPointY() {
    this.validateMountPoint();
    this.mountpoint.setY.apply(this.mountpoint, arguments);
    return this;
  }
  setMountPointZ() {
    this.validateMountPoint();
    this.mountpoint.setZ.apply(this.mountpoint, arguments);
    return this;
  }
  getMountPoint() {
    return this.validateMountPoint();
  }

  //pinhole camera
  setPinhole(px) {
    if(!this.camera) this.camera = new Camera(this.dispatch);
    this.camera.set(Camera.PINHOLE_PROJECTION, px);
  }

  //emit events
  emitCustomEvent(ev, payload) {
    if(!this.eventEmitter) this.eventEmitter = new EventEmitter(this.dispatch);
    this.eventEmitter.emit(ev, payload);
  }

  //customevents
  onCustomEvent(evName, fn) {
    if(!this.eventHandler) this.eventHandler = new EventHandler(this.dispatch);
    this.eventHandler.on(evName, fn);
  }
  //dom events
  onDomEvent(evName, methods, properties, fn) {
    var i;
    if(!this.el) this.el = new HTMLElement(this.dispatch);
    if(properties instanceof Array) {
      if(!(evName instanceof Array)) evName = [evName];
      for(i = 0; i < evName.length; i++) {
        this.el.on(evName[i], methods, properties);
        this.dispatch.registerTargetedEvent(evName[i], fn);
      }
    } else {
      if(!(evName instanceof Array)) evName = [evName];
      for(i = 0; i < evName.length; i++) {
        this.el.on(evName[i], methods);
        this.dispatch.registerTargetedEvent(evName[i], properties);
      }
    }
  }
  //rotation
  validateRotation() {
    if(!this.rotation) this.rotation = new Rotation(this.dispatch);
    return this.rotation;
  }
  setRotation() {
    this.validateRotation();
    this.rotation.set.apply(this.rotation, arguments);
    return this;
  }
  setRotationX() {
    this.validateRotation();
    this.rotation.setX.apply(this.rotation, arguments);
    return this;
  }
  setRotationY() {
    this.validateRotation();
    this.rotation.setY.apply(this.rotation, arguments);
    return this;
  }
  setRotationZ() {
    this.validateRotation();
    this.rotation.setZ.apply(this.rotation, arguments);
    return this;
  }
  getRotation() {
    return this.validateRotation();
  }

  //POSITION
  validatePosition() {
    if(!this.position) this.position = new Position(this.dispatch);
    return this.position;
  }
  setPosition() {
    this.validatePosition();
    this.position.set.apply(this.position, arguments);
    return this;
  }
  setPositionX() {
    this.validatePosition();
    this.position.setX.apply(this.position, arguments);
    return this;
  }
  setPositionY() {
    this.validatePosition();
    this.position.setY.apply(this.position, arguments);
    return this;
  }
  setPositionZ() {
    this.validatePosition();
    this.position.setZ.apply(this.position, arguments);
    return this;
  }
  getPosition() {
    return this.validatePosition();
  }

  //scale
  validateScale() {
    if(!this.scale) this.scale = new Scale(this.dispatch);
    return this.scale;
  }
  setScale() {
    this.validateScale();
    this.scale.set.apply(this.scale, arguments);
    return this;
  }
  setScaleX() {
    this.validateScale();
    this.scale.setX.apply(this.scale, arguments);
    return this;
  }
  setScaleY() {
    this.validateScale();
    this.scale.setY.apply(this.scale, arguments);
    return this;
  }
  setScaleZ() {
    this.validateScale();
    this.scale.setZ.apply(this.scale, arguments);
    return this;
  }
  getScale() {
    return this.validateScale();
  }

  //opacity
  validateOpacity() {
    if(!this.opacity) this.opacity = new Opacity(this.dispatch);
    return this.opacity;
  }
  setOpacity() {
    this.validateOpacity();
    this.opacity.set.apply(this.opacity, arguments);
    return this;
  }
  getOpacity() {
    return this.validateOpacity();
  }

  //HTML STUFF
  validateHTML() {
    if(!this.el) this.el = new HTMLElement(this.dispatch);
    return this.el;
  }
  createHTMLElement(options) {
    this.validateHTML();
    if(options && options.tagName) this.setHTMLTag(options.tagName);
    if(options && options.properties) this.setHTMLProperties(options.properties);
    if(options && options.classes) this.setHTMLClasses(options.classes);
    if(options && options.attributes) this.setHTMLAttributes(options.attributes);
    if(options && options.content) this.setHTMLContent(options.content);
    if(options && options.trueSize) this.setHTMLTrueSize(options.trueSize);
  }

  setHTMLTrueSize(trueSize) {
    this.validateHTML();
    this.el.trueSize(trueSize[0], trueSize[1]);
    return this;
  }
  setHTMLTag(tagName) {
    this.validateHTML();
    this.el.tagName(tagName);
    return this;
  }
  setHTMLContent(content) {
    this.validateHTML();
    this.el.content(content);
    return this;
  }
  setHTMLClasses(classes) {
    this.validateHTML();
    for(var i = 0; i < classes.length; i++) {
      this.el.addClass(classes[i]);
    }
    return this;
  }
  setHTMLAttributes(attributes) {
    this.validateHTML();
    for(var attrName in attributes) {
      this.el.attribute(attrName, attributes[attrName]);
    }
    return this;
  }
  setHTMLProperties(properties) {
    this.validateHTML();
    for(var propertyName in properties) {
      this.el.property(propertyName, properties[propertyName]);
    }
    return this;
  }
  getHTMLElement() {
    return this.validateHTML();
  }

  validateComponent(componentName) {
    if(!this[componentName]) {
      if(componentName === 'size') return console.log('cant edit size yet sowwie');
      if(componentName === 'position') return this.validatePosition();
      if(componentName === 'scale') return this.validateScale();
      if(componentName === 'origin') return this.validateOrigin();
      if(componentName === 'align') return this.validateAlign();
      if(componentName === 'rotation') return this.validateRotation();
      if(componentName === 'mountpoint') return this.validateMountPoint();
      if(componentName === 'opacity') return this.validateOpacity();
    }
    return this[componentName];
  }
}
