const CallbackStore = FamousPlatform.utilities.CallbackStore;

class EventEmitterSingleton {
  constructor() {
    this._events = new CallbackStore();
  }
  on(evName, callback) {
    this._events.on(evName, callback);
  }
  off(evName, callback) {
    this._events.on(evName, callback);
  }
  trigger(evName, payload) {
    this._events.trigger(evName, payload);
  }
}

let EventEmitter = new EventEmitterSingleton();

export default EventEmitter;
