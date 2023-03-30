import { drawrelativeLines, moveRelativeLines, removeRelativeLines } from './relaiveLine.js'
import {
	moveInfoPositionX,
	moveInfoPositionY,
	moveMainInfoPositionX,
	moveMainInfoPositionY,
	moveMeasureInfo,
	moveMainMeasureInfo,
	runSettings,
	runSettings2,
	runMeasure,
	runMeasure2,
	relativeMeasure,
	relativeMeasure2,
	colorSheme,
	changeColor,
	chooseColor,
} from './ui.js'

const horizontalLine = document.createElement('div')
const verticalLine = document.createElement('div')
const positionInfo = document.createElement('div')

const posX = localStorage.getItem('posX')
const posY = localStorage.getItem('posY')
let y = 0
let x = 0
let y0 = 0
let x0 = 0

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
export const mouseHandler = () => {
	moveRelativeLines(x0, y0, moveInfoPositionX, moveInfoPositionY)
}

export function followMouse() {
	verticalLine.style.width = `${x0}px`
	verticalLine.style.minHeight = `${y0}px`
	horizontalLine.style.height = `${y0}px`
	positionInfo.firstElementChild.textContent = `X= ${x0}px`
	positionInfo.lastElementChild.textContent = `Y= ${y0}px`
	positionInfo.style.left = `${x0 + moveMainInfoPositionX}px`
	positionInfo.style.top = `${y0 + moveMainInfoPositionY}px`
}

const updateMousePosition = e => {
	x0 = e.pageX
	y0 = e.pageY
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
		localStorage.setItem('posY', y0)
		localStorage.setItem('posX', x0)
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
	} else if (e.key === runSettings || e.key === runSettings2) {
		chooseColor()
	}
})
window.addEventListener('mousemove', updateMousePosition)
drawLines()
changeColor()
