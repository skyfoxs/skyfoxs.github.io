angular.module("GameOfLife").factory("Universe", function() {
    "use strict";
    var cell = {
        LIVE: true,
        DEAD: false
    };

    return function Universe(height, width) {

        this.evolve = function() {
            var evolvedCell = [];
            for (var row = 0; row < this.height; row++) {
                evolvedCell.push(this.cells[row].slice(0));
                for (var column = 0; column < this.width; column++) {
                    evolvedCell[row][column] = this.getNextGenerationCellState(
                        this.cells[row][column],
                        this.getTotalLiveNeighbor(row, column)
                    );
                }
            }
            this.cells = evolvedCell;
        };

        this.getTotalLiveNeighbor = function(currentRow, currentColumn) {
            var total = 0;
            for (var row = currentRow - 1; row <= currentRow + 1; row++)
                for (var column = currentColumn - 1; column <= currentColumn + 1; column++)
                    if (positionIsValid(row, column, currentRow, currentColumn, this.height)) {
                        total += this.cells[row][column] ? 1 : 0;
                    }

            return total;
        };

        function positionIsValid(row, column, currentRow, currentColumn, height) {
            return positionIsInUniverse(row, height) && notCurrentCell(row, column, currentRow, currentColumn);
        }

        function positionIsInUniverse(row, height) {
            return row >= 0 && row < height;
        }

        function notCurrentCell(row, column, currentRow, currentColumn) {
            return !(row === currentRow && column === currentColumn);
        }

        this.getNextGenerationCellState = function(currentCellState, totalLiveNeighbor) {
            var state = {
                2: currentCellState,
                3: cell.LIVE
            };
            return totalLiveNeighbor in state ? state[totalLiveNeighbor] : cell.DEAD;
        };

        this.setLiveCell = function(r, c) {
            this.cells[r][c] = cell.LIVE;
        };

        this.init = function(height, width) {
            this.height = height;
            this.width = width;
            this.cells = [];
            for (var r = 0; r < height; r++) {
                this.cells.push([]);
                for (var c = 0; c < width; c++)
                    this.cells[r].push(cell.DEAD);
            }
        };

        this.init(height, width);
    };
});