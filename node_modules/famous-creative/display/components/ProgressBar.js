
import View from '../View';

const defaults = {
  width: 300,
  height: 5,
  color: '#6FC5FC'
};

export default class ProgressBar extends View {
  constructor(node, options = {}) {
    options.width = options.width || defaults.width;
    options.height = options.height || defaults.height;
    options.color = options.color || defaults.color;
    super(node, options);
    this.root = new View(this.node.addChild());
    this.curve = options.curve || FamousPlatform.transitions.Curves.easeIn;
    this.options = options;
    this.maxWidth = options.width;
    this.minWidth = 0;
    this.setOpacity(0);
    this.setSizeModeAbsolute();
    this.setAbsoluteSize(options.width, options.height);
    this.bar = new Bar(this.root.addChild(), options);
    this.on(ProgressBar.PROGRESS_EVENT, (ev) => this._onProgress(ev));
    this.on(ProgressBar.START_EVENT, (ev) => this._onStart(ev));
    this.on(ProgressBar.COMPLETE_EVENT, (ev) => this._onComplete(ev));
  }
  static get PROGRESS_EVENT() {
    return 'progressBarProgressEvent';
  }
  static get START_EVENT() {
    return 'progressBarStartEvent';
  }
  static get COMPLETE_EVENT() {
    return 'progressBarCompleteEvent';
  }

  _onProgress(ev) {
    let percent = (ev.completed / ev.total);
    this.root.setOpacity(1);
    this.bar.setAbsoluteSize(percent * this.maxWidth, this.options.height, 0, {
      duration: 400,
      curve: this.curve
    });
  }

  _onStart() {
    this.root
      .haltOpacity()
      .show()
      .setOpacity(1);
    this.bar
      .haltSize()
      .setAbsoluteSize(this.minWidth, this.options.height, 0);
  }

  _onComplete() {
    this.bar
      .haltSize()
      .setAbsoluteSize(this.maxWidth, this.options.height, 0);
    this.destroy();
  }

  destroy() {
    this.root
      .haltOpacity()
      .setOpacity(0, { duration: 2000, curve: this.curve }, () => {
        this.root.hide();
        setTimeout(()=> this.onComplete(), 500);
      });
  }

  onComplete() {}
}

class Bar extends View {
  constructor(node, options) {
    super(node, options);
    this.options = options;
    this.minWidth = 0;
    this.maxWidth = options.width;
    this.setSizeModeAbsolute();
    this.setAbsoluteSize(0, options.height);
    this.moveTopLeft();
    this.createDOMElement({
      properties: {
        background: options.color
      }
    });
  }
}
