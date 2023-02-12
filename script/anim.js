class SpriteAnim {
	constructor(fileName, number, timer, offX, offY, state, stop=false) {
		this.images = []
		for (var i = 1; i <= number; i ++) {
			const image = img(fileName.replace("?", i))
			this.images.push(image)
		}
		this.timer = timer
		this.timerDefault = this.timer
		this.imageIndex = 0
		this.state = state
		this.stop = stop
		this.x = offX
		this.y = offY
	}	
	
	isFor(state) {
		return this.state == state
	}
	
	reset() {
		this.imageIndex = 0
		this.timer = this.timerDefault
	}
	
	getImage() {
		this.setImageIndex()
		return this.images[this.imageIndex]
	}
	
	setImageIndex() {
		this.timer --
		if (this.timer <= 0 && !this.checkStop()) {
			this.timer = this.timerDefault
			this.imageIndex ++
			if (this.imageIndex >= this.images.length) {
				this.imageIndex = 0
			}
		}
	}
	
	checkStop() {
		return this.stop && (this.imageIndex == this.images.length - 1)
	}
	
}

//Draw Image
function drawImg(img, x, y, width, height, offX, offY, deg, o=1) {
	ctx.save()
	ctx.globalAlpha = o
	
	absWidth = Math.abs(width)
	absHeight = Math.abs(height)
	
	//Origin Set
	ctx.translate(x - offX + absWidth/2, y - offY + absHeight/2);
	
	//Rotate
	var rad = 2 * Math.PI - deg * Math.PI / 180
	ctx.rotate(rad)
	
	//Flip
	flipXScale = Math.sign(width)
	flipYScale = Math.sign(height)
	ctx.scale(flipXScale,flipYScale)
	
	//Draw
	ctx.drawImage(img, -absWidth/2, -absHeight/2, absWidth, absHeight)
	
	ctx.globalAlpha = 1
	ctx.restore()
}

//Fill Style
function fillStyle(c) {
	ctx.fillStyle = c
}

//Stroke Style
function strokeStyle(c) {
	ctx.strokeStyle = c
}

//Text Align
function textAlign(a) {
	ctx.textAlign = a
}

//Fill Rectangle
function fillRect(x, y, w, h, o=1) {
	ctx.globalAlpha = o;
 	ctx.fillRect(x, y, w, h)
 	ctx.globalAlpha = 1
}

//Fill Triangle
function fillTri(x, y, w, h, r=true, b=true, o=1) {
	ctx.globalAlpha = o
	ctx.beginPath()
	
	if (r && b) {
		ctx.moveTo(x, y + h)
		ctx.lineTo(x + w, y + h)
		ctx.lineTo(x + w, y)
	}
	else if (!r && b) {
		ctx.moveTo(x, y)
		ctx.lineTo(x, y + h)
		ctx.lineTo(x + w, y + h)
	}
	else if (r && !b) {
		ctx.moveTo(x, y)
		ctx.lineTo(x + w, y)
		ctx.lineTo(x + w, y + h)
	}
	else if (!r && !b) {
		ctx.moveTo(x + w, y)
		ctx.lineTo(x, y)
		ctx.lineTo(x, y + h)
	}
	
	ctx.fill()
	ctx.globalAlpha = 1
}

//Fill Circle
function fillCirc(x, y, r, o=1) {
	ctx.globalAlpha = o
	ctx.beginPath()
	
	ctx.arc(x, y, r, 0, 2 * Math.PI)
	
	ctx.fill()
	ctx.globalAlpha = 1
}

//Fill Text
function fillText(x, y, size, font, str, bold=false, italic=false) {
	var adds = ""
	if (bold) adds = adds.concat("bold ")
	if (italic) adds = adds.concat("italic ")
	ctx.font = adds + size.toString() + "px " + font
	ctx.fillText(str, x, y)
}

//Stroke Text
function strokeText(x, y, size, font, str, bold=false, italic=false) {
	var adds = ""
	if (bold) adds = adds.concat("bold ")
	if (italic) adds = adds.concat("italic ")
	ctx.font = adds + size.toString() + "px " + font
	ctx.strokeText(str, x, y)
}

//Clear Canvas
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}