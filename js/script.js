
var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	tip_hippie = $("#tip")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	hippie = new Hippie();
	flowers = [new Flower(), new Flower(),
				   new Flower(), new Flower(),
				   new Flower(), new Flower(), new Flower()];
	
	run();	
	
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		hippie.actualizar('arriba');
	if(event.which==40 || event.which==83)
		hippie.actualizar('abajo');
	if(event.which==39 || event.which==68)
		hippie.actualizar('derecha');
	if(event.which==37 || event.which==65)
		hippie.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		hippie.dibujar(contextoBuffer);
		for(i=0;i<flowers.length;i++){
			flowers[i].dibujar(contextoBuffer);
			flowers[i].actualizar();
			if(hippie.colision(flowers[i].x,flowers[i].y)){
				hippie.sprite = 2;
				hippie.vida--;
				//flowers.splice(i, 1);
				//$('#pierde')[0].play();
			}
		}
		
		if(hippie.vida <= 0)
			jugando = false;
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		hippie.sprite = 3;
		hippie.vida = 0;
		hippie.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}


