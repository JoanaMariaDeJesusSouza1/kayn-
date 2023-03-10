var trex, trexRunners, trexCollide;
var solo, soloImg, soloInv;
var nuvem, nuvem1, nuvem2, nuvem3, nuvemGp;
var pedraD, pedra, pedra1, pedra2, pedra3, pedra4, pedra5, pedraGp
var play = 1;
var end = 0;
var gameState = play;
var score = 0;
var record = 0;
var gameOver, gameOverImg;
var restart, restartImg;





function preload() {
	trexRunners = loadAnimation("./IMG/trex_2.png", "./IMG/trex_1.png", "./IMG/trex_3.png")
	trexCollide = loadAnimation("./IMG/trex_collided.png")
	soloImg = loadImage("./IMG/ground.png")
	nuvem1 = loadImage("./IMG/cloud.png")
	nuvem2 = loadImage("./IMG/nuvem.png")
	pedra1 = loadImage("./IMG/pedra.png")
	pedra2 = loadImage("./IMG/pedra3.png")
	pedra3 = loadImage("./IMG/pedrap.png")
	pedra4 = loadImage("./IMG/pedra4.png")
	gameOverImg = loadImage("./IMG/gameOver.png")
	restartImg = loadImage("./IMG/restart.png")
}

function setup() {
	createCanvas(800, 400);

	solo = createSprite(400, 430, 800, 2)
	solo.addImage("solo", soloImg)

	soloInv = createSprite(400, 380, 800, 2)
	soloInv.visible = false


	trex = createSprite(50, 360)
	trex.addAnimation("runners", trexRunners)
	trex.addAnimation("collided", trexCollide)
	trex.scale = 0.1

	nuvemGp = new Group()
	pedraGp = new Group()

}


function draw() {
	background("skyblue");

	if (trex.isTouching(pedraGp)) {
		gameState = end
	}

	if (gameState === play) {

		solo.velocityX = -12
		score = score + Math.round(getFrameRate() / 60)

		if (solo.x < 0) {
			solo.x = solo.width / 2
		}

		if (keyDown("space")&& trex.y>100) {
			trex.velocityY = -10
		}

		nuvens()
		pedras()

	}

	if (gameState === end) {
		trex.changeAnimation("collided", trexCollide);
		solo.velocityX = 0
		nuvemGp.setVelocityXEach(0)
		pedraGp.setVelocityXEach(0)
		nuvemGp.setLifetimeEach(-1)
		pedraGp.setLifetimeEach(-1)

		if (record < score) {
			record = score
		}

	}

	trex.velocityY += 0.5


	fill("white")
	stroke("white")
	//	textAlign(CENTER,TOP)
	textSize(25)
	text("Pontos: " + score, 600, 30)
	text("Recorde: " + record, 600, 60)

	trex.collide(soloInv)

	drawSprites();
	text("X: " + mouseX + " / Y: " + mouseY, mouseX, mouseY);
}

function nuvens() {
	if (frameCount % 65 == 0) {
		nuvem = createSprite(800, random(50, 190), 40, 10)
		nuvem.velocityX = -5
		nuvem.lifetime = width / nuvem.velocityX
		nuvem.depth = trex.depth - 1
		nuvemGp.add(nuvem)

		var sorteio = Math.round(random(1, 2))
		switch (sorteio) {
			case 1: nuvem.addImage("nuvem1", nuvem1)
				nuvem.scale = random(0.5, 1.4)
				break;
			case 2: nuvem.addImage("nuvem2", nuvem2)
				nuvem.scale = random(0.5, 1)
				break;
		}
	}
}

function pedras() {

	if (frameCount % 100 == 0) {
		pedra = createSprite(800, 330, 40, 10)
		pedra.velocityX = -10
		pedra.lifetime = width / pedra.velocityX
		pedra.depth = trex.depth - 1
		pedraGp.add(pedra)

		var sorteio = Math.round(random(1, 4))
		switch (sorteio) {
			case 1: pedra.addImage("pedra1", pedra1)
				pedra.scale = 0.5
				pedra.debug = false
				pedra.setCollider("rectangle", 0, 0, 50, 50)
				break;
			case 2: pedra.addImage("pedra2", pedra2)
				pedra.scale = 1
				pedra.position.y = 320
				pedra.debug = false
				pedra.setCollider("rectangle", 0, 0, 50, 50)
				break;
			case 3: pedra.addImage("pedra3", pedra3) 
				pedra.scale = 1
				pedra.debug = false
				pedra.setCollider("rectangle", 0, 0, 25, 25)
				break;
			case 4: pedra.addImage("pedra4", pedra4)
				pedra.scale = 1.5
				pedra.position.y = 280
				pedra.debug = false
				pedra.setCollider("rectangle", 0, 50, 50, 50)


				break;




		}
	}
}