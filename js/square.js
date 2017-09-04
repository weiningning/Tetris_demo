let SquareF = function () {
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    this._origin = {
        x: 0,
        y: 0
    };
    //方向
    this.dir = 0;
};

SquareF.prototype.canrotate = function (isValid) {
    let d = this.dir + 1;
    if (d === 4) d = 0;
    let test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[0].length; j++) {
            test[i][j] = this.rotates[d][i][j];
        }
    }
    return isValid(this._origin, test);
};
SquareF.prototype.rotate = function (num) {
    num = num ? num : 1;
    this.dir = this.dir + 1;
    if (this.dir === 4) this.dir = 0;

    for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[0].length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j];//this.data已被初始化方块的时候赋过值了
        }
    }

};

SquareF.prototype.candown = function (isValid) {
    let test = {};
    test.x = this._origin.x + 1;
    test.y = this._origin.y;
    return isValid(test, this.data);
};
SquareF.prototype.down = function () {
    this._origin.x = this._origin.x + 1;

};

SquareF.prototype.canleft = function (isValid) {
    let test = {};
    test.x = this._origin.x;
    test.y = this._origin.y - 1;
    return isValid(test, this.data);
};
SquareF.prototype.left = function () {
    this._origin.y = this._origin.y - 1;

};

SquareF.prototype.canright = function (isValid) {
    let test = {};
    test.x = this._origin.x;
    test.y = this._origin.y + 1;
    return isValid(test, this.data);
};
SquareF.prototype.right = function () {
    this._origin.y = this._origin.y + 1;

};
