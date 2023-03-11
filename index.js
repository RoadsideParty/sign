const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const stepList = []
let curStepIndex = 0
let isMouseDown = false
window.addEventListener('mousedown', () => {
    isMouseDown = true
    stepList.push('newPath')
    ctx.beginPath()
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
window.addEventListener('contextmenu', e => {
    e.preventDefault()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    reDraw()
})
function reDraw() {
    const curStep = stepList[curStepIndex]
    if (curStep === 'newPath') {
        ctx.beginPath()
    }
    ctx.lineTo(curStep[0], curStep[1])
    ctx.strokeStyle = '#fff'
    ctx.stroke()
    curStepIndex++
    if (curStepIndex === stepList.length) return
    requestAnimationFrame(() => reDraw())
}