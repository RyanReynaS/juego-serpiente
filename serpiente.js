// =====================================================
// JUEGO DE LA SERPIENTE (canvas)
// INDICE:
// 1. Canvas y contexto
// 2. Constantes            <-- TAMANIO_CELDA
// 3. Primera pintura
// 4. Funciones de dibujo   <-- limpiarCanvas, dibujarTablero, dibujarTodo
// =====================================================

// 1. Capturamos el canvas y su contexto de dibujo (ctx es con lo que se dibuja)
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. CONSTANTES
// Tamano (ancho y alto) de cada cuadro de la cuadricula.
// Debe ir ANTES de llamar a dibujarTodo() o da error.
const TAMANIO_CELDA = 25;

// 3. Primera pintura del juego al cargar la pagina
dibujarTodo();

// =========================
// 4. FUNCIONES DE DIBUJO
// =========================

// Borra todo el canvas para volver a dibujar desde cero
function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Dibuja la cuadricula: lineas verticales y luego horizontales
// CAMBIAR AQUI: color de las lineas (strokeStyle) o su grosor (lineWidth)
function dibujarTablero() {
  ctx.strokeStyle = "#3b2563";
  ctx.lineWidth = 1;

  // Lineas verticales: x avanza de celda en celda, y va de 0 al alto del canvas
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Lineas horizontales: y avanza de celda en celda, x va de 0 al ancho del canvas
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// Funcion principal: aqui se llama todo lo que se dibuja (el orden importa)
// SI AGREGO algo nuevo (serpiente, comida), se llama aqui debajo de dibujarTablero()
function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();

  pintarParte(5, 5);   // Prueba 1
  pintarParte(10, 2);  // Prueba 2
  pintarParte(10, 23); // Prueba 3: Borde inferior
  pintarParte(23, 10); // Prueba 4: Borde derecho
  pintarParte(0, 10);  // Prueba 5: Borde izquierdo
  pintarParte(23, 23); // Prueba 6: Esquina inferior derecha
}

// =====================================================
// FUNCIONES Y PRUEBAS DE COORDENADAS (PASO 1)
// =====================================================

function pintarParte(lineaX, lineaY, esCabeza = false) {
  const x = lineaX * TAMANIO_CELDA;
  const y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = esCabeza ? "#eab308" : "#ef4444";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#150d26";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
 }