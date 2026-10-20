// =====================================================
// JUEGO DE LA SERPIENTE (canvas)
// INDICE:
// 1. Canvas y contexto
// 2. Constantes
// 3. Estructura de la Serpiente
// 4. Funciones de dibujo
// 5. Primera pintura
// =====================================================

// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. CONSTANTES
const TAMANIO_CELDA = 25;

// 3. ESTRUCTURA DE LA SERPIENTE
const serpiente = [
  { x: 10, y: 10 }, // Cabeza
  { x: 9, y: 10 },  // Cuerpo
  { x: 8, y: 10 },  // Cuerpo
  { x: 7, y: 10 }   // Cola
];

// =========================
// 4. FUNCIONES DE DIBUJO
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

function pintarParte(lineaX, lineaY, esCabeza = false) {
  const x = lineaX * TAMANIO_CELDA;
  const y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = esCabeza ? "#eab308" : "#ef4444";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#150d26";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    const esCabeza = (i === 0);
    pintarParte(serpiente[i].x, serpiente[i].y, esCabeza);
  }
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
}

// 5. PRIMERA PINTURA (Debe ir al final de las declaraciones)
dibujarTodo();