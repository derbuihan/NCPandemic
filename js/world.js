NK.World = function () {
	this.time = 0;
	this.dt = 0.001; //default
	this.materials = new Array();
}

NK.World.prototype = {
	constructor: NK.World,
	
	setMaterials: function(material) {
		this.materials[this.materials.length] = material;
		return this;
	},

	planeta: function() {
		for (var i = 0; i < this.materials.length; i++) {
			for (var j = 0; j < this.materials.length; j++) {
				if (i != j) {
					if(this.materials[i].gravity) {
						var force = new NK.Force();
						force.gravity(this.materials[j], this.materials[i]);
						this.materials[j].setForce(force); 
					}
				}
			}
		}
		return this;
	},
	
	calculate: function() {
		this.time += this.dt;
		for (var i = 0; i < this.materials.length; i++) {
			if (this.materials[i].exist) {
				this.materials[i].calculate(this.dt);
			}
		}
		return this;
	},
	
	drow: function(canvas, axis) {
		for (var i = 0; i < this.materials.length; i++) {
			if (this.materials[i].exist) {
				this.materials[i].drow(canvas, axis);
			}
		}
		return this;
	}
}
