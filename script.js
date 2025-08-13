// Captcha functionality
let captchaChecked = false;
let captchaVerified = false;

function toggleCaptcha() {
    const checkbox = document.getElementById('captchaCheckbox');
    const status = document.getElementById('captchaStatus');
    const enterBtn = document.getElementById('enterBtn');
    
    if (!captchaChecked) {
        checkbox.classList.add('checked');
        captchaChecked = true;
        
        // Show loading
        status.innerHTML = '<div class="captcha-loading"></div>Verifying...';
        
        // Simulate verification process
        setTimeout(() => {
            status.innerHTML = 'LEGIT';
            status.classList.add('success');
            captchaVerified = true;
            
            // Show enter button
            setTimeout(() => {
                enterBtn.classList.add('visible');
            }, 500);
        }, 2000);
    }
}

function enterSite() {
    if (!captchaVerified) return;

    // Ensure a song is loaded
    if (!audioPlayer.src || audioPlayer.src.trim() === "") {
        if (songs.length > 0) {
            loadCurrentSong(); // sets audioPlayer.src + UI
        } else {
            alert('Please upload songs first and update the songs array.');
            return;
        }
    }

    // Start playback immediately during the click (user gesture)
    audioPlayer.play()
        .then(() => {
            isPlaying = true;
            playBtn.textContent = 'Pause';
        })
        .catch(err => {
            console.warn('Playback failed (file path or autoplay policy):', err);
            alert('Could not start audio. Check that the files exist and paths are correct.');
        });

    // Then proceed with your UI transitions
    const overlay = document.getElementById('captchaOverlay');
    const mainContent = document.getElementById('mainContent');
    overlay.classList.add('hidden');
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 500);
}


// Music player functionality
let currentSongIndex = 0;
let isPlaying = false;
let songs = []; // Will be populated when user uploads songs

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const volumeSlider = document.getElementById('volumeSlider');
const currentSongElement = document.getElementById('currentSong');

// Initialize volume
audioPlayer.volume = 0.5;

// Volume control
volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value / 100;
});

// Play/Pause functionality
function togglePlay() {
    if (songs.length === 0) {
        alert('Please upload songs first! Add audio files to your audio/ folder and update the songs array in script.js');
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.textContent = 'Play';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playBtn.textContent = 'Pause';
        isPlaying = true;
    }
}

// Next song
function nextSong() {
    if (songs.length === 0) return;
    
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadCurrentSong();
    if (isPlaying) audioPlayer.play();
}

// Previous song
function previousSong() {
    if (songs.length === 0) return;
    
    currentSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    loadCurrentSong();
    if (isPlaying) audioPlayer.play();
}

// Load current song
function loadCurrentSong() {
    if (songs.length > 0) {
        audioPlayer.src = songs[currentSongIndex].src;
        currentSongElement.textContent = songs[currentSongIndex].title;
    }
}

// Auto-advance to next song when current one ends
audioPlayer.addEventListener('ended', nextSong);

songs = [
    { title: "Fuck Em We Ball - B.o.B", src: "audio/B.o.B - Fuck Em We Ball ft. Spodee.mp3" },
    { title: "We Ball - Meek Mill", src: "audio/We Ball -    Meek Mill  feat  Young Thug.mp3" },
    { title: "Fuck It We Ball - Boosie", src: "audio/Fuck It We Ball (feat. OG Dre).mp3" }
];

// Load first song and auto-play
if (songs.length > 0) {
    loadCurrentSong();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function copyContract() {
    const contractText = document.getElementById('contractText').textContent;
    navigator.clipboard.writeText(contractText).then(() => {
        alert('Contract address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add glowing effect to CTA buttons on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero::before');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Console message for developers
console.log('🚀 FUCK IT WE BALL - $FUCKIT');
console.log('💎 To add your music:');
console.log('1. Upload your audio files to the audio/ folder');
console.log('2. Update the songs array in script.js');
console.log('3. Uncomment the auto-play functionality if desired');
console.log('💰 Ready to ball!');