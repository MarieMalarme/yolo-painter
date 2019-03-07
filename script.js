const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const blendModes = ['screen', 'exclusion', 'multiply', 'luminosity']

let hue = 0
let strokeWidth = 150
let decreasing = true

document.addEventListener('mousemove', e => {
  hue++
  const sat = e.clientX / 6
  if (decreasing === true && strokeWidth > 75) {
    strokeWidth = strokeWidth - 2
    if (strokeWidth === 75) {
      decreasing = false
    }
  } else {
    decreasing = false
    strokeWidth = strokeWidth + 2
    if (strokeWidth === 150) {
      decreasing = true
    }
  }
  context.fillStyle = `hsla(${hue}, ${sat}%, 60%, 0.5)`
  context.beginPath()
  context.arc(e.pageX, e.pageY, strokeWidth, 0, 2 * Math.PI)
  context.fill()
})

document.addEventListener('click', e => {
  canvas.style.mixBlendMode = blendModes[getRandomInt(0, 3)]
  context.clearRect(0, 0, canvas.width, canvas.height)
})

const picsWrapper = document.getElementById('pics-wrapper')

for (i = 1; i <= 20; i++) {
  const div = document.createElement('div')
  div.className = 'pic'
  div.style.backgroundImage = `url(img/pic-${i}.jpg)`
  picsWrapper.appendChild(div)
}
