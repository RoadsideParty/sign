const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

let stepList = []
let curStepIndex = 0
let isReDraw = false
let isMouseDown = false
window.addEventListener('mousedown', () => {
    if (!isReDraw) {
        isMouseDown = true
        stepList.push('newPath')
        ctx.beginPath()
    }
})
window.addEventListener('mouseup', () => {
    isMouseDown = false
})
window.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        ctx.lineTo(e.clientX, e.clientY)
        stepList.push([e.clientX, e.clientY])
        ctx.strokeStyle = '#fff'
        ctx.stroke()
    }
})
window.addEventListener('dblclick', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stepList = []
})
window.addEventListener('contextmenu', e => {
    e.preventDefault()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    reDraw()
})
function reDraw() {
    if (curStepIndex === stepList.length) {
        curStepIndex = 0
        isReDraw = false
        return
    }
    isReDraw = true
    const curStep = stepList[curStepIndex]
    if (curStep === 'newPath') {
        ctx.beginPath()
    }
    ctx.lineTo(curStep[0], curStep[1])
    ctx.strokeStyle = '#fff'
    ctx.stroke()
    curStepIndex++
    requestAnimationFrame(() => reDraw())
}