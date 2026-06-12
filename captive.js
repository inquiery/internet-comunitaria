let numbers = [1, 2, 3, 4, 5];
let logos = ['logo.png', 'logo.jpg', 'logo.jpeg', 'logo.gif'];

function tryLoadBackground() {
	if (numbers.length === 0) {
		console.log("Nenhuma imagem de background encontrada.");
		return;
	}

	let n = Math.floor(Math.random() * numbers.length);
	let url = `img/background-${n}.jpg`;

	let img = new Image();

	img.onload = function() {
		document.getElementById('background').style.backgroundImage = `url('${url}')`;
		console.log(`Imagem carregada: ${url}`);
	};

	img.onerror = function() {
		console.log(`Falha ao carregar: ${url}`);
		tryLoadBackground();
	};

	img.src = url;
}

function tryLoadLogo() {
	if (logos.length === 0) {
		console.log("Não foi encontrado nenhum arquivo de logo.");
		return;
	}
	
	let n = Math.floor(Math.random() * logos.length);
	let logourl = 'img/' + logos.splice(n, 1)[0];

	let img = new Image();
	
	img.onload = function() {
		document.getElementById('logo').src = logourl;
		console.log(`Imagem carregada: ${logourl}`);
	}
	
	img.onerror = function() {
		console.log(`Falha ao carregar: ${logourl}`);
		tryLoadLogo();
	}
	
	img.src = logourl;
}

function loadImages() {
	tryLoadBackground();
	tryLoadLogo();
}