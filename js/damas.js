/* Copyright (c) 2021 Sebastián Fuentes */

var fichaSeleccionada;
var casillaFichaEnMedio = '';
var turnoRojo = true;
var laFichaVieneDeMatar = false;

var audioMoverFicha = new Audio("sonido/moverFicha.mp3");
var audioMatarFicha = new Audio("sonido/matarFicha.mp3");
var audioMatarUltima = new Audio("sonido/checkmate.mp3");

var tablero = new Array(8);

for (let c = 0; c < 8; c++) {
    tablero[c] = new Array(8);
}

function llenarMatriz() { // Llena la matriz con las posiciones iniciales de las fichas y las ubica en el tablero
    var i = 1;
    for (let f = 0; f < 3; f++) {
        for (let c = 0; c < 8; c++) {
            if (((c + f) % 2) == 1) {
                if (i < 10) { i = ("0" + i.toString()) };
                dibujarFicha(f, c, "rojo", "r" + i);
                tablero[f][c] = "r" + i;
                i++;
            }
        }
    }

    var i = 1;
    for (let f = 5; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            if (((c + f) % 2) == 1) {
                if (i < 10) { i = ("0" + i.toString()) };
                dibujarFicha(f, c, "azul", "a" + i);
                tablero[f][c] = "a" + i;
                i++;
            }
        }
    }

}

function dibujarTablero() { // Dibujo inicial del tablero

    var casilla = '';

    document.getElementById("Ajedrez").innerHTML += '<tbody id="tbody"></tbody>';

    for (var i = 0; i < 8; i++) {

        document.getElementById("tbody").innerHTML += '<tr id="fila' + (i.toString()) + '"></tr>';

        for (var j = 0; j < 8; j++) {

            casilla = i.toString() + j.toString();

            if ((i + j) % 2 == 0) {

                document.getElementById("fila" + i.toString()).innerHTML += '<td id="' + casilla + '" class = "casillaBlanca" onclick="intentarMovimiento(' + casilla + ')" click="intentarMovimiento(' + casilla + ')"></td>';

            }
            else {

                document.getElementById("fila" + i.toString()).innerHTML += '<td id="' + casilla + '" class = "casillaNegra" onclick="intentarMovimiento(' + casilla + ')" click="intentarMovimiento(' + casilla + ')"></td>';

            }
        }
    }

    llenarMatriz();

}

function posicion(idFicha) { // Retorna la posición de una ficha en forma de coordenadas a partir de su ID
    //idFicha = idFicha.substr(0,3);

    for (let f = 0; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            if (tablero[f][c] == idFicha) {
                return f.toString() + c.toString();
            }
        }
    }
}

function casillaEstaDisponible(casilla) { // Verifica si una casilla está vacía
    var f = casilla.substr(0, 1);
    var c = casilla.substr(1, 1);
    if ((tablero[f][c]) == undefined && (c >= 0 && c < 8)) {
        return true;
    }
    else {
        return false;
    }

}

function intentarMovimiento(casilla) { // Revisa si la casilla es verde y se encarga del movimiento

    
    if (parseInt(casilla) < 10) casilla = "0" + casilla;

    if (document.getElementById(casilla).style.background == "green") {
        audioMoverFicha.play();
        moverFicha(fichaSeleccionada, casilla.toString().substr(0, 1), casilla.toString().substr(1, 1));
        pasarTurno();
    }
    else if (document.getElementById(casilla).style.background == "lime") {

        audioMatarFicha.play();
        moverFicha(fichaSeleccionada, casilla.toString().substr(0, 1), casilla.toString().substr(1, 1));
        eliminarFichaPos(casillaFichaEnMedio);

        laFichaVieneDeMatar = true;
        clickFicha(document.getElementById(casilla.toString().substr(0, 1) + casilla.toString().substr(1, 1)).firstChild);
        laFichaVieneDeMatar = false;

        revisarSiPasaTurno();
    }
}

function revisarSiPasaTurno() { // Busca si hay celdas color "lime", si no hay pasa turno
    var lista = (document.querySelectorAll("td"));
    var sePuedeMover = false;
    for (let elemento of lista) {
        if (elemento.style.background == "lime") {
            sePuedeMover = true;
        }
    }
    if (!sePuedeMover) {
        pasarTurno();
    }
}

function pasarTurno(){
    turnoRojo = !turnoRojo;
    switch(turnoRojo){
        case true:
            document.getElementById("texto").innerHTML = "Es turno de las fichas rojas";
            break;
        case false:
            document.getElementById("texto").innerHTML = "Es turno de las fichas azules";
    }
}

function validarCasilla(casilla) { // Revisa si una casilla está entre [0,0] y [7,7]
    var fila = parseInt(casilla.toString().substr(0, 1));
    var columna = parseInt(casilla.toString().substr(1, 1));
    return (((fila - 0) * (fila - 7) <= 0) && ((columna - 0) * (columna - 7) <= 0));
}

function clickFicha(idFicha) { // Funcion de movimiento principal

    repintarTablero();

    var id = idFicha.id;
    fichaSeleccionada = id;
    var color = id.substr(0, 1);

    var turno;
    turnoRojo ? turno = "r" : turno = "a";

    if (color == turno) { // SI LA FICHA A LA QUE SE LE DIO CLICK ESTÁ EN SU TURNO

        // GENERALIZACIÓN DEL MOVIMIENTO -> [0] = AbajoDerecha, [1] = AbajoIzquierda, [2] = ArribaIzquierda, [3] = ArribaDerecha
        var sentidoFila     = [1, 1, -1, -1];
        var sentidoColumna  = [1, -1, -1, 1];

        var filaOrigen = posicion(id).substr(0, 1);
        var columnaOrigen = posicion(id).substr(1, 1);

        filaOrigen = parseInt(filaOrigen);
        columnaOrigen = parseInt(columnaOrigen);
        var casillaIntento, filaIntento, columnaIntento;

        for (let i = 0; i < 4; i++) {

            filaIntento = filaOrigen + sentidoFila[i];
            columnaIntento = columnaOrigen + sentidoColumna[i];
            casillaIntento = filaIntento.toString() + columnaIntento.toString();

            if (validarCasilla(casillaIntento)) {

                // Si es azul y se intenta mover hacia arriba, o si es roja y se intenta mover hacia abajo, o si es una ficha coronada
                if ((color == "a" && sentidoFila[i] == -1) || (color == "r" && sentidoFila[i] == 1) || (id.substr(3, 1) == "c")) {

                    if (casillaEstaDisponible(casillaIntento)) {
                        if(laFichaVieneDeMatar == false){
                            document.getElementById(casillaIntento).style.background = "green";
                        }
                    }
                    else {

                        // Si el movimiento lo tapa una ficha enemiga
                        if (tablero[filaIntento][columnaIntento].substr(0, 1) != color) {

                            casillaIntento = (filaOrigen + (2 * sentidoFila[i])).toString() + (columnaOrigen + (2 * sentidoColumna[i])).toString();

                            if (validarCasilla(casillaIntento)) {
                                if (casillaEstaDisponible(casillaIntento)) {
                                    document.getElementById(casillaIntento).style.background = "lime";
                                    casillaFichaEnMedio = (filaOrigen + (1 * sentidoFila[i])).toString() + (columnaOrigen + (1 * sentidoColumna[i])).toString();

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function repintarTablero() { // Devuelve los colores originales al tablero

    for (var i = 0; i < 8; i++) {

        for (var j = 0; j < 8; j++) {

            if ((i + j) % 2 == 0) {
                document.getElementById(i.toString() + j.toString()).style.background = "white";

            }
            else {

                document.getElementById(i.toString() + j.toString()).style.background = "black";

            }
        }
    }
}

function dibujarFicha(f, c, color, num) { // Dibuja una ficha con una posición e ID específicos

    var celda = f.toString() + c.toString();

    switch (color) {
        case "rojo":
            if (num.substr(3, 1) == "c") {

                document.getElementById(celda).innerHTML += '<div id="' + num + '" class = "fichaRoja" > <img src="img/rojoCorona.png" alt="ficha roja" onclick="clickFicha(' + num + ')"></div>';
            }
            else {

                document.getElementById(celda).innerHTML += '<div id="' + num + '" class = "fichaRoja" > <img src="img/rojo.png" alt="ficha roja" onclick="clickFicha(' + num + ')"></div>';
            }
            break;

        case "azul":
            if (num.substr(3, 1) == "c") {


                document.getElementById(celda).innerHTML += '<div id="' + num + '" class = "fichaAzul" > <img src="img/azulCorona.png" alt="ficha azul" onclick="clickFicha(' + num + ')"></div>';

            }
            else {

                document.getElementById(celda).innerHTML += '<div id="' + num + '" class = "fichaAzul" > <img src="img/azul.png" alt="ficha azul" onclick="clickFicha(' + num + ')"></div>';
            }
            break;
    }
}

function eliminarFicha(idFicha) { // Elimina una ficha, ideal para la ficha que se mueve
    var casilla = document.getElementById(idFicha);
    var padre = casilla.parentNode;
    padre.removeChild(casilla);

    var posFicha = posicion(idFicha);
    var fvieja = posFicha.substr(0, 1);
    var cvieja = posFicha.substr(1, 1);
    tablero[fvieja][cvieja] = undefined;
}

function eliminarFichaPos(casilla) { // Elimina una ficha, ideal para la ficha que se mata
    var casillaElemento = document.getElementById(casilla).firstChild;
    var padre = casillaElemento.parentNode;
    padre.removeChild(casillaElemento);


    var fvieja = casilla.substr(0, 1);
    var cvieja = casilla.substr(1, 1);
    tablero[fvieja][cvieja] = undefined;

    var fichasRestantesAzul = document.getElementsByClassName("fichaAzul").length;
    var fichasRestantesRojo = document.getElementsByClassName("fichaRoja").length;

    if (fichasRestantesAzul == 0) {
        alert("Las fichas rojas han ganado!");
        location.reload();
    }

    if (fichasRestantesRojo == 0) {
        alert("Las fichas azules han ganado!");
        location.reload();
    }
}

function moverFicha(idFicha, f, c) { // Mueve una ficha hacia una posición determinada

    eliminarFicha(idFicha);




    if (idFicha.substr(0, 1) == "r") {
        var color = "rojo";
    }
    else {
        var color = "azul";
    }


    dibujarFicha(f, c, color, idFicha);
    repintarTablero();

    if ((f == 0 && color == "azul" && (idFicha.substr(3, 1) != "c"))) {
        document.getElementById(idFicha).innerHTML = '<img src="img/azulCorona.png" alt="ficha azul" onclick="clickFicha(' + idFicha + "c" + ')"></img>';
        document.getElementById(idFicha).id = idFicha + "c";
        idFicha = idFicha + "c";

    }

    if ((f == 7 && color == "rojo" && (idFicha.substr(3, 1) != "c"))) {
        document.getElementById(idFicha).innerHTML = '<img src="img/rojoCorona.png" alt="ficha roja" onclick="clickFicha(' + idFicha + "c" + ')"></img>';
        document.getElementById(idFicha).id = idFicha + "c";
        idFicha = idFicha + "c";
    }

    tablero[f][c] = idFicha;

}

dibujarTablero();