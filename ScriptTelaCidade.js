const textBox = document.getElementById('RpgTextBox');
const textElement = document.getElementById('RpgText');
const continueButton = document.getElementById('ContinueButton');
const skipButton = document.getElementById('SkipButton');
const RitaAlegreImage = document.getElementById('RitaAlegreImage');
const muteButton = document.getElementById('muteButton'); // Botão de mutar

let textArray = [
    "CLIQUE EM 'CONTINUAR' PARA AVANÇAR",
    "PAPAI NOS PREPAROU UMA SURPRESA ESPECIAL, VAMOS PASSAR PELA CIDADE PRIMEIRO. O QUE SERÁ QUE É?"
];

// Arquivos de áudio correspondentes
let audioFiles = [
    "#",  // Áudio correspondente ao primeiro texto
    "Vozes/TelaCidade/1.mp3"  
];

let textIndex = 0;
let charIndex = 0;
let typingSpeed = 20; // Velocidade de digitação (em milissegundos)
let audio = new Audio(); // Objeto de áudio

// Função para iniciar a reprodução de áudio
function playAudio(index) {
    if (audio) {
        audio.pause(); // Interrompe o áudio anterior
        audio.currentTime = 0; // Reseta o tempo do áudio
    }
    audio.src = audioFiles[index]; // Carrega o arquivo de áudio correspondente
    audio.play().catch((error) => {
        console.log('Reprodução automática bloqueada, aguardando interação do usuário');
    });
}

// Função para digitar o texto automaticamente
function typeText() {
    if (charIndex < textArray[textIndex].length) {
        textElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    }
}

// Inicializa o texto e o áudio quando a página carrega
window.addEventListener('load', () => {
    textElement.textContent = ''; // Limpa o conteúdo da caixa de texto ao carregar
    typeText(); // Inicia a digitação do texto
    playAudio(textIndex); // Inicia o áudio correspondente ao texto

    // Carregar o estado do mute ao iniciar a página
    const isMuted = localStorage.getItem('isMuted') === 'true';
    audio.muted = isMuted; // Aplica o estado de mutação
    muteButton.textContent = isMuted ? 'Desmutar Som' : 'Mutar Som'; // Atualiza o texto do botão
});

// Função para passar para o próximo texto e áudio
continueButton.addEventListener('click', () => {
    if (audio) {
        audio.pause(); // Interrompe o áudio atual
    }
    if (textIndex < textArray.length - 1) {
        textIndex++;
        charIndex = 0;
        textElement.textContent = ''; // Limpa o texto anterior
        typingSpeed = 50; // Restaura a velocidade de digitação
        typeText();
        playAudio(textIndex); // Reproduz o próximo áudio
    } else {
        // Redireciona para outra tela após o último texto
        window.location.href = 'TelaCidadeJogo.html'; 
    }
});

// Função para acelerar a digitação
skipButton.addEventListener('click', () => {
    typingSpeed = 0; // Ajusta a velocidade para instantâneo
    if (audio) {
        audio.pause(); // Interrompe o áudio atual
    }
});

// Função para mover a caixa de texto
let isDraggingTextBox = false;
let offsetXTextBox, offsetYTextBox;

textBox.addEventListener('mousedown', (e) => {
    isDraggingTextBox = true;
    offsetXTextBox = e.clientX - textBox.offsetLeft;
    offsetYTextBox = e.clientY - textBox.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTextBox) {
        textBox.style.left = `${e.clientX - offsetXTextBox}px`;
        textBox.style.top = `${e.clientY - offsetYTextBox}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTextBox = false;
});

// Função para mover a imagem da Rita
let isDraggingRitaImage = false;
let offsetXRitaImage, offsetYRitaImage;

RitaAlegreImage.addEventListener('mousedown', (e) => {
    isDraggingRitaImage = true;
    offsetXRitaImage = e.clientX - RitaAlegreImage.offsetLeft;
    offsetYRitaImage = e.clientY - RitaAlegreImage.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingRitaImage) {
        RitaAlegreImage.style.left = `${e.clientX - offsetXRitaImage}px`;
        RitaAlegreImage.style.top = `${e.clientY - offsetYRitaImage}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingRitaImage = false;
});

// Função que força a reprodução de áudio após interação
document.addEventListener('click', () => {
    if (audio.paused) {
        playAudio(textIndex);  // Reproduz o áudio assim que o usuário interage
    }
});

// Função para alternar o estado do mute
muteButton.addEventListener('click', () => {
    const isMuted = localStorage.getItem('isMuted') === 'true';
    const newMutedState = !isMuted;

    localStorage.setItem('isMuted', newMutedState); // Armazena o estado
    audio.muted = newMutedState; // Aplica o novo estado
    muteButton.textContent = newMutedState ? 'Desmutar Som' : 'Mutar Som'; // Atualiza o texto do botão
});
