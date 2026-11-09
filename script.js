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
const pantallaFinal  = document.getElementById('pantalla-final');

const botJugar   = document.getElementById('botjugar');
const doll       = document.getElementById('doll');
const dollFinal  = document.getElementById('doll-final');
const flecha     = document.getElementById('flecha');
const botonesOutfit = document.querySelectorAll('.boton-outfit');

// Muñequita elegida (por defecto la inicial)
let dollElegida = 'doll1.png';

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
    flecha.classList.remove('oculto'); // aparece la flecha con el primer outfit tocado
  });
});

// ---------- VESTIR -> FINAL ----------
flecha.addEventListener('click', () => {
  dollFinal.src = dollElegida;
  mostrarPantalla(pantallaFinal);
});