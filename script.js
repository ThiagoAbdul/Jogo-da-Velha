const casas = document.querySelectorAll(".content-casa")

const indicesDeVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]            // diagonais
]

const completouCasas = (casasMarcadas) => {
    const indicesCasasMarcadas = casasMarcadas
                                .map(casa => Array.from(casas).indexOf(casa))
                                .reduce((set, e) => set.add(e), new Set())
    for(let sequencia of indicesDeVitoria){
        const [a, b, c] = sequencia
        console.log(indicesCasasMarcadas)
        if(indicesCasasMarcadas.has(a) & indicesCasasMarcadas.has(b) & indicesCasasMarcadas.has(c)){
            return true;
        }
    }
    return false;
} 

const marcarX = (casa) => casa.style.color = "black"
const marcarO = (casa) => {
    casa.style.color = "black"
    casa.innerHTML = "O"
}

const marcouX = (casa) => casa.style.color === "black" & casa.innerHTML === "X"
const marcouO = (casa) => casa.style.color === "black" & casa.innerHTML === "O"

const isCasaLivre = (casa) => casa.style.color !== "black"

const indiceAleatorio = (array) => Math.floor(Math.random() * array.length)

const escolherCasa = (casas) => casas[indiceAleatorio(casas)]

const acabou = (casasLivres) => casasLivres.length === 0

const deuVelha = () => {
    alert("Deu velha")
    location.reload()
}

const adversarioMarcar = () => {
    const casasLivres = Array.from(casas)
                        .filter(isCasaLivre)
    if(acabou(casasLivres)){
        deuVelha()   
    }
    else{
        const casaEscolhida = escolherCasa(casasLivres)
        marcarO(casaEscolhida)
    }
}

const venceuQuem = (marca) => {
    const marcados = Array.from(casas).filter(marca)
    return completouCasas(marcados)
}

const voceVenceu = () => venceuQuem(marcouX)
const adversarioVenceu = () => venceuQuem(marcouO)

const vitoria = () => {
    alert("Você venceu")
    location.reload()
}
const derrota = () => {
    alert("Você perdeu")
    location.reload()
}

const adversarioComeca = (Math.floor(Math.random() * 100) % 2) === 0 

if(adversarioComeca){
    adversarioMarcar()
}

casas.forEach(casa => {
    casa.addEventListener('click', event => {
        const casaSelecionada = event.target
        
        marcarX(casaSelecionada)
        if(voceVenceu()){
            vitoria()
        }
        else{
            adversarioMarcar()
            if(adversarioVenceu()){
                derrota()
            }
        }
    })
})