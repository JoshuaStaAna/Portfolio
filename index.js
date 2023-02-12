const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const gameElement = document.getElementById("game")

ctx.imageSmoothingEnabled = false

currentRoom = findRoom("tutorial0")
//currentRoom = rooms[rooms.length - 1]
currentRoom.load()

new Transition(undefined, slide, 0, 0)

const cam = new Camera(0, 0, canvas.width, canvas.height)

const back = new Background(0.0025)

//Background

var color = 'Blue'
var thick = 5
var mult = 2
var off0 = 0
var off1 = 0.4
var alph = 0.075
back.add(new BackLine(color, thick, off0, mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0, -mult, canvas.width / 2, alph, false))
back.add(new BackLine(color, thick, off0 + off1, -mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0 + off1, mult, canvas.width / 2, alph, false))

var color = 'Red'
var thick = 5
var mult = -1.5
var off0 = 0.75
var off1 = 0.2
var alph = 0.075
back.add(new BackLine(color, thick, off0, mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0, mult, canvas.width / 2, alph, false))
back.add(new BackLine(color, thick, off0 + off1, -mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0 + off1, mult, canvas.width / 2, alph, false))

var color = 'Green'
var thick = 5
var mult = -1.25
var off0 = 0.3
var off1 = 0.6
var alph = 0.075
back.add(new BackLine(color, thick, off0, -mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0, -mult, canvas.width / 2, alph, false))
back.add(new BackLine(color, thick, off0 + off1, mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0 + off1, -mult, canvas.width / 2, alph, false))


//Slow

var color = 'Blue'
var thick = 3
var mult = -0.6
var off0 = -0.1
var off1 = 0.4
var alph = 0.035
back.add(new BackLine(color, thick, off0, mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0, -mult, canvas.width / 2, alph, false))
back.add(new BackLine(color, thick, off0 + off1, -mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0 + off1, mult, canvas.width / 2, alph, false))

var color = 'Red'
var thick = 3
var mult = 0.5
var off0 = -0.2
var off1 = 0.2
var alph = 0.035
back.add(new BackLine(color, thick, off0, mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0, mult, canvas.width / 2, alph, false))
back.add(new BackLine(color, thick, off0 + off1, -mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0 + off1, mult, canvas.width / 2, alph, false))

var color = 'Green'
var thick = 3
var mult = 0.5
var off0 = -0.5
var off1 = 0.6
var alph = 0.035
back.add(new BackLine(color, thick, off0, -mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0, -mult, canvas.width / 2, alph, false))
back.add(new BackLine(color, thick, off0 + off1, mult, canvas.height / 2, alph, true))
back.add(new BackLine(color, thick, off0 + off1, -mult, canvas.width / 2, alph, false))

//Game Setup

player = new Player(currentRoom.spawn.x, currentRoom.spawn.y, true)

//Update Step
function updateStep() {
	setTimeout(function() {
		requestAnimationFrame(updateStep);
		if (!globalPause) { //Unpaused

			//Clear Canvas
			clearCanvas()

			//Background
			back.step()
			back.draw()

			//Object
			objects = walls.concat(entities)
			objects = objects.concat(mods)
			objects = objects.concat(hazards)
			objects = objects.concat(floats)

			var length = objects.length
			for (var i = 0; i < length; i++) {
				if (objects[i] != undefined && objects[i] != player) {
					if (checkTrans()) objects[i].step()
					objects[i].draw()
				}
			}

			var length = walls.length
			for (var i = 0; i < length; i++) {
				if (walls[i] != undefined) {
					walls[i].drawBorder()
				}
			}

			if (ghost != undefined) {
				if (checkTrans()) ghost.step()
				ghost.draw()
			}

			if (player != undefined) {
				if (checkTrans()) player.step()
				player.draw()
				cam.follow(player)
			}

			if (trans != undefined) {
				trans.step()
				trans.draw()
			}
		}
		else { //Pause
			if (!globalPauseDrawn) {
				fillStyle("rgb(10, 10, 18)")
				fillRect(0, 0, canvas.width, canvas.height, 0.5)
				globalPauseDrawn = true

				fillStyle("white")
				textAlign("center")
				fillText(canvas.width / 2, (canvas.height / 2) + 12, 48, "arial black", "PAUSED", true)
			}
			else if (!gameStart) {
				fillStyle("rgb(10, 10, 18)")
				fillRect(0, 0, canvas.width, canvas.height, 1)

				var element = document.getElementById("checkStart")
				var style = window.getComputedStyle(element)
				if (style.getPropertyValue("opacity") == 0) {
					element.parentNode.removeChild(element)
					startGame()
					console.log("USUAL START")
					canvas.classList.add("hideCursor")
					unpause()
					gameStart = 2
					gameElement.style.setProperty('border-color', currentRoom.color)
				}
			}
		}

		for (var i = 0; i < slides.length; i++) {
			var style = window.getComputedStyle(slides[i])
			if (style.getPropertyValue("opacity") == 0) {
				slides[i].style.display = "none"
			}
			else {
				slides[i].style.display = "block"
			}
		}

	}, 1000 / fps);
}

updateStep()

removeCheckStart()
