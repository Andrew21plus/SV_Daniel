// ================= TIMER =================
const startDate = new Date("2021-10-17 00:00:00");

function updateTimer(){
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000*60)) % 60;
    const hours = Math.floor(diff / (1000*60*60)) % 24;
    const days = Math.floor(diff / (1000*60*60*24));

    document.getElementById("count").innerHTML =
        days + " días " +
        String(hours).padStart(2, '0') + " horas " +
        String(minutes).padStart(2, '0') + " minutos " +
        String(seconds).padStart(2, '0') + " segundos";
}
setInterval(updateTimer, 1000);
updateTimer();

// ================= CORAZÓN ORGÁNICO =================
const heart = document.getElementById("heart");

const centerX = 170;
const centerY = 160;
const totalLeaves = 800;

// Array para guardar las hojas
const leaves = [];

// Crear corazón relleno
for (let i = 0; i < totalLeaves; i++) {
    createLeaf();
}

function createLeaf() {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");

    // Usar la ecuación paramétrica del corazón
    const t = Math.random() * Math.PI * 2;
    
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    
    // Variar el spread para relleno
    const spread = 0.4 + Math.random() * 1.2;
    
    const posX = centerX + x * 9 * spread + (Math.random() - 0.5) * 25;
    const posY = centerY - y * 9 * spread + (Math.random() - 0.5) * 25;
    
    leaf.style.left = posX + "px";
    leaf.style.top = posY + "px";
    
    // Variar tamaño y rotación
    const scale = 0.3 + Math.random() * 1.2;
    const rotation = -45 + (Math.random() - 0.5) * 30;
    leaf.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    
    // Variar opacidad y duración de animación
    leaf.style.opacity = 0.6 + Math.random() * 0.4;
    leaf.style.animationDuration = (2 + Math.random() * 4) + "s";
    leaf.style.animationDelay = (Math.random() * 2) + "s";
    
    // Guardar datos originales
    leaf.dataset.originalLeft = posX;
    leaf.dataset.originalTop = posY;
    leaf.dataset.originalScale = scale;
    leaf.dataset.originalRotation = rotation;
    
    // Evento click para volar
    leaf.addEventListener('click', function(e) {
        e.stopPropagation();
        flyLeaf(this);
    });
    
    heart.appendChild(leaf);
    leaves.push(leaf);
    
    return leaf;
}

// Función para hacer volar una hoja
function flyLeaf(leaf) {
    if (leaf.classList.contains('flying')) return;
    
    // Marcar como volando
    leaf.classList.add('flying');
    
    // Crear una hoja nueva para reemplazarla después
    setTimeout(() => {
        if (heart.contains(leaf)) {
            leaf.remove();
            const index = leaves.indexOf(leaf);
            if (index !== -1) {
                leaves.splice(index, 1);
            }
            
            // Crear hoja de reemplazo
            const newLeaf = createLeaf();
            
            // Ajustar posición para que aparezca gradualmente
            newLeaf.style.opacity = '0';
            setTimeout(() => {
                newLeaf.style.transition = 'opacity 1s';
                newLeaf.style.opacity = '0.6';
            }, 100);
        }
    }, 3500);
}

// Función para simular ráfaga de viento
function windGust() {
    // Seleccionar varias hojas al azar
    const numLeavesToFly = Math.floor(Math.random() * 15) + 8;
    
    for (let i = 0; i < numLeavesToFly; i++) {
        setTimeout(() => {
            const availableLeaves = leaves.filter(l => !l.classList.contains('flying'));
            if (availableLeaves.length > 0) {
                const randomLeaf = availableLeaves[Math.floor(Math.random() * availableLeaves.length)];
                flyLeaf(randomLeaf);
            }
        }, i * 150);
    }
    
    // Pequeño efecto en todas las hojas
    leaves.forEach(leaf => {
        if (!leaf.classList.contains('flying')) {
            leaf.style.transition = 'transform 0.3s';
            leaf.style.transform = leaf.style.transform + ' translateX(5px)';
            setTimeout(() => {
                leaf.style.transform = leaf.style.transform.replace(' translateX(5px)', '');
            }, 300);
        }
    });
}

// Ráfagas de viento automáticas
setInterval(() => {
    if (Math.random() > 0.4) {
        windGust();
    }
}, 8000);

// También hacer volar al hacer clic en cualquier parte
document.body.addEventListener('click', function(e) {
    if (!e.target.classList.contains('leaf')) {
        windGust();
    }
});

// ================= FRASE CON EFECTO FADE IN =================
const fraseElement = document.getElementById('fraseAmor');
const fraseCompleta = "¿Quieres ser mi Valentín?";

// Establecer la frase completa pero invisible
fraseElement.innerHTML = fraseCompleta;
fraseElement.style.opacity = '0';
fraseElement.style.transition = 'opacity 2.5s ease-in';

// Hacer que aparezca gradualmente después de un pequeño delay
setTimeout(() => {
    fraseElement.style.opacity = '1';
}, 300);

// Cambiar color suavemente con tonos románticos
let colores = ['#b54e6f', '#d68ba5', '#c46b8a', '#b5829c', '#c882a0'];
let colorIndex = 0;

function cambiarColorFrase() {
    if (fraseElement) {
        colorIndex = (colorIndex + 1) % colores.length;
        fraseElement.style.transition = 'color 1s ease';
        fraseElement.style.color = colores[colorIndex];
    }
}

// Cambiar color cada 3 segundos
setInterval(cambiarColorFrase, 3000);

// Efecto al hacer clic en la frase
if (fraseElement) {
    fraseElement.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Crear corazones que explotan
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                crearCorazonVolador(e.clientX, e.clientY);
            }, i * 100);
        }
        
        // Efecto de escala temporal
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
}

// Función para crear corazones voladores
function crearCorazonVolador(x, y) {
    const corazon = document.createElement('div');
    corazon.innerHTML = '❤️';
    corazon.style.position = 'fixed';
    corazon.style.left = x + 'px';
    corazon.style.top = y + 'px';
    corazon.style.fontSize = Math.random() * 20 + 15 + 'px';
    corazon.style.zIndex = '9999';
    corazon.style.pointerEvents = 'none';
    
    // Variables aleatorias para la animación
    const vueloX = (Math.random() * 200 - 100) + 'px';
    const vueloRotacion = Math.random() * 360 + 'deg';
    
    corazon.style.setProperty('--vuelo-x', vueloX);
    corazon.style.setProperty('--vuelo-rotacion', vueloRotacion);
    corazon.style.animation = `volarCorazon ${Math.random() * 2 + 1.5}s ease-out forwards`;
    
    document.body.appendChild(corazon);
    
    setTimeout(() => {
        corazon.remove();
    }, 3000);
}

// Mensaje de bienvenida
console.log('💨 Haz clic en cualquier parte para que sople el viento!');
console.log('❤️ Haz clic en la frase para que exploten corazones!');
console.log('🌸 ¡Feliz San Valentín! 🌸');