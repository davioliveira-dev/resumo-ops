const textarea = document.getElementById('text')
const resume = document.getElementById('resume')
const clearButton = document.getElementById('clear-btn')
const copyButton = document.getElementById('copy-btn')
const loadingDiv = document.getElementById('loading-div')


window.onload = () => {
    const title = 'Uma ajudinha pra você!'
    const content =  'Caso o texto seja muito longo NÃO cole todo! COLE A CADA TRÊS PARÁGRAFOS. Assim resultará num resumo melhor!'
    materialAlert(title, content)
}


function darkMode() {
    let button = document.querySelector('#dark-mode-btn')
    let head = document.querySelector('head')
    let create = document.createElement('link')
    let currentValue = button.value

    if(currentValue === 'off') {
        create.rel = 'stylesheet'
        create.href = './assets/css/dark.css'
        head.appendChild(create)
        button.value = 'on'
    } else {
        head.removeChild(head.lastChild)
        button.value = 'off'
    }

}

function resumeText(){
    if(textarea.value == null || textarea.value === '') {
        alert('DIGITE ou COLE seu texto!')
        return
    }

    showLoading(true)

    Algorithmia.client("sim1yuhC9YvgFoljQ18M5QtoDio1")
        .algo("nlp/Summarizer/0.1.8")
        .pipe(textarea.value)
        .then(function(output){ 
            resume.value = output.result
            showText()
            showLoading(false)
        })
}

function showClearButton(isHidden) {
    if(!isHidden) {
        return
    }
    clearButton.style.display = 'block'
}


function showText() {
    resume.style.display = 'block'
    copyButton.style.display = 'block'
}

function showLoading(isLoading) {
    isLoading ? loadingDiv.style.display = 'block' : loadingDiv.style.display = 'none'
}

function copyText() {
    resume.select()
    try {
        const successful = document.execCommand('copy')
        var msg = successful ? alert('Texto copiado!') : alert('Tente novamente!')
    } catch (err) {
        alert('Opa, Não conseguimos copiar o texto, é possivel que o seu navegador não tenha suporte, tente usar Crtl+C.')
    }
}

function clearText() {
    textarea.value = ''
}
