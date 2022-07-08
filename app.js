const cuadro = document.querySelector('.cuadroContenedor')
const tecla = document.querySelector('.teclaContenedor')
const wordle='SUPER'
const mensajeMostrar= document.querySelector('.mensajeContenedor')
let columnaActual=0
let cuadroActual=0
let finalJuego=false
const letras = ['Q','W','E','R','T','Y','U','I','O','P',
    'A','S','D','F','G','H','J','K','L','Ñ','ENTER',
    'Z','X','C','V','B','N','M','Borrar',]

const adivinaColumnas=[
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

adivinaColumnas.forEach((adivinaColumna, adivinaColumnaIndex) =>{
    const elementocolumna=document.createElement('div')
    elementocolumna.setAttribute('id','adivinaColumna'+adivinaColumnaIndex)
    adivinaColumna.forEach((adivina, adivinaIndex)=>{
        const elementoCuadro=document.createElement('div')
        elementoCuadro.setAttribute('id','adivinaColumna'+adivinaColumnaIndex+'cuadro'+adivinaIndex)
        elementoCuadro.classList.add('cuadro')
        elementocolumna.append(elementoCuadro)
    })
    cuadro.append(elementocolumna)
})


letras.forEach(let =>{
    const elementoBoton = document.createElement('button')
    elementoBoton.textContent = let
    elementoBoton.setAttribute('id', let)
    elementoBoton.addEventListener('click', ()=> verClick(let))
    tecla.append(elementoBoton)

})
const verClick =(letra) => {
    console.log('click', letra);
    if(letra === 'Borrar'){
        borrarLetra()
        console.log('adivinaColumnas',adivinaColumnas)
        
        return
    }
    if(letra === 'ENTER'){
        console.log('adivinaColumnas',adivinaColumnas)
        chequeaColumna()
        return
    }
    agregarLetra(letra)
    
}
const agregarLetra=(letra)=>{
    if (cuadroActual<5 && columnaActual<6){

        const cuadro = document.getElementById('adivinaColumna'+columnaActual+'cuadro'+cuadroActual)
        cuadro.textContent=letra
        adivinaColumnas[columnaActual][cuadroActual]=letra
        cuadro.setAttribute('data',letra)
        cuadroActual ++
        
    }   
}
const borrarLetra = () =>{
    if (cuadroActual > 0) {     
    cuadroActual --
    const cuadro = document.getElementById('adivinaColumna'+columnaActual+'cuadro'+cuadroActual)
    cuadro.textContent=''
    adivinaColumnas[columnaActual][cuadroActual]=''
    cuadro.setAttribute('data','')
   
    }
}
const chequeaColumna = () => {

        const adivina = adivinaColumnas[columnaActual].join('')
        if (cuadroActual >4) {
        console.log('adivinanza es '+adivina,'wordle es '+wordle)
        cuadroDato()
            if (wordle==adivina) {
                showMensaje('Adivinaste')
                finalJuego=true
                return
            }else {
                if (columnaActual >= 5) {
                    finalJuego=false
                    showMensaje('Juego finalizado')
                    return                    
                }
                if (columnaActual < 5) {
                    columnaActual ++
                    cuadroActual = 0                    
                }
            }            
        }
}
const showMensaje=(mensaje) =>{
    const elementoMensaje=document.createElement('p')
    elementoMensaje.textContent=mensaje
    mensajeMostrar.append(elementoMensaje)
    setTimeout(()=>mensajeMostrar.removeChild(elementoMensaje), 3000)
}
const colorearTecla = (letraDato,color) =>{
   const key = document.getElementById(letraDato)
    key.classList.add(color)
}
const cuadroDato = () => {
    const columnaCuadros=document.querySelector('#adivinaColumna'+columnaActual).childNodes
    columnaCuadros.forEach((cuadro, index) => {
        const letraDato = cuadro.getAttribute('data')
        setTimeout(()=>{
            cuadro.classList.add('cambiar')

            if (letraDato == wordle[index]) {
                cuadro.classList.add('verdear')
                colorearTecla(letraDato,'verdear')
            }else if (wordle.includes(letraDato)) {
                cuadro.classList.add('amarillear')
                colorearTecla(letraDato,'amarillear')
            }else {
                cuadro.classList.add('grisear')
                colorearTecla(letraDato,'grisear')
            }
        }, 500 * index)

    })
        
}