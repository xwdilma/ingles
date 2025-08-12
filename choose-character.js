document.addEventListener("DOMContentLoaded", () => {
  console.log("🎮 Culture Quest - Character Selection Initialized");

  // =====================
  // 1. VERIFICAÇÃO INICIAL
  // =====================
  const essentialElements = [
    'character-grid', 'select-character', 'random-character',
    'prev-character', 'next-character', 'character-portrait',
    'char-name', 'char-gender', 'char-orientation', 'char-bio',
    'compatibility-reason', 'particles'
  ];

  const missingElements = essentialElements.filter(id => !document.getElementById(id));
  if (missingElements.length > 0) {
    console.error("🚨 Elementos essenciais faltando:", missingElements);
    alert("Erro crítico: Alguns elementos não foram carregados. Recarregue a página.");
    return;
  }

  // =================
  // 2. SISTEMA DE ÁUDIO
  // =================
  const audioSystem = {
    elements: {
      music: document.getElementById('characterMusic'),
      click: document.getElementById('characterClick'),
      select: document.getElementById('characterSelect'),
      loading: document.getElementById('loadingMusic')
    },
    
    init() {
      // Configura volumes
      const volumeFundo = parseFloat(localStorage.getItem("volumeFundo")) || 0.5;
      const volumeSFX = parseFloat(localStorage.getItem("volumeSFX")) || 0.5;
      
      this.elements.music.volume = volumeFundo;
      this.elements.click.volume = volumeSFX;
      this.elements.select.volume = volumeSFX;
      this.elements.loading.volume = volumeFundo;
      
      // Inicia música após interação
      this.enableAudio();
    },
    
    enableAudio() {
      const playAudio = () => {
        this.elements.music.play().catch(e => console.warn("🔇 Autoplay bloqueado:", e));
        document.body.removeEventListener('click', playAudio);
      };
      document.body.addEventListener('click', playAudio);
    },
    
    playSFX(type) {
      try {
        this.elements[type].currentTime = 0;
        this.elements[type].play();
      } catch (e) {
        console.warn(`Erro ao tocar SFX ${type}:`, e);
      }
    }
  };

  audioSystem.init();

  // ======================
  // 3. ELEMENTOS DO DOM
  // ======================
  const dom = {
    // Container principal
    container: document.getElementById('character-container'),
    
    // Elementos da grade de personagens
    grid: document.getElementById('character-grid'),
    prevBtn: document.getElementById('prev-character'),
    nextBtn: document.getElementById('next-character'),
    
    // Detalhes do personagem
    portrait: document.getElementById('character-portrait'),
    name: document.getElementById('char-name'),
    gender: document.getElementById('char-gender'),
    orientation: document.getElementById('char-orientation'),
    bio: document.getElementById('char-bio'),
    compatReason: document.getElementById('compatibility-reason'),
    
    // Botões de controle
    selectBtn: document.getElementById('select-character'),
    randomBtn: document.getElementById('random-character'),
    backBtn: document.getElementById('back-button'),
    
    // Telas de carregamento
    transitionScreen: document.getElementById('transition-screen'),
    transitionMessage: document.getElementById('transition-message'),
    premiumLoading: document.getElementById('premium-loading')
  };

  // ======================
  // 4. DADOS DO JOGO
  // ======================
  const gameData = {
    characters: [
      {
        id: 1,
        name: "Luna",
        gender: "Female",
        orientation: "Bisexual",
        bio: "A free-spirited artist who expresses herself through vibrant murals. She believes art can bridge cultural gaps.",
        image: "assets/lobby/personagens/personagem1.png",
        traits: ["artistic", "creative", "expressive"]
      },
      {
        id: 2,
        name: "Mira",
        gender: "Female",
        orientation: "Lesbian",
        bio: "A dedicated anthropologist researching indigenous cultures. She's passionate about preserving traditions.",
        image: "assets/lobby/personagens/personagem2.png",
        traits: ["academic", "curious", "respectful"]
      },
      {
        id: 3,
        name: "Kai",
        gender: "Male",
        orientation: "Gay",
        bio: "A chef specializing in fusion cuisine. He loves combining flavors from different cultures in surprising ways.",
        image: "assets/lobby/personagens/personagem3.png",
        traits: ["passionate", "innovative", "social"]
      },
      {
        id: 4,
        name: "Rio",
        gender: "Male",
        orientation: "Bisexual",
        bio: "A world-traveling musician who collects instruments and stories from every culture he encounters.",
        image: "assets/lobby/personagens/personagem4.png",
        traits: ["musical", "adaptable", "storyteller"]
      },
      {
        id: 5,
        name: "Zee",
        gender: "Non-binary",
        orientation: "Pansexual",
        bio: "A digital nomad creating content about cultural intersections in the modern world.",
        image: "assets/lobby/personagens/personagem5.png",
        traits: ["tech-savvy", "inclusive", "communicative"]
      },
      {
        id: 6,
        name: "Ari",
        gender: "Genderfluid",
        orientation: "Queer",
        bio: "A historian focused on overlooked narratives and marginalized voices throughout history.",
        image: "assets/lobby/personagens/personagem6.png",
        traits: ["thoughtful", "insightful", "justice-oriented"]
      }
    ],
    
    playerProfile: JSON.parse(localStorage.getItem('playerProfile')) || {},
    selectedCharacter: null,
    currentPage: 0,
    charsPerPage: 6,
    
    loadingTips: [
      "Did you know? In Brazil, carnival is one of the biggest cultural celebrations in the world!",
      "Cultural Tip: In Japan, it's polite to bow when greeting someone.",
      "Fun Fact: The world's oldest known musical instrument is a 40,000-year-old flute.",
      "Language Insight: There are over 7,000 languages spoken worldwide today.",
      "Travel Tip: Always learn how to say 'thank you' in the local language when traveling."
    ]
  };

  // ======================
  // 5. FUNÇÕES PRINCIPAIS
  // ======================
  const renderCharacters = () => {
    dom.grid.innerHTML = '';
    
    // Filtra personagens por gênero se especificado
    let filteredChars = gameData.characters;
    if (gameData.playerProfile.gender && gameData.playerProfile.gender !== "Other") {
      filteredChars = gameData.characters.filter(char => char.gender === gameData.playerProfile.gender);
    }
    
    // Ordena por compatibilidade
    filteredChars.sort((a, b) => {
      const aCompat = calculateCompatibility(a);
      const bCompat = calculateCompatibility(b);
      return bCompat - aCompat;
    });
    
    // Mostra a página atual
    const startIdx = gameData.currentPage * gameData.charsPerPage;
    const endIdx = startIdx + gameData.charsPerPage;
    const pageChars = filteredChars.slice(startIdx, endIdx);
    
    pageChars.forEach(character => {
      const card = document.createElement('div');
      card.className = 'character-card';
      if (calculateCompatibility(character) > 0) {
        card.classList.add('highlighted');
      }
      
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" loading="lazy">
        <div class="char-name">${character.name}</div>
      `;
      
      card.addEventListener('click', () => selectCharacter(character));
      dom.grid.appendChild(card);
    });
    
    // Atualiza botões de paginação
    dom.prevBtn.disabled = gameData.currentPage === 0;
    dom.nextBtn.disabled = endIdx >= filteredChars.length;
  };

  const calculateCompatibility = (character) => {
    let score = 0;
    
    if (gameData.playerProfile.gender && character.gender === gameData.playerProfile.gender) {
      score += 2;
    }
    
    if (gameData.playerProfile.orientation && 
        character.orientation.toLowerCase() === gameData.playerProfile.orientation.toLowerCase()) {
      score += 3;
    }
    
    return score;
  };

  const selectCharacter = (character) => {
    audioSystem.playSFX('click');
    gameData.selectedCharacter = character;
    
    // Atualiza painel de detalhes
    dom.portrait.innerHTML = `<img src="${character.image}" alt="${character.name}">`;
    dom.name.textContent = character.name;
    dom.gender.textContent = `Gender: ${character.gender}`;
    dom.orientation.textContent = `Orientation: ${character.orientation}`;
    dom.bio.textContent = character.bio;
    dom.compatReason.textContent = getCompatibilityReason(character);
    
    dom.selectBtn.disabled = false;
  };

  const getCompatibilityReason = (character) => {
    const reasons = [];
    
    if (gameData.playerProfile.gender && character.gender === gameData.playerProfile.gender) {
      reasons.push(`Same gender (${character.gender})`);
    }
    
    if (gameData.playerProfile.orientation && 
        character.orientation.toLowerCase() === gameData.playerProfile.orientation.toLowerCase()) {
      reasons.push(`Same orientation (${character.orientation})`);
    }
    
    return reasons.length > 0 
      ? `Best match because: ${reasons.join(', ')}`
      : 'No specific compatibility factors';
  };

  // ======================
  // 6. FUNÇÕES DE CONTROLE
  // ======================
  const selectRandomCharacter = () => {
    audioSystem.playSFX('click');
    let filteredChars = gameData.characters;
    if (gameData.playerProfile.gender && gameData.playerProfile.gender !== "Other") {
      filteredChars = gameData.characters.filter(char => char.gender === gameData.playerProfile.gender);
    }
    
    const randomIndex = Math.floor(Math.random() * filteredChars.length);
    selectCharacter(filteredChars[randomIndex]);
  };

  const prevPage = () => {
    audioSystem.playSFX('click');
    if (gameData.currentPage > 0) {
      gameData.currentPage--;
      renderCharacters();
    }
  };

  const nextPage = () => {
    audioSystem.playSFX('click');
    let filteredChars = gameData.characters;
    if (gameData.playerProfile.gender && gameData.playerProfile.gender !== "Other") {
      filteredChars = gameData.characters.filter(char => char.gender === gameData.playerProfile.gender);
    }
    
    if ((gameData.currentPage + 1) * gameData.charsPerPage < filteredChars.length) {
      gameData.currentPage++;
      renderCharacters();
    }
  };

  const backToLobby = () => {
    audioSystem.playSFX('click');
    audioSystem.elements.music.pause();
    dom.container.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'lobby.html';
    }, 500);
  };

  // ======================
  // 7. SISTEMA DE CARREGAMENTO PREMIUM
  // ======================
  const initPremiumLoading = () => {
    // Cria partículas para o background
    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'pl-particle-canvas';
    document.getElementById('pl-particles').appendChild(particleCanvas);
    
    const canvas = particleCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    const particles = [];
    const particleCount = 30;
    
    // Cria partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 150}, 80%, 60%)`,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    // Anima partículas
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.angle += 0.01;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        
        // Mantém as partículas dentro do canvas
        if (p.x < 0 || p.x > canvas.width) p.angle = Math.PI - p.angle;
        if (p.y < 0 || p.y > canvas.height) p.angle = -p.angle;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
  };

  // Mostra tela de transição
  const showTransitionScreen = (characterName) => {
    dom.transitionMessage.textContent = `${characterName} selected! Preparing adventure...`;
    dom.transitionScreen.classList.add('active');
    
    // Depois de 3 segundos, mostra a tela de carregamento premium
    setTimeout(() => {
      dom.transitionScreen.classList.remove('active');
      showPremiumLoadingScreen();
    }, 3000);
  };

  // Mostra tela de carregamento premium
  const showPremiumLoadingScreen = () => {
    const selectedCharacter = gameData.characters.find(c => c.id === gameData.playerProfile.character);
    
    // Configura informações do personagem
    document.getElementById('pl-character-image').src = selectedCharacter.image;
    document.getElementById('pl-character-name').textContent = selectedCharacter.name;
    document.getElementById('pl-character-bio').textContent = selectedCharacter.bio;
    
    // Mostra dica aleatória
    const tips = [
      "Did you know? In Brazil, people greet each other with kisses on the cheek in most regions.",
      "Cultural Tip: In Japan, it's considered rude to eat while walking in public.",
      "Language Fact: The word 'culture' comes from the Latin 'cultura' meaning 'to cultivate'.",
      "Travel Advice: Always try local street food - it's often the most authentic culinary experience!",
      "Fun Fact: There are over 7,000 languages spoken in the world today."
    ];
    
    document.getElementById('pl-tip').textContent = tips[Math.floor(Math.random() * tips.length)];
    
    // Mostra tela de carregamento
    dom.premiumLoading.classList.add('active');
    
    // Simula progresso de carregamento
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) progress = 100;
      
      document.getElementById('pl-progress-bar').style.width = `${progress}%`;
      document.getElementById('pl-progress-text').textContent = `${Math.floor(progress)}%`;
      
      // Quando completar
      if (progress === 100) {
        clearInterval(progressInterval);
        
        // Adiciona pequeno delay antes de redirecionar
        setTimeout(() => {
          window.location.href = 'game.html';
        }, 500);
      }
    }, 300);
  };

  const confirmSelection = () => {
    audioSystem.playSFX('select');
    
    // Salva seleção
    gameData.playerProfile.character = gameData.selectedCharacter.id;
    localStorage.setItem('playerProfile', JSON.stringify(gameData.playerProfile));
    
    // Mostra tela de transição
    showTransitionScreen(gameData.selectedCharacter.name);
    
    // Pausa música principal
    audioSystem.elements.music.pause();
  };

  // ======================
  // 8. ANIMAÇÃO DE PARTÍCULAS
  // ======================
  const initParticles = () => {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    };

    animate();
  };

  // ======================
  // 9. EVENT LISTENERS
  // ======================
  const addEventListeners = () => {
    // Botões principais
    dom.selectBtn.addEventListener('click', confirmSelection);
    dom.randomBtn.addEventListener('click', selectRandomCharacter);
    dom.prevBtn.addEventListener('click', prevPage);
    dom.nextBtn.addEventListener('click', nextPage);
    dom.backBtn.addEventListener('click', backToLobby);
    
    // Redimensionamento da janela
    window.addEventListener('resize', () => {
      const canvas = document.getElementById('particles');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });
  };

  // ======================
  // 10. INICIALIZAÇÃO
  // ======================
  const initGame = () => {
    console.log("🔄 Inicializando jogo...");
    addEventListeners();
    renderCharacters();
    initParticles();
    initPremiumLoading();
    console.log("✅ Jogo inicializado com sucesso");
  };

  initGame();
});