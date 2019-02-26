var generateSet = function(num) {
  var set = new Set();
  for(let i = 1; i <= num; i++) {
    set.add(i);
  }
  return set;
};

var filterSet = function (matrix, i, j, set) {
  for (let k = 0; k < 9; k++) {
    set.delete(matrix[i][k]);
  }
  for (let k = 0; k < 9; k++) {
    set.delete(matrix[k][j]);
  }

  let ind1 = Math.floor(i / 3) * 3;
  let ind2 = Math.floor(j / 3) * 3;

  for (let r = ind1; r < ind1 + 3; r++) {
    for (let c = ind2; c < ind2 + 3; c++) {
      set.delete(matrix[r][c]);
    }
  }
};

let hasZeros = function(matrix) {
  console.log('s');
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if(matrix[i][j] === 0) {return true}
    }
  }
  return false;
};

module.exports = function solveSudoku(matrix) {

  while(hasZeros(matrix)) {
    var sets = [];

    for (let i = 0; i < 9; i++) {
      sets.push([]);

      for (let j = 0; j < 9; j++) {
        let set = new Set();

        if (matrix[i][j] === 0) {
          set = generateSet(9);
          filterSet(matrix, i, j, set);

          if (set.size === 1) {
            matrix[i][j] = set.values().next().value;
            // set.clear();
          }

        }
        sets[i].push(set);
      }

    }

    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {

        for(let item = 1; item <= 9; item++) {
          let count = 0;

          for (let r = i; r < i + 3; r++) {
            for (let c = j; c < j + 3; c++) {
              if(sets[r][c].has(item)) {
                count++;
              }
            }
          }

          if(count === 1) {
            for (let r = i; r < i + 3; r++) {
              for (let c = j; c < j + 3; c++) {
                if(sets[r][c].has(item)) {
                  matrix[r][c] = item;
                }
              }
            }
          }

        }
      }
    }

    for(let i = 0; i < 9; i++) {
      for(let item = 1; item <= 9; item++) {
        let count = 0;
        for(let j = 0; j < 9; j++) {
          if(sets[i][j].has(item)) {
            count++;
          }
        }

        if(count === 1) {
          for (let j = 0; j < 9; j++) {
            if(sets[i][j].has(item)) {
              matrix[i][j] = item;
            }
          }
        }
      }
    }

    for(let j = 0; j < 9; j++) {
      for(let item = 1; item <= 9; item++) {
        let count = 0;
        for(let i = 0; i < 9; i++) {
          if(sets[i][j].has(item)) {
            count++;
          }
        }

        if(count === 1) {
          for (let i = 0; i < 9; i++) {
            if(sets[i][j].has(item)) {
              matrix[i][j] = item;
            }
          }
        }
      }
    }

  }

  return matrix;
};
