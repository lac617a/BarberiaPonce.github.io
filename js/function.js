'use strict';

document.addEventListener('DOMContentLoaded', main);


// FUNCION PRINCIPAL 
function main(){

	caroucell();
	my_time();
};

// CIRCULOS
const circle = document.querySelector('.circle');
const circle_i = document.querySelectorAll('.circle i');

// SLIDE DE IMAGENES
const slide = document.querySelector('.slide');
const images = document.querySelectorAll('.slide img');

// BOUTTONS
const btn_prev = document.querySelector('#btn-prev');
const btn_next = document.querySelector('#btn-next');

// COUNTER & TIME
let num = 0, time = 3000;

let size = images[0].clientWidth;


window.addEventListener('resize', ()=>{
	size = images[0].clientWidth;
});

// TIME OF THE CAROUCEL
try {
	var slide_time = setInterval(my_time,time)	
} catch (error) {
	console.log('bug');
}

// FUNCION DEL SLIDE AUTOMATICO
function my_time(){

	try {

		slide.style.transition = 'transform 0.4s ease-in-out';
		num++;
		slide.style.transform = 'translate(' + (-size * num) + 'px)';
		circle_i[num].style.backgroundColor = 'beige';
		circle_i[num-1].style.backgroundColor = '';

		if(num === images.length-1){

			circle_i.item(0).remove();
	
			setTimeout(()=>{
	
				slide.style.transform = 'translate(0px)';
				slide.style.transition = 'transform 0s';
				num = 0
	
			},1500);
		}

		if(circle_i.item(num) === circle_i.item(1)){
	
			circle_i[4].style.backgroundColor = '';		
		}

	} catch (error) {

		console.log('ocurrio un error en la transition')
	}
	
};


// FUNCTION CAROUCELL
function caroucell(){

	let actico_prev = false;
	circle_i[num].style.backgroundColor = 'beige';

	// BOTON GIRAR DERECHA(NEXT)
	btn_next.addEventListener('click',()=>{

		clearInterval(slide_time);

		if(num <= images.length){

			slide.style.transition = 'transform 0.4s ease-in-out';
			num++;
			slide.style.transform = 'translate(' + (-size * num) + 'px)';
			circle_i[num].style.backgroundColor = 'beige';
			circle_i[num-1].style.backgroundColor = '';
		}

		//BUG DEL BACKGROUND FINAL DE LA IMAGEN
		if(circle_i.item(num) === circle_i.item(1)){

			circle_i[4].style.backgroundColor = '';
		}
	});

	// BOTON GIRAR IZQUIERDA(PREV)
	btn_prev.addEventListener('click',()=>{

		if(num >= 0){

			num--;
			slide.style.transform = 'translate(' + (-size * num) + 'px)';
			slide.style.transition = 'transform 0.4s ease-in-out';
			circle_i[num].style.backgroundColor = 'beige';
			circle_i[num+1].style.backgroundColor = '';
		}

		//BUG DEL BACKGROUND FINAL DE LA IMAGEN
		if(images[num].id === 'lastClone' || images[num].id === 'firstClone'){

			actico_prev = true;
		}
	});

	// TRANSITITION EVENT
	slide.addEventListener('transitionend',()=>{

		try {

			// REPETIDOR DE IMAGENES CAROUCELL(NEXT)
			if(images[num].id === 'firstClone'){

				slide.style.transform = 'translate(0px)';
				slide.style.transition = 'transform 0s';
				circle_i.item(0).remove();
				num = 0

			}

		} catch (error) {

			//BUG MAYOR DE LA LONGITUD
			if(num === 6){
				
				slide.style.transform = 'translate(0px)';
				slide.style.transition = 'transform 0s';

				num = 0;
			}
		}

		// REPETIDOR DE IMAGENES CAROUCELL(PREV)
		if(actico_prev){

			if(window.innerWidth >= 1000){
				slide.style.transition = 'transform 0s';
				slide.style.transform = 'translate(-2800px)';
				num = images.length - 1;
				circle_i[num].style.backgroundColor = 'beige';
				actico_prev = false;
			}

			if(window.innerWidth <= 900){

				slide.style.transition = 'transform 0s';
				slide.style.transform = 'translate(-2800px)';
				num = images.length - 1;
				circle_i[num].style.backgroundColor = 'beige';
				actico_prev = false;
			}

			if(window.innerWidth <= 460){

				slide.style.transition = 'transform 0s';
				slide.style.transform = 'translate(-1440px)';
				num = images.length - 1;
				circle_i[num].style.backgroundColor = 'beige';
				actico_prev = false;
			}
		}
	});
};



// SECTION

function section(){

	const currentScroll = document.documentElement.scrollTop;

	// slide de la image section
	const slide2 = document.querySelector('.container-slider');
	const slide3 = document.querySelector('.container-map');


	// scroll down
	document.getElementById('btn-down').addEventListener('click',scrollDown);

	function scrollDown(){

		if(currentScroll >= 0){

			clearInterval(slide_time);

			setTimeout(()=>{

				slide2.style.transition = 'transform 0.4s ease-in-out';
				slide2.style.transform = 'translate(500px)';
			},500)
		
			window.requestAnimationFrame(()=>{

				window.scrollTo({

					top: window.innerHeight,
					behavior: 'smooth'
				});
			});
		}
	};

	// SLIDE DE LA PRIMERA IMAGEN(SECTION)
	var set_esconder = setInterval(()=>{

		if(window.scrollY >= 250 || window.scrollY >= 350){

			slide2.style.transition = 'transform 0.4s ease-in-out';
			slide2.style.transform = 'translate(500px)';
		}
		if(window.scrollY >= window.innerHeight-100){

			clearInterval(set_esconder);
		}
	},1000);

	// SLIDE DE LA SEGUNDA IMAGEN(SECTION)
	var set_esconder2 = setInterval(()=>{

		if(window.scrollY >= 650 || window.scrollY >= 850){

			slide3.style.transition = 'transform 0.4s ease-in-out';
			slide3.style.transform = 'translate(-610px)';
		}
		if(window.scrollY >= window.innerHeight+200){

			clearInterval(set_esconder2);
			clearInterval(slide_time);
		}
	},1000);
}

section();



// MEDIA QUERRY NAVEGATION
function media_navegation(){

	const currentScroll = document.documentElement.scrollTop;

	// slide de la image section
	const slide2 = document.querySelector('.container-slider');

	// METODOS DEL NAV
	const nav_bars = document.querySelector('#nav-bars');
	const nav_ir = document.querySelector('#nav-ir');

	// BOTONES DEL NAV
	const btn_bars = document.querySelector('#btn-bars');
	const btn_bars2 = document.querySelector('#btn-bars2');
	let pass = 0;


	// click barra-navegation
	btn_bars.addEventListener('click',()=>{	
		if(pass === 0){
			nav_bars.style.transition = 'transform .4s ease';
			nav_bars.style.transform = 'translate(0px)';
			btn_bars.style.transition = 'transform 0.3s ease-out';
			btn_bars.style.transform = 'scaleY(0)';
			btn_bars2.style.display = 'flex';
			btn_bars2.style.transition = 'transform 0.4s ease';
			btn_bars2.style.transform = 'scaleY(1.2)';
			pass++;

			for(let i = 0; i < nav_ir.children.length; i++){
				nav_ir.children.item(i).addEventListener('click',()=>{
					btn_bars2.style.transform = 'scale(0)';
					btn_bars2.style.transition = 'transform 0.4s ease-in-out';
					nav_bars.style.transition = 'transform .4s ease';
					btn_bars.style.transform = 'scale(1)';
					nav_bars.style.transform = 'translate(750px)';
					pass = 0;
				});
			}
		}
	});

	btn_bars2.addEventListener('click',()=>{
		if(pass ===1) {
			nav_bars.style.transform = 'translate(750px)';
			btn_bars2.style.transition = 'transform 0.4s ease-in-out';
			btn_bars2.style.transform = 'scaleY(0)';
			btn_bars.style.transition = 'transform 0.4s ease-in-out';
			btn_bars.style.transform = 'scaleY(1)';
			pass = 0;
		}
	});

	
}
media_navegation();



// FUNCTION VER GALERIA

function ver_galeria(){
	const times = document.querySelector('#times');
	const oculto = document.querySelector('#oculto');
	const elegir_fotos = document.getElementById('fotos');
	const container_galeria = document.querySelectorAll('.container-galeria img');
	const img = document.createElement('img');
	let vectorLista = Array();

	vectorLista[0] = 'images/s1.jpg';
	vectorLista[1] = 'images/s2.jpg';
	vectorLista[2] = 'images/s3.jpg';
	vectorLista[3] = 'images/s1.jpg';
	vectorLista[4] = 'images/s2.jpg';
	vectorLista[5] = 'images/s3.jpg';

	for(let contador = 0; contador <= container_galeria.length; contador++){
		container_galeria[contador].addEventListener('click',()=>{

			oculto.classList.add('visto-activo')
			times.style.left = '95%';
			times.style.display = 'block';
			oculto.style.transition = 'transform all .4s ease-in-out';
			oculto.style.transform = 'scale(1)'
			img.src = `${vectorLista[contador]}`;
			img.style.width = "90%";
			img.style.height = '100%';
			img.style.borderRadius = '10%';
			elegir_fotos.appendChild(img);
		});

		times.addEventListener('click',()=>{

			times.style.left = '-10';
			oculto.style.transform = 'scale(0)';
			oculto.style.transition = 'transform all 0.4s ease-in-out';
			oculto.classList.remove('visto-activo');
		});
	}
}

ver_galeria();