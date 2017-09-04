function Game() {
    let nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    ];
    let nextDivs = [];
    let gameDivs = [];
    let cur, gameDiv, nextDiv, timeDiv, scoreDiv, resultDiv, next;
    /*分数*/
    let score = 0;
    let initDiv = (container, data, divs) => {
        for (let i = 0; i < data.length; i++) {
            let div = [];
            for (let j = 0; j < data[0].length; j++) {
                let odiv = document.createElement('div');
                odiv.className = 'none';
                odiv.style.top = (i * 20) + 'px';
                odiv.style.left = (j * 20) + 'px';
                container.appendChild(odiv);
                div.push(odiv)
            }
            divs.push(div);
        }
    };
    /*将方块渲染到平板上*/
    let refreshGame = (data, divs) => {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] === 0) {
                    divs[i][j].className = 'none'
                } else if (data[i][j] === 1) {
                    divs[i][j].className = 'done'
                } else if (data[i][j] === 2) {
                    divs[i][j].className = 'current'
                }
            }
        }
    };
    /*监测点是否到边界*/
    let check = (pos, x, y) => {
        if (pos.x + x < 0) {
            return false
        } else if (pos.x + x >= gameData.length) {
            return false
        } else if (pos.y + y < 0) {
            return false
        } else if (pos.y + y >= gameData[0].length) {
            return false
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false
        } else {
            return true
        }
    };
    /*监测数据是否合法*/
    let isValid = (pos, data) => {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) { //16个单元格中有意义的格子做判断
                    if (!check(pos, i, j)) {
                        return false
                    }
                }
            }
        }
        return true
    };

    /*清除当前运动的块数据*/
    let clearData = () => {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                if (check(cur._origin, i, j)) {//当cur和已经fixed有交叉时，这个判断中gameData[pos.x + x][pos.y + y] == 1起作用／
                    gameData[cur._origin.x + i][cur._origin.y + j] = 0;
                }
            }
        }
        //refreshGame(gameData, gameDivs);
    };
    /*更改gameData*/
    let setData = () => {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                if (check(cur._origin, i, j)) {
                    gameData[cur._origin.x + i][cur._origin.y + j] = cur.data[i][j];
                }
            }
        }
    };
    let rotate = () => {
        if (cur.canrotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshGame(gameData, gameDivs);
        }

    };
    let down = () => {
        if (cur.candown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshGame(gameData, gameDivs);
            return true
        } else {
            return false
        }
    };
    let left = () => {
        if (cur.canleft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshGame(gameData, gameDivs);
        }

    };
    let right = () => {
        if (cur.canright(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshGame(gameData, gameDivs);
        }

    };
    let fixed = () => {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                console.log(gameData[cur._origin.x + i]);
                if (check(cur._origin, i, j)) {//因为一个模型可能没有占满16个格（一般最后一行不会被占）此时，[cur._origin.x + i]可能等于20，gameData[cur._origin.x + i]为undefined；导致gameData[cur._origin.x + i][cur._origin.y + j]报错，不能将2变为1；
                    if (gameData[cur._origin.x + i][cur._origin.y + j] == 2) {
                        gameData[cur._origin.x + i][cur._origin.y + j] = 1
                    }
                }
            }
        }
        refreshGame(gameData, gameDivs)
    };
    /*满行清除*/
    let checkClear = () => {
        let line = 0;
        for (let i = gameData.length - 1; i >= 0; i--) {
            let clear = true;
            for (let j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line++;
                for (let m = i; m > 0; m--) {
                    for (let n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m - 1][n]
                    }
                }
                for (let n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0
                }
                i++;
            }
        }
        return line;
    };
    /*游戏结束*/
    let checkGameOver = () => {
        let over = false;
        for (let i = 0; i < gameData[0].length; i++) {
            if (gameData[0][i] == 1) {
                over = true;
            }
        }
        return over;
    };
    /*下一个出现*/
    let performNext = (type, dir) => {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshGame(gameData, gameDivs);
        refreshGame(next.data, nextDivs);
    };
    /*设置时间*/
    let setTime = (time) => {
        timeDiv.innerHTML = time;
    };
    /*获得分数*/
    let addScore = (line) => {
        let s = 0;
        switch (line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;

    };
    /*游戏结果*/
    let result = (flag) => {
        if (flag) {
            resultDiv.innerHTML = '狗带'
        } else {
            resultDiv.innerHTML = '你居然也能赢！？'
        }
    };
    /*底部增加行*/
    let addTailLine = (lines) => {
        for (let i = 0; i < gameData.length - lines.length; i++) {
            gameData[i] = gameData[i + lines.length];
        }
        for (let i = 0; i < lines.length; i++) {
            gameData[gameData.length - lines.length + i] = lines[i];
        }
        cur._origin.x = cur._origin.x - lines.length;
        if (cur._origin.x < 0) {
            cur._origin.x = 0;
        }
        refreshGame(gameData, gameDivs);
    };
    let init = (doms, type, dir) => {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        next = SquareFactory.prototype.make(type, dir);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, nextData, nextDivs);
        //refreshGame(next.data, nextDivs);
    };
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function () {
        while (down()) {
        }
    };
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.result = result;
    this.addTailLine = addTailLine;
}