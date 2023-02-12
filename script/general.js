//Image
function img(file) {
	const image = new Image()
	image.src = "sprites/" + file
	return image
}

//Approach
function approach(val, tag, shift) {
	if (val < tag) {
		return Math.min(val + shift, tag)
	}
	else {
		return Math.max(val - shift, tag)
	}
}

//Clamp
function clamp(x, a, b) {
	return Math.max(a, Math.min(x, b))
}

//Array Remove

function arrayRemove(a, val) { 
	return a.filter(function(e) { 
		return e != val;
	})
}

//Get Angle
function getAngle(x1, y1, x2, y2) {
	var pi = Math.PI
    var rad = Math.atan2(y2 - y1, x2 - x1)
    var angle = rad * 180 / pi
    if (angle < 0) angle += 360
    return angle
}

//Random Range
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Check Even
function checkEven(val) {
	return (val % 2 == 0)
}