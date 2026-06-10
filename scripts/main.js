let numbers = [1, 2, 3, 4, 5];

function randomNumber() {
	let n = Math.floor(Math.random() * numbers.length);
	return numbers.splice(n, 1)[0];
}

function tryLoadBackground() {
	if (numbers.length === 0) {
		console.log("Nenhuma imagem de background encontrada.");
		return;
	}

	let number = randomNumber();
	let url = `img/background-${number}.jpg`;

	let img = new Image();

	img.onload = function() {
		document.getElementById('background').style.backgroundImage = `url('${url}')`;
		console.log(`Imagem carregada: ${url}`);
	};

	img.onerror = function() {
		console.log(`Falha ao carregar: ${url}`);
		tryLoad();
	};

	img.src = url;
}
