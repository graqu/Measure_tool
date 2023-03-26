const horizontalLine = document.createElement('div')
const verticalLine = document.createElement('div')
const positionInfo = document.createElement('div')

const relaiveHorLine = document.createElement('div')
const relativeVerLine = document.createElement('div')
const relPositionInfo = document.createElement('div')

const posY = localStorage.getItem('posY')
const posX = localStorage.getItem('posX')
let y = 0
let x = 0

let moveInfoPositionX = 0
let moveInfoPositionY = 0

const runMeasure = 'm'
const runMeasure2 = 'M'
const relativeMeasure = 'z'
const relativeMeasure2 = 'Z'

let isFollow = 0
let isMeasureRel = 0

const drawLines = () => {
	horizontalLine.classList.add('horizontalLine')
	verticalLine.classList.add('verticalLine')
	positionInfo.classList.add('position-info')
	positionInfo.innerHTML = '<p>0px</p><p>0px</p>'

	document.querySelector('body').appendChild(horizontalLine)
	document.querySelector('body').appendChild(verticalLine)
	document.querySelector('body').appendChild(positionInfo)

	horizontalLine.style.height = `${localStorage.getItem('posY')}px`
	verticalLine.style.width = `${localStorage.getItem('posX')}px`
	positionInfo.style.left = `${posX}px`
	positionInfo.style.top = `${posY}px`
	positionInfo.firstElementChild.textContent = `X= ${posX}px`
	positionInfo.lastElementChild.textContent = `Y= ${posY}px`
}

const drawrelativeLines = () => {
	relaiveHorLine.classList.add('horizontalLine')
	relativeVerLine.classList.add('verticalLine')
	relPositionInfo.classList.add('position-info')
	relPositionInfo.innerHTML = '<p>0px</p><p>0px</p>'

	document.querySelector('body').appendChild(relaiveHorLine)
	document.querySelector('body').appendChild(relativeVerLine)
	document.querySelector('body').appendChild(relPositionInfo)

	relaiveHorLine.style.borderColor = `green`
	relativeVerLine.style.borderColor = `green`
	relaiveHorLine.style.height = `${y}px`
	relativeVerLine.style.width = `${x}px`
	relPositionInfo.style.left = `${x}px`
	relPositionInfo.style.top = `${y}px`
	relPositionInfo.firstElementChild.textContent = `X= ${localStorage.getItem('posX') - x}px`
	relPositionInfo.lastElementChild.textContent = `Y= ${localStorage.getItem('posY') - y}px`
}
const moveRelativeLines = () => {
	relaiveHorLine.style.height = `${y}px`
	relativeVerLine.style.width = `${x}px`
	relPositionInfo.style.left = `${x + moveInfoPositionX}px`
	relPositionInfo.style.top = `${y + moveInfoPositionY}px`
	relPositionInfo.firstElementChild.textContent = `X= ${localStorage.getItem('posX') - x}px`
	relPositionInfo.lastElementChild.textContent = `Y= ${localStorage.getItem('posY') - y}px`
}
const removeRelativeLines = () => {
	if (relaiveHorLine.classList.length != 0) {
		relaiveHorLine.classList.remove('horizontalLine')
		relativeVerLine.classList.remove('verticalLine')
		relPositionInfo.classList.remove('position-info')
		document.querySelector('body').removeChild(relaiveHorLine)
		document.querySelector('body').removeChild(relativeVerLine)
		document.querySelector('body').removeChild(relPositionInfo)
	} else {
		return
	}
}

const followMouse = e => {
	verticalLine.style.width = `${e.clientX}px`
	horizontalLine.style.height = `${e.clientY}px`
	positionInfo.firstElementChild.textContent = `X= ${e.clientX}px`
	positionInfo.lastElementChild.textContent = `Y= ${e.clientY}px`
	positionInfo.style.top = `${e.clientY}px`
	positionInfo.style.left = `${e.clientX}px`

	// localStorage.setItem('posY', y)
	// localStorage.setItem('posX', x)
}
const moveMeasureInfo = e => {
	let x = 0
	let y = 0

	switch (e.key) {
		case 'ArrowUp':
			moveInfoPositionY = -35
			break
		case 'ArrowDown':
			moveInfoPositionY = 0
			break
		case 'ArrowLeft':
			moveInfoPositionX = -70
			break
		case 'ArrowRight':
			moveInfoPositionX = 0
			break
	}
	moveRelativeLines()
}
const updateMousePosition = e => {
	x = e.clientX
	y = e.clientY
}
const markPoint = key => {
	if (isMeasureRel === 0 && isFollow === 0 && key === 'm') {
		window.addEventListener('mousemove', followMouse)
		removeRelativeLines()
		isFollow = 1
	} else if (isMeasureRel === 0 && isFollow === 1 && key === 'm') {
		window.removeEventListener('mousemove', followMouse)
		localStorage.setItem('posY', y)
		localStorage.setItem('posX', x)
		isFollow = 0
	} else if (isMeasureRel === 0 && isFollow === 0 && key === 'z') {
		drawrelativeLines()
		window.addEventListener('mousemove', moveRelativeLines)
		window.addEventListener('keydown', moveMeasureInfo)
		isMeasureRel = 1
	} else if (isMeasureRel === 1 && isFollow === 0 && key === 'z') {
		window.removeEventListener('mousemove', moveRelativeLines)
		window.removeEventListener('keydown', moveMeasureInfo)
		isMeasureRel = 0
	} else if (isMeasureRel === 1 && isFollow === 0 && key === 'm') {
		window.removeEventListener('mousemove', moveRelativeLines)
		window.addEventListener('mousemove', followMouse)
		isMeasureRel = 0
		isFollow = 1
		removeRelativeLines()
	} else {
		window.removeEventListener('mousemove', followMouse)
		window.removeEventListener('mousemove', moveRelativeLines)
		isMeasureRel = 0
		isFollow = 0
		removeRelativeLines()
	}
}

window.addEventListener('keydown', e => {
	if (e.key === runMeasure || e.key === runMeasure2) {
		markPoint(runMeasure)
	} else if (e.key === relativeMeasure || e.key === relativeMeasure2) {
		markPoint(relativeMeasure)
	}
})
window.addEventListener('mousemove', updateMousePosition)
drawLines()
