var ghost, ghostImage
var tower, towerImage
var door, doorImage, doorsGroup, climber, climberImage, climberGroup
var invisibleGround, invisibleGroundGroup
var gameState = "play"
var spookySound


function preload(){
  ghostImage = loadImage("ghost-standing.png")
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleGroundGroup = new Group();
  
  spookySound = loadSound("spooky.wav")
  
  
}


function setup(){
  createCanvas(400, 600)
  
  tower = createSprite(200, 300, 400, 600)
  tower.addImage("towerImage", towerImage)
  tower.scale = 0.7
  tower.velocityY = 6
  
  ghost = createSprite(200, 300, 20, 20)
  ghost.addImage("ghostImage", ghostImage)
  ghost.scale = 0.4
  
  

  

}

function draw(){
  background("white")
  
  if (tower.y > 400) {
    tower.y = 300
  }
  
  if (gameState === "play") {
    if (keyDown("space")){
    ghost.velocityY = -10
  }
  ghost.velocityY = ghost.velocityY + 0.6
    spookySound.loop();
  
  if (keyDown("left_arrow")) {
    ghost.x = ghost.x - 3
  }
    if (keyDown("right_arrow")) {
    ghost.x = ghost.x + 3
  }
  
  if (ghost.isTouching(climberGroup)) {
    ghost.velocityY = 0
  }
  if (ghost.isTouching(invisibleGroundGroup) || tower.y > 600){
    ghost.destroy();
    gameState = "end"
  }
  
  
  spawnDoors();
  }
  if (gameState === "end") {
  tower.velocityY = 0
  doorsGroup.setVelocityYEach(0)
  climberGroup.setVelocityYEach(0)
  text("gameOver", 190, 300)
  }
  
  
  
  drawSprites()
}

function spawnDoors(){
  if (frameCount%100 === 0){
  door = createSprite(100, 0, 20, 20)
    door.x = Math.round(random(100, 300))
  door.addImage("doorImage", doorImage)
  door.scale = 0.8
  door.velocityY = 6
  doorsGroup.add(door)
  door.lifetime = 610
    
  climber = createSprite(100, 45, 20, 20)
    climber.x = door.x
    climber.addImage("climberImage", climberImage)
    climber.velocityY = 6
    climberGroup.add(climber)
    climber.lifetime = 610
    climber.scale = 0.5
    
  invisibleGround = createSprite(100, 55, 50, 2)  
  invisibleGround.x = door.x
  invisibleGround.velocityY = 6
  invisibleGroundGroup.add(invisibleGround)
  invisibleGround.lifetime = 610
  invisibleGround.visible = false
  
  ghost.depth = door.depth                  
  ghost.depth = ghost.depth + 1
 }
  
  
}