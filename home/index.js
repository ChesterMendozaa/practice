document.addEventListener('DOMContentLoaded', function() {
    const landing = document.querySelector('.landing');
    const sections = [
        {
            id: 'section1',
            audioId: 'musicPlayer1',
            buttonId: 'playPauseBtn1',
            startTime: 148,
            songName: '505'
        },
        {
            id: 'section2',
            audioId: 'musicPlayer2',
            buttonId: 'playPauseBtn2',
            startTime: 220,
            songName: 'Let Down'
        },
        {
            id: 'section3',
            audioId: 'musicPlayer3',
            buttonId: 'playPauseBtn3',
            startTime: 190.8,
            songName: 'Touch'
        },
        {
            id: 'section4',
            audioId: 'musicPlayer4',
            buttonId: 'playPauseBtn4',
            startTime: 159.7,
            songName: 'Touch'
        },
        {
            id: 'section5',
            audioId: 'musicPlayer5',
            buttonId: 'playPauseBtn5',
            startTime: 147.2,
            songName: 'Multo'
        },
        {
            id: 'section6',
            audioId: 'musicPlayer6',
            buttonId: 'playPauseBtn6',
            startTime: 121.2,
            songName: 'No Other Heart'
        }
        

    ];
    
    sections.forEach((section) => {
        const sectionElement = document.getElementById(section.id);
        const musicPlayer = document.getElementById(section.audioId);
        const playPauseBtn = document.getElementById(section.buttonId);
        const volumeControl = sectionElement.querySelector('.volume-slider');
        const progressBar = sectionElement.querySelector('.progress-bar');
        const progress = sectionElement.querySelector('.progress');
        
        // Set initial volume
        musicPlayer.volume = volumeControl.value;

        // Progress bar update
        musicPlayer.addEventListener('timeupdate', () => {
            const percentage = (musicPlayer.currentTime / musicPlayer.duration) * 100;
            progress.style.width = `${percentage}%`;
        });

        // Progress bar click
        progressBar.addEventListener('click', (e) => {
            const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const percentage = (clickPosition / progressBar.offsetWidth);
            musicPlayer.currentTime = percentage * musicPlayer.duration;
        });
    
        // Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sectionElement.classList.add('visible');
                    
                    // Pause all other players
                    sections.forEach(s => {
                        if (s.id !== section.id) {
                            const otherPlayer = document.getElementById(s.audioId);
                            otherPlayer.pause();
                            document.getElementById(s.buttonId).innerHTML = '▶';
                        }
                    });
                    
                    // Play current section
                    musicPlayer.currentTime = section.startTime;
                    const playPromise = musicPlayer.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            playPauseBtn.innerHTML = '⏸';
                        }).catch(error => {
                            console.log("Autoplay prevented:", error);
                            playPauseBtn.innerHTML = '▶';
                        });
                    }
                } else {
                    musicPlayer.pause();
                    playPauseBtn.innerHTML = '▶';
                }
            });
        }, { threshold: 0.5 });

        observer.observe(sectionElement);

        // Play/Pause button
        playPauseBtn.addEventListener('click', function() {
            if (musicPlayer.paused) {
                musicPlayer.currentTime = section.startTime;
                musicPlayer.play();
                playPauseBtn.innerHTML = '⏸';
            } else {
                musicPlayer.pause();
                playPauseBtn.innerHTML = '▶';
            }
        });

        // Volume control
        volumeControl.addEventListener('input', function() {
            musicPlayer.volume = this.value;
        });

        // Song ended
        musicPlayer.addEventListener('ended', function() {
            playPauseBtn.innerHTML = '▶';
            musicPlayer.currentTime = section.startTime;
        });
    });
});

function scrollToNextSection() {
    document.querySelector('.music-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

document.querySelectorAll('.lyrics-container').forEach(container => {
    let isDragging = false;
    let startY, scrollTop;
    
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.pageY - container.offsetTop;
        scrollTop = container.scrollTop;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        e.preventDefault();
        const y = e.pageY - container.offsetTop;
        const walk = (y - startY) * 2;
        container.scrollTop = scrollTop - walk;
    });
});

function createParticles() {
    const particles = 30;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255,255,255,${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        landing.appendChild(particle);
    }
}