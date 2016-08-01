NK.Matrix = function (m, n) {
	this.array = new Array();
	this.array.length = m;
	for (var i = 0; i < m; i++) {
		this.array[i] = new Array();
		this.array[i].length = n;
		for (var j = 0; j < n; j++) {
			this.array[i][j] = 0
		}
	}
	return this;
}

NK.Matrix.prototype = {
	constructor: NK.Matrix,
	
	set: function () {
		var m = this.array.length, n = this.array[0].length;
		if (arguments.length != m * n) { return undefined; }
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				this.array[i][j] = arguments[i * n + j];
			}
		}
		return this;
	},
	
	reset: function () {
		var m = this.array.length, n = this.array[0].length;
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				this.array[i][j] = 0;
			}
		}
		return this;
	},
	
	copy: function (matrix) {
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[0].length; j++) {
				this.array[i][j] = matrix.array[i][j];
			}
		}
		return this;
	},
	
	identity: function () {
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[0].length; j++) {
				if(i == j) {
					this.array[i][j] = 1;
				}else{
					this.array[i][j] = 0;
				}
			}
		}
		return this;
	},
	
	plus: function (matrix) {
		var m = this.array.length, n = this.array[0].length;
		if ( (this.array.length == matrix.array.length)
		&&(this.array[0].length == matrix.array[0].length) ) {
			return undefined;
		}
		var r = new NK.Matrix(this.array.length, this.array[0].length);
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[0].length; j++){
				r.array[i][j] = this.array[i][j] + matrix.array[i][j];
			}
		}
		return r;
	},
	
	plusCopy: function (matrix) {
		return this.copy(this.plus(matrix));
	},
	
	minus: function (matrix) {
		var m = this.array.length, n = this.array[0].length;
		if ( (this.array.length == matrix.array.length)
		&&(this.array[0].length == matrix.array[0].length) ) {
			undefined;
		}
		var r = new NK.Matrix(this.array.length, this.array[0].length);
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[0].length; j++){
				r.array[i][j] = this.array[i][j] - matrix.array[i][j];
			}
		}
		return r;
	},
	
	minusCopy: function (matrix) {
		return this.copy(this.minus(matrix));
	},

	multiplyScalar: function (scalar) {
		var r = new NK.Matrix(this.array.length, this.array[0].length);
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[0].length; j++){
				r.array[i][j] = scalar * this.array[i][j];
			}
		}
		return r;
	},
	
	multiplyScalarCopy: function (scalar) {
		return this.copy(this.multiplyScalar(scalar));
	},
	
	multiplyMatrix: function (matrix) {
		if (this.array[0].length != matrix.array.length) { return undefined; }
		var r = new NK.Matrix(this.array.length, matrix.array[0].length);
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < matrix.array[0].length; j++) {
				r.array[i][j] = 0;
				for (var k = 0; k < this.array[0].length; k++) {
					r.array[i][j] += this.array[i][k] * matrix.array[k][j]
				}
			}
		}
		return r;
	},
	
	multiplyMatrixCopy: function (matrix) {
		return this.copy(this.multiplyMatrix(matrix));
	},

	rotation: function (radian) {
		if ( (this.array.length !=2)
		 || (this.array[0].length != 2) )
		 { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			c, -s,
			s,  c
		);
	},
	
	rotationX: function (radian) {
		if ( (this.array.length != 3)
		 || (this.array[0].length != 3))
		 { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			 c, -s,  0,
		 	 s,  c,  0,
			 0,  0,  1
		);
	},
	
	rotationY: function (radian) {
		if ( (this.array.length != 3)
		 || (this.array[0].length != 3))
		 { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			 c,  0, -s,
			 0,  1,  0,		
			 s,  0,  c
		);
	},
	rotationZ: function (radian) {
		if ( (this.array.length != 3)
		 || (this.array[0].length != 3))
		 { return undefined; }
		var c = Math.cos(radian), s = Math.sin(radian);
		return this.set(
			 1,  0,  0,
			 0,  c, -s,
			 0,  s,  c
		);
	},
	
	determinant: function () {
		if (this.array[0].length != this.array.length) { return undefined; }
		var r = 0;
		if ( (this.array.length == 1) && (this.array[0].length == 1) ) {
			r = this.array[0][0];
		}else{
			for (var i = 0; i < this.array[0].length; i++) {
				r += this.array[0][i] * this.cofactor(0,i);
			}
		}
		return r;
	},
	
	cofactor: function (m, n) {
		var r = new NK.Matrix(this.array.length - 1, this.array[0].length - 1);
		for (var i = 0; i < r.array.length; i++) {
			for (var j = 0; j < r.array[0].length; j++) {
				r.array[i][j] = this.array[i+((i < m)? 0: 1)][j+((j < n)? 0: 1)];
			}
		}
		return Math.pow(-1, n+m) * r.determinant();
	},
	
	cofactorMatrix: function () {
		if (this.array[0].length != this.array.length) { return undefined; }
		var r = new NK.Matrix(this.array.length, this.array[0].length);
		for (var i = 0; i < this.array.length; i++) {
			for(var j = 0; j < this.array[0].length; j++) {
				r.array[i][j] = this.cofactor(i, j);
			}
		}
		return r;
	},
	
	cofactorMatrixCopy: function () {
		return this.copy(this.cofactorMatrix());
	},
	
	inverse: function () {
		var r = new NK.Matrix(this.array.length, this.array[0].length);
		return r.copy(this).cofactorMatrix().multiplyScalar(1.0 / r.determinant()).transpose();
	},
	
	inverseCopy: function () {
		return this.copy(this.inverse());
	},
	
	transpose: function () {
		var r = new NK.Matrix(this.array[0].length, this.array.length);
		for (var i = 0; i < this.array.length; i++){
			for (var j = 0; j < this.array[0].length; j++){
				r.array[j][i] = this.array[i][j];
			}
		}
		return r;
	},
	
	transposeCopy: function () {
		return this.copy(this.transpose());
	}
}

