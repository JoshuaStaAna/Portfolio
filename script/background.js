//Background
class Background {
	constructor(spd) {
		this.val = 0
		this.spd = spd
		this.ele = []
	}
	
	add(e) {
		this.ele.push(e)
	}
	
	step() {
		this.val += this.spd
	}
	
	draw() {
		fillStyle("rgb(156,156,164)")
		fillRect(0, 0, cam.width, cam.height)
		
		var length = this.ele.length
		for(var i = 0; i < length; i ++) {
			this.ele[i].draw(this.val)
		}
	}
	
}

//Background Line
class BackLine {
	constructor(c, t, off, mult, a, o, h=true) {
		this.a = a
		this.off = off
		this.mult = mult
		this.c = c
		this.t = t
		this.o = o
		this.h = h
	}
	
	draw(i) {
		fillStyle(this.c)
		var coord = Math.sin((i + this.off) * this.mult) * this.a
		
		if (this.h) {
			fillRect(0, coord - (this.t / 2) + (cam.height / 2), cam.width, this.t, this.o)
		}
		else {
			fillRect(coord - (this.t / 2) + (cam.width / 2), 0, this.t, cam.height, this.o)
		}
	}
}