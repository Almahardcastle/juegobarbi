// ---------- ESCALADO DEL ESCENARIO ----------
// El escenario está diseñado para 1080x1920. Si la pantalla es distinta,
// se escala todo junto (sin deformar) y se centra.
const ANCHO = 1080;
const ALTO = 1920;
const escenario = document.getElementById('escenario');

function ajustarEscenario() {
  const escala = Math.min(window.innerWidth / ANCHO, window.innerHeight / ALTO);
  const left = (window.innerWidth - ANCHO * escala) / 2;
  const top = (window.innerHeight - ALTO * escala) / 2;
  escenario.style.transform = `scale(${escala})`;
  escenario.style.left = `${left}px`;
  escenario.style.top = `${top}px`;
}

window.addEventListener('resize', ajustarEscenario);
ajustarEscenario();

// ---------- ELEMENTOS ----------
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaVestir = document.getElementById('pantalla-vestir');
const pantallaFondo  = document.getElementById('pantalla-fondo');
const pantallaFinal  = document.getElementById('pantalla-final');

const botJugar   = document.getElementById('botjugar');
const doll       = document.getElementById('doll');
const dollFondo  = document.getElementById('doll-fondo');
const dollFinal  = document.getElementById('doll-final');
const flecha     = document.getElementById('flecha');
const flechaFondo = document.getElementById('flecha-fondo');
const botJugarDeNuevo = document.getElementById('jugardenuevo');
const botonesOutfit = document.querySelectorAll('.boton-outfit');
const botonesFondo  = document.querySelectorAll('.boton-fondo');

const fondoElegible = document.getElementById('fondo-elegible');
const fondoFinal    = document.getElementById('fondo-final');

// Muñequita elegida (por defecto la inicial)
let dollElegida = 'doll1.png';

// Fondo elegido (por defecto, el vacío)
let fondoElegido = 'sinfondo.png';

// Qué fondo se muestra en la pantalla final según el fondo elegido
const FONDOS_FINALES = {
  'lasfloresymitre.png': 'fondo2.png',
  'barriochinom.png':    'fondo1.png',
  'unq.png':             'fondo3.png'
};

// ---------- BRILLITOS ----------
const brillos = document.getElementById('brillos');
const brillosFondo = document.getElementById('brillos-fondo');
const COLORES_BRILLO = ['#ffffff', '#fff3b0', '#ffd6f0', '#ffe066', '#ffb3e6'];

// Por defecto funciona sobre la muñeca de la pantalla de vestir.
// En la pantalla de fondo se llama con: lanzarBrillos(34, dollFondo, brillosFondo)
function lanzarBrillos(cantidad = 34, muneca = doll, contenedor = brillos) {
  // Zona de la muñeca (coordenadas del escenario, sin escalado)
  const x = muneca.offsetLeft;
  const y = muneca.offsetTop;
  const w = muneca.offsetWidth;
  const h = muneca.offsetHeight;

  for (let i = 0; i < cantidad; i++) {
    const brillo = document.createElement('div');
    brillo.className = 'brillo';

    const tam = 24 + Math.random() * 46; // tamaño: 24 a 70 px
    brillo.style.width = `${tam}px`;
    brillo.style.height = `${tam}px`;
    brillo.style.left = `${x + Math.random() * w - tam / 2}px`;
    brillo.style.top = `${y + Math.random() * h - tam / 2}px`;
    brillo.style.background = COLORES_BRILLO[Math.floor(Math.random() * COLORES_BRILLO.length)];
    brillo.style.setProperty('--dur', `${700 + Math.random() * 500}ms`);
    brillo.style.setProperty('--delay', `${Math.random() * 400}ms`);

    brillo.addEventListener('animationend', () => brillo.remove());
    contenedor.appendChild(brillo);
  }

  // Pulso de luz en la muñeca (se reinicia en cada toque)
  muneca.classList.remove('doll-brilla');
  void muneca.offsetWidth; // fuerza el reinicio de la animación
  muneca.classList.add('doll-brilla');
}

function mostrarPantalla(pantalla) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  pantalla.classList.add('activa');
}

// ---------- INICIO -> VESTIR ----------
botJugar.addEventListener('click', () => {
  mostrarPantalla(pantallaVestir);
});

// ---------- CAMBIO DE OUTFIT ----------
botonesOutfit.forEach(boton => {
  boton.addEventListener('click', () => {
    dollElegida = boton.dataset.doll;
    doll.src = dollElegida;
    flecha.classList.remove('oculto');
    lanzarBrillos(); // ✨
  });
});

// ---------- VESTIR -> ELEGIR FONDO ----------
flecha.addEventListener('click', () => {
  dollFondo.src = dollElegida;

  // Se arranca siempre con el fondo vacío y sin flecha
  fondoElegido = 'sinfondo.png';
  fondoElegible.src = fondoElegido;
  flechaFondo.classList.add('oculto');

  mostrarPantalla(pantallaFondo);
});

// ---------- CAMBIO DE FONDO ----------
botonesFondo.forEach(boton => {
  boton.addEventListener('click', () => {
    fondoElegido = boton.dataset.fondo;
    fondoElegible.src = fondoElegido;
    flechaFondo.classList.remove('oculto'); // aparece la flecha con el primer fondo tocado
    lanzarBrillos(34, dollFondo, brillosFondo); // ✨
  });
});

// ---------- ELEGIR FONDO -> FINAL ----------
flechaFondo.addEventListener('click', () => {
  dollFinal.src = dollElegida;
  fondoFinal.src = FONDOS_FINALES[fondoElegido];
  mostrarPantalla(pantallaFinal);
});

// ---------- FINAL -> JUGAR DE NUEVO ----------
botJugarDeNuevo.addEventListener('click', () => {
  // Se reinicia todo para empezar de cero
  dollElegida = 'doll1.png';
  doll.src = dollElegida;
  flecha.classList.add('oculto');

  fondoElegido = 'sinfondo.png';

  mostrarPantalla(pantallaInicio);
});