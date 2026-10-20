// =====================================================
// JUEGO DE LA SERPIENTE - PARTE 3
// =====================================================

// 1. CAPTURA DEL CANVAS Y CONTEXTO
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Elementos de la interfaz (DOM)
const elementoPuntaje = document.getElementById("puntaje");
const elementoEstado = document.getElementById("estado");

// 2. CONSTANTES Y VARIABLES GLOBALES
const TAMANIO_CELDA = 25;

// Variables de estado del juego
let serpiente = [
  { x: 10, y: 10 }, // Cabeza
  { x: 9, y: 10 },  // Cuerpo
  { x: 8, y: 10 }   // Cola
];

let comida = { x: 5, y: 5 };
let direccionActual = "derecha";
let intervaloSerpiente = null;
let puntaje = 0;

// =========================
// 3. FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "#3b2563";
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY, color = "#ef4444") {
  const x = lineaX * TAMANIO_CELDA;
  const y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#150d26";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    const esCabeza = (i === 0);
    const color = esCabeza ? "#eab308" : "#ef4444"; // Cabeza amarilla, cuerpo rojo
    pintarParte(serpiente[i].x, serpiente[i].y, color);
  }
}

// PARTE 8: Dibujar y generar comida
function generarNuevaComida() {
  const lineasHorizontales = Math.floor(canvas.width / TAMANIO_CELDA);
  const lineasVerticales = Math.floor(canvas.height / TAMANIO_CELDA);

  comida.x = Math.floor(Math.random() * lineasHorizontales);
  comida.y = Math.floor(Math.random() * lineasVerticales);
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "#a855f7"); // Color morado para la comida
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

// =========================
// 4. LÓGICA DE MOVIMIENTO (PARTES 1, 3, 7 Y 10)
// =========================

function moverDerecha() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
}

function moverIzquierda() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
}

function moverArriba() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
  serpiente.unshift(nuevaCabeza);
}

function moverAbajo() {
  const cabeza = serpiente[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
  serpiente.unshift(nuevaCabeza);
}

// PARTE 9: Detectar colisión con la comida
function atrapaComida() {
  const cabeza = serpiente[0];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

// PARTE 5, 7 Y 10: Función de ciclo automático
function moverSerpiente() {
  // Mover según la dirección actual
  if (direccionActual === "derecha") moverDerecha();
  else if (direccionActual === "izquierda") moverIzquierda();
  else if (direccionActual === "arriba") moverArriba();
  else if (direccionActual === "abajo") moverAbajo();

  // Verificar si la cabeza atrapó la comida
  if (atrapaComida()) {
    puntaje += 10;
    if (elementoPuntaje) elementoPuntaje.textContent = puntaje;
    generarNuevaComida(); // Reubicamos la comida
    // Nota: Al comer NO hacemos pop(), por lo tanto crece 1 segmento
  } else {
    serpiente.pop(); // Si no come, avanza normalmente eliminando la cola
  }

  dibujarTodo();
}

// PARTE 2 Y 7: Cambio de dirección desde botones o teclado
function cambiarDireccion(nuevaDireccion) {
  // Evitar giros de 180° inmediatos
  if (direccionActual === "derecha" && nuevaDireccion === "izquierda") return;
  if (direccionActual === "izquierda" && nuevaDireccion === "derecha") return;
  if (direccionActual === "arriba" && nuevaDireccion === "abajo") return;
  if (direccionActual === "abajo" && nuevaDireccion === "arriba") return;

  direccionActual = nuevaDireccion;
}

// PARTE 4 Y 6: Controles de inicio y pausa
function iniciarJuego() {
  if (intervaloSerpiente) clearInterval(intervaloSerpiente);
  intervaloSerpiente = setInterval(moverSerpiente, 200);
  if (elementoEstado) elementoEstado.textContent = "Jugando";
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  if (elementoEstado) elementoEstado.textContent = "Pausado";
}

// 5. INICIALIZACIÓN
generarNuevaComida();
dibujarTodo();