const relaiveHorLine = document.createElement('div')
const relativeVerLine = document.createElement('div')
const relPositionInfo = document.createElement('div')

export const drawrelativeLines = (x, y, localX, localY) => {
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
	relPositionInfo.firstElementChild.textContent = `X= ${localX - x}px`
	relPositionInfo.lastElementChild.textContent = `Y= ${localY - y}px`
}
export const moveRelativeLines = (x, y, moveX, moveY) => {
	relaiveHorLine.style.height = `${y}px`
	relativeVerLine.style.width = `${x}px`
	relPositionInfo.style.left = `${x + moveX}px`
	relPositionInfo.style.top = `${y + moveY}px`
	relPositionInfo.firstElementChild.textContent = `X= ${localStorage.getItem('posX') - x}px`
	relPositionInfo.lastElementChild.textContent = `Y= ${localStorage.getItem('posY') - y}px`
}
export const removeRelativeLines = () => {
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
