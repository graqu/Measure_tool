import { drawrelativeLines, moveRelativeLines, removeRelativeLines } from './relaiveLine.js'
import { moveInfoPositionX, moveInfoPositionY, moveMainInfoPositionX, moveMainInfoPositionY } from './ui.js'

const horizontalLine = document.createElement('div')
const verticalLine = document.createElement('div')
const positionInfo = document.createElement('div')

const posX = localStorage.getItem('posX')
const posY = localStorage.getItem('posY')
let y = 0
let x = 0

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
	positionInfo.style.left = `${moveMainInfoPositionX + localStorage.getItem('posX')}px`
	positionInfo.style.top = `${moveMainInfoPositionY + localStorage.getItem('posY')}px`
	positionInfo.firstElementChild.textContent = `X= ${posX}px`
	positionInfo.lastElementChild.textContent = `Y= ${posY}px`
}
const mouseHandler = () => {
	moveRelativeLines(x, y, moveInfoPositionX, moveInfoPositionY)
}

function followMouse() {
	verticalLine.style.width = `${x}px`
	horizontalLine.style.height = `${y}px`
	positionInfo.firstElementChild.textContent = `X= ${x}px`
	positionInfo.lastElementChild.textContent = `Y= ${y}px`
	positionInfo.style.left = `${x + moveMainInfoPositionX}px`
	positionInfo.style.top = `${y + moveMainInfoPositionY}px`
}
const moveMeasureInfo = e => {
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
	mouseHandler()
}
const moveMainMeasureInfo = e => {
	switch (e.key) {
		case 'ArrowUp':
			moveMainInfoPositionY = -35
			break
		case 'ArrowDown':
			moveMainInfoPositionY = 0
			break
		case 'ArrowLeft':
			moveMainInfoPositionX = -70
			break
		case 'ArrowRight':
			moveMainInfoPositionX = 0
			break
	}
	followMouse()
}
const updateMousePosition = e => {
	x = e.clientX
	y = e.clientY
}
const markPoint = key => {
	if (isMeasureRel === 0 && isFollow === 0 && key === 'm') {
		window.addEventListener('mousemove', followMouse)
		window.addEventListener('keydown', moveMainMeasureInfo)
		removeRelativeLines()
		isFollow = 1
	} else if (isMeasureRel === 0 && isFollow === 1 && key === 'm') {
		window.removeEventListener('mousemove', followMouse)
		window.removeEventListener('keydown', moveMainMeasureInfo)
		localStorage.setItem('posY', y)
		localStorage.setItem('posX', x)
		isFollow = 0
	} else if (isMeasureRel === 0 && isFollow === 0 && key === 'z') {
		drawrelativeLines(x, y, localStorage.getItem('posX'), localStorage.getItem('posY'))
		window.addEventListener('mousemove', mouseHandler)
		window.addEventListener('keydown', moveMeasureInfo)
		isMeasureRel = 1
	} else if (isMeasureRel === 1 && isFollow === 0 && key === 'z') {
		window.removeEventListener('mousemove', mouseHandler)
		window.removeEventListener('keydown', moveMeasureInfo)
		isMeasureRel = 0
	} else if (isMeasureRel === 1 && isFollow === 0 && key === 'm') {
		window.removeEventListener('mousemove', mouseHandler)
		window.addEventListener('mousemove', followMouse)
		window.addEventListener('keydown', moveMainMeasureInfo)
		isMeasureRel = 0
		isFollow = 1
		removeRelativeLines()
	} else {
		window.removeEventListener('mousemove', followMouse)
		window.removeEventListener('mousemove', mouseHandler)
		window.removeEventListener('keydown', moveMainMeasureInfo)
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
