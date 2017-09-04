function Remote() {
    let game;
    let start = function (type, dir) {
        let doms = {
            gameDiv: document.querySelector('.remote_main'),
            nextDiv: document.querySelector('.remote_next'),
            timeDiv: document.querySelector('.remote_time span'),
            scoreDiv: document.querySelector('.remote_score span'),
            resultDiv: document.querySelector('.remote_result'),

        };
        game = new Game();
        game.init(doms, type, dir)

    };
    let bindEvents = function () {
        document.querySelector('#down').onclick = function () {
            game.down()
        };
        document.querySelector('#left').onclick = function () {
            game.left()
        };
        document.querySelector('#right').onclick = function () {
            game.right()
        };
        document.querySelector('#rotate').onclick = function () {
            game.rotate()
        };
        document.querySelector('#fall').onclick = function () {
            game.fall()
        };
        document.querySelector('#fixed').onclick = function () {
            game.fixed()
        };
        document.querySelector('#performNext').onclick = function () {
            game.performNext(2,2)
        };
        document.querySelector('#checkClear').onclick = function () {
            game.checkClear()
        };
        document.querySelector('#checkGameOver').onclick = function () {
            game.checkGameOver()
        };
        document.querySelector('#setTime').onclick = function () {
            game.setTime(20)
        };
        document.querySelector('#addScore').onclick = function () {
            game.addScore(2)
        };
        document.querySelector('#result').onclick = function () {
            game.result(true)
        };
        document.querySelector('#addTailLine').onclick = function () {
            game.addTailLine([[1,1,1,1,1,0,0,1,0,0]])
        }


    };
    this.start = start;
    this.bindEvents = bindEvents;
}