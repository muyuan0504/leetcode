/** 图论 */

/**
 * 200. 岛屿数量
 * @param {character[][]} grid  grid[i][j] 的值为 '0' 或 '1'
 * @return {number}
 */
var numIslands = function(grid) {
  /**
   * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量
   * 输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
   */
  /**
   * 前提条件：
   * 1. 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成
   * 2. 可以假设该网格的四条边均被水包围
   */
  const rowLen = grid.length;
  const colLen = grid[0].length;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (grid[r][c] === "0") {
      }
    }
  }
};
