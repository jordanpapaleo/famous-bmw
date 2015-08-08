const CoreFamousEngine = FamousPlatform.core.FamousEngine;

require('./reset.min.css');

class FamousEngineInit {
  /**
   * Boilerplate code to setup the Famous Engine.
   * @method  constructor
   */
  constructor() {
    this._currentSelector = null;
    this._initialized = false;
    this._rootNode = {};
  }

  init() {
    if (this._initialized) return this;
    this._initialized = true;

    // Boilerplate
    CoreFamousEngine.init();

    return this;
  }

  /**
   * Creates a root {@link Scene} for a given selector and adds a root Node to that {@link Scene}.
   *
   * @example
   *
   *     FamousEngine
   *       .init()
   *       .createScene('#app')
   *       .createCamera();
   *     window.app = new View(FamousEngine.getRootNode());
   *
   * @method  createScene
   * @param   {String}        selector  The query selector used to instantiate the {@link Scene}. If no selector is passed then `body` is used.
   * @return  {FamousEngine}  Singleton instance of the FamousEngine.
   */
  createScene(selector) {
    this._currentSelector = selector;
    CoreFamousEngine.createScene(selector);
    this.addRootNode(selector);
    return this;
  }

  createContext(selector) {
    console.warn('FamousEngine.createContext() is deprecated. Use FamousEngine.createScene() instead.');
    return this.createScene(selector);
  }

  /**
   * Retrieve the Scene for a given selector.
   * @method  getScene
   * @param   {String}    [selector]   The query selector. Defaults to the selector used with createScene().
   * @return  {Scene}   The Famous {@link Scene} associated with the selector.
   */
  getScene(selector) {
    if (!selector) selector = this._currentSelector;
    if (!CoreFamousEngine.getContext(selector)) this.createScene(selector);
    return CoreFamousEngine.getContext(selector);
  }

  getContext(selector) {
    console.warn('FamousEngine.getContext() is deprecated. Use FamousEngine.getScene() instead.');
    return this.getScene(selector);
  }

  /**
   * Adds a single root {@link Node} the Famous Context for a given selector.
   * @method  addRootNode
   * @param   {String}     [selector]   The query selector. Defaults to the selector used with createScene().
   * @return  {Context}    The Famous Context associated with the selector.
   */
  addRootNode(selector) {
    if (!selector) selector = this._currentSelector;
    if (!this._rootNode[selector]) this._rootNode[selector] = this.getScene(selector).addChild();
    return this;
  }

  /**
   * Retrieve the root {@link Node} for a given selector.
   * @method  getRootNode
   * @param   {String}     [selector]  The query selector. Defaults to the selector used with createScene().
   * @return  {Node}       The root {@link Node} for a given selector.
   */
  getRootNode(selector) {
    if (!selector) selector = this._currentSelector;
    if (!this._rootNode[selector]) this.addRootNode(selector);
    return this._rootNode[selector];
  }

  /**
   * Add a child to the root {@link Node}.
   * @method  addChild
   * @param   {String}  [selector]  The query selector. Defaults to the selector used with createScene().
   * @return  {Node}    The new child {@link Node} that was created.
   */
  addChild(selector) {
    if (!selector) selector = this._currentSelector;
    return this.getRootNode(selector).addChild();
  }
}

let FamousEngine = new FamousEngineInit();

export default FamousEngine;
