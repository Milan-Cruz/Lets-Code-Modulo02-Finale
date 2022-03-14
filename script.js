class Calculadora {
    constructor(textoAnterior, textoAtual) {
        this.textoAnterior = textoAnterior
        this.textoAtual = textoAtual
        this.limpar()
        this.limparHistorico()
    }

    limpar() {
        this.conteudoAnterior = ''
        this.conteudoAtual = '0'
        this.operador = undefined
        this.resetDepoisDoIgual = false
    }

    resetTrue(){
        this.resetDepoisDoIgual = true
    }

    limparHistorico() {
        this.posicaoHistorico = 0
        this.resultadoHistorico = 0
        this.registroHistorico = '0'
        textoH1.innerText = ''
        textoH2.innerText = ''
        textoH3.innerText = ''
        textoH4.innerText = ''
        textoH5.innerText = ''
        textoH6.innerText = ''
        textoH7.innerText = ''
        textoH8.innerText = ''
        textoH9.innerText = ''
        textoH10.innerText = ''
        textoH11.innerText = ''
        textoH12.innerText = ''
        textoH13.innerText = ''
        textoH14.innerText = ''
        textoH15.innerText = ''
        this.bancoHistorico = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
    }

    deletar() {
        this.conteudoAtual = this.conteudoAtual.toString().slice(0, -1)
    }

    acrescentarDigito(numero) {
        if (numero === '.' && this.conteudoAtual.includes('.')) return
        
        if (this.resetDepoisDoIgual) {
            this.conteudoAtual = '' + numero.toString()
            this.resetDepoisDoIgual = false
        } else {
            this.conteudoAtual = this.conteudoAtual.toString() + numero.toString()
        }

        if ((this.conteudoAtual.length >= 2) && (this.conteudoAtual[0] === '0')){
            this.conteudoAtual = this.conteudoAtual.toString().slice(1, this.conteudoAtual.length)
        }
    }

    escolherOperador(operador) {
        if (this.conteudoAtual === '') return
        if (this.conteudoAnterior !== '') {
            this.calcular()
        }
        this.operador = operador
        this.conteudoAnterior = this.conteudoAtual
        this.conteudoAtual = ''
    }

    incrementarPosicao() {
        if (this.posicaoHistorico > 13) {
            this.posicaoHistorico = 0
        } else {
            this.posicaoHistorico = this.posicaoHistorico + 1
        }
    }

    calcular() {
        let resultado
        const anterior = parseFloat(this.conteudoAnterior)
        const atual = parseFloat(this.conteudoAtual)
        if (isNaN(anterior) || isNaN(atual)) return
        if ((this.operador === '÷') && (atual == 0)) {
            alert('Não é possível dividir por zero.')
            return
        }
        switch (this.operador) {
            case '+':
                resultado = anterior + atual
                break
            case '-':
                resultado = anterior - atual
                break
            case '×':
                resultado = anterior * atual
                break
            case '÷':
                resultado = anterior / atual
                break
            case '%':
                resultado = anterior % atual
                break
            case '^':
                resultado = Math.pow(anterior, atual)
                break
        default:
                return
        }
        this.resultadoHistorico = resultado
        this.produzRegistroHistorico()
        this.escreverHistorico()

        this.conteudoAtual = resultado
        this.operador = undefined
        this.conteudoAnterior = ''
    }

    raizQuadrada() {
        let resultado
        const atual = parseFloat(this.conteudoAtual)
        if (isNaN(atual)) return
        resultado = Math.sqrt(atual)
        this.conteudoAtual = resultado
        this.operador = undefined
        this.conteudoAnterior = ''
    }

    paraRadianos(angulo) {
        return parseFloat((angulo * Math.PI) / 180)
    }

    senoEmGraus() {
        let resultado
        const atual = parseFloat(this.conteudoAtual)
        if (isNaN(atual)) return
        resultado = Math.sin(this.paraRadianos(atual)).toFixed(4)
        this.conteudoAtual = resultado
        this.operador = undefined
        this.conteudoAnterior = ''
    }

    cossenoEmGraus() {
        let resultado
        const atual = parseFloat(this.conteudoAtual)
        if (isNaN(atual)) return
        resultado = Math.cos(this.paraRadianos(atual)).toFixed(4)
        this.conteudoAtual = resultado
        this.operador = undefined
        this.conteudoAnterior = ''
    }

    numeroPI() {
        if ((this.conteudoAtual = '') || (this.conteudoAtual = '0')) {
            this.conteudoAtual = Math.PI
        } else {
            this.conteudoAnterior = this.conteudoAtual
            this.conteudoAtual = Math.PI
        }
    }

    getNumeroDaTela(numero) {
        const stringNumero = numero.toString()
        const digitosInteiros = parseFloat(stringNumero.split('.')[0])
        const digitosDecimais = stringNumero.split('.')[1]
        let numeroInteiro
        
        if (isNaN(digitosInteiros)) {
            numeroInteiro = ''
        } else {
            numeroInteiro = digitosInteiros.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (digitosDecimais != null) {
            return `${integerDisplay}.${digitosDecimais}`
        } else {
            return numeroInteiro
        }
    }

    atualizarTela() {
        this.textoAtual.innerText = this.getNumeroDaTela(this.conteudoAtual)
        if (this.operador != null) {
        this.textoAnterior.innerText =
            `${this.getNumeroDaTela(this.conteudoAnterior)} ${this.operador}`
        } else {
        this.textoAnterior.innerText = ''
        }
    }

    produzRegistroHistorico() {
        this.registroHistorico = (`${this.conteudoAnterior}  ${this.operador}  ${this.conteudoAtual} = ${this.resultadoHistorico}`).toString()
    }

    escreverHistorico() {
        switch (this.posicaoHistorico) {
            case 0:
                textoH1.innerText = this.registroHistorico
                
                break
            case 1:
                textoH2.innerText = this.registroHistorico
                break
            case 2:
                textoH3.innerText = this.registroHistorico
                break
            case 3:
                textoH4.innerText = this.registroHistorico
                break
            case 4:
                textoH5.innerText = this.registroHistorico
                break
            case 5:
                textoH6.innerText = this.registroHistorico
                break
            case 6:
                textoH7.innerText = this.registroHistorico
                break
            case 7:
                textoH8.innerText = this.registroHistorico
                break
            case 8:
                textoH9.innerText = this.registroHistorico
                break
            case 9:
                textoH10.innerText = this.registroHistorico
                break
            case 10:
                textoH11.innerText = this.registroHistorico
                break
            case 11:
                textoH12.innerText = this.registroHistorico
                break
            case 12:
                textoH13.innerText = this.registroHistorico
                break
            case 13:
                textoH14.innerText = this.registroHistorico
                break
            case 14:
                textoH15.innerText = this.registroHistorico
                break
        
            default:
                break
        }
        //salva os dados num array que nao irei utilizar mas foi pedido no enunciado
        this.bancoHistorico[this.posicaoHistorico] = this.registroHistorico 
        this.incrementarPosicao()
    }
}


const botoesDeNumero = document.querySelectorAll('[data-numero]')
const botoesDeOperador = document.querySelectorAll('[data-operador]')
const botaoRaizQuadrada = document.querySelector('[data-raiz-quad]')
const botaoSeno = document.querySelector('[data-seno]')
const botaoCosseno = document.querySelector('[data-cosseno]')
const botaoPI = document.querySelector('[data-pi]')
const botaoIgual = document.querySelector('[data-igual]')
const botaoDeletar = document.querySelector('[data-deletar]')
const botaoAC = document.querySelector('[data-limpar]')
const botaoHistorico = document.querySelector('[data-historico]')
const botaoResetHistorico = document.querySelector('[data-hist-reset]')
const textoAnterior = document.querySelector('[data-conteudo-anterior]')
const textoAtual = document.querySelector('[data-conteudo-atual]')
const textoH1 = document.querySelector('[data-h1]')
const textoH2 = document.querySelector('[data-h2]')
const textoH3 = document.querySelector('[data-h3]')
const textoH4 = document.querySelector('[data-h4]')
const textoH5 = document.querySelector('[data-h5]')
const textoH6 = document.querySelector('[data-h6]')
const textoH7 = document.querySelector('[data-h7]')
const textoH8 = document.querySelector('[data-h8]')
const textoH9 = document.querySelector('[data-h9]')
const textoH10 = document.querySelector('[data-h10]')
const textoH11 = document.querySelector('[data-h11]')
const textoH12 = document.querySelector('[data-h12]')
const textoH13 = document.querySelector('[data-h13]')
const textoH14 = document.querySelector('[data-h14]')
const textoH15 = document.querySelector('[data-h15]')

const calculadora = new Calculadora(textoAnterior, textoAtual)

botoesDeNumero.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.acrescentarDigito(botao.innerText)
        calculadora.atualizarTela()
    })
})

botoesDeOperador.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.escolherOperador(botao.innerText)
        calculadora.atualizarTela()
    })
})

botaoIgual.addEventListener('click', botao => {
    calculadora.calcular()
    calculadora.atualizarTela()
    calculadora.resetTrue()
})


botaoAC.addEventListener('click', botao => {
    calculadora.limpar()
    calculadora.atualizarTela()
})

botaoDeletar.addEventListener('click', botao => {
    calculadora.deletar()
    calculadora.atualizarTela()
})

botaoRaizQuadrada.addEventListener('click', botao => {
    calculadora.raizQuadrada()
    calculadora.atualizarTela()
})

botaoSeno.addEventListener('click', botao => {
    calculadora.senoEmGraus()
    calculadora.atualizarTela()
})

botaoCosseno.addEventListener('click', botao => {
    calculadora.cossenoEmGraus()
    calculadora.atualizarTela()
})

botaoPI.addEventListener('click', botao => {
    calculadora.numeroPI()
    calculadora.atualizarTela()
})

botaoResetHistorico.addEventListener('click', botao => {
    calculadora.limparHistorico()
})

let toggleHistorico = true
botaoHistorico.addEventListener('click', botao => {
    if (toggleHistorico === true) {
        document.querySelector('[data-esconder]').style.display="none"
    } else {
        document.querySelector('[data-esconder]').style.display="block"
    }
    toggleHistorico = !toggleHistorico
})