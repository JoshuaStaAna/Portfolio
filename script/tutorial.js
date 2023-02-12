class Tutorial0 extends Room {
	constructor() {
		
		var borderWidth = 15
		var color = cGray
		
		super("tutorial0", 1000, 600, color)
		
		this.addWall(new Wall(0, 300, (this.bnd.width / 2), (this.bnd.height - 300), color))
		
		this.addBorder(borderWidth, color, false, false, true, false)
		
		this.addDoor("gameStart0", borderWidth, color, dirRight, 300 - 40, 80)
		this.addDoor("tutorial1", borderWidth, color, dirDown, (this.bnd.width * 3 / 4) - (Math.floor(borderWidth / 2)), (this.bnd.width / 2) - borderWidth + 1)
		this.addDoor("tutorial4", borderWidth, color, dirLeft, borderWidth + 40, 80)
		this.addWall(new Wall(0, borderWidth + 80, 400, borderWidth, color))
		this.addWall(new Wall(481, 0, this.bnd.width - 481, 80 + (borderWidth * 2), color))
		
		this.addWall(new Wall(this.bnd.width - 130, 300, 130, borderWidth, color))
		
		this.addHazard(new Spike(this.bnd.width - borderWidth, 300 + borderWidth, 20, dirLeft))
		
		this.addFloat(new Text((this.bnd.width / 2) + 220, 350, 24, "arial black", "PORTFOLIO / TUTORIAL", "black", "center"))
		this.addFloat(new Text((this.bnd.width / 2) + 220, 376, 24, "arial black", "\u21e9", "black", "center", true))
		
		this.spawn = new Spawn(100, 299)
		this.addFloat(this.spawn)
		
		var spacing = 28
		this.addFloat(new Sprite(250, 233, img("buttonLeft.png")))
		this.addFloat(new Sprite(250 + spacing, 233, img("buttonRight.png")))
	
		this.addFloat(new Text(250 - 5, 255, 24, "arial black", "PRESS", "black", "right"))	
		this.addFloat(new Text(250 + spacing + 30, 255, 24, "arial black", "TO MOVE", "black", "left"))	
		
		this.addFloat(new Text(this.bnd.width - 110, 255, 24, "arial black", "GAME", "black", "left"))
		this.addFloat(new Text(this.bnd.width - 70, 281, 24, "arial black", "\u21e8", "black", "center", true))	
	}
	
	func() {
		currentSlide(1)
	}
}

const tutorial0 = new Tutorial0()

class Tutorial1 extends Room {
	constructor() {
		
		var prevDoorWidth = 486
		
		var borderWidth = 15
		var color = cGreen
		
		super("tutorial1", 1000, 300, color)
		this.addDoor("tutorial0", borderWidth, color, dirUp, this.bnd.width - borderWidth - (prevDoorWidth / 2), prevDoorWidth)
		this.addDoor("tutorial2", borderWidth, color, dirLeft, borderWidth + 40, 80)
		
		this.spawn = new Spawn(this.bnd.width - 100, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)
		
		this.addBorder(borderWidth, color, false, true, false, true)

		this.addWall(new Wall(this.bnd.width - prevDoorWidth - 50 - borderWidth, this.bnd.height - 70, 50, 70, color))
	
		this.addWall(new Wall(0, borderWidth + 80, 160, this.bnd.height - (borderWidth + 80), color))
		
		this.addFloat(new Sprite(690, 112, img("buttonSpace.png")))
		this.addFloat(new Text(690 - 5, 134, 24, "arial black", "PRESS", "black", "right"))	
		this.addFloat(new Text(690 + 80, 134, 24, "arial black", "TO JUMP", "black", "left"))	
		this.addFloat(new Text(690 + 54, 162, 24, "arial black", "OVER OBSTACLES", "black", "center"))	
		
		this.addFloat(new Text(330, 122, 24, "arial black", "JUMP WHILE MOVING", "black", "center"))	
		this.addFloat(new Text(330, 150, 24, "arial black", "TOWARDS A WALL IN", "black", "center"))
		this.addFloat(new Text(330, 178, 24, "arial black", "MID-AIR TO WALL JUMP", "black", "center"))	
	}
	
	func() {
		currentSlide(2)
	}
}

const tutorial1 = new Tutorial1()


class Tutorial2 extends Room {
	constructor() {
		
		var prevDoorWidth = 80
		
		var borderWidth = 15
		var color = cBlue
		
		super("tutorial2", 1000, 400, color)
		this.addDoor("tutorial1", borderWidth, color, dirRight, this.bnd.height - borderWidth - (prevDoorWidth / 2), prevDoorWidth)
		this.addDoor("tutorial3", borderWidth, color, dirUp, borderWidth + 40, 80)
		
		this.spawn = new Spawn(this.bnd.width - 40, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)
		
		this.addBorder(borderWidth, color, true, false, false, true)
		
		this.addWall(new Wall(100, this.bnd.height - borderWidth - prevDoorWidth - 60, this.bnd.width - 100, 40, color))
		this.addWall(new Wall(100, this.bnd.height - borderWidth - prevDoorWidth - 60, 40, 80, color))
		
		this.addFloat(new Sprite(380, this.bnd.height - 102, img("buttonShift.png")))
		this.addFloat(new Text(380 - 5, this.bnd.height - 80, 24, "arial black", "PRESS", "black", "right"))	
		this.addFloat(new Text(380 + 58, this.bnd.height - 80, 24, "arial black", " WHILE MOVING TO SPRINT", "black", "left"))	
		
		this.addFloat(new Sprite(160, this.bnd.height - 242, img("buttonDown.png")))
		this.addFloat(new Text(160 - 5, this.bnd.height - 220, 24, "arial black", "PRESS", "black", "right"))	
		this.addFloat(new Text(160 + 24, this.bnd.height - 220, 24, "arial black", " WHILE MOVING TO SLIDE UNDER OBSTACLES", "black", "left"))	
		
		this.addWall(new Wall(0, 100, this.bnd.width - 100, 40, color))
		this.addWall(new Wall(900 - 40, 100, 40, 110, color))
		
		this.addWall(new Wall(720, 0, 80, 64, color))
		
		this.addMod(new Accel(100, 60, 18, dirLeft, 1))
	}
	
	func() {
		currentSlide(3)
	}
}

const tutorial2 = new Tutorial2()

class Tutorial3 extends Room {
	constructor() {
		
		var prevDoorWidth = 80
		
		var borderWidth = 15
		var color = cRed
		
		super("tutorial3", 1000, 400, color)
		this.addDoor("tutorial2", borderWidth, color, dirDown, borderWidth + (prevDoorWidth / 2), prevDoorWidth)
		this.addDoor("tutorial4", borderWidth, color, dirUp, borderWidth + 40, 80)
		
		this.addBorder(borderWidth, color, true, true, false, false)
		
		this.addMod(new Accel(borderWidth + 40, this.bnd.height, 2, dirUp, 12))
		
		this.spawn = new Spawn(150, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)
		
		this.addWall(new Wall(0, 200, 845, 15, color))
		
		this.addFloat(new Text(250, 264, 24, "arial black", "SLIDE WHILE SPRINTING", "black", "center"))	
		this.addFloat(new Text(250, 292, 24, "arial black", "TO MAINTAIN MOMENTUM", "black", "center"))	
		
		this.addWall(new Wall(500, 200 + borderWidth, 215, 132, color))
		
		this.addWall(new Wall(0, 200 - 60 + borderWidth, 200, 60, color))
		this.addHazard(new Spike(200, 200, 20, dirUp))
		this.addWall(new Wall(500, 200 - 60 + borderWidth, 345, 60, color))
		
		this.addFloat(new Text(100, 64, 24, "arial black", "JUMP DURING A SPRINTING SLIDE TO DIVE LONG DISTANCES", "black", "left"))	
	}
	
	func() {
		currentSlide(4)
	}
}

const tutorial3 = new Tutorial3()

class Tutorial4 extends Room {
	constructor() {
		
		var prevDoorWidth = 80
		
		var borderWidth = 15
		var color = cPurple
		
		super("tutorial4", 2000, 500, color)
		this.addDoor("tutorial3", borderWidth, color, dirDown, borderWidth + (prevDoorWidth / 2), prevDoorWidth)
		this.addDoor("tutorial0", borderWidth, color, dirRight, 220 - 40, 80)
		
		this.addBorder(borderWidth, color, true, false, true, false)
		
		this.addMod(new Accel(borderWidth + 40, this.bnd.height, 2, dirUp, 12))
		
		this.spawn = new Spawn(150, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)
		
		this.addWall(new Wall(400, 140, 100, 30, color))
		
		this.addWall(new Wall(200, 240, 100, 30, color))

		this.addWall(new Wall(400, 340, 100, 30, color))
		
		this.addWall(new Wall(200, 440, 100, 30, color))
	
		this.addWall(new Wall(600, 140, 100, this.bnd.height - 220, color))
		
		this.addMod(new Accel(600 - 30, 188, 7, dirDown, 8))
		this.addMod(new Accel(600 - 60, this.bnd.height - 48, 8, dirLeft, 5))
		this.addWall(new Wall(804, 0, 50, this.bnd.height - 150 - 80, color))
		this.addWall(new Wall(854, 0, 50, this.bnd.height - 150 - 36, color))
		this.addWall(new Wall(804, this.bnd.height - 150, 100, 150, color))
		
		this.addMod(new Accel(995, this.bnd.height - 48, 30, dirLeft, 5))
		
		this.addWall(new Wall(995, 340, 100, 80, color))
		
		this.addWall(new Wall(1200, 280, 50, borderWidth, color))
		
		this.addWall(new Wall(1350, 220, 150, borderWidth, color))
		
		this.addWall(new Wall(this.bnd.width - borderWidth - 100, 220, 100, borderWidth, color))
	}
	
	func() {
		currentSlide(5)
	}
}

const tutorial4 = new Tutorial4()

class GameStart0 extends Room {
	constructor() {
		
		var borderWidth = 15
		var color = cWhite
		
		super("gameStart0", 1000, 300, color)
		
		this.addBorder(borderWidth, color, false, false, true, true)
		
		this.addDoor("tutorial0", borderWidth, color, dirLeft, this.bnd.height - 40 - borderWidth, 80)
		this.addDoor("gameStart0", borderWidth, color, dirRight, this.bnd.height - 40 - borderWidth, 80)
		
		this.spawn = new Spawn(150, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)
		
		this.addFloat(new Text(this.bnd.width / 2, 130, 24, "arial black", "PROGRESS THROUGH AN ENDLESS AMOUNT", "black", "center"))	
		this.addFloat(new Text(this.bnd.width / 2, 160, 24, "arial black", "OF ROOMS BEFORE THE GHOST CATCHES YOU", "black", "center"))	
	}
	
	func() {
		this.randomRoom(dirRight)
	}
	
	unloadFunc() {
		currentRun = 0	
	}
}

const gameStart0 = new GameStart0()