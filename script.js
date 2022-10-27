const people = [
	['Stjarnan', '001'],
	['Tumi', '004'],
	['Ari', '007'],
	['Herbert', '069'],
];

const CW = document.querySelector('#winner'); // * current winner, sigurvegari sem var dreginn
const cardHolder = document.querySelector('#cardholder');
const cardNumber = document.querySelectorAll('.number');

const rest = document.querySelector('#rest'); // * fólk sem er eftir í lauginni
const winners = document.querySelector('#winners'); // * fólk sem er búið að vinna ehv
const button = document.querySelector('#draw');
let winArr = [];
let imgChoice;

function killAndRevive(parent, childArr, kidType = 'p') {
	while (parent.hasChildNodes()) {
		parent.removeChild(parent.firstChild);
	}
	childArr.forEach((val) => {
		let temp = document.createElement(kidType);
		temp.textContent = val;
		parent.append(temp);
	});
}

window.onload = () => {
	killAndRevive(
		rest,
		people.map((n) => {
			return n[1];
		})
	);
};

function draw() {
	imgChoice = `c${Math.floor(Math.random()*4)}.svg`
	document.documentElement.style.setProperty('--card-image', `url(${imgChoice})`)
	cardHolder.classList.add('flipped');

	let randVal = Math.floor(Math.random() * people.length);
	winner.textContent = people[randVal][0];
	cardNumber.forEach(node => {node.textContent = people[randVal][1]})
	if (people[randVal] !== undefined) {
		winArr.push(people[randVal][1]);
	}

	people.splice(randVal, 1);

	killAndRevive(
		rest,
		people.map((n) => n[1])
	);
}

async function shuffle() {
	cardHolder.classList.remove('flipped');
	await new Promise((r) => setTimeout(r, 250));
	if (winArr[0]) {
		let tempWinner = document.createElement('p');
		tempWinner.style = `background-image: url(${imgChoice})`
		tempWinner.textContent = winArr.pop();
		winners.prepend(tempWinner);
	}
}

button.addEventListener('click', () => {
	if (cardHolder.classList.contains('flipped')) {
		shuffle();
		if (people.length === 0) {button.setAttribute("disabled", "true")}
	} else {
		draw();
	}

});
