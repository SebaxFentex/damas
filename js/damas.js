var fichaSeleccionada;
var casillaFichaEnMedio = '';
var turnoRojo = true;

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
    console.log(tablero);
}

function posicion(idFicha) { // RETORNA LA POSICION EN FORMA DE COORDENADAS DE UNA FICHA A PARTIR DE SU ID
    //idFicha = idFicha.substr(0,3);
    console.log("idFicha dentro de posicion:" + idFicha);
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
        //turnoRojo = !turnoRojo;
        clickFicha(document.getElementById(casilla.toString().substr(0, 1) + casilla.toString().substr(1, 1)).firstChild);
        
        var lista = (document.querySelectorAll("td"));
        var sePuedeMover = false;
        for(let elemento of lista){
            if(elemento.style.background == "lime"){
                sePuedeMover = true;
                turnoRojo = !turnoRojo;
            }
        }

        if(!sePuedeMover){
            turnoRojo = !turnoRojo;
        }
    }
}

function clickFicha(idFicha) { // FUNCION DE MOVIMIENTO PRINCIPAL, RECIBE UNA FICHA Y COMPRUEBA DONDE SE PUEDE MOVER, EN CUYO CASO PINTA LA(S) CASILLA(S) DE VERDE

    repintarTablero();

    var id = idFicha.id;
    fichaSeleccionada = id;
    var pos = posicion(id);
    console.log("pos:" + pos);
    console.log(tablero);

    var f = pos.substr(0, 1);
    var c = pos.substr(1, 1);

    f = parseInt(f);
    c = parseInt(c);

    var columnaFichaEnemigaDerecha = c + 1;
    var columnaFichaEnemigaIzquierda = c - 1;

    var colMovSimpleDer = (c + 1).toString();
    var colMovSimpleIzq = (c - 1).toString();

    var colMovDobleDer = (c + 2).toString();
    var colMovDobleIzq = (c - 2).toString();

    var turno;
    turnoRojo ? turno = "r" : turno = "a";

    if (id.substr(0, 1) == turno) {

        if (idFicha.id.substr(3, 1) == "c") { // SI LA FICHA ESTÁ CORONADA

            try {
                var arribaIzqSimple = (f - 1).toString() + (c - 1).toString();
                if (casillaEstaDisponible(arribaIzqSimple)) {
                    document.getElementById(arribaIzqSimple).style.background = "green";
                }
                else {
                    try {
                        if (tablero[f - 1][c - 1].substr(0, 1) != idFicha.id.substr(0, 1)) {
                            try {
                                var arribaIzqDoble = (f - 2).toString() + (c - 2).toString();
                                if (casillaEstaDisponible(arribaIzqDoble)) {
                                    document.getElementById(arribaIzqDoble).style.background = "lime";
                                    casillaFichaEnMedio = arribaIzqSimple;
                                }
                            } catch (error) {

                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            try {
                var arribaDerSimple = (f - 1).toString() + (c + 1).toString();
                if (casillaEstaDisponible(arribaDerSimple)) {
                    document.getElementById(arribaDerSimple).style.background = "green";
                }
                else {
                    try {
                        if (tablero[f - 1][c + 1].substr(0, 1) != idFicha.id.substr(0, 1)) {
                            try {
                                var arribaDerDoble = (f - 2).toString() + (c + 2).toString();
                                if (casillaEstaDisponible(arribaDerDoble)) {
                                    document.getElementById(arribaDerDoble).style.background = "lime";
                                    casillaFichaEnMedio = arribaDerSimple;
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            try {
                var abajoDerSimple = (f + 1).toString() + (c + 1).toString();
                if (casillaEstaDisponible(abajoDerSimple)) {
                    document.getElementById(abajoDerSimple).style.background = "green";
                }
                else {
                    try {
                        if (tablero[f + 1][c + 1].substr(0, 1) != idFicha.id.substr(0, 1)) {
                            try {
                                var abajoDerDoble = (f + 2).toString() + (c + 2).toString();
                                if (casillaEstaDisponible(abajoDerDoble)) {
                                    document.getElementById(abajoDerDoble).style.background = "lime";
                                    casillaFichaEnMedio = abajoDerSimple;
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            try {
                var abajoIzqSimple = (f + 1).toString() + (c - 1).toString();
                if (casillaEstaDisponible(abajoIzqSimple)) {
                    document.getElementById(abajoIzqSimple).style.background = "green";
                }
                else {
                    try {
                        if (tablero[f + 1][c - 1].substr(0, 1) != idFicha.id.substr(0, 1)) {
                            try {
                                var abajoIzqDoble = (f + 2).toString() + (c - 2).toString();
                                if (casillaEstaDisponible(abajoIzqDoble)) {
                                    document.getElementById(abajoIzqDoble).style.background = "lime";
                                    casillaFichaEnMedio = abajoIzqSimple;
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }


        switch (id.substr(0, 1)) {
            case "a": // LAS AZULES SE MUEVEN HACIA ARRIBA

                var filaMovSimple = (f - 1).toString();
                var filaMovDoble = (f - 2).toString();

                var filaFichaEnemiga = f - 1;
                var colorFichaEnemiga = "r";
                break;
            case "r": // LAS ROJAS SE MUEVEN HACIA ABAJO

                var filaMovSimple = (f + 1).toString();
                var filaMovDoble = (f + 2).toString();

                var filaFichaEnemiga = f + 1;
                var colorFichaEnemiga = "a";
        }

        var movDer = (filaMovSimple + colMovSimpleDer);
        var movIzq = (filaMovSimple + colMovSimpleIzq);

        var movDobleDer = (filaMovDoble + colMovDobleDer);
        var movDobleIzq = (filaMovDoble + colMovDobleIzq);

        try {
            if (casillaEstaDisponible(movDer)) {
                document.getElementById(movDer).style.background = "green";
            }
            else {
                try {
                    if (tablero[filaFichaEnemiga][columnaFichaEnemigaDerecha].substr(0, 1) == colorFichaEnemiga) {
                        try {
                            if (casillaEstaDisponible(movDobleDer)) {
                                document.getElementById(movDobleDer).style.background = "lime";
                                casillaFichaEnMedio = movDer;
                            }
                        } catch {
                        }
                    }
                } catch {
                }
            }

            if (casillaEstaDisponible(movIzq)) {
                document.getElementById(movIzq).style.background = "green";
            }
            else {
                try {
                    if (tablero[filaFichaEnemiga][columnaFichaEnemigaIzquierda].substr(0, 1) == colorFichaEnemiga) {
                        try {
                            if (casillaEstaDisponible(movDobleIzq)) {
                                document.getElementById(movDobleIzq).style.background = "lime";
                                casillaFichaEnMedio = movIzq;
                            }
                        } catch {
                        }
                    }
                } catch {
                }
            }
        }
        catch {
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

    console.log("Quedan " + fichasRestantesAzul + " fichas azules");
    console.log("Quedan " + fichasRestantesRojo + " fichas rojas");

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
    console.log(idFicha);


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