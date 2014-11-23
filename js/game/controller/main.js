var params = [
    "Universe",
    "$interval",
    GameController
];
angular.module("GameOfLife").controller("GameController", params);

function GameController(Universe, $interval) {
    "use strict";
    var self = this;
    this.isRunning = false;

    this.init = function() {
        this.universe = new Universe(25, 40);
    }

    this.setLiveCell = function(x, y) {
        this.universe.setLiveCell(x, y);
    };

    this.evolve = function() {
        if (this.isRunning) {
            $interval.cancel(self.interval);
            this.isRunning = false;
        } else {
            this.interval = $interval(function() {
                self.universe.evolve();
            }, 300);
            this.isRunning = true;
        }
    };

    this.setGosperGliderGun = function() {
        var cellList = getGosperGliderGunCellList();
        this.init();
        for (var i = 0; i < cellList.length; i++)
            this.setLiveCell(cellList[i][0], cellList[i][1]);
    };

    this.reset = function() {
        this.init();
    };

    this.nextStep = function() {
        this.universe.evolve();
    };

    this.init();

    function getGosperGliderGunCellList() {
        return [
            [7, 3],
            [7, 4],
            [8, 3],
            [8, 4],
            [6, 13],
            [7, 13],
            [8, 13],
            [5, 14],
            [9, 14],
            [4, 15],
            [4, 16],
            [10, 15],
            [10, 16],
            [7, 17],
            [5, 18],
            [9, 18],
            [6, 19],
            [7, 19],
            [8, 19],
            [7, 20],
            [4, 23],
            [4, 24],
            [5, 23],
            [5, 24],
            [6, 23],
            [6, 24],
            [3, 25],
            [7, 25],
            [2, 27],
            [3, 27],
            [7, 27],
            [8, 27],
            [4, 37],
            [4, 38],
            [5, 37],
            [5, 38]
        ];
    }
}