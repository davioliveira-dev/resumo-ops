const textarea = document.getElementById('resumo')
const resultado = document.getElementById('resultado')


async function resumeText(){
    if(textarea.value == null || textarea.value === '') {
        alert('Digite seu texto!')
            return
        }

        await Algorithmia.client("sim1yuhC9YvgFoljQ18M5QtoDio1")
        .algo("nlp/Summarizer/0.1.8")
        .pipe(textarea.value)
        .then(function(output){ 
            resultado.value = output.result
            showText()
        })
    }

function showText() {
    resultado.style.display = 'block'
}

window.onload = () => {
    const title = 'Uma ajudinha pra você! ;)'
    const content =  'Caso o texto seja muito longo NÃO cole ele todo! COLE A CADA DOIS PARÁGRAFOS! Pois resultará num resumo com ainda mais qualidade!'
    materialAlert(title, content, function(result){
        if(result==true) console.log('OK button pressed');
        else console.log('No button was pressed');
    })

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