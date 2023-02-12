const slides = document.getElementsByClassName("slide")

slideIndex = 3
gameStart = 0

// Next/previous controls

function plusSlides(n) {
	showSlides(slideIndex += n)
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides(slideIndex = n)
}

function showSlides(n) {
	var buttons = document.getElementsByClassName("pageButton")
	if (n > slides.length) slideIndex = 1
	if (n < 1) slideIndex = slides.length
	for (var i = 0; i < slides.length; i++) {
		slides[i].style.opacity = "0"
	}
	for (i = 0; i < buttons.length; i++) {
		buttons[i].className = buttons[i].className.replace(" active", "")
	}
	slides[slides.length - 1 - (slideIndex - 1)].style.opacity = "1"
	buttons[(slideIndex - 1)].className += " active"
}

//Check Canvas Click
window.addEventListener("click", function(e) {

	if (gameStart != 0) {
		var canvas = document.getElementById("game")


		if (gameStart == 2) {
			if (canvas.contains(e.target)) {
				canvas.classList.add("hideCursor")
				unpause()
			}
			else {
				canvas.classList.remove("hideCursor")
				pause()
			}
		}
	}
})

//Remove Game Check Start
function removeCheckStart() {
	var element = document.getElementById("checkStart")
	element.style.opacity = "0"
}

showSlides(slideIndex)