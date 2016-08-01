NK.Vector = function () {
	this.array = new Array();
	if (arguments.length == 1) {
		this.array.length = arguments[0];
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = 0;
		}
	}else{
		this.array.length = arguments.length;
		for (var i = 0; i < arguments.length; i++) {
			this.array[i] = arguments[i];
		}
	}
	return this;
}

NK.Vector.prototype = {
	constructor: NK.Vector,
	
	set: function () {
		if (this.array.length != arguments.length) { return undefined; }
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = arguments[i];
		}
		return this;
	},
	
	reset: function () {
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = 0;
		}
		return this;
	},
	
	copy: function (vector) {
		if (this.array.length != vector.array.length) { return undefined; }
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = vector.array[i];
		}
		return this;
	},
	
	plus: function (vector) {
		if (this.array.length != vector.array.length) { return undefined; }
		var r = new NK.Vector(this.array.length);
		for (var i = 0; i < this.array.length; i++) {
			r.array[i] = this.array[i] + vector.array[i];
		}
		return r;
	},
	
	plusCopy: function (vector) {
		return this.copy(this.plus(vector));
	},
	
	minus: function (vector) {
		if (this.array.length != vector.array.length) { return undefined; }
		var r = new NK.Vector(this.array.length);
		for (var i = 0; i < this.array.length; i++) {
			r.array[i] = this.array[i] - vector.array[i];
		}
		return r;
	},
	
	minusCopy: function (vector) {
		return this.copy(this.minus(vector));
	},
	
	multiplyScalar: function (scalar) {
		var r = new NK.Vector(this.array.length);
		for (var i = 0; i < this.array.length; i++) {
			r.array[i] = this.array[i] * scalar;
		}
		return r;
	},
	
	multiplyScalarCopy: function (scalar) {
		return this.copy(this.multiplyScalar(scalar));
	},
	
	dot: function (vector) {
		if (this.array.length != vector.array.length) { return undefined; }
		var r = 0;
		for (var i = 0; i <this.array.length; i++) {
			r += this.array[i] * vector.array[i];
		}
		return r;
	},
	
	multiplyMatrix: function (matrix) {
		var r = new NK.Vector(matrix.array.length);
		for (var i = 0; i < matrix.array.length; i++) {
			for (var j = 0; j < matrix.array[0].length; j++) {
				r.array[i] += matrix.array[i][j] * this.array[j];
			}
		}
		return r;
	},
	
	multiplyMatrixCopy: function (matrix) {
		return this.copy(this.multiplyMatrix(matrix));
	},
	
	cross: function (vector) {
		if ((this.array.length != 3) || (vector.array.length != 3)) {
			return undefined;
		}
		var r = new NK.Vector(0,0,0);
		return r.set(
			this.array[2] * vector.array[3] - this.array[3] * vector.array[2],
			this.array[3] * vector.array[1] - this.array[1] * vector.array[3],
			this.array[1] * vector.array[2] - this.array[2] * vector.array[1]
		);
	},
	
	crossCopy: function (vector) {
		return this.copy(this.cross(vector));
	},
	
	distance: function () {
		var r = 0;
		for (var i = 0; i < this.array.length; i++) {
			r += this.array[i] * this.array[i];
		}
		return Math.sqrt(r);
	}
}	
