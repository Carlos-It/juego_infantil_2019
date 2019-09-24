//======================================================================
// VARIABLES
//======================================================================

// let miLatas = document.getElementById('latas');
// let arrLatas = miLatas.childNodes;

let cuerpo = document.body;

let miCanvas = document.querySelector('#pizarra');
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;

let anchoCanvas = document.getElementById('pizarra').width;
let altoCanvas = document.getElementById('pizarra').height;

function Size() {
    window.onload = console.log("Ancho: " + anchoCanvas);
    window.onload = console.log("Alto: " + altoCanvas);
    window.onload = console.log('roja' == 'roja');
}

Size();

let posicion = miCanvas.getBoundingClientRect()
correccionX = posicion.x;
correccionY = posicion.y;

miCanvas.width = 500;
miCanvas.height = 500;

//======================================================================
// FUNCIONES
//======================================================================

/**
 * Funcion que empieza a dibujar la linea
 */
function empezarDibujo() {
    pintarLinea = true;
    lineas.push([]);
};

/**
 * Funcion dibuja la linea
 */
var colorLinea;

function dibujarLinea(event) {
    event.preventDefault();
    if (pintarLinea) {
        let ctx = miCanvas.getContext('2d')
        // Estilos de linea
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.lineWidth = 10;
        // Color de la linea
        ctx.strokeStyle = colorLinea;
        // Marca el nuevo punto
        let nuevaPosicionX = 0;
        let nuevaPosicionY = 0;
        if (event.changedTouches == undefined) {
            // Versión ratón
            nuevaPosicionX = event.layerX;
            nuevaPosicionY = event.layerY;
        } else {
            // Versión touch, pantalla tactil
            nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
            nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
        }
        // Guarda la linea
        lineas[lineas.length - 1].push({
            x: nuevaPosicionX,
            y: nuevaPosicionY
        });
        // Redibuja todas las lineas guardadas
        ctx.beginPath();
        lineas.forEach(function (segmento) {
            ctx.moveTo(segmento[0].x, segmento[0].y);
            segmento.forEach(function (punto, index) {
                ctx.lineTo(punto.x, punto.y);
            });
        });
        ctx.stroke();
    }
}

/**
 * Funcion que deja de dibujar la linea
 */
function pararDibujar() {
    pintarLinea = false;
}

function cambiarColor(color) {
    switch (color) {
        case 'roja':
            colorLinea = 'red';
            cuerpo.style.cursor= "url(recursos/pincel_rojo_mini.png), auto";
            break;
        case 'naranja':
            colorLinea = 'orange';
            cuerpo.style.cursor= "url(recursos/pincel_naranja_mini.png), auto";
            break;
        case 'azul':
            colorLinea = 'blue';
            cuerpo.style.cursor= "url(recursos/pincel_azul_mini.png), auto";
            break;
        case 'negra':
            colorLinea = 'black';
            cuerpo.style.cursor= "url(recursos/pincel_negro_mini.png), auto";
            break;
        case 'verde':
            colorLinea = 'green';
            cuerpo.style.cursor= "url(recursos/pincel_verde_mini.png), auto";
            break;
        case 'goma':
            colorLinea = 'white';
            cuerpo.style.cursor= "url(recursos/goma_puntero_raton.png), auto";
            break;
    }
}

// arrLatas.forEach(addEventListener('onclick', cambiarColor(this.id)));

//======================================================================
// EVENTOS
//======================================================================

// Eventos color


// Eventos raton
miCanvas.addEventListener('mousedown', empezarDibujo, false);
miCanvas.addEventListener('mousemove', dibujarLinea, false);
miCanvas.addEventListener('mouseup', pararDibujar, false);

// Eventos pantallas táctiles
miCanvas.addEventListener('touchstart', empezarDibujo, false);
miCanvas.addEventListener('touchmove', dibujarLinea, false);

