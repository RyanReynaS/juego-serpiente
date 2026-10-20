// =====================================================
// JUEGO DE LA SERPIENTE - PARTE 4 (FINAL)
// =====================================================

// 1. CAPTURA DEL CANVAS Y CONTEXTO
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Elementos del DOM
const elementoPuntaje = document.getElementById("puntaje");
const elementoEstado = document.getElementById("estado");
const elementoMensaje = document.getElementById("mensaje");

// 2. CONSTANTES Y VARIABLES GLOBALES
const TAMANIO_CELDA = 25;

let serpiente = [];
let comida = { x: 5, y: 5 };
let direccionActual = "derecha";
let intervaloSerpiente = null;
let puntaje = 0;
let velocidad = 200; // PARTE 4 - Actividad 3: Variable de velocidad inicial
let juegoTerminado = false;

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

function generarNuevaComida() {
  const lineasHorizontales = Math.floor(canvas.width / TAMANIO_CELDA);
  const lineasVerticales = Math.floor(canvas.height / TAMANIO_CELDA);

  comida.x = Math.floor(Math.random() * lineasHorizontales);
  comida.y = Math.floor(Math.random() * lineasVerticales);
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "#a855f7"); // Morado para la comida
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

// =========================
// 4. LÓGICA DE JUEGO Y VALIDACIONES (PARTE 4)
// =========================

// PARTE 4 - Actividad 1: Colisión con Bordes
function verificarColisionBordes(cabeza) {
  const maxColumnas = Math.floor(canvas.width / TAMANIO_CELDA);
  const maxFilas = Math.floor(canvas.height / TAMANIO_CELDA);

  return (
    cabeza.x < 0 ||
    cabeza.x >= maxColumnas ||
    cabeza.y < 0 ||
    cabeza.y >= maxFilas
  );
}

// PARTE 4 - Actividad 4 (Mejora extra): Evitar auto-colisión (chocar con su cuerpo)
function verificarAutoColision(cabeza) {
  for (let i = 1; i < serpiente.length; i++) {
    if (cabeza.x === serpiente[i].x && cabeza.y === serpiente[i].y) {
      return true;
    }
  }
  return false;
}

function moverDerecha() {
  const cabeza = serpiente[0];
  serpiente.unshift({ x: cabeza.x + 1, y: cabeza.y });
}

function moverIzquierda() {
  const cabeza = serpiente[0];
  serpiente.unshift({ x: cabeza.x - 1, y: cabeza.y });
}

function moverArriba() {
  const cabeza = serpiente[0];
  serpiente.unshift({ x: cabeza.x, y: cabeza.y - 1 });
}

function moverAbajo() {
  const cabeza = serpiente[0];
  serpiente.unshift({ x: cabeza.x, y: cabeza.y + 1 });
}

function atrapaComida() {
  const cabeza = serpiente[0];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

function finalizarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  juegoTerminado = true;

  if (elementoEstado) elementoEstado.textContent = "GAME OVER";
  if (elementoMensaje) elementoMensaje.textContent = "💥 ¡Has chocado! Presiona Reiniciar para jugar de nuevo.";
}

function moverSerpiente() {
  if (juegoTerminado) return;

  if (direccionActual === "derecha") moverDerecha();
  else if (direccionActual === "izquierda") moverIzquierda();
  else if (direccionActual === "arriba") moverArriba();
  else if (direccionActual === "abajo") moverAbajo();

  const nuevaCabeza = serpiente[0];

  // Validaciones de derrota
  if (verificarColisionBordes(nuevaCabeza) || verificarAutoColision(nuevaCabeza)) {
    finalizarJuego();
    return;
  }

  // Atrapar comida y acelerar
  if (atrapaComida()) {
    puntaje += 10;
    if (elementoPuntaje) elementoPuntaje.textContent = puntaje;
    generarNuevaComida();

    // PARTE 4 - Actividad 3 & 4: Incremento progresivo de velocidad por nivel/puntaje
    if (velocidad > 80) {
      velocidad -= 10; // Aumenta la velocidad reduciendo el intervalo
      clearInterval(intervaloSerpiente);
      intervaloSerpiente = setInterval(moverSerpiente, velocidad);
    }
  } else {
    serpiente.pop();
  }

  dibujarTodo();
}

function cambiarDireccion(nuevaDireccion) {
  if (juegoTerminado) return;

  // Evitar giros inmediatos de 180°
  if (direccionActual === "derecha" && nuevaDireccion === "izquierda") return;
  if (direccionActual === "izquierda" && nuevaDireccion === "derecha") return;
  if (direccionActual === "arriba" && nuevaDireccion === "abajo") return;
  if (direccionActual === "abajo" && nuevaDireccion === "arriba") return;

  direccionActual = nuevaDireccion;
}

function iniciarJuego() {
  if (juegoTerminado || intervaloSerpiente) return;

  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
  if (elementoEstado) elementoEstado.textContent = "Jugando";
  if (elementoMensaje) elementoMensaje.textContent = "¡Buena suerte!";
}

function pausarJuego() {
  if (juegoTerminado) return;

  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  if (elementoEstado) elementoEstado.textContent = "Pausado";
  if (elementoMensaje) elementoMensaje.textContent = "Juego en pausa.";
}

// PARTE 4 - Actividad 2: Reiniciar Juego
function reiniciarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;

  serpiente = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];

  direccionActual = "derecha";
  puntaje = 0;
  velocidad = 200;
  juegoTerminado = false;

  if (elementoPuntaje) elementoPuntaje.textContent = puntaje;
  if (elementoEstado) elementoEstado.textContent = "Listo";
  if (elementoMensaje) elementoMensaje.textContent = "Presiona iniciar para comenzar.";

  generarNuevaComida();
  dibujarTodo();
}

// 5. INICIALIZACIÓN
reiniciarJuego();