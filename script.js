const NUM_ABIDALAS = 10;
let money = 100;

const raceContainer = document.getElementById('race');
const togglesContainer = document.getElementById('toggles');
const moneyDisplay = document.getElementById('money');

// Criar checkboxes e pistas
for (let i = 0; i < NUM_ABIDALAS; i++) {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = i;
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(` Abidala ${i + 1}`));
  togglesContainer.appendChild(label);
  togglesContainer.appendChild(document.createElement('br'));

  const track = document.createElement('div');
  track.className = 'track';
  const img = document.createElement('img');
  img.src = 'https://iili.io/FG05Aep.png';
  img.className = 'abidala';
  img.id = `abidala-${i}`;
  const finish = document.createElement('div');
  finish.id = 'finish-line';
  track.appendChild(img);
  track.appendChild(finish);
  raceContainer.appendChild(track);
}

document.getElementById('bet-form').onsubmit = (e) => {
  e.preventDefault();
  const selected = [...document.querySelectorAll('input[type=checkbox]:checked')].map(cb => parseInt(cb.value));
  if (selected.length === 0) {
    alert('Escolha pelo menos um Abidala para apostar.');
    return;
  }
  if (money < 10) {
    alert('Dinheiro insuficiente!');
    return;
  }
  startRace(selected);
};

function startRace(bets) {
  const abidalas = Array.from({ length: NUM_ABIDALAS }, (_, i) => ({ id: i, pos: 0 }));
  const raceInterval = setInterval(() => {
    abidalas.forEach(ab => {
      ab.pos += Math.random() * 5;
      document.getElementById(`abidala-${ab.id}`).style.left = ab.pos + '%';
    });

    const winner = abidalas.find(ab => ab.pos >= 90);
    if (winner) {
      clearInterval(raceInterval);
      const won = bets.includes(winner.id);
      const betCost = bets.length * 10;
      const gain = won ? 50 : 0;
      money += gain - betCost;
      moneyDisplay.textContent = money;
      alert(`Abidala ${winner.id + 1} venceu! ${won ? 'Você ganhou R$50!' : 'Você perdeu R$' + betCost + '.'}`);
    }
  }, 100);
}
