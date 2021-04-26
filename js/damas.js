var fichaSeleccionada;
var tablero = new Array(8);

for (let c = 0; c < 8; c++) {
    tablero[c] = new Array(8);
}

function llenarMatriz() {
    var i = 1;
    for (let f = 0; f < 3; f++) {
        for (let c = 0; c < 8; c++) {
            if (((c + f) % 2) == 1) {
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
                dibujarFicha(f, c, "azul", "a" + i);
                tablero[f][c] = "a" + i;
                i++;
            }
        }
    }
    console.log(tablero);
}

function posicion(idFicha) {
    for (let f = 0; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            if (tablero[f][c] == idFicha) {
                return f.toString() + c.toString();
            }
        }
    }
}

function casillaEstaDisponible(casilla) {
    var f = casilla.substr(0, 1);
    var c = casilla.substr(1, 1);
    if ((tablero[f][c]) == undefined && (c >= 0 && c < 8)) {
        return true;
    }
    else {
        return false;
    }

}

function intentarMovimiento(casilla) {

    if (parseInt(casilla) < 10) casilla = "0" + casilla;
    
    if (document.getElementById(casilla).style.background == "green") {
        moverFicha(fichaSeleccionada, casilla.toString().substr(0, 1), casilla.toString().substr(1, 1));
    }

}

function clickFicha(idFicha) {

    repintarTablero();

    var id = idFicha.id;
    fichaSeleccionada = id;
    var pos = posicion(id);

    var f = pos.substr(0, 1);
    var c = pos.substr(1, 1);

    f = parseInt(f);
    c = parseInt(c);

    var columnaFichaEnemigaDerecha = c + 1;
    var columnaFichaEnemigaIzquierda = c - 1;

    switch (id.substr(0, 1)) {
        case "a":
            var movDer = ((parseInt(f) - 1).toString() + ((parseInt(c) + 1)).toString());
            var movIzq = ((parseInt(f) - 1).toString() + ((parseInt(c) - 1)).toString());

            var movDobleDer = ((parseInt(f) - 2).toString() + ((parseInt(c) + 2)).toString());
            var movDobleIzq = ((parseInt(f) - 2).toString() + ((parseInt(c) - 2)).toString());

            var filaFichaEnemiga = f - 1;

            var colorFichaEnemiga = "r";
            break;
        case "r":
            var movDer = ((parseInt(f) + 1).toString() + ((parseInt(c) + 1)).toString());
            var movIzq = ((parseInt(f) + 1).toString() + ((parseInt(c) - 1)).toString());

            var movDobleDer = ((parseInt(f) + 2).toString() + ((parseInt(c) + 2)).toString());
            var movDobleIzq = ((parseInt(f) + 2).toString() + ((parseInt(c) - 2)).toString());

            var filaFichaEnemiga = f + 1;

            var colorFichaEnemiga = "a";
    }

    try {
        if (casillaEstaDisponible(movDer)) {
            document.getElementById(movDer).style.background = "green";
        }
        else if (tablero[filaFichaEnemiga][columnaFichaEnemigaDerecha].substr(0, 1) == colorFichaEnemiga) {
            if (casillaEstaDisponible(movDobleDer)) {
                document.getElementById(movDobleDer).style.background = "green";
            }
        }
    }
    catch {
        console.log("La ficha no se puede mover a la derecha");
    }

    try {
        if (casillaEstaDisponible(movIzq)) {
            document.getElementById(movIzq).style.background = "green";
        }
        else if (tablero[filaFichaEnemiga][columnaFichaEnemigaIzquierda].substr(0, 1) == colorFichaEnemiga) {
            if (casillaEstaDisponible(movDobleIzq)) {
                document.getElementById(movDobleIzq).style.background = "green";
            }
        }
    }
    catch {
        console.log("La ficha no se puede mover a la izquierda");
    }
}



function repintarTablero() {

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

function dibujarFicha(f, c, color, num) {
    var celda = f.toString() + c.toString();

    switch (color) {
        case "rojo":
            document.getElementById(celda).innerHTML +=
                '<div id="' + num + '" class = "fichaRoja" > <img src="img/rojo.png" alt="ficha roja" onclick="clickFicha(' + num + ')"></div>';
            break;

        case "azul":
            document.getElementById(celda).innerHTML +=
                '<div id="' + num + '" class = "fichaAzul"> <img src="img/azul.png" alt="ficha azul" onclick="clickFicha(' + num + ')"></div>';
            break;
    }
}

function eliminarFicha(idFicha) {
    var casilla = document.getElementById(idFicha);
    var padre = casilla.parentNode;
    padre.removeChild(casilla);
}

function moverFicha(idFicha, f, c) {

    eliminarFicha(idFicha);

    var posFicha = posicion(idFicha);
    var fvieja = posFicha.substr(0, 1);
    var cvieja = posFicha.substr(1, 1);
    tablero[fvieja][cvieja] = undefined;

    if (idFicha.substr(0, 1) == "r") {
        var color = "rojo";
    }
    else {
        var color = "azul";
    }

    dibujarFicha(f, c, color, idFicha);
    tablero[f][c] = idFicha;
    repintarTablero();

    console.log("Ficha " + idFicha + " movida desde [" + fvieja + "," + cvieja + "] hasta [" + f + "," + c + "].");
}

function dibujarTablero() {

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