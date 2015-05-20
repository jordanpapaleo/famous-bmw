var Image = {
    _currentImage: 0,
    _maxCount: 35
};

Image.getCurrent = function() {
    return this._currentImage;
};

Image.getMax = function() {
    return this._maxCount;
};

Image.getNext = function() {
    this._currentImage++;
    return this._currentImage;
};

export default Image;
