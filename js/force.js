NK.Force = function() {
	this.vector = new NK.Vector(0, 0, 0);
	this.calculate = function () {
		return this;
	};
}

NK.Force.prototype = {
	constructor: NK.Force,

	rotation: function (R) {
		this.calculate = function () {
			this.vector.set(R * Math.cos(world.time), R * Math.sin(world.time),0);
			return this;
		}
	},

	gravity: function (A, B) { // A and B are materials.
		this.calculate = function () {
			var r = new NK.Vector(A.position.array.length);
			r.copy( B.position.minus(A.position) );
			var rDistance = r.distance();
			var G = 6672600;
			this.vector.copy(r.multiplyScalar(G * A.mass * B.mass / Math.pow(rDistance, 3)));
			return this;
		}
	}
}
