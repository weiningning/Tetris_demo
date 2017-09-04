let Local = function () {
    let game;
    let timer = null;
    /*时间计数器*/
    let timecount = 0;
    /*时间*/
    let time = 0;

    const interval = 250;
    let generateType = () => {
        return Math.ceil((Math.random() * 7) - 1);
    };
    let generateDir = () => {
        return Math.ceil((Math.random() * 4) - 1);
    };
    /*绑定键盘事件*/
    let bindKeyEvent = () => {
        document.onkeydown = (e) => {
            if (e.keyCode === 38) {
                game.rotate();
            } else if (e.keyCode === 39) {
                game.right();

            } else if (e.keyCode === 40) {
                game.down();
            } else if (e.keyCode === 37) {
                game.left();

            } else if (e.keyCode === 32) {
                game.fall();
            }
        }
    };
    /*计时函数*/
    let timeFunc = () => {
        timecount++;
        if (timecount == 4) {
            timecount = 0;
            time = time + 1;
            game.setTime(time);
            if (time % 10 == 0) {
                game.addTailLine(generateBottomLine(1));
            }
        }
    }

    /*移动，到达，消除*/
    let move = function () {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            let line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            let gameOver = game.checkGameOver();
            if (gameOver) {
                game.result('fail');
                stop()
            } else {
                game.performNext(generateType(), generateDir());
            }
        }
    };
    /*随机生成干扰行*/
    let generateBottomLine = (lineNum) => {
        let lines = [];
        for (let i = 0; i < lineNum; i++) {
            var line = [];
            for (let j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2 - 1))
            }
            lines.push(line);
        }
        return lines;
    };
    /*游戏开始*/
    let start = function () {
        let doms = {
            gameDiv: document.querySelector('.main'),
            nextDiv: document.querySelector('.next'),
            timeDiv: document.querySelector('.time span'),
            scoreDiv: document.querySelector('.score span'),
            resultDiv: document.querySelector('.result'),

        };
        game = new Game();
        game.init(doms, generateType(), generateDir());
        bindKeyEvent();
        game.performNext(generateType(), generateDir());
        timer = setInterval(move, interval);
    };
    /*游戏暂停*/
    let stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };
    this.start = start;
}