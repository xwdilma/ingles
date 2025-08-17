document.addEventListener("DOMContentLoaded", () => {
  const musica = document.getElementById("musica-fundo");
  let volumeFundo = parseFloat(localStorage.getItem("volumeFundo")) || 0.5;
  let volumeSFX = parseFloat(localStorage.getItem("volumeSFX")) || 0.5;
  musica.volume = volumeFundo;
  // No início do arquivo

const culturalNextBtn = document.getElementById('cultural-next');
const culturalBgInput = document.getElementById('cultural-bg');
const culturalSuggestions = document.getElementById('cultural-suggestions');

// Só adiciona listeners se o botão existir na página
if (culturalNextBtn) {
  // Atualize a função enableNext
  function enableNext() {
    const nome = nomeInput.value.trim();
    const ok = nome && selectedGender;

    culturalNextBtn.disabled = !ok;
    
    if (ok) {
      culturalNextBtn.style.borderImage = "linear-gradient(45deg, #ff9a00, #e50914, #00a8ff) 1";
      culturalNextBtn.style.background = "linear-gradient(to right, #4a235a, #2d1b2e)";
    } else {
      culturalNextBtn.style.borderImage = "linear-gradient(45deg, #555, #888) 1";
      culturalNextBtn.style.background = "linear-gradient(to right, #333, #222)";
    }
  }

  // Atualize o event listener do botão
  culturalNextBtn.addEventListener('click', () => {
    if (culturalNextBtn.disabled) return;
    playClick();
    
    const perfil = {
      name: nomeInput.value.trim(),
      gender: selectedGender,
      culturalBg: culturalBgInput.value.trim()
    };

    localStorage.setItem('playerProfile', JSON.stringify(perfil));
    document.getElementById('cultural-card').classList.add('fade-out');

    setTimeout(() => location.href = 'choose-character.html', 700);
  });
}

  let iniciou = false;
  let musicaCredits = null;

  const somHover = new Audio("assets/telainicial/sons/hover1.wav");
  const somClick = new Audio("assets/telainicial/sons/click1.wav");
  somHover.volume = volumeSFX;
  somClick.volume = volumeSFX;

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const tituloModal = document.getElementById("titulo-modal");

  const botoes = document.querySelectorAll(".botao");

  const traducoes = {
    "pt-br": {
      start: "Começar Jornada",
      howto: "Como Jogar",
      settings: "Configurações",
      credits: "Créditos",
      howto_text: "Explore diferentes culturas, complete desafios e aprenda no caminho!",
      volume: "Volume:",
      volume_fundo: "Volume da Música:",
      volume_sfx: "Volume dos Efeitos:",
      daltonismo: "Daltonismo:",
      contraste: "Alto Contraste",
      idioma: "Idioma:"
    },
    en: {
      start: "Start Quest",
      howto: "How to Play",
      settings: "Settings",
      credits: "Credits",
      howto_text: "Explore different cultures, complete challenges and learn along the way!",
      volume: "Volume:",
      volume_fundo: "Music Volume:",
      volume_sfx: "SFX Volume:",
      daltonismo: "Color Blindness:",
      contraste: "High Contrast",
      idioma: "Language:"
    }
  };

  ajustarTamanhos();
  aplicarPreferencias();

  document.body.addEventListener("click", () => {
    if (!iniciou) {
      musica.play().catch(e => console.log("Autoplay bloqueado:", e));
      iniciou = true;
    }
  });

  window.addEventListener("resize", ajustarTamanhos);

  botoes.forEach(botao => {
    botao.addEventListener("mouseover", () => {
      somHover.currentTime = 0;
      somHover.play();
    });

    botao.addEventListener("click", () => {
      somClick.currentTime = 0;
      somClick.play();

      const acao = botao.dataset.acao;
      const idioma = localStorage.getItem("idioma") || "pt-br";
      const trans = traducoes[idioma] || traducoes["pt-br"];

      switch (acao) {
        case "start":
  // Adiciona a transição
  const transicao = document.getElementById("transicaoStart");
  transicao.classList.remove("hidden");
  
  // Toca som de transição
  const audio = new Audio("assets/telainicial/sons/transicaoStart.mp3");
  audio.volume = volumeSFX;
  audio.play().catch(e => console.log("Erro ao tocar som de transição", e));
  
  // Animação de fade-in
  setTimeout(() => {
    transicao.classList.add("fade-in");
  }, 10);
  
  // Redireciona após a animação
  setTimeout(() => {
    window.location.href = "lobby.html";
  }, 1000); // 1 segundo para a animação
  break;

        case "settings":
          abrirModal(trans.settings, `
            <label data-i18n="volume_fundo">${trans.volume_fundo}</label>
            <input type="range" id="rangeVolumeFundo" min="0" max="1" step="0.01" value="${volumeFundo}"><br><br>

            <label data-i18n="volume_sfx">${trans.volume_sfx}</label>
            <input type="range" id="rangeVolumeSFX" min="0" max="1" step="0.01" value="${volumeSFX}"><br><br>

            <label data-i18n="daltonismo">${trans.daltonismo}</label>
            <select id="daltonismo">
              <option value="">Nenhum</option>
              <option value="protanopia">Protanopia</option>
              <option value="deuteranopia">Deuteranopia</option>
              <option value="tritanopia">Tritanopia</option>
              <option value="achromatopsia">Achromatopsia</option>
              <option value="bluecone">Blue Cone Monochromacy</option>
            </select><br><br>

            <div class="toggle-wrapper">
              <label data-i18n="contraste">${trans.contraste}</label>
              <div id="contraste" class="toggle"></div>
            </div><br>

            <label data-i18n="idioma">${trans.idioma}</label>
            <select id="idioma">
              <option value="pt-br">Português</option>
              <option value="en">English</option>
            </select>
          `);

          const rangeMusica = document.getElementById("rangeVolumeFundo");
          const rangeSFX = document.getElementById("rangeVolumeSFX");

          rangeMusica.addEventListener("input", e => {
            volumeFundo = parseFloat(e.target.value);
            musica.volume = volumeFundo;
            if (musicaCredits) musicaCredits.volume = volumeFundo;
            localStorage.setItem("volumeFundo", volumeFundo);
          });

          rangeSFX.addEventListener("input", e => {
            volumeSFX = parseFloat(e.target.value);
            somHover.volume = volumeSFX;
            somClick.volume = volumeSFX;
            localStorage.setItem("volumeSFX", volumeSFX);
          });

          document.getElementById("daltonismo").value = localStorage.getItem("daltonismo") || "";
          document.getElementById("daltonismo").addEventListener("change", e => {
            const tipo = e.target.value;
            localStorage.setItem("daltonismo", tipo);
            aplicarDaltonismo(tipo);
          });

          const contrasteToggle = document.getElementById("contraste");
          const contrasteAtivo = localStorage.getItem("contraste") === "true";
          if (contrasteAtivo) contrasteToggle.classList.add("on");

          contrasteToggle.addEventListener("click", () => {
            contrasteToggle.classList.toggle("on");
            const ativo = contrasteToggle.classList.contains("on");
            localStorage.setItem("contraste", ativo);
            document.body.classList.toggle("alto-contraste", ativo);
          });

          document.getElementById("idioma").value = idioma;
          document.getElementById("idioma").addEventListener("change", e => {
            localStorage.setItem("idioma", e.target.value);
            traduzirSite(e.target.value);
          });

          break;

        case "credits":
          const wasPlaying = !musica.paused;
          const currentTime = musica.currentTime;

          if (wasPlaying) musica.pause();

          musicaCredits = new Audio("assets/telainicial/credits/credits.mp3");
          musicaCredits.volume = volumeFundo;
          musicaCredits.loop = true;
          musicaCredits.play().catch(e => console.log("Erro música créditos", e));

          abrirModal(trans.credits, `
            <div class="credits-container">
              <div class="credits-header">
                <img src="assets/telainicial/imagens/logo.png" alt="Logo" class="credit-logo">
                <h3 class="pixel-font" style="color:#FFD700;text-shadow:2px 2px #000;">MISSING IN ACTION</h3>
              </div>
              
              <div class="credits-content">
                <!-- Seção Desenvolvimento -->
                <div class="credits-section">
                  <div class="section-title">
                    <img src="assets/telainicial/credits/laptop.png" alt="Desenvolvimento" class="credit-icon">
                    <h4>DESENVOLVIMENTO</h4>
                  </div>
                  <div class="credit-item">
                    <img src="assets/telainicial/credits/heart.png" alt="Coração" class="heart-icon">
                    <div>
                      <p class="credit-name">Hugo do Nascimento Sousa</p>
                      <p class="credit-role">Desenvolvedor principal e programador líder</p>
                    </div>
                  </div>
                  <div class="credit-item">
                    <img src="assets/telainicial/credits/heart.png" alt="Coração" class="heart-icon">
                    <div>
                      <p class="credit-name">Emmanuel</p>
                      <p class="credit-role">Programador secundário (narrativa/roteiro)</p>
                    </div>
                  </div>
                </div>
                
                <!-- Seção Arte -->
                <div class="credits-section">
                  <div class="section-title">
                    <img src="assets/telainicial/credits/art.png" alt="Arte" class="credit-icon">
                    <h4>DIREÇÃO DE ARTE</h4>
                  </div>
                  <div class="credit-item">
                    <img src="assets/telainicial/credits/heart.png" alt="Coração" class="heart-icon">
                    <div>
                      <p class="credit-name">Ana Eloiza</p>
                      <p class="credit-role">Arte dos personagens e coautoria narrativa</p>
                    </div>
                  </div>
                  <div class="credit-item">
                    <img src="assets/telainicial/credits/heart.png" alt="Coração" class="heart-icon">
                    <div>
                      <p class="credit-name">Jaqueline</p>
                      <p class="credit-role">Cenários e elementos gráficos</p>
                    </div>
                  </div>
                  <div class="credit-item">
                    <img src="assets/telainicial/credits/heart.png" alt="Coração" class="heart-icon">
                    <div>
                      <p class="credit-name">Ana Clara</p>
                      <p class="credit-role">Paleta de cores e acessibilidade</p>
                    </div>
                  </div>
                </div>
                
                <!-- Seção Áudio -->
                <div class="credits-section">
                  <div class="section-title">
                    <img src="assets/telainicial/credits/music.png" alt="Música" class="credit-icon">
                    <h4>TRILHA SONORA</h4>
                  </div>
                  <div class="credit-item">
                    <img src="assets/telainicial/credits/heart.png" alt="Coração" class="heart-icon">
                    <div>
                      <p class="credit-name">Thiago</p>
                      <p class="credit-role">Efeitos sonoros e curadoria musical</p>
                    </div>
                  </div>
                </div>
                
                <!-- Seção Testes -->
                <div class="credits-section">
                  <div class="section-title">
                    <img src="assets/telainicial/credits/lab.png" alt="Testes" class="credit-icon">
                    <h4>TESTES DE QUALIDADE</h4>
                  </div>
                  <p class="team-credit">Toda a equipe participou ativamente</p>
                </div>
              </div>
              
              <div class="credits-footer">
                <div class="botao-container">
                  <button class="botao-recursos" onclick="window.location.href='fontes.html'">
                    <img src="assets/telainicial/credits/archive.png" alt="Estrela" class="credit-icon-small">
                    RECURSOS E LICENÇAS
                  </button>
                  <p>Ver fontes, músicas e assets públicos</p>
                </div>
              </div>
              
              <div class="credits-thanks">
                <img src="assets/telainicial/credits/star.png" alt="Estrela" class="credit-icon-small">
                <p>OBRIGADO POR JOGAR!</p>
                <img src="assets/telainicial/credits/star.png" alt="Estrela" class="credit-icon-small">
              </div>
            </div>
          `, () => {
            if (musicaCredits) {
              musicaCredits.pause();
              musicaCredits.currentTime = 0;
              musicaCredits = null;
            }
            if (wasPlaying) {
              musica.currentTime = currentTime;
              musica.play().catch(e => console.log("Erro ao retomar música", e));
            }
          });
          break;

        case "howto":
          abrirLivro();
          break;
      }
    });
  });

  function abrirModal(titulo, html, onClose = () => {}) {
    tituloModal.textContent = titulo;
    modalContent.innerHTML = html;
    modal.classList.add("active");

    const fecharBtn = document.querySelector('.fechar');
    if (fecharBtn) {
      const originalOnClick = fecharBtn.onclick;
      fecharBtn.onclick = () => {
        onClose();
        if (originalOnClick) originalOnClick();
      };
    }

    window.fecharModal = () => {
      onClose();
      modal.classList.remove("active");
    };
  }

  function traduzirSite(lang) {
    const trans = traducoes[lang] || traducoes["pt-br"];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const chave = el.dataset.i18n;
      if (trans[chave]) el.textContent = trans[chave];
    });
  }

  function aplicarPreferencias() {
    if (localStorage.getItem("daltonismo")) aplicarDaltonismo(localStorage.getItem("daltonismo"));
    if (localStorage.getItem("contraste") === "true") {
      document.body.classList.add("alto-contraste");
    }

    const idiomaSalvo = localStorage.getItem("idioma") || "pt-br";
    traduzirSite(idiomaSalvo);
  }

  function aplicarDaltonismo(tipo) {
    document.body.classList.remove("protanopia", "deuteranopia", "tritanopia", "achromatopsia", "bluecone");
    if (tipo) document.body.classList.add(tipo);
  }

  function ajustarTamanhos() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Ajuste para telas muito pequenas
  if (window.innerWidth < 400) {
    document.querySelectorAll('.botao').forEach(botao => {
      botao.style.fontSize = '0.7rem';
      });
    }
  }

  function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
      document.body.classList.add('portrait');
      document.body.classList.remove('landscape');
    } else {
      document.body.classList.add('landscape');
      document.body.classList.remove('portrait');
    }
  }

  window.addEventListener('load', checkOrientation);
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);
});

function checkMobileLayout() {
  const menuBotoes = document.querySelector('.menu-botoes');
  if (window.innerWidth <= 768) {
    menuBotoes.style.display = 'grid';
    menuBotoes.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else {
    menuBotoes.style.display = 'flex';
    menuBotoes.style.flexDirection = 'column';
  }
}

// Verificar ao carregar e redimensionar
window.addEventListener('load', checkMobileLayout);
window.addEventListener('resize', checkMobileLayout);
