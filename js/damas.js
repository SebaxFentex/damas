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

function posicion(idFicha){
    for (let f = 0; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            if (tablero[f][c] == idFicha) {
                return f.toString() + c.toString();
            }
        }
    }
}

function casillaEstaDisponible(casilla){
    var f = casilla.substr(0,1);
    var c = casilla.substr(1,1);
    if((tablero[f][c]) == undefined){
        return true;
    }
    else{
        return false;
    }
    
}

function clickFichaRoja(idFicha){
    repintarTablero();
    var id = idFicha.id;
    fichaSeleccionada = id;
    var pos = posicion(id);
    var f = pos.substr(0,1);
    var c = pos.substr(1,1);

    var movDer = ((parseInt(f) + 1).toString() + ((parseInt(c) + 1)).toString());
    var movIzq = ((parseInt(f) + 1).toString() + ((parseInt(c) - 1)).toString());
    if(f < 7){
        if(c == 0){
            if(casillaEstaDisponible(movDer)){
                document.getElementById(movDer).style.background = "green";
            }
            
        }
        else if(c == 7){
            if(casillaEstaDisponible(movIzq)){
                document.getElementById(movIzq).style.background = "green";
            }
        }
        else{
            if(casillaEstaDisponible(movDer)){
                document.getElementById(movDer).style.background = "green";
            }
            if(casillaEstaDisponible(movIzq)){
                document.getElementById(movIzq).style.background = "green";
            }
        }
    }
}

function intentarMovimiento(casilla){
    if(document.getElementById(casilla).style.background == "green"){
        moverFicha(fichaSeleccionada,casilla.toString().substr(0,1), casilla.toString().substr(1,1));
        
    }
}

function clickFichaAzul(idFicha){
    repintarTablero();
    var id = idFicha.id;
    fichaSeleccionada = id;
    var pos = posicion(id);
    var f = pos.substr(0,1);
    var c = pos.substr(1,1);

    var movDer = ((parseInt(f) - 1).toString() + ((parseInt(c) + 1)).toString());
    var movIzq = ((parseInt(f) - 1).toString() + ((parseInt(c) - 1)).toString());

    if(f > 1){
        if(c == 0){
            if(casillaEstaDisponible(movDer)){
                document.getElementById(movDer).style.background = "green";
            }
        }
        else if(c == 7){
            if(casillaEstaDisponible(movIzq)){
                document.getElementById(movIzq).style.background = "green";
            }
        }
        else{
            if(casillaEstaDisponible(movDer)){
                document.getElementById(movDer).style.background = "green";
            }
            if(casillaEstaDisponible(movIzq)){
                document.getElementById(movIzq).style.background = "green";
            }
        }
    }
}



function repintarTablero(){
    
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
            '<div id="' + num + '" class = "ficha" > <img src="img/rojo.png" alt="ficha roja" onclick="clickFichaRoja(' + num + ')"></div>';
            break;

        case "azul":
            document.getElementById(celda).innerHTML +=
            '<div id="' + num + '" class = "ficha"> <img src="img/azul.png" alt="ficha azul" onclick="clickFichaAzul(' + num + ')"></div>';
            break;
    }
}

function eliminarFicha(idFicha){
    var casilla = document.getElementById(idFicha);
    var padre = casilla.parentNode;
    padre.removeChild(casilla);
}

function moverFicha(idFicha, f, c){
    
    eliminarFicha(idFicha);

    var posFicha = posicion(idFicha);
    var fvieja = posFicha.substr(0,1);
    var cvieja = posFicha.substr(1,1);
    tablero[fvieja][cvieja] = undefined;

    if(idFicha.substr(0,1) == "r"){
        var color = "rojo";
    }
    else{
        var color = "azul";
    }

    dibujarFicha(f, c, color, idFicha);
    tablero[f][c] = idFicha;
    repintarTablero();
}

function dibujarTablero() {

    var casilla = '';

    document.getElementById("Ajedrez").innerHTML += '<tbody id="tbody"></tbody>';

    for (var i = 0; i < 8; i++) {
        
        document.getElementById("tbody").innerHTML += '<tr id="fila' + (i.toString()) + '"></tr>';
        console.log(document.getElementById("fila0"));

        for (var j = 0; j < 8; j++) {

            casilla = i.toString() + j.toString();

            if ((i + j) % 2 == 0) {

                console.log(("fila" + i.toString()));
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