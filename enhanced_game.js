// Exibe mensagem customizada no site (no topo ou centro)
function showCustomMessage(msg, opts = {}) {
  let msgBox = document.getElementById('custom-message-box');
  if (!msgBox) {
    msgBox = document.createElement('div');
    msgBox.id = 'custom-message-box';
    msgBox.className = 'custom-message-box';
    document.body.appendChild(msgBox);
  }
  msgBox.innerHTML = `<span>${msg}</span>`;
  msgBox.style.display = 'block';
  setTimeout(() => {
    msgBox.style.opacity = 1;
    msgBox.classList.add('show');
  }, 10);
  setTimeout(() => {
    msgBox.classList.remove('show');
    msgBox.style.opacity = 0;
    setTimeout(() => { msgBox.style.display = 'none'; }, 400);
  }, opts.duration || 2600);
}
// --- Elementos DOM e Áudio (compatível com game.js antigo) ---
const elements = {
  screens: {
    loading: document.getElementById('loading-screen'),
    knowledgeCheck: document.getElementById('knowledge-check'),
    levelTest: document.getElementById('level-test'),
    levelResult: document.getElementById('level-result'),
    countrySelection: document.getElementById('country-selection'),
    gameScreen: document.getElementById('game-screen'),
    miniGameScreen: document.getElementById('mini-game-screen'),
    certificateScreen: document.getElementById('certificate-screen'),
    transitionScreen: document.getElementById('transition-screen')
  },
  knowNothingBtn: document.getElementById('know-nothing'),
  knowSomethingBtn: document.getElementById('know-something'),
  testQuestionEl: document.querySelector('.test-question'),
  testOptionsEl: document.querySelector('.test-options'),
  nextQuestionBtn: document.getElementById('next-question'),
  testProgressFill: document.querySelector('.progress-fill'),
  testProgressText: document.querySelector('.progress-text'),
  currentQuestionEl: document.querySelector('.progress-text .current'),
  totalQuestionsEl: document.querySelector('.progress-text .total'),
  testFeedbackEl: document.querySelector('.test-feedback'),
  feedbackIconEl: document.querySelector('.feedback-icon'),
  feedbackTextEl: document.querySelector('.feedback-text'),
  levelBadgeEl: document.getElementById('level-badge'),
  levelTitleEl: document.getElementById('level-title'),
  levelDescriptionEl: document.getElementById('level-description'),
  skillsListEl: document.getElementById('skills-list'),
  continueToCountriesBtn: document.getElementById('continue-to-countries'),
  countryOptions: document.querySelectorAll('.country-option'),
  gameBackgroundEl: document.getElementById('game-background'),
  playerAvatar: document.getElementById('player-avatar'),
  playerNameEl: document.getElementById('player-name'),
  playerLevelEl: document.getElementById('player-level'),
  npcAvatar: document.getElementById('npc-avatar'),
  npcNameEl: document.getElementById('npc-name'),
  dialogueContent: document.getElementById('dialogue-content'),
  dialogueOptions: document.getElementById('dialogue-options'),
  miniGameBackgroundEl: document.getElementById('mini-game-background'),
  miniGameTitleEl: document.getElementById('mini-game-title'),
  miniGameInstructionsEl: document.getElementById('mini-game-instructions'),
  miniGameContentEl: document.getElementById('mini-game-content'),
  miniGameFeedbackEl: document.querySelector('.mini-game-feedback'),
  miniGameFeedbackIconEl: document.querySelector('.mini-game-feedback .feedback-icon'),
  miniGameFeedbackTextEl: document.querySelector('.mini-game-feedback .feedback-text'),
  submitAnswerBtn: document.getElementById('submit-answer'),
  certificateNameEl: document.getElementById('certificate-name'),
  certificateFlagEl: document.getElementById('certificate-flag'),
  certificateCountryEl: document.getElementById('certificate-country'),
  certificateLevelEl: document.getElementById('certificate-level'),
  certificateDateEl: document.getElementById('certificate-date'),
  certificateKnowledgeEl: document.getElementById('certificate-knowledge'),
  characterSignatureImgEl: document.getElementById('character-signature-img'),
  characterSignatureNameEl: document.getElementById('character-signature-name'),
  restartGameBtn: document.getElementById('restart-game'),
  shareCertificateBtn: document.getElementById('share-certificate'),
  backgroundMusic: document.getElementById('background-music'),
  clickSound: document.getElementById('click-sound'),
  successSound: document.getElementById('success-sound'),
  failureSound: document.getElementById('failure-sound'),
  transitionSound: document.getElementById('transition-sound'),
  dialogueSound: document.getElementById('dialogue-sound'),
  celebrationSound: document.getElementById('celebration-sound')
};

// --- Funções utilitárias de som e animação ---
function playSound(type) {
  if (type === 'click' && elements.clickSound) elements.clickSound.play();
  if (type === 'success' && elements.successSound) elements.successSound.play();
  if (type === 'failure' && elements.failureSound) elements.failureSound.play();
  if (type === 'transition' && elements.transitionSound) elements.transitionSound.play();
  if (type === 'dialogue' && elements.dialogueSound) elements.dialogueSound.play();
  if (type === 'celebration' && elements.celebrationSound) elements.celebrationSound.play();
}

function showScreenAnimated(screenId) {
  Object.values(elements.screens).forEach(screen => screen.classList.remove('active'));
  if (elements.screens[screenId]) {
    elements.screens[screenId].classList.add('active');
    playSound('transition');
  }
}

// --- Inicialização robusta ---
window.addEventListener('DOMContentLoaded', async () => {
  await loadExternalData();
  // Sons e música
  if (elements.backgroundMusic) {
    elements.backgroundMusic.volume = 0.5;
    elements.backgroundMusic.play().catch(() => {});
  }
  // Listeners principais
  elements.knowNothingBtn.onclick = () => {
    EnhancedGameData.playerProfile.englishLevel = 'A0';
    EnhancedGameData.playerProfile.ultraBasic = true;
    showCustomMessage('Você vai começar no nível ultra básico! Todas as frases terão tradução e pronúncia.', {duration: 3200});
    setTimeout(() => {
      showScreen('countrySelection');
      updateCountrySelectionScreen && updateCountrySelectionScreen();
    }, 1800);
  };
  elements.knowSomethingBtn.onclick = startEnglishTest;
  elements.continueToCountriesBtn.onclick = () => {
    showScreen('countrySelection');
    updateCountrySelectionScreen();
  };
  elements.countryOptions.forEach(opt => {
    opt.onclick = () => {
      const cid = opt.getAttribute('data-country');
      selectCountry(cid);
    };
  });
  if (elements.restartGameBtn) elements.restartGameBtn.onclick = () => {
    EnhancedGameData.playerProfile.visitedCountries = [];
    EnhancedGameData.countries.forEach(c => c.completed = false);
    showScreen('knowledgeCheck');
    updateCountrySelectionScreen();
  };
  // Compartilhar certificado (placeholder)
  if (elements.shareCertificateBtn) elements.shareCertificateBtn.onclick = () => {
    alert('Share feature coming soon!');
  };
  updateCountrySelectionScreen();
  // Começa na tela de loading
  showScreen('loading');
  setTimeout(() => {
    showScreen('knowledgeCheck');
  }, 1200);
});
// --- Teste de Inglês Dinâmico ---
let testState = {
  questions: [],
  current: 0,
  score: 0,
  answers: [],
  sectionOrder: [],
  finished: false
};

function startEnglishTest() {
  // Monta um teste misto: 4 gramática, 2 leitura, 2 cultural, 2 listening
  const grammar = (EnhancedGameData.englishTest.sections.find(s => s.id === 'grammar').questions || []).slice(0, 4);
  const reading = (EnhancedGameData.englishTest.sections.find(s => s.id === 'reading').questions || []).slice(0, 2);
  const cultural = (EnhancedGameData.englishTest.sections.find(s => s.id === 'cultural').questions || []).slice(0, 2);
  const listening = (EnhancedGameData.englishTest.sections.find(s => s.id === 'listening').questions || []).slice(0, 2);
  // Para leitura e listening, cada item pode ter várias perguntas
  let readingQs = [];
  reading.forEach(r => r.questions.forEach(q => readingQs.push({ ...q, passage: r.passage })));
  let listeningQs = [];
  listening.forEach(l => l.questions.forEach(q => listeningQs.push({ ...q, audio: l.audio_description })));
  // Junta tudo e embaralha
  let allQs = [
    ...grammar.map(q => ({ ...q, type: 'grammar' })),
    ...readingQs.map(q => ({ ...q, type: 'reading' })),
    ...cultural.map(q => ({ ...q, type: 'cultural' })),
    ...listeningQs.map(q => ({ ...q, type: 'listening' }))
  ];
  allQs = allQs.sort(() => Math.random() - 0.5).slice(0, 10);
  testState = {
    questions: allQs,
    current: 0,
    score: 0,
    answers: [],
    sectionOrder: allQs.map(q => q.type),
    finished: false
  };
  showScreen('levelTest');
  window.musicManager && window.musicManager.playMusic('test', { volume: 0.10 }); // volume ainda mais baixo
  renderTestQuestion();
}

function renderTestQuestion() {
  const q = testState.questions[testState.current];
  if (!q) {
    finishEnglishTest();
    return;
  }
  // Elementos
  const qEl = document.querySelector('.test-question');
  const optsEl = document.querySelector('.test-options');
  const feedbackEl = document.querySelector('.test-feedback');
  const nextBtn = document.getElementById('next-question');
  // Limpa
  qEl.innerHTML = '';
  optsEl.innerHTML = '';
  feedbackEl.classList.add('hidden');
  nextBtn.classList.add('hidden');

  // Atualiza barra e texto de progresso
  const progressFill = document.querySelector('.progress-fill');
  const currentQ = testState.current + 1;
  const totalQ = testState.questions.length;
  if (progressFill) progressFill.style.width = `${(currentQ / totalQ) * 100}%`;
  const currentEl = document.querySelector('.progress-text .current');
  const totalEl = document.querySelector('.progress-text .total');
  if (currentEl) currentEl.textContent = currentQ;
  if (totalEl) totalEl.textContent = totalQ;

  // Exibe tipo
  if (q.type === 'reading' && q.passage) {
    qEl.innerHTML = `<div class='reading-passage'>${q.passage}</div><div>${q.question}</div>`;
  } else if (q.type === 'listening' && q.audio) {
    qEl.innerHTML = `<div class='audio-player'><em>${q.audio}</em></div><div>${q.question}</div>`;
  } else {
    qEl.textContent = q.question;
  }

  // Opções
  let selected = null;
  let feedbackShown = false;
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'test-option';
    btn.textContent = opt;
    btn.onclick = () => {
      if (feedbackShown) return;
      // Destaca opção
      Array.from(optsEl.children).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selected = idx;
      // Mostra feedback, mas NÃO trava opções
      const correct = idx === q.correct;
      showTestFeedback(correct, q.explanation);
    };
    optsEl.appendChild(btn);
  });

  // Permitir alterar escolha até clicar em 'Continue'
  nextBtn.onclick = () => {
    if (selected === null) return; // Não avança sem escolha
    feedbackShown = true;
    // Salva resposta e pontuação
    const q = testState.questions[testState.current];
    const correct = selected === q.correct;
    testState.answers.push({ idx: selected, correct });
    if (correct) testState.score += 10;
    testState.current++;
    renderTestQuestion();
  };
}

function showTestFeedback(correct, explanation) {
  const feedbackEl = document.querySelector('.test-feedback');
  const iconEl = feedbackEl.querySelector('.feedback-icon');
  const textEl = feedbackEl.querySelector('.feedback-text');
  feedbackEl.classList.remove('hidden');
  iconEl.textContent = correct ? '✔️' : '❌';
  // Limita tamanho do texto de feedback para responsividade
  let exp = explanation || '';
  if (exp.length > 180) {
    exp = exp.slice(0, 170) + '...';
  }
  textEl.textContent = exp;
  document.getElementById('next-question').classList.remove('hidden');
  // Não trava as opções, pode alterar até clicar em Continue
}

document.getElementById('next-question').onclick = () => {
  testState.current++;
  renderTestQuestion();
};

function finishEnglishTest() {
  testState.finished = true;
  // Determina nível CEFR
  let level = 'A1';
  if (testState.score >= 90) level = 'C2';
  else if (testState.score >= 80) level = 'C1';
  else if (testState.score >= 65) level = 'B2';
  else if (testState.score >= 50) level = 'B1';
  else if (testState.score >= 30) level = 'A2';
  EnhancedGameData.playerProfile.englishLevel = level;
  showLevelResult(level);
}

function showLevelResult(level) {
  showScreen('levelResult');
  window.musicManager && window.musicManager.playMusic('result', { volume: 0.18 });
  document.getElementById('level-title').textContent = level;
  document.getElementById('level-badge').src = `assets/badges/${level.toLowerCase()}.png`;

  // Porcentagem animada
  const percent = Math.round((testState.score / (testState.questions.length * 10)) * 100);
  const percentEl = document.getElementById('level-percentage');
  let current = 0;
  percentEl.textContent = '0%';
  percentEl.style.opacity = 1;
  const anim = setInterval(() => {
    if (current < percent) {
      current++;
      percentEl.textContent = current + '%';
    } else {
      clearInterval(anim);
    }
  }, 12);

  // Descrição detalhada por nível
  const detailed = {
    A1: 'You can understand and use familiar everyday expressions and very basic phrases. You can introduce yourself and answer simple questions about personal details.',
    A2: 'You can communicate in simple and routine tasks. You can describe your background and immediate environment in simple terms.',
    B1: 'You can deal with most situations likely to arise while traveling. You can produce simple connected text on familiar topics.',
    B2: 'You can interact with a degree of fluency and spontaneity. You can produce clear, detailed text on a wide range of subjects.',
    C1: 'You can express yourself fluently and spontaneously. You can use language flexibly and effectively for social, academic, and professional purposes.',
    C2: 'You can understand virtually everything heard or read. You can express yourself very fluently and precisely, even in complex situations.'
  };
  document.getElementById('level-detailed-desc').textContent = detailed[level] || '';

  // Mensagem motivacional
  const motivation = {
    A1: 'Every expert was once a beginner. Keep going!',
    A2: 'Great progress! Keep practicing and you will improve even more.',
    B1: 'You are on your way to fluency. Keep challenging yourself!',
    B2: 'Impressive! You can communicate with confidence in many situations.',
    C1: 'Excellent! Your English is advanced. Explore new challenges!',
    C2: 'Outstanding! You have mastered English at a native-like level!'
  };
  document.getElementById('level-motivation').textContent = motivation[level] || '';

  // Descrição curta
  document.getElementById('level-description').textContent = `Your English level is ${level}.`;

  // Skills (exemplo)
  const skills = {
    A1: ['Understand basic greetings', 'Use simple present tense'],
    A2: ['Talk about daily routines', 'Describe people and places'],
    B1: ['Express opinions', 'Understand main points of texts'],
    B2: ['Understand complex texts', 'Interact with native speakers'],
    C1: ['Understand demanding texts', 'Express ideas fluently'],
    C2: ['Native-like fluency', 'Use English flexibly']
  };
  const ul = document.getElementById('skills-list');
  ul.innerHTML = '';
  (skills[level] || []).forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    ul.appendChild(li);
  });
}

// Botões para iniciar teste
document.getElementById('know-nothing').onclick = function() {
  // Skip test, set ultra-basic level, and start game
  EnhancedGameData.playerProfile.englishLevel = 'A0';
  EnhancedGameData.playerProfile.ultraBasic = true;
  // Optionally, set a flag for translated phrases, etc.
  showScreen('countrySelection');
};
document.getElementById('know-something').onclick = startEnglishTest;
// --- Enhanced Game Data & Core Logic ---
const EnhancedGameData = {
  playerProfile: {
    name: "",
    visitedCountries: [],
    currentCountry: null,
    englishLevel: null,
    badges: [],
    achievements: [],
    progress: {},
  },
  countries: [], // será preenchido dinamicamente
  miniGames: [], // será preenchido dinamicamente
  englishTest: {
    sections: [], // será preenchido dinamicamente
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    sublevels: ["A1.1", "A1.2", "A2.1", "A2.2", "B1.1", "B1.2", "B2.1", "B2.2", "C1.1", "C1.2", "C2.1", "C2.2"]
  }
};

// --- Carregamento de Dados Externos ---
async function loadExternalData() {
  // Carrega enhanced_cultural_content.json
  const culturalRes = await fetch('enhanced_cultural_content.json');
  const culturalData = await culturalRes.json();
  // Carrega enhanced_questions.json
  const questionsRes = await fetch('enhanced_questions.json');
  const questionsData = await questionsRes.json();
  // Carrega questions.json
  const qbankRes = await fetch('questions.json');
  const qbankData = await qbankRes.json();

  // Preenche países
  EnhancedGameData.countries = Object.entries(culturalData.countries).map(([id, c]) => ({ id, ...c }));

  // Preenche miniGames (exemplo fixo, pode expandir)
  EnhancedGameData.miniGames = [
    { id: "word-order", name: "Word Order", description: "Arrange the words to form a correct sentence.", difficulty: ["easy", "medium", "hard"] },
    { id: "fill-blank", name: "Fill in the Blank", description: "Choose the correct word to complete the sentence.", difficulty: ["easy", "medium", "hard"] },
    { id: "cultural-quiz", name: "Cultural Quiz", description: "Answer questions about local customs.", difficulty: ["easy", "medium", "hard"] },
    { id: "order-food", name: "Order Food", description: "Simulate ordering food in a restaurant.", difficulty: ["easy", "medium", "hard"] }
  ];

  // Preenche perguntas do teste de inglês
  EnhancedGameData.englishTest.sections = [
    { id: "grammar", name: "Grammar", questions: questionsData.grammar_questions || [] },
    { id: "reading", name: "Reading Comprehension", questions: questionsData.reading_comprehension || [] },
    { id: "listening", name: "Listening Comprehension", questions: questionsData.listening_scenarios || [] },
    { id: "cultural", name: "Cultural Context", questions: questionsData.cultural_context_questions || [] }
  ];
  // Você pode expandir para usar qbankData também
}

// --- Game State ---
// Variáveis de estado já declaradas acima, não repetir

// --- Game State ---
let currentCountry = null;
let currentDay = 0;
let currentChallenge = 0;
let isTransitioning = false;

// --- DOM Elements (IDs devem existir no HTML) ---
const screens = {
  loading: document.getElementById('loading-screen'),
  knowledgeCheck: document.getElementById('knowledge-check'),
  levelTest: document.getElementById('level-test'),
  levelResult: document.getElementById('level-result'),
  countrySelection: document.getElementById('country-selection'),
  transition: document.getElementById('transition-screen'),
  game: document.getElementById('game-screen'),
  miniGame: document.getElementById('mini-game-screen'),
  certificate: document.getElementById('certificate-screen')
};

function showScreen(screenName) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  if (screens[screenName]) screens[screenName].classList.add('active');
  // Troca música conforme tela
  if (window.musicManager) {
    switch(screenName) {
      case 'countrySelection':
        window.musicManager.playMusic('country-choice', { volume: 0.18 });
        break;
      case 'levelTest':
        window.musicManager.playMusic('test', { volume: 0.10 });
        break;
      case 'levelResult':
        window.musicManager.playMusic('result', { volume: 0.18 });
        break;
      case 'certificate':
        window.musicManager.playMusic('final', { volume: 0.18 });
        break;
    }
  }
}

// --- Country Selection & Progress ---
function selectCountry(countryId) {
  const country = EnhancedGameData.countries.find(c => c.id === countryId);
  if (!country) {
    alert('This country is not available yet!');
    return;
  }
  if (country.completed) return;
  currentCountry = country;
  currentDay = 0;
  currentChallenge = 0;
  isTransitioning = true;
  showTransitionScreen(country);
}

function showTransitionScreen(country) {
  // Atualiza texto e imagem do destino
  document.getElementById('destination-country').textContent = country.name;
  // Pode adicionar animação de avião aqui
  showScreen('transition');
  window.musicManager && window.musicManager.playMusic('loading', { volume: 0.18 });
  setTimeout(() => {
    isTransitioning = false;
    startCountryAdventure();
  }, 3000); // 3 segundos de transição
}

function startCountryAdventure() {
  showScreen('game');
  // Música de diálogo do país
  if (currentCountry && currentCountry.id) {
    switch(currentCountry.id) {
      case 'usa':
        window.musicManager.playMusic('usa-dialogue', { volume: 0.18 });
        break;
      case 'uk':
        window.musicManager.playMusic('uk-dialogue', { volume: 0.18 });
        break;
      case 'australia':
        window.musicManager.playMusic('australia-dialogue', { volume: 0.18 });
        break;
      case 'canada':
        window.musicManager.playMusic('canada-dialogue', { volume: 0.18 });
        break;
    }
  }
  showCurrentDay();
}

function showCurrentDay() {
  if (!currentCountry) return;
  // Corrige: garantir que days existe e é array
  let daysArr = currentCountry.days;
  // Suporte para daily_life.days (estrutura do JSON)
  if (!daysArr && currentCountry.daily_life && Array.isArray(currentCountry.daily_life.days)) {
    daysArr = currentCountry.daily_life.days;
    currentCountry.days = daysArr; // cache para próximas vezes
  }
  if (!Array.isArray(daysArr)) {
    // Fallback visual
    document.getElementById('dialogue-content').textContent = 'No adventure data for this country.';
    document.getElementById('dialogue-options').innerHTML = '';
    return;
  }
  const dayObj = daysArr[currentDay];
  if (!dayObj) {
    // Fim da viagem neste país
    finishCountry();
    return;
  }
  // Exibir cenário, personagens, desafios do dia
  // Corrige backgrounds: aceita string ou array
  let bg = '';
  if (Array.isArray(currentCountry.backgrounds)) {
    bg = currentCountry.backgrounds[1] || currentCountry.backgrounds[0] || '';
  } else if (currentCountry.backgrounds) {
    bg = currentCountry.backgrounds;
  } else if (currentCountry.background) {
    bg = currentCountry.background;
  }
  document.getElementById('game-background').style.backgroundImage = `url('${bg}')`;
  showChallenge();
}

function showChallenge() {
  // Corrige: garantir que cada país/dia/challenge é único
  let daysArr = currentCountry.days;
  if (!daysArr && currentCountry.daily_life && Array.isArray(currentCountry.daily_life.days)) {
    daysArr = currentCountry.daily_life.days;
    currentCountry.days = daysArr;
  }
  const dayObj = daysArr && daysArr[currentDay];
  if (!dayObj) return;
  let challengesArr = dayObj.challenges;
  // Suporte para daily_life.days.challenges
  if (!challengesArr && Array.isArray(dayObj.dialogues)) {
    // Se não há challenges, mas há dialogues, cria challenge do tipo diálogo
    challengesArr = [{ type: 'dialogue', dialogues: dayObj.dialogues }];
    dayObj.challenges = challengesArr;
  }
  const challenge = challengesArr && challengesArr[currentChallenge];
  if (!challenge) {
    currentDay++;
    currentChallenge = 0;
    showCurrentDay();
    return;
  }
  if (challenge.type === 'mini-game' || challenge.type === 'minigame') {
    showMiniGame(challenge);
  } else if (challenge.type === 'dialogue') {
    showDialogue(challenge);
  } else if (challenge.type === 'cultural-fact') {
    showCulturalFact(challenge);
  } else {
    nextChallenge();
  }
}

// --- Mini-games ---
function showMiniGame(challenge) {
  showScreen('miniGame');
  // Música de minigame do país
  if (currentCountry && currentCountry.id) {
    switch(currentCountry.id) {
      case 'usa':
        window.musicManager.playMusic('usa-minigame', { volume: 0.18 });
        break;
      case 'uk':
        window.musicManager.playMusic('uk-minigame', { volume: 0.18 });
        break;
      case 'australia':
        window.musicManager.playMusic('australia-minigame', { volume: 0.18 });
        break;
      case 'canada':
        window.musicManager.playMusic('canada-minigame', { volume: 0.18 });
        break;
    }
  }
  // Esconde botão Submit por padrão
  const submitBtn = document.getElementById('submit-answer');
  if (submitBtn) submitBtn.style.display = 'none';
  const miniGame = EnhancedGameData.miniGames.find(mg => mg.id === (challenge.miniGame || challenge.game));
  document.getElementById('mini-game-title').textContent = miniGame ? miniGame.name : 'Mini-game';
  document.getElementById('mini-game-instructions').textContent = miniGame ? miniGame.description : '';
  const contentEl = document.getElementById('mini-game-content');
  contentEl.innerHTML = '';

  // Exemplo: Fill in the Blank (usando perguntas de grammar)
  if (miniGame && miniGame.id === 'fill-blank') {
    const grammarQs = EnhancedGameData.englishTest.sections.find(s => s.id === 'grammar').questions;
    const q = grammarQs[Math.floor(Math.random() * grammarQs.length)];
    contentEl.innerHTML = `<div>${q.question}</div>`;
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'mini-game-option btn-primary';
      btn.textContent = opt;
      btn.onclick = () => {
        showMiniGameFeedback(idx === q.correct, q.explanation);
      };
      contentEl.appendChild(btn);
    });
  } else if (miniGame && miniGame.id === 'word-order') {
    // Exemplo simples: embaralhar frase
    const sentences = [
      { correct: 'I am learning English.', words: ['I', 'am', 'learning', 'English.'] },
      { correct: 'She goes to school every day.', words: ['She', 'goes', 'to', 'school', 'every', 'day.'] }
    ];
    const s = sentences[Math.floor(Math.random() * sentences.length)];
    const shuffled = s.words.slice().sort(() => Math.random() - 0.5);
    contentEl.innerHTML = '<div>Arrange the words:</div>';
    const answer = [];
    shuffled.forEach(word => {
      const btn = document.createElement('button');
      btn.className = 'mini-game-option btn-primary';
      btn.textContent = word;
      btn.onclick = () => {
        answer.push(word);
        btn.disabled = true;
        if (answer.length === s.words.length) {
          showMiniGameFeedback(answer.join(' ') === s.correct, 'Correct: ' + s.correct);
        }
      };
      contentEl.appendChild(btn);
    });
  } else if (miniGame && miniGame.id === 'cultural-quiz') {
    const culturalQs = EnhancedGameData.englishTest.sections.find(s => s.id === 'cultural').questions;
    const q = culturalQs[Math.floor(Math.random() * culturalQs.length)];
    contentEl.innerHTML = `<div>${q.question}</div>`;
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'mini-game-option btn-primary';
      btn.textContent = opt;
      btn.onclick = () => {
        showMiniGameFeedback(idx === q.correct, q.explanation);
      };
      contentEl.appendChild(btn);
    });
  } else {
    contentEl.innerHTML = '<div>Mini-game coming soon!</div>';
    setTimeout(() => {
      showScreen('game');
      nextChallenge();
    }, 2000);
    return;
  }

  // O botão submit só aparece se for explicitamente necessário (exemplo futuro)
  // submitBtn.style.display = 'block';
}

function showMiniGameFeedback(correct, explanation) {
  const feedbackEl = document.querySelector('.mini-game-feedback');
  feedbackEl.classList.remove('hidden');
  feedbackEl.querySelector('.feedback-icon').textContent = correct ? '✔️' : '❌';
  feedbackEl.querySelector('.feedback-text').textContent = explanation;
  setTimeout(() => {
    feedbackEl.classList.add('hidden');
    showScreen('game');
    nextChallenge();
  }, 1800);
}

// --- Diálogo (placeholder) ---
function showDialogue(challenge) {
  // Esconde botão Submit durante diálogos
  const submitBtn = document.getElementById('submit-answer');
  if (submitBtn) submitBtn.style.display = 'none';
  const dialogueBox = document.getElementById('dialogue-box');
  const contentEl = document.getElementById('dialogue-content');
  const optionsEl = document.getElementById('dialogue-options');
  // Debug output
  console.log('showDialogue called with challenge:', challenge);
  if (!challenge || !challenge.dialogues || !challenge.dialogues.length) {
    contentEl.textContent = 'No dialogue available for this challenge.';
    optionsEl.innerHTML = '';
    setTimeout(() => nextChallenge(), 1200);
    return;
  }
  let idx = 0;
  function speakTTS(text) {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    }
  }
  function renderStep() {
    const step = challenge.dialogues[idx];
    console.log('Dialogue step', idx, step);
    if (!step) { nextChallenge(); return; }
    let showText = step.text || '';
    let showTranslation = '';
    if (EnhancedGameData.playerProfile.ultraBasic && step.translation) {
      showTranslation = step.translation;
    }
    contentEl.innerHTML = `<div>${showText}</div>` + (showTranslation ? `<div class='ultra-basic-translation'>${showTranslation}</div>` : '');
    if (EnhancedGameData.playerProfile.ultraBasic) speakTTS(showText);
    optionsEl.innerHTML = '';
    if (step.options && step.options.length) {
      step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-primary';
        btn.textContent = opt.text;
        if (EnhancedGameData.playerProfile.ultraBasic && opt.translation) {
          btn.title = opt.translation;
        }
        btn.onclick = () => {
          if (opt.cultural_note) alert(opt.cultural_note);
          idx++;
          if (idx < challenge.dialogues.length) {
            renderStep();
          } else {
            nextChallenge();
          }
        };
        optionsEl.appendChild(btn);
        // Show translation below button for ultra-basic
        if (EnhancedGameData.playerProfile.ultraBasic && opt.translation) {
          const tr = document.createElement('div');
          tr.className = 'ultra-basic-translation';
          tr.textContent = opt.translation;
          optionsEl.appendChild(tr);
        }
      });
      // Show a tip/lesson for A0 users
      if (EnhancedGameData.playerProfile.ultraBasic) {
        const tip = document.createElement('div');
        tip.className = 'ultra-basic-tip';
        tip.textContent = 'Dica: Toque nas frases para ouvir a pronúncia.';
        contentEl.appendChild(tip);
      }
    } else {
      setTimeout(() => {
        idx++;
        if (idx < challenge.dialogues.length) {
          renderStep();
        } else {
          nextChallenge();
        }
      }, 1200);
    }
  }
  renderStep();
}

// --- Fato cultural (placeholder) ---
function showCulturalFact(challenge) {
  alert(challenge.fact);
  nextChallenge();
}

function nextChallenge() {
  currentChallenge++;
  showChallenge();
}

function showMiniGame(miniGameId) {
  // Exemplo: exibe tela de mini-game
  showScreen('miniGame');
  // ...carregar mini-game específico
  // Ao terminar:
  setTimeout(() => {
    showScreen('game');
    nextChallenge();
  }, 2000); // simula mini-game
}

function finishCountry() {
  // Marca país como concluído
  currentCountry.completed = true;
  EnhancedGameData.playerProfile.visitedCountries.push(currentCountry.id);
  // Volta para tela de seleção de país, bloqueando o país já visitado
  updateCountrySelectionScreen();
  showScreen('countrySelection');
  // Se todos concluídos, mostra cerimônia
  if (EnhancedGameData.countries.every(c => c.completed)) {
    showCeremony();
  }
}

function updateCountrySelectionScreen() {
  // Percorre opções e bloqueia países já visitados
  document.querySelectorAll('.country-option').forEach(opt => {
    const cid = opt.getAttribute('data-country');
    const country = EnhancedGameData.countries.find(c => c.id === cid);
    if (country && country.completed) {
      opt.classList.add('locked');
      opt.querySelector('.country-card').innerHTML += '<div class="country-completed-badge">✔️ Visited</div>';
    } else {
      opt.classList.remove('locked');
      // Remove badge se necessário
      const badge = opt.querySelector('.country-completed-badge');
      if (badge) badge.remove();
    }
  });
}

function showCeremony() {
  // Exibe tela de cerimônia/final
  showScreen('certificate');
  // ...preencher dados do certificado
}

// --- Inicialização ---
window.addEventListener('DOMContentLoaded', async () => {
  await loadExternalData();
  // Listeners para seleção de país
  document.querySelectorAll('.country-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const cid = opt.getAttribute('data-country');
      selectCountry(cid);
    });
  });
  updateCountrySelectionScreen();
});
