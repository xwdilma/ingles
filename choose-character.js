
document.addEventListener("DOMContentLoaded", () => {
  // ==== Áudio ====
  // SFX antigo mantido, mas música agora via musicManager.js
  const audioSystem = {
    elements: {
      click: document.getElementById('characterClick'),
      select: document.getElementById('characterSelect')
    },
    playSFX(type) {
      try {
        this.elements[type].currentTime = 0;
        this.elements[type].play();
      } catch {}
    }
  };
  // Inicia trilha sonora da escolha de personagem
  window.musicManager && window.musicManager.playMusic('choose-character', { volume: 0.18 });

  // ==== Dados ====
  const characters = [
    { id: 1, name: "Luna", gender: "Female", orientation: "Bisexual", bio: "A free-spirited artist who expresses herself through vibrant murals. She believes art can bridge cultural gaps.", image: "assets/lobby/personagens/personagem1.png" },
    { id: 2, name: "Mira", gender: "Female", orientation: "Lesbian", bio: "A dedicated anthropologist researching indigenous cultures. She's passionate about preserving traditions.", image: "assets/lobby/personagens/personagem2.png" },
    { id: 3, name: "Kai", gender: "Male", orientation: "Gay", bio: "A chef specializing in fusion cuisine. He loves combining flavors from different cultures in surprising ways.", image: "assets/lobby/personagens/personagem3.png" },
    { id: 4, name: "Rio", gender: "Male", orientation: "Bisexual", bio: "A world-traveling musician who collects instruments and stories from every culture he encounters.", image: "assets/lobby/personagens/personagem4.png" },
    { id: 5, name: "Zee", gender: "Non-binary", orientation: "Pansexual", bio: "A digital nomad creating content about cultural intersections in the modern world.", image: "assets/lobby/personagens/personagem5.png" },
    { id: 6, name: "Ari", gender: "Genderfluid", orientation: "Queer", bio: "A historian focused on overlooked narratives and marginalized voices throughout history.", image: "assets/lobby/personagens/personagem6.png" }
  ];
  let selectedIdx = 0;
  let playerProfile = JSON.parse(localStorage.getItem('playerProfile')) || {};

  // ==== DOM ====
  const dom = {
    carouselTrack: document.getElementById('carousel-track'),
    left: document.getElementById('carousel-left'),
    right: document.getElementById('carousel-right'),
    portrait: document.getElementById('character-portrait'),
    name: document.getElementById('char-name'),
    gender: document.getElementById('char-gender'),
    orientation: document.getElementById('char-orientation'),
    bio: document.getElementById('char-bio'),
    compat: document.getElementById('compatibility-reason'),
    random: document.getElementById('random-character'),
    select: document.getElementById('select-character'),
    loading: document.getElementById('modern-loading'),
    loadingBar: document.getElementById('loading-bar'),
    loadingImg: document.getElementById('loading-character-img'),
    loadingName: document.getElementById('loading-character-name'),
    loadingBio: document.getElementById('loading-character-bio'),
    loadingTip: document.getElementById('loading-tip'),
    back: document.getElementById('back-button')
  };

  // ==== Carrossel ====
  function renderCarousel() {
    dom.carouselTrack.innerHTML = '';
    characters.forEach((char, idx) => {
      const card = document.createElement('div');
      card.className = 'carousel-card' + (idx === selectedIdx ? ' selected' : '');
      card.innerHTML = `<img src="${char.image}" alt="${char.name}"><div class="char-name">${char.name}</div>`;
      card.onclick = () => { selectCharacter(idx); };
      dom.carouselTrack.appendChild(card);
    });
    dom.carouselTrack.scrollTo({ left: Math.max(0, (selectedIdx-1)*140), behavior: 'smooth' });
  }

  function selectCharacter(idx) {
    selectedIdx = idx;
    renderCarousel();
    const char = characters[selectedIdx];
    dom.portrait.innerHTML = `<img src="${char.image}" alt="${char.name}">`;
    dom.name.textContent = char.name;
    dom.gender.textContent = `Gender: ${char.gender}`;
    dom.orientation.textContent = `Orientation: ${char.orientation}`;
    dom.bio.textContent = char.bio;
    dom.compat.textContent = getCompatibility(char);
    dom.select.disabled = false;
    audioSystem.playSFX('click');
  }

  function getCompatibility(char) {
    let reasons = [];
    if (playerProfile.gender && char.gender === playerProfile.gender) reasons.push(`Same gender (${char.gender})`);
    if (playerProfile.orientation && char.orientation.toLowerCase() === (playerProfile.orientation||'').toLowerCase()) reasons.push(`Same orientation (${char.orientation})`);
    return reasons.length ? `Best match: ${reasons.join(', ')}` : '';
  }

  dom.left.onclick = () => {
    if (selectedIdx > 0) selectCharacter(selectedIdx-1);
  };
  dom.right.onclick = () => {
    if (selectedIdx < characters.length-1) selectCharacter(selectedIdx+1);
  };
  dom.random.onclick = () => {
    selectCharacter(Math.floor(Math.random()*characters.length));
  };
  dom.back.onclick = () => {
    audioSystem.playSFX('click');
    window.location.href = 'lobby.html';
  };

  dom.select.onclick = () => {
    audioSystem.playSFX('select');
    playerProfile.character = characters[selectedIdx].id;
    localStorage.setItem('playerProfile', JSON.stringify(playerProfile));
    showLoadingScreen();
  };

  // ==== Loading Moderno ====
  function showLoadingScreen() {
    dom.loading.classList.add('active');
    dom.loadingImg.src = characters[selectedIdx].image;
    dom.loadingName.textContent = characters[selectedIdx].name;
    dom.loadingBio.textContent = characters[selectedIdx].bio;
    const tips = [
      "Did you know? In Brazil, people greet each other with kisses on the cheek in most regions.",
      "Cultural Tip: In Japan, it's considered rude to eat while walking in public.",
      "Language Fact: The word 'culture' comes from the Latin 'cultura' meaning 'to cultivate'.",
      "Travel Advice: Always try local street food - it's often the most authentic culinary experience!",
      "Fun Fact: There are over 7,000 languages spoken in the world today."
    ];
    dom.loadingTip.textContent = tips[Math.floor(Math.random()*tips.length)];
    dom.loadingBar.style.width = '0%';
    let progress = 0;
    // Troca para música de loading (transição)
    window.musicManager && window.musicManager.playMusic('loading', { volume: 0.18 });
    const interval = setInterval(() => {
      progress += Math.random()*18+7;
      if (progress > 100) progress = 100;
      dom.loadingBar.style.width = progress+'%';
      if (progress === 100) {
        clearInterval(interval);
        setTimeout(()=>{
          window.location.href = 'game.html';
        }, 600);
      }
    }, 350);
  }

  // ==== Inicialização ====
  function init() {
    selectCharacter(0);
    renderCarousel();
  }
  init();
});

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

  // (fim do novo script)