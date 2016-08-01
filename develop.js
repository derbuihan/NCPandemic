function vprint(v) { // vector print
	for (var i = 0; i < v.array.length; i++) {
		console.warn(v.array[i]+",");
	}
}

function mprint(m) { // matrix print
	for (var i = 0; i < m.array.length; i++) {
		for(var j = 0; j < m.array[i].length; j++) {
			document.write(m.array[i][j]+",");
		}
		document.write("<br>");
	}
	document.write("<br>");
}
