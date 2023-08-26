function setup() {
    canvas = createCanvas(280, 280);
    background("white")
    canvas.mouseReleased(analizar);
}

function draw() {
    if (mouseIsPressed) {
        if (mouseButton == LEFT) {
            stroke("black");
            strokeWeight(13);
            line(pmouseX, pmouseY, mouseX, mouseY)
        }
        if (mouseButton == RIGHT) {
            stroke("white");
            strokeWeight(23);
            line(pmouseX, pmouseY, mouseX, mouseY)
        }
    }
}
function preload() {
    ia = ml5.imageClassifier("DoodleNet")
}
function analizar() {
    ia.classify(canvas, respuesta);
}

function respuesta(error, resultados) {
    if (!error) {
        console.log(resultados)
        dibujo = resultados[0].label;
        confianza = Math.round(resultados[0].confidence * 100);
        document.getElementById("confianza").innerHTML = confianza + "%";
        fetch("https://api.mymemory.translated.net/get?q=" + dibujo + "&langpair=en|es")
        .then(response => response.json())
        .then(data => {
            traduccion = data.responseData.translatedText;
            document.getElementById("dibujo").innerHTML = traduccion;
            });
    }
}
function borrar(){
    background("white")
}