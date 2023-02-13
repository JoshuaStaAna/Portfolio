entities = []
walls = []
mods = []
hazards = []
floats = []
trans = undefined
rooms = []
ghost = undefined
player = undefined

endLeft = [[],[],[],[]]
endRight = [[],[],[],[]]
endUp = [[],[],[],[]]
endDown = [[],[],[],[]]

currentDiff = 0
currentRun = 0

globalPause = true
globalPauseDrawn = true

const fps = 60

const wallOutlineThickness = 3
const wallOutlineAlpha = 0.5

const dirLeft = -9999999
const dirRight = 9999999
const dirUp = -999999
const dirDown = 999999
const respawn = 0
const slide = -1

//Colors
const cGray = 'rgb(99, 99, 99)'
const cRed = 'rgb(181, 60, 60)'
const cBlue = 'rgb(60, 88, 181)'
const cGreen = 'rgb(60, 181, 104)'
const cPurple = 'rgb(114, 60, 181)'
const cWhite = 'rgb(200, 200, 215)'
const cTeal = 'rgb(58, 181, 177)'
const cCyan = 'rgb(68, 211, 219)'
const cLightBlue = 'rbg(58, 144, 181)'
const cMagenta = 'rgb(177, 58, 181)'
const cPink = 'rgb(219, 72, 168)'
const cOrange = 'rgb(219, 131, 68)'
const cYellow = 'rgb(219, 209, 68)'
const cLeaf = 'rgb(149, 219, 68)'
const cLightGreen = 'rgb(83, 219, 68)'
const cBlack = 'rgb(58, 61, 80)'

//StartGame
function startGame() {
	gameStart = 1
}

//Pause
function pause() {
	globalPause = true
}

//Unpuase
function unpause() {
	globalPause = false
	globalPauseDrawn = false
}

//Bounds
class Bounds {
	constructor(width, height) {
		this.width = width
		this.height = height
	}
}

//Camera
class Camera {
	constructor(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}
	
	getOffX() {
		return this.x
	}
	
	getOffY() {
		return this.y
	}
	
	step() {
		
	}
	
	follow(e) {
		var eX = e.getTrueOriginX()
		var eY = e.getTrueOriginY()
		
		eX += e.bBox.width / 2
		eY += e.bBox.height
		
		this.x = clamp(-eX + (this.width / 2), -currentRoom.bnd.width + this.width, 0)
		this.y = clamp(-eY + (this.height / 2), -currentRoom.bnd.height + this.height, 0)
	}
}