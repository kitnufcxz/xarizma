// Код для музыкального плеера
const audio = document.getElementById('audio-player');
const player = document.querySelector('.dark-audio-player');
const playPauseBtn = document.querySelector('.play-pause-btn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const progressThumb = document.querySelector('.progress-thumb');
const timeDisplay = document.querySelector('.time');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
const nowPlaying = document.querySelector('.now-playing');
const playlistItems = document.querySelectorAll('.playlist-item');

let isMuted = false;
let previousVolume = 0.5;

function showMusicPlayer() {
    player.style.display = 'block';
    loadSong(1, 'Choose Life');
}

function loadSong(songNum, songName) {
    audio.src = `assets/audio/song${songNum}.mp3`;
    audio.volume = previousVolume;
    volumeSlider.value = previousVolume;
    updateVolumeIcon(previousVolume);
    audio.play()
        .then(() => {
            playPauseBtn.textContent = '❚❚';
            updateNowPlaying(songName);
        })
        .catch(error => {
            console.error("Ошибка воспроизведения:", error);
        });
}

audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100 || 0;
    progress.style.width = `${progressPercent}%`;
    
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
    
    timeDisplay.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}

progressBar.addEventListener('click', setProgress);

function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    if (audio.paused) {
        audio.play()
            .then(() => {
                playPauseBtn.textContent = '❚❚';
            })
            .catch(error => {
                console.error("Ошибка воспроизведения:", error);
            });
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
    }
}

volumeBtn.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', updateVolume);

function toggleMute() {
    if (isMuted) {
        audio.volume = previousVolume;
        volumeSlider.value = previousVolume;
        isMuted = false;
    } else {
        previousVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
        isMuted = true;
    }
    updateVolumeIcon(audio.volume);
}

function updateVolume() {
    const volume = volumeSlider.value;
    audio.volume = volume;
    
    if (volume > 0 && isMuted) {
        isMuted = false;
    }
    
    previousVolume = volume;
    updateVolumeIcon(volume);
}

function updateVolumeIcon(volume) {
    if (volume == 0 || isMuted) {
        volumeBtn.textContent = '🔇';
    } else if (volume < 0.5) {
        volumeBtn.textContent = '🔈';
    } else {
        volumeBtn.textContent = '🔊';
    }
}

playlistItems.forEach(item => {
    item.addEventListener('click', function() {
        const songNum = this.getAttribute('data-song');
        const songName = this.textContent;
        
        playlistItems.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
        
        loadSong(songNum, songName);
    });
});

function updateNowPlaying(name) {
    nowPlaying.textContent = name;
}

audio.addEventListener('ended', playNextSong);

function playNextSong() {
    const currentItem = document.querySelector('.playlist-item.active');
    let nextItem = currentItem.nextElementSibling;
    
    if (!nextItem) {
        nextItem = document.querySelector('.playlist-item:first-child');
    }
    
    if (nextItem) {
        const songNum = nextItem.getAttribute('data-song');
        const songName = nextItem.textContent;
        nextItem.click();
    }
}