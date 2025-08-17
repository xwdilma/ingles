// musicManager.js
// Gerencia a trilha sonora do jogo

const musicTracks = {
    'choose-character': 'assets/audio/song1.mp3',
    'loading': 'assets/audio/song2.mp3',
    'test-choice': 'assets/audio/song3.mp3',
    'test': 'assets/audio/song4.mp3',
    'result': 'assets/audio/song5.mp3',
    'country-choice': 'assets/audio/song6.mp3',
    'usa-dialogue': 'assets/audio/song7.mp3',
    'usa-minigame': 'assets/audio/song8.mp3',
    'uk-dialogue': 'assets/audio/song9.mp3',
    'uk-minigame': 'assets/audio/song10.mp3',
    'australia-dialogue': 'assets/audio/song11.mp3',
    'australia-minigame': 'assets/audio/song12.mp3',
    'canada-dialogue': 'assets/audio/song13.mp3',
    'canada-minigame': 'assets/audio/song14.mp3',
    'final': 'assets/audio/song15.mp3',
};

let currentAudio = null;

function playMusic(trackKey, options = {}) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    const src = musicTracks[trackKey];
    if (!src) return;
    currentAudio = new Audio(src);
    currentAudio.loop = true;
    currentAudio.volume = options.volume !== undefined ? options.volume : 0.2; // volume baixo
    currentAudio.play();
}

function setMusicVolume(volume) {
    if (currentAudio) {
        currentAudio.volume = volume;
    }
}

function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

window.musicManager = {
    playMusic,
    setMusicVolume,
    stopMusic
};
