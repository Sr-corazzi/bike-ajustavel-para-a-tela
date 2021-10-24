var caminho,menino,dinheiro,diamantes,joias,espada;
var imgCaminho,imgMenino,imgDinheiro,imgDiamantes,imgJoias,imgEspada;
var flavinDoPneu = 0;
var dinheiroG,diamantesG,joiasG,grupoEspada;

//Estados de jogo
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;

function preload(){
  imgCaminho = loadImage("Road.png");
  imgMenino = loadAnimation("Runner-1.png","Runner-2.png");
  imgDinheiro = loadImage("cash.png");
  imgDiamantes = loadImage("diamonds.png");
  imgJoias = loadImage("jwell.png");
  imgEspada = loadImage("sword.png");
  imgFim =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// movendo o plano de fundo
caminho=createSprite(width/2,height/2);
caminho.addImage(imgCaminho);
caminho.velocityY = 5;
caminho.scale=windowWidth/500

//criando o menino correndo
menino = createSprite(70,height-50,20,20);
menino.addAnimation("SahilRunning",imgMenino);
menino.scale=0.08;
  
  
dinheiroG=new Group();
diamantesG=new Group();
joiasG=new Group();
grupoEspada=new Group();

}

function draw() {

  if(estadoJogo===JOGAR){
  background(0);
  menino.x = World.mouseX;
  
  edges= createEdgeSprites();
  menino.collide(edges);
  
  //código para resetar o plano de fundo
  if(caminho.y > 400 ){
    caminho.y = height/(height/125);
  }
  
    criarDinheiro();
    criarDiamantes();
    criarJoias();
    criarEspadas();

    if (dinheiroG.isTouching(menino)) {
      dinheiroG.destroyEach();
      flavinDoPneu=flavinDoPneu+5;
    }
    else if (diamantesG.isTouching(menino)) {
      diamantesG.destroyEach();
   flavinDoPneu = flavinDoPneu+10;
      
    }else if(joiasG.isTouching(menino)) {
      joiasG.destroyEach();
 flavinDoPneu = flavinDoPneu + 1;
      
    }else{
      if(grupoEspada.isTouching(menino)) {
estadoJogo = ENCERRAR;
    }
  }
  
    
  if(estadoJogo == ENCERRAR){
  caminho.setVelocity(0,0);
   menino.setAnimation("gameOver.png");
    text("PERDEMO😳", 200, 200)
  }  
    
    
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouros: "+ flavinDoPneu,150,30);
  }

}

function criarDinheiro() {
  if (World.frameCount % 200 == 0) {
  var dinheiro = createSprite(Math.round(random(50, 350),40, 10, 10));
  dinheiro.addImage(imgDinheiro);
  dinheiro.scale=0.12;
  dinheiro.velocityY = 3;
  dinheiro.lifetime = height/2;
  dinheiroG.add(dinheiro);
  }
}

function criarDiamantes() {
  if (World.frameCount % 320 == 0) {
  var diamantes = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamantes.addImage(imgDiamantes);
  diamantes.scale=0.03;
  diamantes.velocityY = 3;
  diamantes.lifetime = height/2;
  diamantesG.add(diamantes);
}
}

function criarJoias() {
  if (World.frameCount % 410 == 0) {
  var joias = createSprite(Math.round(random(50, 350),40, 10, 10));
  joias.addImage(imgJoias);
  joias.scale=0.13;
  joias.velocityY = 3;
  joias.lifetime = height/2;
  joiasG.add(joias);
    
  }
}

function criarEspadas(){
  if (World.frameCount % 530 == 0) {
  var espada = createSprite(Math.round(random(50, 350),40, 10, 10));
  espada.addImage(imgEspada);
  espada.scale=0.1;
  espada.velocityY = 5;
  espada.lifetime = height/4;
  grupoEspada.add(espada);
  }
}