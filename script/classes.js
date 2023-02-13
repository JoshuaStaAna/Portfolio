var space = false
var shift = false
var left = false
var up = false
var right = false
var down = false
var lose = false

//Keyboard Listener
addEventListener('keydown', ({ keyCode }) => {
	switch (keyCode) {
		case 32: space = true; break;
		case 16: shift = true; break;
		case 37: left = true; break;
		case 38: up = true; break;
		case 39: right = true; break;
		case 40: down = true; break;
		case 81: lose = true; break;
		//default: console.log(keyCode); break;
	}
})

addEventListener('keyup', ({ keyCode }) => {
	switch (keyCode) {
		case 32: space = false; break;
		case 16: shift = false; break;
		case 37: left = false; break;
		case 38: up = false; break;
		case 39: right = false; break;
		case 40: down = false; break;
		case 81: lose = false; break;
	}
})

//Wall
class Wall extends PhysicsObj {
	constructor(x, y, width, height, color, direct = false) {
		super(x, y, width, height, 0, 0, color)

		this.weight = 0

		if (direct) walls.push(this)
	}

	drawBorder() {
		if (this.alpha > 0) {
			fillStyle("Black")
			fillRect(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY(), this.bBox.width, wallOutlineThickness, wallOutlineAlpha * this.alpha)
			fillRect(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY() + this.bBox.height - wallOutlineThickness, this.bBox.width, wallOutlineThickness, wallOutlineAlpha * this.alpha)
			fillRect(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY(), wallOutlineThickness, this.bBox.height, wallOutlineAlpha * this.alpha)
			fillRect(this.getTrueOriginX() + cam.getOffX() + this.bBox.width - wallOutlineThickness, this.getTrueOriginY() + cam.getOffY(), wallOutlineThickness, this.bBox.height, wallOutlineAlpha * this.alpha)
		}
	}

}

//Wall
class WallFade extends Wall {
	constructor(x, y, width, height, color, onSec, offSec, on = true, direct) {
		super(x, y, width, height, color, direct)

		this.onSec = onSec * fps
		this.offSec = offSec * fps
		if (on) this.fadeVal = this.onSec / 4
		else this.fadeVal = -this.offSec / 4
		this.fadeAcc = -1

	}

	step() {

		if (this.fadeVal <= 0) {
			this.active = false
		}
		else {
			this.active = true
		}

		this.alpha = Math.min(1, (this.fadeVal + (this.onSec / 16)) / (this.onSec / 8))

		this.fadeVal = clamp(this.fadeVal + this.fadeAcc, -this.offSec / 4, this.onSec / 4)
		if (this.fadeAcc == -1 && this.fadeVal == -this.offSec / 4) this.fadeAcc = 1
		else if (this.fadeAcc == 1 && this.fadeVal == this.onSec / 4) this.fadeAcc = -1

	}

}

//Entity States
const EntityStates = {
	idle: "idle",
	walk: "walk",
	run: "run",
	jump: "jump",
	slide: "slide",
	dive: "dive",
	wallHug: "wallHug",
	lose: "lose",
	land: "land",
	landLow: "landLow",
	fall: "fall"
}

//Entity
class Entity extends PhysicsObj {
	constructor(x, y, width, height, color, direct = false) {
		super(x, y, width, height, undefined, undefined, color)
		this.state = EntityStates.idle
		this.prevState = EntityStates.idle
		this.defaultHeight = this.bBox.height

		if (direct) entities.push(this)
	}
}

//Ghost
class Ghost extends PhysicsObj {
	constructor(direct) {
		super(-1000, -1000, 36, 24, 0, 0, 'Purple', direct)

		this.offScreen = true
		this.part = []
		this.movAngle = 0
		this.cnt = 3
		this.progress = 5
	}

	//Step
	step() {
		if (this.offScreen) {
			this.progress = approach(this.progress, 0, 0.005)

			if (this.progress == 0) {
				this.offScreen = false
				var x = randomRange(0, 1)
				var y = randomRange(0, 1)

				var buffer = 40
				if (x == 0) this.x = -buffer
				else this.x = currentRoom.bnd.width + buffer
				if (y == 0) this.y = -buffer
				else this.y = currentRoom.bnd.height + buffer
			}
		}
		else {
			if (player != undefined) {
				var changeAngle = 30
				var mov = 2
				var targetAngle = getAngle(this.x, this.y, player.x, player.y)

				if (Math.abs(this.movAngle - targetAngle) >= 180) {
					if (this.movAngle > targetAngle) {
						targetAngle += 360
					}
					else if (this.movAngle < targetAngle) {
						this.movAngle += 360;
					}
				}

				this.movAngle = approach(this.movAngle, targetAngle, changeAngle)

				var pi = Math.PI
				var movRad = this.movAngle * pi / 180

				this.x += mov * Math.cos(movRad)
				this.y += mov * Math.sin(movRad)

				this.cnt = approach(this.cnt, 0, 1)

				if (this.cnt == 0) {
					this.part.push(new GhostPart(this.getTrueOriginX() + (this.bBox.width / 2), this.getTrueOriginY() + (this.bBox.height / 2), this, false))
					this.cnt = 3
				}
			}
		}
	}

	//Draw
	draw() {
		//fillStyle(this.color)
		//fillRect(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY(), this.bBox.width, this.bBox.height, this.alpha)

		if (!this.offScreen) {
			var length = this.part.length
			for (var i = 0; i < length; i++) {
				if (this.part[i] != undefined) this.part[i].draw()
			}

			const image = img("ghost1.png")
			drawImg(image, this.x + cam.getOffX(), this.y + cam.getOffY(), image.width * this.imageXScale, image.height * this.imageYScale, 0, 0, 0)
		}

		fillStyle("black")
		textAlign("right")
		var str = "GHOST " + Math.ceil(this.progress) + " ROOMS AWAY"
		if (Math.ceil(this.progress) == 1) {
			str = "GHOST 1 ROOM AWAY"
		}
		else if (this.progress == 0) {
			str = "GHOST HAS ARRIVED"
		}
		fillText(canvas.width - 16, 34, 18, "arial black", str, true)
		fillStyle("rgb(130, 48, 180)")
		textAlign("right")
		fillText(canvas.width - 18, 32, 18, "arial black", str, true)

	}

	//Next Room
	nextRoom() {
		this.progress += 1
		this.offScreen = true
		this.part = []
		this.movAngle = 0
		this.cnt = 3
		this.x = -1000
		this.y = -1000
	}
}

//Ghost Particle
class GhostPart extends PhysicsObj {
	constructor(x, y, ghost, direct) {
		super(x, y, 50, 50, 0, 0, 'rgb(90, 8, 140)', direct)

		this.ghost = ghost
		this.size = randomRange(40, 60)
		this.sizeChange = randomRange(1, 2)
		var mov = randomRange(0, 2)
		var movAngle = randomRange(240, 300)
		var pi = Math.PI
		var movRad = movAngle * pi / 180
		this.movX = mov * Math.cos(movRad)
		this.movY = mov * Math.sin(movRad)
	}

	//Draw
	draw() {
		this.size = approach(this.size, 0, this.sizeChange)

		if (this.size == 0) this.ghost.part = arrayRemove(this.ghost.part, this)
		else {

			this.x += this.movX
			this.y += this.movY

			fillStyle(this.color)
			fillRect(this.x + cam.getOffX() - (this.size / 2), this.y + cam.getOffY() - (this.size / 2), this.size, this.size, this.alpha)
		}
	}
}

//Player
class Player extends Entity {
	constructor(x, y, direct) {
		super(x, y, 32, 47, 'Red', direct)

		this.prevAnim = undefined
		this.jumpState = EntityStates.jump
		this.createAnim()

		this.coyoteTime = 0
		this.coyoteWallTime = 0
		this.clipTime = 0
		this.landTime = 0
		this.lose = 0
		this.loseCnt = 0
		this.loseRun = false
	}

	//Input
	inputCheck() {
		this.input.space = space
		this.input.shift = shift
		this.input.left = left
		this.input.up = up
		this.input.right = right
		this.input.down = down
	}

	//Lose
	loseGame() {
		this.state = EntityStates.lose
		this.active = false
		this.velo.unc.x = 0
		this.velo.con.x = 0
		this.velo.con.y = 0
		this.velo.unc.y = -20
		this.bBox.height = this.defaultHeight

		this.lose = Math.random();
		if (this.lose >= 0.5) {
			this.lose = 1
		}
		else {
			this.lose = -1
		}
	}

	//Step
	step() {
		const wallHugRight = this.input.right && this.checkWallRight()
		const wallHugLeft = this.input.left && this.checkWallLeft()

		if (this.checkGrounded()) this.coyoteTime = 5
		if (!this.checkGrounded() && (wallHugLeft || wallHugRight)) this.coyoteWallTime = 5

		const grounded = this.coyoteTime > 0
		this.coyoteTime -= 1
		const wallHug = this.coyoteWallTime > 0
		this.coyoteWallTime -= 1

		var gravMult = 1
		var dragMult = 1
		var fricMult = 1
		var movAcc = 0
		var movSpd = 0
		var jumpUnc = 16
		var jumpAcc = 8.5
		var jumpSpd = 8.5

		if (lose || this.state == EntityStates.lose && this.loseCnt > 30) {
			if (this.loseRun) {
				console.log("RUN LOST")
				this.loseRun = false

				entities = arrayRemove(entities, player)
				player = undefined
				new Transition(findRoom("gameStart0"), respawn, 0, 0)
				ghost = undefined
				
			}
			else {
				console.log("RESPAWN PLAYER")
				currentRoom.respawn()
			}
		}

		if (this.state != EntityStates.lose) {
			const airSpd = 1
			const airSpdMax = 6
			const downHeightReduction = 12

			//Input
			this.inputCheck()

			this.prevState = this.state //Prev State

			//Force Height
			var forceDown = false
			var forceUp = false
			var actY = this.y

			var actHeight = this.bBox.height
			this.bBox.height = this.defaultHeight
			if (this.prevState == EntityStates.slide || this.prevState == EntityStates.dive) {
				this.y -= downHeightReduction
			}

			if (this.colCheck(0, 0)) {
				this.bBox.height -= downHeightReduction
				this.y += downHeightReduction
				if (!this.colCheck(0, 0)) {
					forceDown = true
				}
				else {
					this.bBox.height = this.defaultHeight
					this.y = actY
					forceUp = this.forceUp(downHeightReduction)
				}
			}

			if (!forceUp) {
				this.bBox.height = this.defaultHeight
				this.y = actY
			}

			//Jump State Default
			if (grounded || wallHug) {
				this.jump = 0
				this.jumpState = EntityStates.jump
			}

			if (this.jumpState == EntityStates.dive) { //Dive
				jumpUnc = 18
				jumpAcc = 0
				jumpSpd = 0
				gravMult = 1.25
				dragMult = 0.9
				fricMult = 0.075
			}

			//States
			this.state = EntityStates.idle //Idle

			if ((this.input.down || forceDown) && this.jumpState == EntityStates.jump && grounded) { //Slide
				this.velo.addUnc(this.velo.con.x, 0)
				this.velo.con.x = 0
				movAcc = 1
				movSpd = 1
				gravMult = 1
				dragMult = 1
				fricMult = 0.075
				this.state = EntityStates.slide
			}
			else if (!this.checkGrounded()) { //Jump

				//Horizontal Con to Unc
				this.velo.addUnc(this.velo.con.x, 0)
				this.velo.con.x = 0

				if (this.jumpState == EntityStates.jump) this.state = EntityStates.jump
				else {
					this.state = EntityStates.dive
				}
				if (wallHugRight) { //Wall hug right
					this.state = EntityStates.wallHug
				}
				else if (wallHugLeft) { //Wall Hug left
					this.state = EntityStates.wallHug
				}

				if (this.state == EntityStates.wallHug) { //Wall hug
					this.bBox.height = actHeight
					if (this.colCheck(0, 0)) {
						this.forceDown(downHeightReduction)
					}
					this.bBox.height = this.defaultHeight

					this.jump = 0
					gravMult = 0.25
					if (this.input.down || forceDown) gravMult = 0.75
					dragMult = 2
					if (this.prevState == EntityStates.jump || this.prevState == EntityStates.dive) this.velo.con.y = 0
				}

			}
			else if (this.input.left ^ this.input.right) { //Move
				if (this.input.shift) { //Run
					this.state = EntityStates.run
					movAcc = 0.75
					movSpd = 12
				}
				else { //Walk
					this.state = EntityStates.walk
					movAcc = 0.5
					movSpd = 8
				}
			}

			//Con Max Values
			this.dragMult = dragMult
			this.fricMult = fricMult
			this.gravMult = gravMult
			this.velo.setConXMax(movSpd)
			this.velo.setConYPosMax(grav * this.gravMult)
			this.velo.setConYNegMax(0)

			//Horizontal Movement
			if (this.input.left ^ this.input.right) {
				if (this.input.left) {
					if (grounded) {
						if (this.velo.con.x > 0) { //Con to Unc
							this.velo.addUnc(this.velo.con.x, 0)
							this.velo.con.x = 0
						}
						if (this.velo.unc.x < 0 && movAcc != 0) { //Unc to Con
							var empty = this.velo.con.xMax - Math.abs(this.velo.con.x)
							var init = this.velo.unc.x
							this.velo.unc.x = approach(this.velo.unc.x, 0, empty)
							var fill = Math.abs(init - this.velo.unc.x)
							this.velo.addCon(-fill, 0)
						}
						this.velo.addCon(-movAcc, 0)
					}
					else if (this.velo.unc.x > -airSpdMax) this.velo.unc.x = Math.max(-airSpdMax, this.velo.unc.x - airSpd)

					if (Math.sign(this.imageXScale) > 0) this.imageXScale *= -1

				}
				if (this.input.right) {
					if (grounded) {
						if (this.velo.con.x < 0) { //Con to Unc
							this.velo.addUnc(this.velo.con.x, 0)
							this.velo.con.x = 0
						}
						if (this.velo.unc.x > 0 && movAcc != 0) { //Unc to Con
							var empty = this.velo.con.xMax - Math.abs(this.velo.con.x)
							var init = this.velo.unc.x
							this.velo.unc.x = approach(this.velo.unc.x, 0, empty)
							var fill = Math.abs(init - this.velo.unc.x)
							this.velo.addCon(fill, 0)
						}
						this.velo.addCon(movAcc, 0)
					}
					else if (this.velo.unc.x < airSpdMax) this.velo.unc.x = Math.min(airSpdMax, this.velo.unc.x + airSpd)

					if (Math.sign(this.imageXScale) < 0) this.imageXScale *= -1
				}
			}
			else if (this.velo.con.x != 0) { //Unc to Con
				this.velo.addUnc(this.velo.con.x, 0)
			}

			//Jump
			if (this.input.space) {
				var jumpCheck = false
				this.bBox.height = actHeight
				if (grounded && !this.colCheck(0, -jumpUnc / 4)) jumpCheck = true
				else if (wallHug) { //Wall Jump
					jumpCheck = true
					this.velo.setConXMax(7.25)
					this.velo.unc.y *= 0.025
					if (wallHugRight || wallHugLeft) {
						if (this.input.left) this.velo.addCon(7.25, 0)
						else this.velo.addCon(-7.25, 0)
					}
					else {
						if (this.input.left) this.velo.addCon(-7.25, 0)
						else this.velo.addCon(7.25, 0)
					}
				}
				this.bBox.height = this.defaultHeight

				if (jumpCheck) {
					this.coyoteTime = 0
					this.coyoteWallTime = 0

					this.velo.addUnc(this.velo.con.x, 0)
					if (this.input.down || forceDown) { //Dive
						this.velo.unc.x *= 1.5
						this.state = EntityStates.dive
						this.jumpState = EntityStates.dive
						gravMult = 1.25
						dragMult = 0.9
						fricMult = 0.075
						jumpUnc = 18
						jumpAcc = 0
						jumpSpd = 0
					}
					else { //Jump
						gravMult = 1
						dragMult = 1
						fricMult = 1
					}
					this.velo.con.x = 0
					this.velo.addUnc(0, -jumpUnc)
					this.jump = jumpUnc
				}
				if (this.jump > 0) {
					this.velo.setConYNegMax(jumpSpd)
					this.velo.addCon(0, -jumpAcc)
					this.jump = approach(this.jump, 0, this.dragMult * 1)
				}
			}
			else {
				this.jump = 0
			}

			//State Height

			if (this.state == EntityStates.slide || this.prevState == EntityStates.dive) {
				this.bBox.height -= downHeightReduction
				if (this.prevState != EntityStates.slide && this.prevState != EntityStates.dive) this.y += downHeightReduction
			}
			else {
				if (this.prevState == EntityStates.slide || this.prevState == EntityStates.dive) this.y -= downHeightReduction
			}

			this.modCol() //Modification Collision

		}
		else { //Lose
			//Con Max Values
			this.dragMult = dragMult
			this.fricMult = fricMult
			this.gravMult = gravMult
			this.velo.setConXMax(movSpd)
			this.velo.setConYPosMax(grav * this.gravMult)
			this.velo.setConYNegMax(0)

			this.angle += this.lose * 0.33
		}

		//Velo Calc
		this.prevGround = grounded
		if (this.veloCalc()) {
			this.clipTime++
			if (this.clipTime >= 2) {
				this.loseGame()
			}
		}
		else {
			this.clipTime = 0
		}

		//Hazard Collision
		if (this.hazardCol(0, 0) && this.active) this.loseGame()

		if (this.ghostColCheck(0, 0) && this.active) {
			this.loseRun = true
			this.loseGame()
		}

		//Border Collision
		if (this.state != EntityStates.lose) {
			var roomId = undefined
			switch (this.canBndReturn()) {
				case dirLeft:
					if (currentRoom.left[0] != "") {
						roomId = findRoom(currentRoom.left[0])
						if (roomId != undefined) {
							if (roomId.right[0] != "") {
								var diffX = this.x
								var diffY = this.y - currentRoom.left[1]

								currentRoom.nextRoom(dirLeft, diffX, diffY)
							}
						}
					}
					else currentRoom.respawn()
					break
				case dirRight:
					if (currentRoom.right[0] != "") {
						roomId = findRoom(currentRoom.right[0])
						if (roomId != undefined) {
							if (roomId.left[0] != "") {
								var diffX = this.x - currentRoom.bnd.width
								var diffY = this.y - currentRoom.right[1]

								currentRoom.nextRoom(dirRight, diffX, diffY)
							}
						}
					}
					else currentRoom.respawn()
					break
				case dirUp:
					if (currentRoom.up[0] != "") {
						roomId = findRoom(currentRoom.up[0])
						if (roomId != undefined) {
							if (roomId.down[0] != "") {
								var diffX = this.x - currentRoom.up[1]
								var diffY = this.y

								currentRoom.nextRoom(dirUp, diffX, diffY)
							}
						}
					}
					else currentRoom.respawn()
					break
				case dirDown:
					if (currentRoom.down[0] != "") {
						roomId = findRoom(currentRoom.down[0])
						if (roomId != undefined) {
							if (roomId.up[0] != "") {
								var diffX = this.x - currentRoom.down[1]
								var diffY = this.y - currentRoom.bnd.height

								currentRoom.nextRoom(dirDown, diffX, diffY)
							}
						}
					}
					else currentRoom.respawn()
					break
			}
		}
		else {
			this.loseCnt += 1
		}
	}

	//Animation
	createAnim() {
		this.idleAnim = new SpriteAnim("portIdle?.png", 9, 3, 18, 51, EntityStates.idle)
		this.walkAnim = new SpriteAnim("portWalk?.png", 16, 3, 18, 57, EntityStates.walk)
		this.runAnim = new SpriteAnim("portRun?.png", 12, 3, 18, 57, EntityStates.run)
		this.jumpAnim = new SpriteAnim("portJump?.png", 2, 3, 18, 51, EntityStates.jump, true)
		this.slideAnim = new SpriteAnim("portSlide?.png", 3, 3, 18, 63, EntityStates.slide, true)
		this.diveAnim = new SpriteAnim("portDive?.png", 4, 3, 24, 63, EntityStates.dive, true)
		this.wallHugAnim = new SpriteAnim("portWallHug?.png", 3, 3, 18, 51, EntityStates.wallHug, true)
		this.loseAnim = new SpriteAnim("portLose?.png", 3, 3, 18, 51, EntityStates.lose, true)
		this.loseLowAnim = new SpriteAnim("portLose?.png", 3, 3, 18, 63, EntityStates.loseLow, true)
		this.landAnim = new SpriteAnim("portLand?.png", 3, 3, 18, 51, EntityStates.land, true)
		this.landLowAnim = new SpriteAnim("portLand?.png", 3, 3, 18, 63, EntityStates.landLow, true)
		this.fallAnim = new SpriteAnim("portFall?.png", 2, 3, 18, 51, EntityStates.fall, true)

		this.anim = [
			this.idleAnim,
			this.walkAnim,
			this.runAnim,
			this.jumpAnim,
			this.slideAnim,
			this.diveAnim,
			this.wallHugAnim,
			this.loseAnim,
			this.loseLowAnim,
			this.landAnim,
			this.landLowAnim,
			this.fallAnim
		]
	}

	//Draw
	draw() {
		
		if (ghost != undefined || currentRoom.name == "gameStart0") {
			fillStyle("black")
			textAlign("left")
			var str = "CURRENT SCORE: " + currentRun
			fillText(18, 34, 18, "arial black", str, true)
			fillStyle("rgb(240, 240, 255)")
			textAlign("left")
			fillText(16, 32, 18, "arial black", str, true)
		}
		
		if (this.alpha > 0) {

			//Cosmetic States

			var fakeState = this.state

			var grounded = this.checkGrounded()

			if (grounded) {
				if (!this.prevGround) this.landTime = 9
				else this.landTime = Math.max(0, this.landTime - 1)
			}
			else this.landTime = 0

			if (this.clipTime > 0) {
				if (this.bBox.height != this.defaultHeight) fakeState = EntityStates.loseLow
				else fakeState = EntityStates.lose
			}
			else if (this.landTime > 0 && fakeState != EntityStates.slide) {
				if (this.bBox.height != this.defaultHeight) fakeState = EntityStates.landLow
				else fakeState = EntityStates.land
			}
			else if (fakeState == EntityStates.jump && this.velo.getY() >= 0) {
				fakeState = EntityStates.fall
			}

			//Anim

			const anim = this.anim.find((anim) =>
				anim.isFor(fakeState)
			)

			if (anim != this.prevAnim) {
				this.prevAnim = anim
				anim.reset()
			}

			const image = anim.getImage()
			drawImg(image, this.x + cam.getOffX(), this.y + cam.getOffY(), image.width * this.imageXScale, image.height * this.imageYScale, anim.x, anim.y, this.angle, this.alpha)
		}
	}
}

//Projectile Particle
class ProjPart extends PhysicsObj {
	constructor(x, y, proj, direct) {
		super(x, y, 21, 21, 0, 0, 'Red', direct)

		this.proj = proj
		this.size = randomRange(15, 20)
		this.sizeChange = randomRange(1, 2)
		var mov = randomRange(0, 2)
		var movAngle = randomRange(0, 359)
		var pi = Math.PI
		var movRad = movAngle * pi / 180
		this.movX = mov * Math.cos(movRad)
		this.movY = mov * Math.sin(movRad)
	}

	//Draw
	draw() {
		this.size = approach(this.size, 0, this.sizeChange)

		if (this.size == 0) this.proj.part = arrayRemove(this.proj.part, this)
		else {

			this.x += this.movX
			this.y += this.movY

			fillStyle(this.color)
			fillRect(this.x + cam.getOffX() - (this.size / 2), this.y + cam.getOffY() - (this.size / 2), this.size, this.size, this.alpha)
		}
	}
}

//Projectile
class Proj extends PhysicsObj {
	constructor(x, y, dir, spd, direct) {
		var width = 21

		x -= width / 2
		y -= width / 2
		super(x, y, width, width, 0, 0, 'Red')
		this.dead = false

		this.weight = 0
		this.gravMult = 0

		this.part = []
		this.cnt = 3

		switch (dir) {
			case dirUp:
				this.velo.setConYNegMax(spd)
				this.velo.addCon(0, -spd)
				break;
			case dirDown:
				this.velo.setConYPosMax(spd)
				this.velo.addCon(0, spd)
				break;
			case dirLeft:
				this.velo.setConXMax(spd)
				this.velo.addCon(-spd, 0)
				break;
			case dirRight:
				this.velo.setConXMax(spd)
				this.velo.addCon(spd, 0)
				break;
		}

		if (direct) hazards.push(this)
	}

	//Input
	inputCheck() {
		this.input.space = space
		this.input.shift = shift
		this.input.left = left
		this.input.up = up
		this.input.right = right
		this.input.down = down
	}

	//Step
	step() {
		if (this.active) {

			if (this.dead) {
				this.active = false
				hazards = arrayRemove(hazards, this)
				currentRoom.hazards = arrayRemove(currentRoom.hazards, this)
			}

			this.modCol() //Modification Collision

			this.dead = this.colCheck(this.velo.getX(), this.velo.getY())

			if (this.veloCalc() && !this.active) {
				this.active = false
				hazards = arrayRemove(hazards, this)
				currentRoom.hazards = arrayRemove(currentRoom.hazards, this)
			}

			this.cnt = approach(this.cnt, 0, 1)

			if (this.cnt == 0) {
				this.part.push(new ProjPart(this.getTrueOriginX() + (this.bBox.width / 2), this.getTrueOriginY() + (this.bBox.height / 2), this, false))
				this.cnt = 3
			}

		}
	}

	//Draw
	draw() {
		var length = this.part.length
		for (var i = 0; i < length; i++) {
			if (this.part[i] != undefined) this.part[i].draw()
		}

		const image = img("proj1.png")
		drawImg(image, this.x + cam.getOffX(), this.y + cam.getOffY(), image.width * this.imageXScale, image.height * this.imageYScale, 0, 0, 0)
	}

}

//Text
class Text extends PhysicsObj {
	constructor(x, y, size, font, str, color, align, bold = false, italic = false, direct = false) {
		super(x, y, 50, 50, 0, 0, color)
		this.tangible = false
		this.size = size
		this.font = font
		this.str = str
		this.align = align
		this.bold = bold
		this.italic = italic

		if (direct) floats.push(this)
	}

	draw() {
		fillStyle(this.color)
		textAlign(this.align)
		fillText(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY(), this.size, this.font, this.str, this.bold, this.italic)
	}
}

//Text
class StrokeText extends PhysicsObj {
	constructor(x, y, size, font, str, color, align, bold = false, italic = false, direct = false) {
		super(x, y, 50, 50, 0, 0, color)
		this.tangible = false
		this.size = size
		this.font = font
		this.str = str
		this.align = align
		this.bold = bold
		this.italic = italic

		if (direct) floats.push(this)
	}

	draw() {
		strokeStyle(this.strokeColor)
		textAlign(this.align)
		strokeText(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY(), this.size, this.font, this.str, this.bold, this.italic)
	}
}

//Sprite
class Sprite extends PhysicsObj {
	constructor(x, y, image, direct = false) {
		super(x, y, 50, 50, 0, 0, "White")
		this.tangible = false
		this.image = image

		if (direct) floats.push(this)
	}

	draw() {
		drawImg(this.image, this.x + cam.getOffX(), this.y + cam.getOffY(), this.image.width * this.imageXScale, this.image.height * this.imageYScale, 0, 0, 0)
	}
}

//Spawn
class Spawn extends PhysicsObj {
	constructor(x, y, direct = false) {
		super(x, y, 10, 10, 0, 0, "Blue")
		this.tangible = false

		if (direct) floats.push(this)
	}

	draw() {
		if (0) {
			fillStyle(this.color)
			fillRect(this.getTrueOriginX() + cam.getOffX() - (this.bBox.width / 2), this.getTrueOriginY() + cam.getOffY() - (this.bBox.height / 2), this.bBox.width, this.bBox.height, this.alpha)
		}
	}
}

//Launcher
class Launcher extends PhysicsObj {
	constructor(x, y, dir, time, delay, spd, direct = false) {
		var width = 15
		var height = 21
		var bBoxWidth = 0
		var bBoxHeight = 0

		switch (dir) {
			case dirUp:
				y -= height
				bBoxWidth = width
				bBoxHeight = height
				break;
			case dirDown:
				bBoxWidth = width
				bBoxHeight = height
				break;
			case dirLeft:
				x -= width
				bBoxWidth = height
				bBoxHeight = width
				break;
			case dirRight:
				bBoxWidth = height
				bBoxHeight = width
				break;
		}

		super(x, y, bBoxWidth, bBoxHeight, 0, 0, 'Gray')

		this.dir = dir
		this.time = time
		this.cnt = delay
		this.spd = spd
		this.weight = 0

		if (direct) walls.push(this)
	}

	step() {

		if (this.cnt == 0) {
			this.cnt = this.time
			var dist = Math.ceil(21 / 2)
			var x = this.x + (this.bBox.width / 2)
			var y = this.y + (this.bBox.height / 2)

			switch (this.dir) {
				case dirUp:
					y = this.getSideUp() - dist
					break;
				case dirDown:
					y = this.getSideDown() + dist
					break;
				case dirLeft:
					x = this.getSideLeft() - dist
					break;
				case dirRight:
					x = this.getSideRight() + dist
					break;
			}

			new Proj(x, y, this.dir, this.spd, true)
		}
		else {
			this.cnt = approach(this.cnt, 0, 1)
		}
	}

	draw() {

		var image = img("launcherUp1.png")

		switch (this.dir) {
			case dirUp:
				image = img("launcherUp1.png")
				if (this.cnt >= this.time - 5) image = img("launcherUp2.png")
				break;
			case dirDown:
				image = img("launcherDown1.png")
				if (this.cnt >= this.time - 5) image = img("launcherDown2.png")
				break;
			case dirLeft:
				image = img("launcherLeft1.png")
				if (this.cnt >= this.time - 5) image = img("launcherLeft2.png")
				break;
			case dirRight:
				image = img("launcherRight1.png")
				if (this.cnt >= this.time - 5) image = img("launcherRight2.png")
				break;
		}

		drawImg(image, this.x + cam.getOffX(), this.y + cam.getOffY(), image.width * this.imageXScale, image.height * this.imageYScale, 0, 0, 0)
	}

	//Draw Border
	drawBorder() {

	}

}

//Spike
class Spike extends PhysicsObj {
	constructor(x, y, units, dir, direct = false) {
		var width = 15
		var height = 18
		var bBoxWidth = 0
		var bBoxHeight = 0

		switch (dir) {
			case dirUp:
				y -= height
				bBoxWidth = width * units
				bBoxHeight = height
				break;
			case dirDown:
				bBoxWidth = width * units
				bBoxHeight = height
				break;
			case dirLeft:
				x -= height
				bBoxWidth = height
				bBoxHeight = height * units
				break;
			case dirRight:
				bBoxWidth = height
				bBoxHeight = width * units
				break;
		}

		super(x, y, bBoxWidth, bBoxHeight, 0, 0, 'Red')

		this.units = units
		this.dir = dir
		this.weight = 0

		if (direct) hazards.push(this)
	}

	draw() {

		var image = img("spikeUp1.png")
		var addX = 0
		var addY = 0

		switch (this.dir) {
			case dirUp:
				image = img("spikeUp1.png")
				addX = image.width
				break;
			case dirDown:
				image = img("spikeDown1.png")
				addX = image.width
				break;
			case dirLeft:
				image = img("spikeLeft1.png")
				addY = image.height
				break;
			case dirRight:
				image = img("spikeRight1.png")
				addY = image.height
				break;
		}



		for (var i = 0; i < this.units; i++) {
			drawImg(image, this.x + cam.getOffX() + (addX * i), this.y + cam.getOffY() + (addY * i), image.width * this.imageXScale, image.height * this.imageYScale, 0, 0, 0)
		}
	}

}

//Accel
class Accel extends PhysicsObj {
	constructor(x, y, units, dir, acc, direct = false) {
		var width = 33
		var height = 60
		var bBoxWidth = 0
		var bBoxHeight = 0

		switch (dir) {
			case dirLeft:
				y -= height / 2
				x -= width * length
				bBoxWidth = width * units
				bBoxHeight = height
				break;
			case dirRight:
				y -= height / 2
				bBoxWidth = width * units
				bBoxHeight = height
				break;
			case dirUp:
				x -= height / 2
				y -= width * units
				bBoxWidth = height
				bBoxHeight = width * units
				break;
			case dirDown:
				x -= height / 2
				bBoxWidth = height
				bBoxHeight = width * units
				break;
		}

		super(x, y, bBoxWidth, bBoxHeight, 0, 0, 'Black')

		this.units = units
		this.acc = acc
		this.dir = dir
		this.weight = 0
		this.defaultCnt = 40
		this.cnt = this.defaultCnt

		if (direct) mods.push(this)
	}

	mod(entity) {
		switch (this.dir) {
			case dirLeft:
				entity.velo.addConXMax(this.acc)
				entity.velo.addCon(-this.acc, 0)
				break;
			case dirRight:
				entity.velo.addConXMax(this.acc)
				entity.velo.addCon(this.acc, 0)
				break;
			case dirUp:
				entity.velo.addConYNegMax(this.acc)
				entity.velo.addCon(0, -this.acc)
				break;
			case dirDown:
				entity.velo.addConYPosMax(this.acc)
				entity.velo.addCon(0, this.acc)
				break;
		}
	}

	draw() {

		var image1 = img("accelLeft1.png")
		var image2 = img("accelLeft2.png")
		var addX = 0
		var addY = 0

		switch (this.dir) {
			case dirLeft:
				image1 = img("accelLeft1.png")
				image2 = img("accelLeft2.png")
				addX = image1.width
				break;
			case dirRight:
				image1 = img("accelRight1.png")
				image2 = img("accelRight2.png")
				addX = image1.width
				break;
			case dirUp:
				image1 = img("accelUp1.png")
				image2 = img("accelUp2.png")
				addY = image1.height
				break;
			case dirDown:
				image1 = img("accelDown1.png")
				image2 = img("accelDown2.png")
				addY = image1.height
				break;
		}



		for (var i = 0; i < this.units; i++) {
			var image = image2
			if ((i % 2 == 0 && this.cnt > this.defaultCnt / 2) || (i % 2 != 0 && this.cnt <= this.defaultCnt / 2)) {
				image = image1
			}
			drawImg(image, this.x + cam.getOffX() + (addX * i), this.y + cam.getOffY() + (addY * i), image.width * this.imageXScale, image.height * this.imageYScale, 0, 0, 0, this.alpha * 0.65)
		}

		this.cnt = Math.max(0, this.cnt - 1)
		if (this.cnt == 0) this.cnt = this.defaultCnt


		fillStyle("rgb(150,255,150)")
		fillRect(this.getTrueOriginX() + cam.getOffX(), this.getTrueOriginY() + cam.getOffY(), this.bBox.width, this.bBox.height, this.alpha * 0.15)
	}

}

//Find Rooms
function findRoom(str) {
	console.log("FINDING ROOM - " + str)
	var length = rooms.length
	for (var i = 0; i < length; i++) {
		if (rooms[i].name == str) {
			return rooms[i]
		}
	}
	console.log("COULD NOT FIND ROOM - " + str)
	return undefined
}

//Room
class Room {
	constructor(name, width, height, color = undefined) {
		this.name = name
		this.bnd = new Bounds(width, height)
		this.entities = []
		this.walls = []
		this.mods = []
		this.hazards = []
		this.floats = []
		this.left = ["", -1]
		this.right = ["", -1]
		this.up = ["", -1]
		this.down = ["", -1]
		this.spawn = undefined
		this.color = color
		rooms.push(this)
	}

	addDoor(room, thickness, color, dir, pos, length, accel=false) {

		var halfLength = Math.round(length / 2)

		switch (dir) {
			case dirLeft:
				this.addWall(new Wall(-thickness, 0, thickness * 2, pos - halfLength, color))
				this.addWall(new Wall(-thickness, pos + halfLength, thickness * 2, this.bnd.height - pos - halfLength, color))
				if (accel) this.addMod(new Accel(0, pos, 1, dirRight, 12))
				this.left = [room, pos]
				break
			case dirRight:
				this.addWall(new Wall(this.bnd.width - thickness, 0, thickness * 2, pos - halfLength, color))
				this.addWall(new Wall(this.bnd.width - thickness, pos + halfLength, thickness * 2, this.bnd.height - pos - halfLength, color))
				if (accel) this.addMod(new Accel(this.bnd.width - 33, pos, 1, dirLeft, 12))
				this.right = [room, pos]
				break
			case dirUp:
				this.addWall(new Wall(0, -thickness, pos - halfLength, thickness * 2, color))
				this.addWall(new Wall(pos + halfLength, -thickness, this.bnd.width - pos - halfLength, thickness * 2, color))
				if (accel) this.addMod(new Accel(pos, 0, 1, dirDown, 12))
				this.up = [room, pos]
				break
			case dirDown:
				this.addWall(new Wall(0, this.bnd.height - thickness, pos - halfLength, thickness * 2, color))
				this.addWall(new Wall(pos + halfLength, this.bnd.height - thickness, this.bnd.width - pos - halfLength, thickness * 2, color))
				if (accel) this.addMod(new Accel(pos, this.bnd.height, 1, dirUp, 12))
				this.down = [room, pos]
				break
		}

	}

	addBorder(thickness, color, left = true, right = true, up = true, down = true) {

		if (left) {
			this.addWall(new Wall(-thickness, 0, thickness * 2, this.bnd.height, color))
		}

		if (right) {
			this.addWall(new Wall(this.bnd.width - thickness, 0, thickness * 2, this.bnd.height, color))
		}

		if (up) {
			this.addWall(new Wall(0, -thickness, this.bnd.width, thickness * 2, color))
		}

		if (down) {
			this.addWall(new Wall(0, this.bnd.height - thickness, this.bnd.width, thickness * 2, color))
		}
	}

	addEntity(obj) {
		this.entities.push(obj)
	}

	addWall(obj) {
		if (this.color != undefined) obj.color = this.color
		this.walls.push(obj)
	}

	addMod(obj) {
		this.mods.push(obj)
	}

	addHazard(obj) {
		this.hazards.push(obj)
	}

	addFloat(obj) {
		this.floats.push(obj)
	}

	load() {

		//Change Border Color
		if (gameStart == 2) {
			gameElement.style.setProperty('border-color', this.color)
		}

		console.log("LOADED ROOM - " + this.name)
		this.func()

		var length = this.entities.length
		for (var i = 0; i < length; i++) {
			entities.push(this.entities[i])
		}

		var length = this.walls.length
		for (var i = 0; i < length; i++) {
			walls.push(this.walls[i])
		}

		var length = this.mods.length
		for (var i = 0; i < length; i++) {
			mods.push(this.mods[i])
		}

		var length = this.hazards.length
		for (var i = 0; i < length; i++) {
			hazards.push(this.hazards[i])
		}

		var length = this.floats.length
		for (var i = 0; i < length; i++) {
			floats.push(this.floats[i])
		}
	}

	func() {

	}

	unloadFunc() {
		
	}

	unload() {
		
		console.log("UNLOADED ROOM - " + this.name)

		this.unloadFunc()

		/*
		var length = this.entities.length
		for(var i = 0; i < length; i ++) {
			entities = arrayRemove(entities, this.entities[i])
		}
		
		var length = this.walls.length
		for(var i = 0; i < length; i ++) {
			walls = arrayRemove(walls, this.walls[i])
		}
		
		var length = this.mods.length
		for(var i = 0; i < length; i ++) {
			mods = arrayRemove(mods, this.mods[i])
		}
		
		var length = this.hazards.length
		for(var i = 0; i < length; i ++) {
			hazards = arrayRemove(hazards, this.hazards[i])
		}
		
		var length = this.floats.length
		for(var i = 0; i < length; i ++) {
			floats = arrayRemove(hazards, this.floats[i])
		}
		*/
		entities = [player]
		walls = []
		mods = []
		hazards = []
		floats = []
	}

	respawn() {
		new Transition(this, respawn, 0, 0)
	}

	nextRoom(dir, diffX, diffY) {
		if (trans == undefined) {
			if (ghost != undefined) ghost.nextRoom()
			switch (dir) {
				case dirLeft:
					console.log("ENTERING ROOM - LEFT")
					new Transition(findRoom(this.left[0]), dirRight, diffX, diffY)
					break;
				case dirRight:
					console.log("ENTERING ROOM - RIGHT")
					new Transition(findRoom(this.right[0]), dirLeft, diffX, diffY)
					break;
				case dirUp:
					console.log("ENTERING ROOM - UP")
					new Transition(findRoom(this.up[0]), dirDown, diffX, diffY)
					break;
				case dirDown:
					console.log("ENTERING ROOM - DOWN")
					new Transition(findRoom(this.down[0]), dirUp, diffX, diffY)
					break;
			}
		}
	}

	randomRoom(dir) {
		var name = ""
		var diff = currentDiff

		switch (dir) {
			case dirLeft:
				while (endRight[diff].length <= 0) {
					console.log("NO ROOMS FOUND - DIFF " + diff + " RIGHT")
					diff -= 1
					if (diff < 0) return
				}
				var name = endRight[diff][randomRange(0, endRight[diff].length - 1)].name
				this.left[0] = name
				break;
			case dirRight:
				while (endLeft[diff].length <= 0) {
					console.log("NO ROOMS FOUND - DIFF " + diff + " LEFT")
					diff -= 1
					if (diff < 0) return
				}
				var name = endLeft[diff][randomRange(0, endLeft[diff].length - 1)].name
				this.right[0] = name
				break;
			case dirUp:
				while (endDown[diff].length <= 0) {
					console.log("NO ROOMS FOUND - DIFF " + diff + " DOWN")
					diff -= 1
					if (diff < 0) return
				}
				var name = endDown[diff][randomRange(0, endDown[diff].length - 1)].name
				this.up[0] = name
				break;
			case dirDown:
				while (endUp[diff].length <= 0) {
					console.log("NO ROOMS FOUND - DIFF " + diff + " UP")
					diff -= 1
					if (diff < 0) return
				}
				var name = endUp[diff][randomRange(0, endUp[diff].length - 1)].name
				this.down[0] = name
				break;
		}

		console.log("RANDOM ROOM SELECTED - " + name)
	}
}

//Check Transition
function checkTrans() {
	if (trans != undefined) {
		if (trans.pause != 0) return false
		else return true
	}
	else return true
}

//Transition
class Transition {
	constructor(room, dir, diffX, diffY) {
		this.l = 0
		this.r = 0
		if (dir == slide) this.r = canvas.width
		this.target = room
		this.source = currentRoom
		this.dir = dir
		this.diffX = diffX
		this.diffY = diffY
		this.spd = canvas.width / 6
		this.pause = 3
		this.end = false
		trans = this
	}

	step() {
		if (this.r != canvas.width) {
			this.r = clamp(this.r + this.spd, 0, canvas.width)
			if (this.r == canvas.width) {
				if (this.dir != slide) {
					currentRoom.unload()
					this.target.load()
					currentRoom = this.target
				}

				switch (this.dir) {
					case dirLeft:
						player.x = this.diffX
						player.y = currentRoom.left[1] + this.diffY
						break;
					case dirRight:
						player.x = currentRoom.bnd.width + this.diffX
						player.y = currentRoom.right[1] + this.diffY
						break;
					case dirUp:
						player.x = currentRoom.up[1] + this.diffX
						player.y = this.diffY
						break;
					case dirDown:
						player.x = currentRoom.down[1] + this.diffX
						player.y = currentRoom.bnd.height + this.diffY
						break;
					case respawn:
						var x = 0
						var y = 0
						if (currentRoom.spawn != undefined) {
							x = currentRoom.spawn.x
							y = currentRoom.spawn.y
						}
						entities = arrayRemove(entities, player)
						player = new Player(x, y, true)
						if (player.canColCheck(0, 0)) player.forceInBounds(100)
						break;
					case slide:
						break;
					case undefined:
						var x = 0
						var y = 0
						if (currentRoom.spawn != undefined) {
							x = currentRoom.spawn.x
							y = currentRoom.spawn.y
						}
						player.x = x
						player.y = y
						if (player.canColCheck(0, 0)) player.forceInBounds(100)
						break;
				}

			}
		}
		else if (this.pause > 0) {
			this.pause--
		}
		else if (this.l != canvas.width) {
			this.l = clamp(this.l + this.spd, 0, canvas.width)
		}
		else {
			this.end = true
		}
	}

	draw() {
		fillStyle('rgb(10, 10, 18)')
		fillRect(this.l, 0, this.r, canvas.height)
		if (this.end) trans = undefined
	}
}

//Endless Room

class EndRoom extends Room {
	constructor(name, width, height, color, start, end, diff) {

		super(name, width, height, color)
		var borderWidth = 15

		var left = (start != dirLeft && end != dirLeft)
		var right = (start != dirRight && end != dirRight)
		var up = (start != dirUp && end != dirUp)
		var down = (start != dirDown && end != dirDown)

		this.addBorder(borderWidth, color, left, right, up, down)
		this.end = end

		switch (start) {
			case dirLeft:
				endLeft[diff].push(this)
				break;
			case dirRight:
				endRight[diff].push(this)
				break;
			case dirUp:
				endUp[diff].push(this)
				break;
			case dirDown:
				endDown[diff].push(this)
				break;
		}
	}

	func() {

		if (ghost == undefined) ghost = new Ghost(true)

		this.randomRoom(this.end)
		
		currentRun += 1
	}
}