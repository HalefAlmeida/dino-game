const dino = document.querySelector(".dino") //Seleciona o componente com class igual a dino

const background = document.querySelector(".background") // Seleciona o background

let isJumping = false // Evita que o dino pule no ar se pressionar a tecla espaço diversas vezes
let position = 0 // Posição inicial do dino

//Para ver os códigos de tecla, ver site https://keycode.info
function handleKeyUp(event) {
  //Escuta os eventos em que a tecla espaço é pressionada
  if (event.keyCode === 32) {
    if (!isJumping) {
      // Apneas pula se o dino não estiver pulando
      jump()
    }
  }
}

//Faz o dino pular
function jump() {
  isJumping = true // define que o dino está pulando

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval) //limpa o intervalo de subida

      //Descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval) // limpa o intervalo de descida
          isJumping = false // define que o dino não está mais pulando
        } else {
          position -= 20 // pega o valor da posição e subtrai 20
          dino.style.bottom = position + "px" // Aplica o valor da posição a propriedade bottom do elemento
        }
      }, 20)
    } else {
      //Subindo
      position += 20 // Pega o valor da posição e adiciona o valor 20 ...

      dino.style.bottom = position + "px" // Aplica o valor da posição a propriedade bottom do elemento
    }
  }, 20) //... a cada 20 milisegundos
}

//Cria um novo cactus
function createCactus() {
  const cactus = document.createElement("div")
  let cactusPosition = 1000 //Define a posição do cactus
  let randomTime = Math.random() * 6000

  cactus.classList.add("cactus") // Adiciona uma classe ao novo componente criado
  cactus.style.left = 1000 + "px"
  background.appendChild(cactus) // Adiciona o elemento cacto ao background

  let leftInterval = setInterval(() => {
    cactusPosition -= 10 //move o cactus para a esquerda da tela
    cactus.style.left = cactusPosition + "px" // define a posição do cactus em seu style

    if (cactusPosition < -60) {
      // Se o cactus estiver fora da tela ...
      clearInterval(leftInterval) //... limpa o intevalo de movimentação do cactus ...
      background.removeChild(cactus) // ... e o remove do background para economia de processamento
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // game over
      clearInterval(leftInterval) //limpa intervalo de movimentação do cactus
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>' // limpa o body e cria elemento h1 com mensagem de fim de jogo
    } else {
      // Caso o cactus ainda não tenha saido da tela
      cactusPosition -= 10 // define a posição do cactus
      cactus.style.left = cactusPosition + "px" // define a propriedade left do cactus
    }
  }, 20)

  setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener("keyup", handleKeyUp) // Adiciona um listener ao componente ao pressionar espaço
