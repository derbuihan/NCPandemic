NK.Axis = function () {
	this.vector = new NK.Vector(0, 0, 0);
	this.matrix = new NK.Matrix(3, 3);
	this.matrix.identity();
}

NK.Axis.prototype = {
	constructor: NK.Axis,
	
	CMSystem: function(world) { // center of Mass system
		var mass = 0;
		this.vector.reset();
		for(var i = 0; i < world.materials.length; i++) {
			mass += world.materials[i].mass;
			this.vector.plusCopy(world.materials[i].position.multiplyScalar(world.materials[i].mass));
		}
		return this.vector.multiplyScalarCopy(1.0 / mass);
	}
}
