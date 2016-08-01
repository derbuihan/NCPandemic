NK.Point = function () {
	this.mass = 1.0; // default
	this.position = new NK.Vector(0, 0, 0);
	this.velocity = new NK.Vector(0, 0, 0);
	this.acceleration = new NK.Vector(0, 0, 0);
	this.forces = new Array();
	// state
	this.color = '#000';
	this.radius = 3;
	this.gravity = false; // default
	this.exist = true;
	return this;
}

NK.Point.prototype = {

	constructor: NK.Point,
	
	setForce: function (force) {
		this.forces[this.forces.length] = force;
		return this;
	},
	
	calculate:function (dt) {
		var force = new NK.Vector(0,0,0);
		for(var i = 0; i < this.forces.length; i++) {
			this.forces[i].calculate();
			force.plusCopy(this.forces[i].vector);
		}
		this.acceleration.copy(force).multiplyScalarCopy(1.0 / this.mass);
		this.velocity.plusCopy(this.acceleration.multiplyScalar(dt));
		this.position.plusCopy(this.velocity.multiplyScalar(dt));
		for (var i = 0; i < 2; i++) {
			if (this.position.array[i] > 250) {
				this.position.array[i] -= 500;
			}
			if (this.position.array[i] < -250) {
				this.position .array[i]+= 500;
			}
		}
		return this;
	},
	
	drow: function(canvas, axis) {
		canvas.arcVector(this.position.minus(axis.vector).multiplyMatrix(axis.matrix), this.radius, this.color);
		return this;
	}
}
