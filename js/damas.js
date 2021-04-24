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
    console.log(pos);
    var f = pos.substr(0,1);
    console.log("f:" + f);
    var c = pos.substr(1,1);
    console.log("c:" + c);

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
                console.log((casillaEstaDisponible(movDer)));
                document.getElementById(movDer).style.background = "green";
            }
            if(casillaEstaDisponible(movIzq)){
                console.log((casillaEstaDisponible(movIzq)));
                document.getElementById(movIzq).style.background = "green";
            }
        }
    }
}

function intentarMovimiento(casilla){
    if(document.getElementById(casilla).style.background == "green"){
        console.log("mover ficha: id:" + fichaSeleccionada + " fila: " + casilla.toString().substr(0,1) + " col: " + casilla.toString().substr(1,1));
        moverFicha(fichaSeleccionada,casilla.toString().substr(0,1), casilla.toString().substr(1,1));
        
    }
}

function clickFichaAzul(idFicha){
    repintarTablero();
    var id = idFicha.id;
    fichaSeleccionada = id;
    var pos = posicion(id);
    console.log(pos);
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
            '<div id="' + num + '" style="height:100%; width:100%"> <img src="img/rojo.png" alt="ficha roja" style= "margin-left:10%; margin-top:10%;" onclick="clickFichaRoja(' + num + ')"></div>';
            break;

        case "azul":
            document.getElementById(celda).innerHTML +=
            '<div id="' + num + '" style="height:100%; width:100%"> <img src="img/azul.png" alt="ficha azul" style= "margin-left:10%; margin-top:10%;" onclick="clickFichaAzul(' + num + ')"></div>';
            break;
    }
}

function eliminarFicha(idFicha){
    console.log("id en eliminar: " + idFicha);
    var casilla = document.getElementById(idFicha);
    var padre = casilla.parentNode;
    padre.removeChild(casilla);
}

function moverFicha(idFicha, f, c){
    
    console.log("id en mover: " + idFicha);
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

function esconderBoton() {
    try {
        document.getElementById("inicio").style.visibility = 'hidden';
    } catch (error) {
        console.log(error);
    }
}

function dibujarTablero() {

    var casilla = '';

    for (var i = 0; i < 8; i++) {

        for (var j = 0; j < 8; j++) {

            casilla = i.toString() + j.toString();

            if ((i + j) % 2 == 0) {

                try {
                    document.getElementById("Ajedrez").innerHTML +=
                        '<div id="' + casilla + '" style="width:100px; height:100px; background-color:white; float:left;" onclick="intentarMovimiento(' + casilla + ')"></div>';
                } catch (error) {
                    console.log(error);
                }

            }
            else {

                try {
                    document.getElementById("Ajedrez").innerHTML +=
                        '<div id="' + casilla + '" style="width:100px; height:100px; background-color:black; float:left;" onclick="intentarMovimiento(' + casilla + ')"></div>';
                } catch (error) {
                    console.log(error);
                }

            }
        }
    }

    esconderBoton();
    llenarMatriz();

}

(() => { console.log("hola"); dibujarTablero() })();
