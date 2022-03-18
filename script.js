const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const lowercaseEl = document.getElementById('lowercase')
const uppercaseEl = document.getElementById('uppercase')
const numberEl = document.getElementById('number')
const symbolEl = document.getElementById('symbol')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')



const randomFun = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password){return}

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Text is Copied to Clipboard')
})


generateEl.addEventListener('click', () => {
    const length = lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numberEl.checked
    const hasSymbol = symbolEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
    
})


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typeCount = lower + upper + number + symbol
    const arrType = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    if(typeCount === 0) {
        return ''
    }

    for(let i= 0; i < length; i += typeCount ) {
        arrType.forEach(type => {
            const arrFun = Object.keys(type)[0]
            generatedPassword += randomFun[arrFun]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}



function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}



function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}


function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
// console.log(getRandomNumber())


function getRandomSymbol() {
    const symbols = '!@#$%^&*()_'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
// console.log(getRandomSymbol())