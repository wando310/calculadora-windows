const allBtns = document.querySelectorAll('.btn')
const btns = Array.from(allBtns)

const visor_1 = document.querySelector('.visor-1')
const visor_2 = document.querySelector('.visor-2')

const arraySignal = ['+', '-', 'x', '/']

let value_1 = ''
let value_2 = ''

btns.map((item, index) => {
    item.addEventListener('click', () => {
        visor_2.value === '0' ? visor_2.value = '' : ''
        visor_2.value += item.getAttribute('data-')

        arraySignal.forEach(e => {
            if (visor_1.value.includes(e)) {
                visor_2.value = ''
                value_1 = visor_1.value
                value_1 = value_1.replace(e, '')

                if (visor_2.value === '') {
                    value_2 += item.getAttribute('data-')
                    visor_2.value = value_2
                }
            }
        })
    })
})

let operador = ''
function select(op) {
    operador = op
    if (visor_1.value === '0') visor_1.value = ''
    visor_1.value = ''
    visor_1.value += visor_2.value + op
}
//Hidden Menu
let modeStatus = true
const menuHidden = document.querySelector('.menu-hidden')

menuHidden.addEventListener('click', () => modeStatus ? menuTrue() : menuFalse())

//Hidden Menu true
function menuTrue() {
    document.querySelector('.menu-hidden').style.transform = 'rotate(180deg)'
    document.querySelector('.menu-hidden').style.marginLeft = '-3px'
    document.querySelector('.menu-hidden').style.padding = '7px 20px'
    document.querySelector('.menu-left h2').style.display = 'none'
    document.querySelector('.menu').style.display = 'none'
    document.querySelector('.header').style.display = 'none'
    document.querySelector('.visor-1').style.display = 'none'
    document.querySelector('.history').style.display = 'none'
    document.querySelector('.close-hidden').style.display = 'flex'
    document.querySelector('.container-principal').style.top = '40px'
    document.querySelector('.container-principal').style.right = '40px'
    modeStatus = false
}
//Hidden Menu false
function menuFalse() {
    document.querySelector('.menu-hidden').style.transform = 'rotate(0deg)'
    document.querySelector('.menu-hidden').style.margin = '0 10px'
    document.querySelector('.menu-hidden').style.padding = '10px'
    document.querySelector('.menu-hidden').style.position = 'relative'
    document.querySelector('.menu-left h2').style.display = 'flex'
    document.querySelector('.menu').style.display = 'flex'
    document.querySelector('.header').style.display = 'flex'
    document.querySelector('.visor-1').style.display = 'flex'
    document.querySelector('.history').style.display = 'flex'
    document.querySelector('.close-hidden').style.display = 'none'
    document.querySelector('.container-principal').style.top = '180px'
    document.querySelector('.container-principal').style.right = '450px'
    modeStatus = true
}

//fill historic
let fillHistoric = []
function historicValue(obj) {
    fillHistoric.push(obj)
}

//modal- historic
const historic = document.querySelector('.history')
const modalHistoricContainer = document.querySelector('.modal-historic-container')

historic.addEventListener('click', () => {
    showModalHistoric()

    if (document.querySelector('.calc-visor-1') == null) {
        document.querySelector('.emputy-value').style.display = 'flex'
        document.querySelector('.trash').style.display = 'none'
    } else {
        document.querySelector('.emputy-value').style.display = 'none'
        document.querySelector('.trash').style.display = 'flex'
    }
})

//Funções cálculos
function result() {
    const v_1 = value_1
    const v_2 = value_2

    let resultValue = ''
    switch (operador) {
        case '+':
            resultValue = parseInt(v_1) + parseInt(v_2)
            break;
        case '-':
            resultValue = parseInt(v_1) - parseInt(v_2)
            break;
        case 'x':
            resultValue = parseInt(v_1) * parseInt(v_2)
            break;
        case '/':
            resultValue = parseInt(v_1) / parseInt(v_2)
            break;

        default:
            break;
    }

    visor_1.value += visor_2.value + '='
    visor_2.value = resultValue

    const obj = {
        'v1': visor_1.value,
        'v2': visor_2.value
    }

    historicValue(obj)

    for (const hist in fillHistoric) {
        const div = document.createElement('div')
        div.classList.add('historic-calc')

        div.innerHTML = `
            <span class="calc-visor-1">${fillHistoric[hist]['v1']}</span>
            <span class="calc-visor-2">${fillHistoric[hist]['v2']}</span>
            `
        const modalHistoric = document.querySelector('.modal-historic')
        modalHistoric.appendChild(div)
    }

    fillHistoric = []

    value_1 = ''
    value_2 = ''
}
//percent  a fazer ----------------------
function percent() {
    const perc = ((visor_1.value * visor_2.value) / visor_1.value)
    visor_2.value = perc
}
//1/4
function div_4_1() {
    if (visor_2.value === '0') {
        visor_2.style.fontSize = '1.7rem'
        visor_2.value = 'Não é possivel dividir por zero'
        visor_1.value = ''
    } else {
        visor_1.value = `1/(${visor_2.value})`
        const div_4 = 1 / visor_2.value
        visor_2.value = div_4
    }
}
//square
function square() {
    const raiz = visor_2.value * visor_2.value
    visor_1.value = `sqr(${visor_2.value})`
    visor_2.value = raiz
    visor_1.style.letterSpacing = '0px'
}
//source
function source() {
    const src = Math.sqrt(visor_2.value)
    visor_1.value = `V(${visor_2.value})`
    visor_2.value = src
    visor_1.style.letterSpacing = '0px'
}
//linmpar
function clearInput() {
    visor_1.value = ''
    visor_2.value = 0
    value_1 = ''
    value_2 = ''
}
//Deletar
let arrayValue = []
function del() {
    const valor = visor_2.value
    arrayValue = valor.split('')
    arrayValue.pop()
    visor_2.value = arrayValue.join('')

    visor_2.value === '' ? visor_2.value = 0 : ''
}
//modal-menu
const menu = document.querySelector('.menu')
const modal = document.querySelector('.modal')

menu.addEventListener('click', () => modal.style.marginLeft === '-300px' ?
    modal.style.marginLeft = '300px' : modal.style.marginLeft = '-300px'
)

//show Modal
function showModalHistoric() {
    modalHistoricContainer.style.marginBottom === '-385px' ?
        modalHistoricContainer.style.marginBottom = '385px' :
        modalHistoricContainer.style.marginBottom = '-385px'
}

//bin  finalizar ----------------------
const bin = document.querySelector('.img')
bin.addEventListener('click', () => {
    document.querySelector('.trash').style.display = 'none'
    document.querySelector('.emputy-value').style.display = 'flex'
    const historicModal = document.querySelector('.modal-historic')
    while (historicModal.hasChildNodes()) {
        historicModal.removeChild(historicModal.firstChild)
    }
})

