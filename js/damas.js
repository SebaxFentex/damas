var fichaSeleccionada;
var casillaFichaEnMedio = '';
var turnoRojo = true;
var laFichaVieneDeMatar = false;

var tablero = new Array(8);

for (let c = 0; c < 8; c++) {
    tablero[c] = new Array(8);
}

function llenarMatriz() { // LLENA LA MATRIZ CON LAS POSICIONES INICIALES DE LAS FICHAS Y LAS DIBUJA EN EL TABLERO
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

function posicion(idFicha) { // RETORNA LA POSICION EN FORMA DE COORDENADAS DE UNA FICHA A PARTIR DE SU ID
    //idFicha = idFicha.substr(0,3);

    for (let f = 0; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            if (tablero[f][c] == idFicha) {
                return f.toString() + c.toString();
            }
        }
    }
}

function casillaEstaDisponible(casilla) { // VERIFICA SI UNA CASILLA ESTÁ VACÍA
    var f = casilla.substr(0, 1);
    var c = casilla.substr(1, 1);
    if ((tablero[f][c]) == undefined && (c >= 0 && c < 8)) {
        return true;
    }
    else {
        return false;
    }

}

function intentarMovimiento(casilla) { // REVISA SI LA CASILLA ES COLOR VERDE, DE SER ASI LLAMA A moverFicha

    if (parseInt(casilla) < 10) casilla = "0" + casilla;

    if (document.getElementById(casilla).style.background == "green") {
        moverFicha(fichaSeleccionada, casilla.toString().substr(0, 1), casilla.toString().substr(1, 1));
        turnoRojo = !turnoRojo;
    }
    else if (document.getElementById(casilla).style.background == "lime") {

        moverFicha(fichaSeleccionada, casilla.toString().substr(0, 1), casilla.toString().substr(1, 1));
        eliminarFichaPos(casillaFichaEnMedio);

        laFichaVieneDeMatar = true;
        clickFicha(document.getElementById(casilla.toString().substr(0, 1) + casilla.toString().substr(1, 1)).firstChild);
        laFichaVieneDeMatar = false;

        var lista = (document.querySelectorAll("td"));
        var sePuedeMover = false;
        for (let elemento of lista) {
            if (elemento.style.background == "lime") {
                sePuedeMover = true;
            }
        }
        if (!sePuedeMover) {
            turnoRojo = !turnoRojo;
        }
    }
}

function validarCasilla(casilla) { // REVISA SI UNA CASILLA ES VALIDA, ES DECIR, SI ESTÁ ENTRE [0,0] Y [7,7]
    var fila = parseInt(casilla.toString().substr(0, 1));
    var columna = parseInt(casilla.toString().substr(1, 1));
    return (((fila - 0) * (fila - 7) <= 0) && ((columna - 0) * (columna - 7) <= 0));
}

function clickFicha(idFicha) { // FUNCION DE MOVIMIENTO PRINCIPAL, RECIBE UNA FICHA Y COMPRUEBA DONDE SE PUEDE MOVER, EN CUYO CASO PINTA LA(S) CASILLA(S) DE VERDE

    repintarTablero();

    var id = idFicha.id;
    fichaSeleccionada = id;
    var color = id.substr(0, 1);

    var turno;
    turnoRojo ? turno = "r" : turno = "a";




    if (color == turno) { // SI LA FICHA A LA QUE SE LE DIO CLICK ESTÁ EN SU TURNO

        // GENERALIZACIÓN DEL MOVIMIENTO -> [0] = AbajoDerecha, [1] = AbajoIzquierda, [2] = ArribaIzquierda, [3] = ArribaDerecha
        var sentidoFila = [1, 1, -1, -1];
        var sentidoColumna = [1, -1, -1, 1];

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

                if ((color == "a" && sentidoFila[i] == -1) || (color == "r" && sentidoFila[i] == 1) || (id.substr(3, 1) == "c")) {

                    if (casillaEstaDisponible(casillaIntento) && laFichaVieneDeMatar == false) {
                        document.getElementById(casillaIntento).style.background = "green";
                    }
                    else {

                        console.log(casillaIntento);
                        if ( casillaEstaDisponible(casillaIntento) == false && (tablero[filaIntento][columnaIntento].substr(0, 1) != color)) {

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

function repintarTablero() { // DEVUELVE LOS COLORES ORIGINALES (BLANCO Y NEGRO) AL TABLERO

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

function dibujarFicha(f, c, color, num) { // DIBUJA UNA FICHA EN UNA POSICION INDICADA Y LE PONE ID

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

function eliminarFicha(idFicha) { // ELIMINA UNA FICHA Y EL DIV QUE LA CONTIENE (NO LA CASILLA)
    var casilla = document.getElementById(idFicha);
    var padre = casilla.parentNode;
    padre.removeChild(casilla);

    var posFicha = posicion(idFicha);
    var fvieja = posFicha.substr(0, 1);
    var cvieja = posFicha.substr(1, 1);
    tablero[fvieja][cvieja] = undefined;
}

function eliminarFichaPos(casilla) { // ELIMINA UNA FICHA CON LA POSICION
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

function moverFicha(idFicha, f, c) { // MUEVE UNA FICHA DE UNA POSICIÓN A OTRA INCLUYENDO SU ID

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

function dibujarTablero() { // DIBUJO INICIAL DEL TABLERO

    var casilla = '';

    document.getElementById("Ajedrez").innerHTML += '<tbody id="tbody"></tbody>';

    for (var i = 0; i < 8; i++) {

        document.getElementById("tbody").innerHTML += '<tr id="fila' + (i.toString()) + '"></tr>';

        for (var j = 0; j < 8; j++) {

            casilla = i.toString() + j.toString();

            if ((i + j) % 2 == 0) {

                document.getElementById("fila" + i.toString()).innerHTML += '<td id="' + casilla + '" class = "casillaBlanca" onclick="intentarMovimiento(' + casilla + ')"></td>';

            }
            else {

                document.getElementById("fila" + i.toString()).innerHTML += '<td id="' + casilla + '" class = "casillaNegra" onclick="intentarMovimiento(' + casilla + ')"></td>';

            }
        }
    }

    llenarMatriz();

}

dibujarTablero();