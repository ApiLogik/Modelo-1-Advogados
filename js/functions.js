//------JS------

//Internet Explorer - incompatibility
function checkIE(){
	let msie11 = navigator.userAgent.match(/rv\:11\.0/);
	let msie = navigator.userAgent.match(/MSIE/);

	if(msie11 != null || msie != null){
		document.querySelector('.eq2, .eq3').style.display = "inline-flex";
		alert("Site parcialmente incompatível com Internet Explorer. Para uma melhor experiência, atualize seu navegador.");
	}
}//End ckeckIE

checkIE();


//--------------MENU--------------------
//Toggle mobile menu / click outside = close / Avoid double click

function initMenuMobile(){
	let menudown = false; //down = true; up = false
	let speed = 600;
	let clicked = true;
	let delay = speed * 1.1; //re-click allowed after: speed + 10%

	document.querySelector('.icon-menu-mob').addEventListener('click', event => {
		while(clicked == true){
			if(menudown == false){
				slideDown(document.getElementById("menu-mobile"), speed);
				menudown = true;
			 }else{
				slideUp(document.getElementById("menu-mobile"), speed);
				  menudown = false;
			 }
		clicked = false;
		setTimeout( () => {
			clicked = true;
		},delay);
	}
	event.stopPropagation();
	});

	document.querySelector('body,html').addEventListener('click', event => {
		while(clicked == true){
			if(menudown == true){
				slideUp(document.getElementById("menu-mobile"), speed);
				  menudown = false;
			 }
			clicked = false;
			setTimeout( () => {
				clicked = true;
			},delay);
		}
		 event.stopPropagation();
	})
}//End initMenuMobile

initMenuMobile();

//Scroll to anchor -240px top
document.querySelectorAll('.menu-desktop a, .menu-mobile a').forEach(function(link) {
	link.addEventListener('click', function(event){
		event.preventDefault();
		let idAnchor = link.attributes.href.value.slice(1);
		let anchorPosition = document.getElementById(idAnchor).getBoundingClientRect();
		let offset = { 
                top: anchorPosition.top + window.pageYOffset, 
                //left: anchorPosition.left + window.pageXOffset, 
				};
		document.querySelector('html, body').scrollTo({top: offset.top - 200, behavior: "smooth",});
	})
})

//-----------FORM--------------

const formValidation = () => {
	//Form mask - phone
	let selector = document.getElementById('fone');
	let im = new Inputmask({
		mask: ["(99) 9999-9999", "(99) 99999-9999"],
		keepStatic: true,
	})
	im.mask(selector);

	//Disable Enter key on form inputs
	document.querySelectorAll('input:not(textarea)').forEach(function(input) {
		input.addEventListener('keydown', event => {
			if (event.key == "Enter") { event.preventDefault() };
		})
	})
	
	//Send mail - confirm - nav to anchor
	if(window.location.search == "?sended=1" || window.location.search == "?sended=2") {
		let anchorPosition = document.getElementById('contato').getBoundingClientRect();
		let offset = { top: anchorPosition.top + window.pageYOffset }; 
		document.querySelector('html, body').scrollTo({top: offset.top});
	}
}
formValidation();



//--------------END FORM----------------


//-------------ARTIGOS-------------
//Slide down / up articles; change arrows
function slideArticles(){
	let more = false;

	document.querySelector('.nav-art i').addEventListener('click', function() {
		let moreOrLess = document.querySelector('.nav-art h2');
		let moreArticles = document.querySelector('.art2');
		slideToggle(moreArticles, 500);

		if(more == false){
			this.classList.remove('fa-chevron-circle-down');
			this.classList.add('fa-chevron-circle-up');
			moreOrLess.innerHTML = "Menos artigos";
			more = true;
		}else{
			this.classList.remove('fa-chevron-circle-up');
			this.classList.add('fa-chevron-circle-down');
			moreOrLess.innerHTML = "Mais artigos";
			more = false;
		}
	});
}
slideArticles();

//open articles

const articlesOpenClose = () => {
	let openedArticle;
	let readingArticle = Array.from(document.querySelectorAll('.artigo-aberto'));
	let linksArticles = Array.from(document.querySelectorAll('.art1 .art-single p'));
	let closeArticle = Array.from(document.querySelectorAll('.artigo-aberto span'));

	linksArticles.forEach( link => {
		link.addEventListener('click', () => {
			//Positioning on screen for reading
			let framePosition = link.parentElement.offsetTop -150 + "px";
			framePosition.toString();
			document.querySelectorAll('.artigo-aberto').forEach( each => each.style.top = framePosition );

			//Open choosen article
			let indexOfLink = linksArticles.indexOf(link);

			show(readingArticle[indexOfLink]);
			openedArticle = readingArticle[indexOfLink];
		})
	})

	closeArticle.forEach( (x) => x.addEventListener( 'click', () => hide(openedArticle) ) );

}

articlesOpenClose();
//----------------END ARTIGOS---------------------

