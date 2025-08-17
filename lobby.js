const music = document.getElementById('musicaLobby');
const clickSFX = document.getElementById('clickSFX');
const nomeInput = document.getElementById('nome');
const orientInput = document.getElementById('orientacao');
const suggestionsList = document.getElementById('suggestions');
const startBtn = document.getElementById('proximo');

let selectedGender = null;
let suggestions = [];

// 🔄 Carrega orientações do JSON
fetch('orientations.json')
  .then(r => r.json())
  .then(data => suggestions = data);

// 🔈 Som de clique
function playClick() {
  if (!document.activeElement.matches("input")) {
    clickSFX.currentTime = 0;
    clickSFX.play();
  }
}

// Seleção de gênero
document.querySelectorAll('.genero').forEach(btn => {
  btn.addEventListener('click', () => {
    playClick();
    document.querySelectorAll('.genero').forEach(b => b.classList.remove('selecionado'));
    btn.classList.add('selecionado');
    selectedGender = btn.dataset.valor;
    enableNext();
  });
});

nomeInput.addEventListener('input', () => enableNext());

orientInput.addEventListener('input', () => {
  const val = orientInput.value.toLowerCase();
  suggestionsList.innerHTML = '';
  if (!val) return;

  suggestions.filter(o => o.toLowerCase().startsWith(val)).slice(0, 5).forEach(opt => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.onclick = () => {
      orientInput.value = opt;
      suggestionsList.innerHTML = '';
      enableNext();
    };
    suggestionsList.appendChild(li);
  });
});

function enableNext() {
  const nome = nomeInput.value.trim();
  const ok = nome && selectedGender;
  startBtn.disabled = !ok;
}

// Botão iniciar
// Botão iniciar
startBtn.addEventListener('click', () => {
  if (startBtn.disabled) return;
  playClick();

  const perfil = {
    name: nomeInput.value.trim(),
    gender: selectedGender,
    orientation: orientInput.value.trim()
  };

  localStorage.setItem('playerProfile', JSON.stringify(perfil));
  
  // Cria a camada de transição
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);
  
  // Ativa as animações
  document.getElementById('painel').classList.add('fade-out', 'slide-out');
  transition.classList.add('active');
  
  // Redireciona após a animação
  setTimeout(() => {
    location.href = 'choose-character.html';
  }, 700);
});
