//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;
//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;
//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
//variáveis da cpu
let xRaqueteCpu = 585;
let yRaqueteCpu = 150;
let velocidadeyCpu;
let colidiu = false;
let chanceDeErrar = 0;
let raqueteComprimento = 10;
let raqueteAltura = 90;
//variáveis dos pontos
let pontosJogador = 0;
let pontosCpu = 0;
//variáveis dos sons
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0); //1 - Desenha o background
    mostraBolinha(); // 2 - Desenha a bolinha
    movimentaBolinha(); // 3 - Movimenta a Bolinha
    verificaColisao(); // 4 - Verifica colisão da bolinha
    mostraRaquete(); // 5 - Desenha a raquente
    movimentaMinhaRaquete(); // 6 - Movimenta a raquete
    verificaColisaoRaquete(xRaquete,yRaquete); // 7 - Verifica colisao raquete
    mostraRaqueteCpu();
    movimentoCpu();
    verificaColisaoRaquete(xRaqueteCpu,yRaqueteCpu);
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
    calculaChanceDeErrar();
    // 8- Volta para o início da função draw()
}

function mostraBolinha(){
    circle(xBolinha,yBolinha,diametro)
}

function movimentaBolinha(){
    xBolinha += velocidadexBolinha
    yBolinha += velocidadeyBolinha
}

function verificaColisao(){
    if (xBolinha + raio > width || xBolinha - raio < 0 ){
        velocidadexBolinha *= -1;
    }

    if(yBolinha + raio > height || yBolinha - raio < 0 ){
        velocidadeyBolinha *= -1
    }
}

function mostraRaquete() {
    rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
}

function mostraRaqueteCpu() {
    rect(xRaqueteCpu, yRaqueteCpu, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadexBolinha *= -1;
        raquetada.play();
    }

}

function movimentoCpu(){
    velocidadeyCpu = yBolinha - yRaqueteCpu - raqueteComprimento /2 - 30;
    yRaqueteCpu += velocidadeyCpu
}

function incluiPlacar() {
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(pontosJogador, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosCpu, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        pontosJogador += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosCpu += 1;
        ponto.play();
    }
}

function movimentaRaqueteOponente(){
    velocidadeyCpu = yBolinha -yRaqueteCpu - raqueteComprimento / 2 - 30;
    yRaqueteCpu += velocidadeyCpu + chanceDeErrar
    calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
    if (pontosCpu >= pontosJogador) {
        chanceDeErrar += 1
        if (chanceDeErrar >= 39){
            chanceDeErrar = 40
        }
    } else {
        chanceDeErrar -= 1
        if (chanceDeErrar <= 35){
            chanceDeErrar = 35
        }
    }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
        xBolinha = 23
    }
}
