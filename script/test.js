class TestC extends Room {
	constructor() {
		super("testC", 2000, 600)
		
		this.addWall(new Wall(200, 400, 200, 100, "Green"))
		
		this.addWall(new WallFade(500, this.bnd.height - 150, 200, 30, "Red", 4, 1))
		
		this.addWall(new WallFade(800, this.bnd.height - 140, 200, 30, "Red", 4, 1))
		
		this.addBorder(15, "Green", true, false, true, false)
		
		this.addDoor("testR", 15, "Green", dirRight, this.bnd.height - 55, 80)
		
		this.addDoor("testD", 15, "Green", dirDown, 300, 80)
		
		this.addWall(new Wall(500,  this.bnd.height - 80, 800, 30, "Green"))
		
		this.addMod(new Accel(500, this.bnd.height - 35, 6, dirRight, 5))
		
		this.addFloat(new Text(100, this.bnd.height - 100, 12, "Arial", "Let's goo Bitch", "Red", "Center"))
		
		this.spawn = new Spawn(100, this.bnd.height - 100)
		this.addFloat(this.spawn)
	}
}

class TestR extends Room {
	constructor() {
		super("testR", 1000, 300)
		
		this.addWall(new Wall(200, 100, 200, 100, "Yellow"))
		
		this.addBorder(15, "Yellow", false, true, true, true)
		
		this.addDoor("testC", 15, "Yellow", dirLeft, this.bnd.height - 55, 80)
		
		this.addWall(new Wall(500, 220, 200, 30, "Yellow"))
		
		this.addHazard(new Spike(200, 15, 6, dirDown))
		this.addHazard(new Spike(200, this.bnd.height - 15, 6, dirUp))
		this.addHazard(new Spike(15, 80, 6, dirRight))
		this.addHazard(new Spike(this.bnd.width - 15, 80, 6, dirLeft))
		
		this.addWall(new Launcher(100, 40, dirRight, 20, 0, 6))
	}
}

class TestD extends Room {
	constructor() {
		super("testD", 1000, 300)
		
		this.addWall(new Wall(200, 100, 200, 100, "Blue"))
		
		this.addBorder(15, "Blue", true, true, false, true)
		
		this.addDoor("testC", 15, "Blue", dirUp, this.bnd.width - 55, 80)
		
	}
}

const testC = new TestC()
const testR = new TestR()
const testD = new TestD()