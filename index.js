{ //Click/Snake game
	var img = 0;
	var imgs = ["flushed","poop","google","poggers","herobrine","pp","old pp","osman"];

	var vel = [0,0];
	var pos = [[0,0]];

	var fPos = [0,0];

	var a = false;
	var s = false;

	var cubes = "";
	var cube = "";

	function cssetup(){
		if (!s) {
		    document.addEventListener('keydown', function(event) {
		        if(event.keyCode == 37) {
		            vel = [-1,0];
		            a=true;
		        }
		        else if(event.keyCode == 38) {
		            vel = [0,-1];
		            a=true;
		        }
		        else if(event.keyCode == 39) {
		            vel = [1,0];
		            a=true;
		        }
		        else if(event.keyCode == 40) {
		            vel = [0,1];
		            a=true;
		        }
		        
		    });
		    
		    nextLevel();
		    setInterval(draw, 200);
		    s=true;
		}
	}
	function nextLevel(){
	    
	    var container = document.querySelector('.container');

	    container.innerHTML = "";
	    for (var i = 0; i < 82; i++){
	        container.innerHTML += '<div class="color"></div>';
	    }
	    
	    cubes = document.querySelectorAll('.color');
	    var r = Math.floor(Math.random() * (cubes.length-1));
	    pos = [];
	    pos[0] = [r%9,Math.floor(r/9)];
	    cube = cubes[r];
	    cube.addEventListener('click', function(){
	        nextLevel();
	    });
	    cubes[cubes.length-1].addEventListener('click', function(){
	        next();
	    });
	    
	    vel = [0,0];
	    a=false;

	    newFPos();
	    draw();
	}
	function next() {img = (img + 1) % imgs.length; nextLevel()}

	function draw() {
	    for (let i = 0; i < cubes.length-1; i++) {
	        cubes[i].style="background-image: url('images/" + imgs[img] + ".png');background-size: 50px 50px;";
	    }
	    if (pos[0][0]<0||pos[0][0]>9||pos[0][1]<0||pos[0][1]>9) { 
	        nextLevel();
	    }
	    for (let i = 1; i < pos.length; i++) {
	        if (pos[0][0] == pos[i][0] && pos[0][1] == pos[i][1]) {
	            nextLevel();
	        }
	    }
	    isOcc(fPos,true);
	    
	    var bajs = pos.splice(0).reverse();
	    for (let i = 0; i < bajs.length; i++) {
	        if (i!=bajs.length-1)
	            bajs[i] = aCopy(bajs[i+1]);
	    }
	    pos = bajs.splice(0).reverse();
	    pos[0][0]+=vel[0];
	    pos[0][1]+=vel[1];
	    
	    cubes[cubes.length-1].style="background-image: url('images/me.png');background-size: 490px 50px;width: 490px;-webkit-filter: invert(1);filter: invert(1);";
	    cube = cubes[Math.abs(pos[0][0]+pos[0][1]*9)%81];
	    cube.style="background-image: url('images/" + imgs[img] + ".png');-webkit-filter: invert(1);filter: invert(1);background-size: 50px 50px;";
	    if (a) {
	        cube = cubes[Math.abs(fPos[0]+fPos[1]*9)%81];
	        cube.style="background-image: url('images/me.png');-webkit-filter: invert(1);filter: invert(1);background-size: 50px 50px;";
	    }
	    pos.forEach(p=>{
	        cube = cubes[Math.abs(p[0]+p[1]*9)];
	        cube.style="background-image: url('images/" + imgs[img] + ".png');-webkit-filter: invert(1);filter: invert(1);background-size: 50px 50px;";
	    });
	}
	function isOcc(os,change){
	    pos.forEach(p=>{
	        if (p[0]==os[0]&&p[1]==os[1]) {
	            if(change) {
	                newFPos();
	                pos.push(aCopy([pos[pos.length-1]]));
	            }
	            return true;
	        }
	    });
	    return false;
	}
	function newFPos() {
	    fPos[0] = Math.floor(Math.random() * 9);
	    fPos[1] = Math.floor(Math.random() * 9);
	}
	function aCopy(a) {
	    return [a[0],a[1]];
	}
}