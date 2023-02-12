class EndLeft0 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cOrange

		super("endLeft0", 1000, 300, color, dirLeft, dirRight, 0)

		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - 40 - borderWidth, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirRight, 40 + borderWidth, 80)

		this.spawn = new Spawn(100, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)

		this.addHazard(new Spike(250, this.bnd.height - borderWidth, 49, dirUp))

		this.addWall(new Wall(200, this.bnd.height - 100, 50, 100, color))

		this.addWall(new Wall(300, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(450, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(600, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(750, this.bnd.height - 100, 70, 30, color))
	}
}

const endLeft0 = new EndLeft0()

class EndLeft1 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cPurple

		super("endLeft1", 1000, 300, color, dirLeft, dirUp, 0)

		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - 40 - borderWidth, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirUp, this.bnd.width - 40 - borderWidth, 80)

		this.spawn = new Spawn(100, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)

		this.addHazard(new Spike(250, this.bnd.height - borderWidth, 49, dirUp))

		this.addWall(new Wall(200, this.bnd.height - 100, 50, 100, color))

		this.addWall(new Wall(300, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(450, this.bnd.height - 170, 70, 30, color))

		this.addWall(new Wall(600, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(750, this.bnd.height - 170, this.bnd.width - 750, 30, color))

		this.addWall(new Wall(this.bnd.width - borderWidth - 80 - borderWidth, 0, borderWidth, 30, color))
	}
}

const endLeft1 = new EndLeft1()

class EndDown0 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cGreen

		super("endDown0", 1000, 300, color, dirDown, dirUp, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, (this.bnd.width / 2) - 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirUp, (this.bnd.width / 2) - 40, 80)

		this.spawn = new Spawn((this.bnd.width / 2) + 40, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)

		this.addWall(new Wall(0, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))
		this.addWall(new Wall((this.bnd.width / 2) + 80, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))

		this.addHazard(new Spike((this.bnd.width / 2) + 80, this.bnd.height - borderWidth - 75, 5, dirLeft))
		this.addWall(new Wall((this.bnd.width / 2) - 80, borderWidth + 75, 80, borderWidth, color))
		this.addHazard(new Spike((this.bnd.width / 2) - 80, borderWidth + 75 + borderWidth, 2, dirRight))
		this.addHazard(new Spike((this.bnd.width / 2) + 80, borderWidth, 2, dirLeft))
	}
}

const endDown0 = new EndDown0()

class EndDown1 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cLightGreen

		super("endDown1", 1000, 300, color, dirDown, dirUp, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, (this.bnd.width / 2) + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirUp, (this.bnd.width / 2) - 40, 80)

		this.spawn = new Spawn((this.bnd.width / 2) - 40, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)

		this.addWall(new Wall(0, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))
		this.addWall(new Wall((this.bnd.width / 2) + 80, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))
		this.addWall(new Wall((this.bnd.width / 2), 0, 80, this.bnd.height - 135, color))

		this.addHazard(new Spike((this.bnd.width / 2), 0, 11, dirLeft))
	}
}

const endDown1 = new EndDown1()

class EndUp0 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cRed

		super("endUp0", 1000, 300, color, dirUp, dirDown, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, (this.bnd.width / 2) + 40, 80)
		this.addDoor("gameStart0", borderWidth, color, dirUp, (this.bnd.width / 2) - 40, 80, true)

		this.spawn = new Spawn((this.bnd.width / 2) - 40, 100)
		this.addFloat(this.spawn)

		this.addWall(new Wall(0, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))
		this.addWall(new Wall((this.bnd.width / 2) + 80, 0, (this.bnd.width / 2) - 80, 100, color))
		this.addWall(new Wall((this.bnd.width / 2) + 95, 0, (this.bnd.width / 2) - 95, this.bnd.height, color))

		this.addWall(new Wall((this.bnd.width / 2) - 80, 100, 80, this.bnd.height, color))

		for (var i = 0; i < 9; i++) {
			this.addWall(new Launcher((this.bnd.width / 2) + 89, 105 + (i * 20), dirLeft, 60, 2 + (i * 2), 3))
		}
	}
}

const endUp0 = new EndUp0()

class EndRight0 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cLeaf

		super("endRight0", 1000, 300, color, dirRight, dirLeft, 0)

		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - 40 - borderWidth, 80)
		this.addDoor("gameStart0", borderWidth, color, dirRight, 40 + borderWidth, 80, true)

		this.spawn = new Spawn(this.bnd.width - 100, borderWidth + 80)
		this.addFloat(this.spawn)

		this.addHazard(new Spike(145, this.bnd.height - borderWidth, 56, dirUp))

		this.addWall(new Wall(95, this.bnd.height - 100, 50, 100, color))

		this.addWall(new Wall(200, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(350, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(500, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(650, this.bnd.height - 100, 70, 30, color))

		this.addWall(new Wall(800, borderWidth + 80, this.bnd.width - 800, 30, color))
	}
}

const endRight0 = new EndRight0()

class EndRight1 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cPink

		super("endRight1", 1000, 300, color, dirRight, dirDown, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, borderWidth + 40, 80)
		this.addDoor("gameStart0", borderWidth, color, dirRight, this.bnd.height / 2, 80, true)

		this.spawn = new Spawn(this.bnd.width - 100, (this.bnd.height / 2) + 40)
		this.addFloat(this.spawn)

		this.addMod(new Accel(this.bnd.width - 300, this.bnd.height / 2, 4, dirLeft, 4))

		this.addHazard(new Spike(borderWidth + 85, this.bnd.height - borderWidth, 40, dirUp))

		this.addWall(new Wall(0, 0, this.bnd.width, (this.bnd.height / 2) - 40, color))

		this.addWall(new Wall(this.bnd.width - 300, (this.bnd.height / 2) + 40, 300, (this.bnd.height / 2) - 40, color))
	}
}

const endRight1 = new EndRight1()

class EndRight2 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cLightBlue

		super("endRight2", 1000, 300, color, dirRight, dirDown, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, borderWidth + 40, 80)
		this.addDoor("gameStart0", borderWidth, color, dirRight, this.bnd.height / 2, 80, true)

		this.spawn = new Spawn(this.bnd.width - 100, (this.bnd.height / 2) + 40)
		this.addFloat(this.spawn)

		this.addMod(new Accel(this.bnd.width - 300, this.bnd.height / 2, 4, dirLeft, 17))

		this.addHazard(new Spike(borderWidth + 85, this.bnd.height - borderWidth, 40, dirUp))

		this.addWall(new Wall(0, 0, this.bnd.width, (this.bnd.height / 2) - 40, color))

		this.addWall(new Wall(this.bnd.width - 300, (this.bnd.height / 2) + 40, 300, (this.bnd.height / 2) - 40, color))

		this.addWall(new Wall(this.bnd.width - 300 - borderWidth, (this.bnd.height / 2) - 40, borderWidth, 44, color))

		for (var i = 0; i < 17; i++) {
			this.addWall(new Launcher(100 + (i * 35), (this.bnd.height / 2) - 40, dirDown, 60, 1 + (i * 2), 3))
		}
	}
}

const endRight2 = new EndRight2()

class EndDown2 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cCyan

		super("endDown2", 1000, 300, color, dirDown, dirRight, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirRight, this.bnd.height / 2, 80)

		this.spawn = new Spawn(150, this.bnd.height - borderWidth)
		this.addFloat(this.spawn)

		this.addWall(new Wall(this.bnd.width - 300, (this.bnd.height / 2) + 40, 300, (this.bnd.height / 2) - 40, color))

		this.addHazard(new Spike(borderWidth + 280, this.bnd.height - borderWidth, 27, dirUp))

		this.addMod(new Accel(borderWidth + 200, this.bnd.height - borderWidth - 33, 1, dirRight, 12))
		this.addMod(new Accel(borderWidth + 270, this.bnd.height - borderWidth - 30, 1, dirUp, 12))
	}
}

const endDown2 = new EndDown2()

class EndDown3 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cTeal

		super("endDown3", 1000, 300, color, dirDown, dirLeft, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, this.bnd.width - borderWidth - 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirLeft, borderWidth + 40, 80)

		this.spawn = new Spawn(this.bnd.width - 150, borderWidth + 80)
		this.addFloat(this.spawn)

		this.addMod(new Accel(this.bnd.width - borderWidth - 40, this.bnd.height - 33, 5, dirUp, 13))

		this.addWall(new Wall(this.bnd.width - 250, borderWidth + 80, 250 - borderWidth - 80, this.bnd.height - (borderWidth + 80), color))

		for (var i = 0; i < 9; i++) {
			this.addMod(new Accel(63 + (i * 80), borderWidth + 80 + 35, 1, dirUp, 12))
		}

		for (var i = 0; i < 8; i++) {
			this.addWall(new Launcher(95 + (i * 80), this.bnd.height - borderWidth, dirUp, 60, 1, 3))
		}

	}
}

const endDown3 = new EndDown3()

class EndLeft2 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cMagenta

		super("endLeft2", 1000, 300, color, dirLeft, dirDown, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, this.bnd.width - borderWidth - 40, 80)
		this.addDoor("gameStart0", borderWidth, color, dirLeft, borderWidth + 40, 80, true)

		this.spawn = new Spawn(100, borderWidth + 80)
		this.addFloat(this.spawn)

		this.addWall(new Wall(this.bnd.width - 190, borderWidth + 80, 190 - borderWidth - 80, this.bnd.height - (borderWidth + 80), color))

		this.addWall(new Wall(0, borderWidth + 80, 150, this.bnd.height - (borderWidth + 80), color))

		for (var i = 0; i < 8; i++) {
			this.addMod(new Accel(200 + (i * 80), borderWidth + 80 + 35 + (checkEven(i) * 40), 1, dirUp, 12))
		}

		for (var i = 0; i < 7; i++) {
			this.addWall(new Launcher(232 + (i * 80), this.bnd.height - borderWidth, dirUp, 60, 1, 3))
		}

	}
}

const endLeft2 = new EndLeft2()

class EndLeft3 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cGray

		super("endLeft3", 1000, 300, color, dirLeft, dirUp, 0)

		this.addDoor("gameStart0", borderWidth, color, dirUp, this.bnd.width - borderWidth - 40, 80)
		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - borderWidth - 40, 80, true)

		this.spawn = new Spawn(100, this.bnd.height - borderWidth)
		this.addFloat(this.spawn)

		this.addWall(new Wall(200, this.bnd.height - 200, 100, 200, color))
		this.addWall(new Wall(350, 0, 100, 200, color))
		this.addWall(new Wall(500, this.bnd.height - 200, 100, 200, color))
		this.addWall(new Wall(650, 0, 100, 200, color))
		this.addWall(new Wall(800, this.bnd.height - 200, this.bnd.width - 800, 200, color))

	}
}

const endLeft3 = new EndLeft3()

class EndUp1 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cWhite

		super("endUp1", 1000, 300, color, dirUp, dirLeft, 0)

		this.addDoor("gameStart0", borderWidth, color, dirUp, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - borderWidth - 40, 80)

		this.spawn = new Spawn(100, 65)
		this.addFloat(this.spawn)

		this.addWall(new Wall(0, 65, this.bnd.width - 100, borderWidth, color))
		this.addWall(new Wall(this.bnd.width - 100 - borderWidth, 0, borderWidth, 30, color))

		this.addWall(new Wall(100, 135, this.bnd.width - 100, borderWidth, color))
		this.addWall(new Wall(100, 65, borderWidth, 35, color))

		this.addWall(new Wall(0, 205, this.bnd.width - 100, borderWidth, color))
		this.addWall(new Wall(this.bnd.width - 100 - borderWidth, 135, borderWidth, 35, color))

		this.addWall(new Wall(100, 205, borderWidth, 45, color))

	}
}

const endUp1 = new EndUp1()

class EndUp2 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cRed

		super("endUp2", 1000, 300, color, dirUp, dirRight, 0)

		this.addDoor("gameStart0", borderWidth, color, dirUp, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirRight, this.bnd.height - borderWidth - 40, 80)

		this.spawn = new Spawn(100, 65)
		this.addFloat(this.spawn)

		this.addWall(new Wall(0, 65, this.bnd.width - 100, borderWidth, color))
		this.addWall(new Wall(this.bnd.width - 100 - borderWidth, 0, borderWidth, 30, color))

		this.addWall(new Wall(100, 135, this.bnd.width - 100, borderWidth, color))
		this.addWall(new Wall(100, 65, borderWidth, 35, color))

		this.addWall(new Wall(0, 205, this.bnd.width - 100, this.bnd.height - 205, color))
		this.addWall(new Wall(this.bnd.width - 100 - borderWidth, 135, borderWidth, 35, color))

	}
}

const endUp2 = new EndUp2()

class EndUp3 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cMagenta

		super("endUp3", 1000, 300, color, dirUp, dirRight, 0)

		this.addDoor("gameStart0", borderWidth, color, dirUp, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirRight, this.bnd.height - borderWidth - 40 - 30, 80)

		this.spawn = new Spawn(100, borderWidth + 80)
		this.addFloat(this.spawn)
		this.addWall(new Wall(0, borderWidth + 80, 200, borderWidth, color))

		this.addHazard(new Spike(15, this.bnd.height - borderWidth, 54, dirUp))
		
		this.addWall(new WallFade(300, 150, 100, 30, color, 2, 2, false))
		
		this.addWall(new WallFade(550, 200, 100, 30, color, 2, 2, true))
		
		this.addWall(new Wall(this.bnd.width - 175, this.bnd.height - 45, 200, 45, color))
	}
}

const endUp3 = new EndUp3()

class EndLeft4 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cPink

		super("EndLeft4", 1000, 300, color, dirLeft, dirRight, 0)

		this.addDoor("gameStart0", borderWidth, color, dirLeft, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirRight, this.bnd.height - borderWidth - 40 - 30, 80)

		this.spawn = new Spawn(100, borderWidth + 80)
		this.addFloat(this.spawn)
		this.addWall(new Wall(0, borderWidth + 80, 200, borderWidth, color))

		this.addHazard(new Spike(borderWidth, this.bnd.height - borderWidth, 54, dirUp))
		
		this.addWall(new WallFade(300, 150, 100, 30, color, 2, 2, false))
		
		this.addWall(new WallFade(550, 200, 100, 30, color, 2, 2, true))
		
		this.addWall(new Wall(this.bnd.width - 175, this.bnd.height - 45, 175, 45, color))
	}
}

const endLeft4 = new EndLeft4()

class EndRight3 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cPink

		super("EndRight3", 1000, 300, color, dirRight, dirLeft, 0)

		this.addDoor("gameStart0", borderWidth, color, dirRight, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - borderWidth - 40 - 30, 80)

		this.spawn = new Spawn(this.bnd.width - 100, borderWidth + 80)
		this.addFloat(this.spawn)
		this.addWall(new Wall(this.bnd.width - 200, borderWidth + 80, 200, borderWidth, color))

		this.addHazard(new Spike(this.bnd.width - (55 * 15), this.bnd.height - borderWidth, 54, dirUp))
		
		this.addWall(new WallFade(this.bnd.width - 400, 150, 100, 30, color, 2, 2, false))
		
		this.addWall(new WallFade(this.bnd.width - 650, 200, 100, 30, color, 2, 2, true))
		
		this.addWall(new Wall(0, this.bnd.height - 45, 175, 45, color))
	}
}

const endRight3 = new EndRight3()

class EndRight4 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cBlue

		super("EndRight4", 1000, 300, color, dirRight, dirDown, 0)

		this.addDoor("gameStart0", borderWidth, color, dirRight, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirDown, borderWidth + 40, 80)

		this.spawn = new Spawn(this.bnd.width - 100, borderWidth + 80)
		this.addFloat(this.spawn)
		
		this.addWall(new Wall(100, borderWidth + 80, this.bnd.width - 100, borderWidth, color))
		this.addWall(new Wall(0, borderWidth + borderWidth + 160, this.bnd.width - 100, borderWidth, color))
		
		this.addWall(new WallFade(100, borderWidth + 80 - 20, this.bnd.width - 300, borderWidth, color, 2, 2))
		this.addWall(new WallFade(200, borderWidth + borderWidth + 160 - 20, this.bnd.width - 300, borderWidth, color, 2, 2))
		this.addWall(new WallFade(borderWidth + 80, this.bnd.height - borderWidth - 20, this.bnd.width - 300, borderWidth, color, 2, 2))
	}
}

const endRight4 = new EndRight4()

class EndRight5 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cGreen

		super("EndRight5", 1000, 300, color, dirRight, dirDown, 0)

		this.addDoor("gameStart0", borderWidth, color, dirRight, borderWidth + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirDown, borderWidth + 40, 80)

		this.spawn = new Spawn(this.bnd.width - 100, borderWidth + 80)
		this.addFloat(this.spawn)
		
		this.addWall(new Wall(100, borderWidth + 80, this.bnd.width - 100, borderWidth, color))
		this.addWall(new Wall(0, borderWidth + borderWidth + 160, this.bnd.width - 100, borderWidth, color))
		
		this.addWall(new WallFade(100, borderWidth + 80 - 20, this.bnd.width - 300, borderWidth, color, 1, 2))
		this.addWall(new WallFade(200, borderWidth + borderWidth + 160 - 20, this.bnd.width - 300, borderWidth, color, 1, 2))
		this.addWall(new WallFade(borderWidth + 80, this.bnd.height - borderWidth - 20, this.bnd.width - 300, borderWidth, color, 1, 2))
	}
}

const endRight5 = new EndRight5()

class EndDown4 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cYellow

		super("endDown4", 1000, 300, color, dirDown, dirUp, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, (this.bnd.width / 2) + 40, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirUp, (this.bnd.width / 2) - 40, 80)

		this.spawn = new Spawn((this.bnd.width / 2) - 40, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)

		this.addWall(new Wall(0, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))
		this.addWall(new Wall((this.bnd.width / 2) + 80, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))

		for (var i = 0; i < 10; i++) {
			this.addWall(new Launcher((this.bnd.width / 2) + 80 - 5, borderWidth + 205 + (i * -20), dirLeft, 60, 2 + (i * 8), 3))
		}
	}
}

const endDown4 = new EndDown4()

class EndUp4 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cOrange

		super("endUp4", 1000, 300, color, dirUp, dirDown, 0)

		this.addDoor("gameStart0", borderWidth, color, dirDown, (this.bnd.width / 2) + 40, 80)
		this.addDoor("gameStart0", borderWidth, color, dirUp, (this.bnd.width / 2) - 40, 80, true)

		this.spawn = new Spawn((this.bnd.width / 2) - 40, 80)
		this.addFloat(this.spawn)

		this.addWall(new Wall(0, 0, (this.bnd.width / 2) - 80, this.bnd.height, color))
		this.addWall(new Wall((this.bnd.width / 2) + 120, 0, (this.bnd.width / 2) - 80, 100, color))
		this.addWall(new Wall((this.bnd.width / 2) + 135, 0, (this.bnd.width / 2) - 95, this.bnd.height, color))

		this.addWall(new Wall((this.bnd.width / 2) - 80, 80, 80, this.bnd.height, color))

		for (var i = 0; i < 9; i++) {
			this.addWall(new Launcher((this.bnd.width / 2) + 129, 105 + (i * 20), dirLeft, 60, 2 + (i * 10), 5))
		}
	}
}

const endUp4 = new EndUp4()

class EndLeft5 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cPink

		super("endLeft5", 1000, 300, color, dirLeft, dirRight, 0)

		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - 40 - borderWidth, 80, true)
		this.addDoor("gameStart0", borderWidth, color, dirRight, 40 + borderWidth, 80)

		this.spawn = new Spawn(100, this.bnd.height - borderWidth - 1)
		this.addFloat(this.spawn)

		this.addHazard(new Spike(205, this.bnd.height - borderWidth, 52, dirUp))

		this.addWall(new Wall(155, this.bnd.height - 100, 50, 100, color))

		this.addWall(new WallFade(300, this.bnd.height - 100, 70, 30, color, 1, 1, true))

		this.addWall(new WallFade(450, this.bnd.height - 100, 70, 30, color, 1, 1, false))

		this.addWall(new WallFade(600, this.bnd.height - 100, 70, 30, color, 1, 1, true))

		this.addWall(new WallFade(750, this.bnd.height - 100, 70, 30, color, 1, 1, false))
		
		this.addWall(new Wall(this.bnd.width - 100, borderWidth + 80, 100, borderWidth, color))
	}
}

const endLeft5 = new EndLeft5()

class EndRight6 extends EndRoom {
	constructor() {

		var borderWidth = 15
		var color = cTeal

		super("endRight6", 1000, 300, color, dirRight, dirLeft, 0)

		this.addDoor("gameStart0", borderWidth, color, dirLeft, this.bnd.height - 40 - borderWidth, 80)
		this.addDoor("gameStart0", borderWidth, color, dirRight, 40 + borderWidth, 80, true)

		this.spawn = new Spawn(this.bnd.width - 70, borderWidth + 79)
		this.addFloat(this.spawn)

		this.addHazard(new Spike(175, this.bnd.height - borderWidth, 54, dirUp))

		this.addWall(new Wall(125, this.bnd.height - 100, 50, 100, color))

		this.addWall(new WallFade(300, this.bnd.height - 100, 70, 30, color, 1, 1, true))

		this.addWall(new WallFade(450, this.bnd.height - 100, 70, 30, color, 1, 1, false))

		this.addWall(new WallFade(600, this.bnd.height - 100, 70, 30, color, 1, 1, true))

		this.addWall(new WallFade(750, this.bnd.height - 100, 70, 30, color, 1, 1, false))
		
		this.addWall(new Wall(this.bnd.width - 100, borderWidth + 80, 100, borderWidth, color))
	}
}

const endRight6 = new EndRight6()

