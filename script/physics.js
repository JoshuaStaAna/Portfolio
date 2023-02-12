const grav = 9
const drag = 0.2
const fric = 0.15

//Overlap
function isOverlapping(aX1, aY1, aX2, aY2, bX1, bY1, bX2, bY2) {
	//Area 0
    if (aX1 == aX2 || aY1 == aY2 || bX1 == bX2 || bY1 == bY2) return false
    
    //Left of other
    if (aX1 >= bX2 || bX1 >= aX2) return false
    
    //Above other
    if (aY1 >= bY2 || bY1 >= aY2) return false
			    
    return true
}

//Collision Box
class bBox {
	constructor(width, height, x = width/2, y = height) {
		this.width = width
		this.height = height
		
		this.x = x
		this.y = y
	}
	
}

//Velocity Object
class Velocity {
	constructor() {
		this.con = {
			x: 0,
			y: 0,
			xMax: 0,
			yPosMax: 0,
			yNegMax: 0
		}
		this.unc = {
			x: 0,
			y: 0
		}
	}
	
	getX() {
		return this.con.x + this.unc.x
	}
	getY() {
		return this.con.y + this.unc.y
	}
	
	addCon(x=0, y=0) {
		if (x > 0) {
			this.con.x = Math.min(this.con.xMax, this.con.x + x)
		}
		else if (x < 0) this.con.x = Math.max(-this.con.xMax, this.con.x + x)
		
		if (y > 0) {
			this.con.y = Math.min(this.con.yPosMax, this.con.y + y)
		}
		else if (y < 0) this.con.y = Math.max(-this.con.yNegMax, this.con.y + y)
	}
	
	setConXMax(x) {
		this.con.xMax = x
		this.con.x = clamp(this.con.x, -this.con.xMax, this.con.xMax)
	}
	
	addConXMax(x) {
		this.setConXMax(this.con.xMax + x)
	}
	
	setConYPosMax(y) {
		this.con.yPosMax = y
		this.con.y = Math.min(this.con.y, this.con.yPosMax)
	}
	
	addConYPosMax(y) {
		this.setConYPosMax(this.con.yPosMax + y)
	}
	
	setConYNegMax(y) {
		this.con.yNegMax = y
		this.con.y = Math.max(this.con.y, -this.con.yNegMax)
	}
	
	addConYNegMax(y) {
		this.setConYNegMax(this.con.yNegMax + y)
	}
	
	addUnc(x=0, y=0) {
		this.unc.x += x
		this.unc.y += y
	}
}

//Physics Object
class PhysicsObj {
	constructor(x = 0, y = 0, width=50, height=50, offX=width/2, offY=height, color='White') {
		
		//Position
		this.x = x
		this.y = y
		
		//Input
		this.input = {
			space: false,
			left: false,
			up: false,
			right: false,
			down: false
		}
		
		//Velocity
		this.velo = new Velocity()
		
		//Properties
		this.color = color
		this.alpha = 1
		this.imageXScale = 1
		this.imageYScale = 1
		this.angle = 0
		this.active = true
		
		this.bBox = new bBox(width, height, offX, offY)
		
		//Variables
		this.jump = 0
		this.prevGround = false
		this.gravMult = 1
		this.dragMult = 1
		this.fricMult = 1
		this.tangible = true
	}
	
	//Collision
	
	getTrueOriginX() {
		return this.x - this.bBox.x
	}
	
	getTrueOriginY() {
		return this.y - this.bBox.y
	}
	
	getSideLeft() {
		return this.x - this.bBox.x
	}
	
	getSideRight() {
		return this.x - this.bBox.x + this.bBox.width
	}
	
	getSideUp() {
		return this.y - this.bBox.y
	}
	
	getSideDown() {
		return this.y - this.bBox.y + this.bBox.height
	}
	
	getCenterX() {
		return this.getTrueOriginX() + (this.bBox.width / 2)
	}
	
	getCenterY() {
		return this.getTrueOriginY() + (this.bBox.height / 2)
	}
	
	//On Ground
	checkGrounded() {
		if (this.wallColCheck(0, 1)) return true
		return false
	}
	
	//Wall on Right
	checkWallRight() {
		if (this.wallColCheck(1, 0)) return true
		return false
	}
	
	//Wall on Left
	checkWallLeft() {
		if (this.wallColCheck(-1, 0)) return true
		return false
	}
	
	//Wall Collision Check
	wallColCheck(vX, vY) {
		
		var l1 = {
			x: this.getTrueOriginX() + vX,
			y: this.getTrueOriginY() + vY
		}
		var r1 = {
			x: l1.x + this.bBox.width,
			y: l1.y + this.bBox.height
		}
		
		var length = walls.length
		for(var i = 0; i < length; i ++) {
			var currentWall = walls[i]
				if (currentWall.active && currentWall.tangible) {
				var l2 = {
					x: currentWall.getTrueOriginX(),
					y: currentWall.getTrueOriginY()
				}
				var r2 = {
					x: l2.x + currentWall.bBox.width,
					y: l2.y + currentWall.bBox.height
				}
				
				if (isOverlapping(l1.x, l1.y, r1.x, r1.y, l2.x, l2.y, r2.x, r2.y)) return true
		    }
		}
		
		return false
		
	}
	
	//Ghost Collision Check
	ghostColCheck(vX, vY) {
		
		var l1 = {
			x: this.getTrueOriginX() + vX,
			y: this.getTrueOriginY() + vY
		}
		var r1 = {
			x: l1.x + this.bBox.width,
			y: l1.y + this.bBox.height
		}
		
		if (ghost != undefined) {
			var l2 = {
				x: ghost.getTrueOriginX(),
				y: ghost.getTrueOriginY()
			}
			var r2 = {
				x: l2.x + ghost.bBox.width,
				y: l2.y + ghost.bBox.height
			}
			
			if (isOverlapping(l1.x, l1.y, r1.x, r1.y, l2.x, l2.y, r2.x, r2.y)) return true
		}
		
		return false
		
	}
	
	//Mod Collision
	modCol() {
		
		var l1 = {
			x: this.getTrueOriginX(),
			y: this.getTrueOriginY()
		}
		var r1 = {
			x: l1.x + this.bBox.width,
			y: l1.y + this.bBox.height
		}
		
		var length = mods.length
		for(var i = 0; i < length; i ++) {
			var currentMod = mods[i]
				if (currentMod.active && currentMod.tangible) {
				var l2 = {
					x: currentMod.getTrueOriginX(),
					y: currentMod.getTrueOriginY()
				}
				var r2 = {
					x: l2.x + currentMod.bBox.width,
					y: l2.y + currentMod.bBox.height
				}
				
				if (isOverlapping(l1.x, l1.y, r1.x, r1.y, l2.x, l2.y, r2.x, r2.y)) currentMod.mod(this)
		    }
		}
	}
	
	//Hazard Collision
	hazardCol() {
		
		var l1 = {
			x: this.getTrueOriginX(),
			y: this.getTrueOriginY()
		}
		var r1 = {
			x: l1.x + this.bBox.width,
			y: l1.y + this.bBox.height
		}
		
		var length = hazards.length
		for(var i = 0; i < length; i ++) {
			var currentHazard = hazards[i]
				if (currentHazard.active && currentHazard.tangible) {
				var l2 = {
					x: currentHazard.getTrueOriginX(),
					y: currentHazard.getTrueOriginY()
				}
				var r2 = {
					x: l2.x + currentHazard.bBox.width,
					y: l2.y + currentHazard.bBox.height
				}
				
				if (isOverlapping(l1.x, l1.y, r1.x, r1.y, l2.x, l2.y, r2.x, r2.y)) return true
		    }
		}
		return false
	}
	
	//Canvas Collision Check
	canColCheck(vX, vY) {
		var l = {
			x: this.getTrueOriginX() + vX,
			y: this.getTrueOriginY() + vY
		}
		var r = {
			x: l.x + this.bBox.width,
			y: l.y + this.bBox.height
		}
		
		if (l.x < 0 || r.x > currentRoom.bnd.width
		|| l.y < 0 || r.y > currentRoom.bnd.height) return true
		else return false
	}
	
	//Canvas Collision Check
	canBndReturn() {
		var l = {
			x: this.getTrueOriginX(),
			y: this.getTrueOriginY()
		}
		var r = {
			x: l.x + this.bBox.width,
			y: l.y + this.bBox.height
		}
		
		if (r.x < 0) {
			return dirLeft
			}
		if (l.x > currentRoom.bnd.width) {
			return dirRight
			}
		if (r.y < 0) {
			return dirUp
			}
		if (l.y > currentRoom.bnd.height) {
			return dirDown
			}
		return undefined
	}
	
	//All Collision Check
	colCheck(vX, vY) {
		if (this.wallColCheck(vX, vY)) return true
		else return false
	}
	
	//All Collision Check Absolute Coordinates
	colCheckAbs(x, y) {
		if (this.wallColCheck(x - this.x, y - this.y) || this.canColCheck(x - this.x, y - this.y)) return true
		else return false
	}
	
	forceUp(steps) {
		var cnt = 0
		var vY = 0
		while(this.colCheck(0, vY) && cnt < steps) {
			vY --
			cnt ++
		}
		if (!this.colCheck(0, vY)) {
			this.y += vY
			return true
		}
		else {
			return false
		}
	}
	
	forceDown(steps) {
		console.log
		var cnt = 0
		var vY = 0
		while(this.colCheck(0, vY) && cnt < steps) {
			vY ++
			cnt ++
		}
		if (!this.colCheck(0, vY)) {
			this.y += vY
			return true
		}
		else {
			return false
		}
	}
	
	forceInBounds(steps) {
		var cnt = 0
		var length = 1
		var maxLength = Math.max(currentRoom.bnd.width, currentRoom.bnd.height)
		var x = 0
		var y = 0
		while(this.colCheckAbs(x, y) && cnt < steps) {
			length = Math.min(Math.ceil(length * 1.25), maxLength)
			x = Math.floor(Math.random() * length)
			y = Math.floor(Math.random() * length)
			cnt ++
		}
		if (!this.colCheckAbs(x, y)) {
			this.x = x
			this.y = y
		}
	}
	
	//Collision Handling
	col(vX, vY) {
		
		if (this.colCheck(0, 0)) { //In Wall
			return true
		}
		
		if (!this.colCheck(0, 0)) {
			//X
			var realX = 0
			if (vX != 0) {
				if (this.colCheck(vX, 0)) {
					this.velo.con.x = 0
					this.velo.unc.x = 0
					
					var newX = vX
					while (newX >= 6 && Math.abs(realX) < Math.abs(vX)) {
						while (this.colCheck(realX + newX, 0) && newX >= 6) {
							newX = Math.round(newX/2)
						}
						if (!this.colCheck(realX + newX, 0) && Math.abs(realX) < Math.abs(vX)) {
							realX += newX
						}
					}
					newX = Math.sign(vX)
					while(!this.colCheck(realX + newX, 0) && Math.abs(realX) < Math.abs(vX)) {
						realX += newX
					}
					this.x += realX
				}
				else this.x += vX
			}
			
			//Y
			
			var realY = 0
			if (vY != 0) {
				if (this.colCheck(0, vY)) {
					this.velo.con.y = 0
					this.velo.unc.y = 0
					
					var newY = vY
					while (newY >= 6 && Math.abs(realY) < Math.abs(vY)) {
						while (this.colCheck(0, realY + newY) && newY >= 6) {
							newY = Math.round(newY/2)
						}
						if (!this.colCheck(0, realY + newY) && Math.abs(realY) < Math.abs(vY)) {
							realY += newY
						}
					}
					newY = Math.sign(vY)
					while(!this.colCheck(0, realY + newY) && Math.abs(realY) < Math.abs(vY)) {
						realY += newY
					}
					this.y += realY
				}
				else this.y += vY
			}
		}
		
		return false
	}
	
	inputCheck() {
	}
	
	draw() {
		if (this.alpha > 0) {
			fillStyle(this.color)
			fillRect(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY(), this.bBox.width, this.bBox.height, this.alpha)
		}
	}
	
	veloCalc() {
		
		//Weight
		
		this.velo.addCon(0, grav * this.gravMult)
		
		//Add velocity
		var offX = this.velo.getX()
		var offY = this.velo.getY()
		
		var returnVal = false

		if (this.active) returnVal = this.col(Math.round(offX), Math.round(offY))
		else {
			this.x += Math.round(offX)
			this.y += Math.round(offY)
		}
		
		//Fric
		if (this.checkGrounded()) {
			this.velo.unc.x = approach(this.velo.unc.x, 0, fric * this.fricMult)
		}
		
		//Drag
		this.velo.unc.x = approach(this.velo.unc.x, 0, drag * this.dragMult)
		this.velo.unc.y = approach(this.velo.unc.y, 0, drag * this.dragMult * 3)
		
		return returnVal
	}
	
	step() {
		
	}
	
}