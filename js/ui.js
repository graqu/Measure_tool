import { followMouse, mouseHandler } from './script.js'

export let moveInfoPositionX = 0
export let moveInfoPositionY = 0
export let moveMainInfoPositionX = 0
export let moveMainInfoPositionY = 0

//Keyboard steering
export const runSettings = 's'
export const runSettings2 = 'S'

export const runMeasure = 'm'
export const runMeasure2 = 'M'

export const relativeMeasure = 'z'
export const relativeMeasure2 = 'Z'

//Boolean Parameters
export const colorSheme = localStorage.getItem('colorSheme')

//UI Functions

export const moveMainMeasureInfo = e => {
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
export const moveMeasureInfo = e => {
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
export const chooseColor = () => {
	if (localStorage.getItem('colorSheme') === 'dark' || localStorage.getItem('colorSheme') === null) {
		localStorage.setItem('colorSheme', 'light')
	} else if (localStorage.getItem('colorSheme') === 'light') {
		localStorage.setItem('colorSheme', 'dark')
	}
	changeColor()
}

export const changeColor = () => {
	if (localStorage.getItem('colorSheme') === 'dark' || localStorage.getItem('colorSheme') === null) {
		document.documentElement.style.setProperty('--mt-line-color', 'black')
		document.documentElement.style.setProperty('--mt-second-line-color', 'green')
	} else {
		document.documentElement.style.setProperty('--mt-line-color', '#fff')
		document.documentElement.style.setProperty('--mt-second-line-color', 'yellow')
	}
}
