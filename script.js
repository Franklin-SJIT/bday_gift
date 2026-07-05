// --- Image Data ---
const categories = {
    beginning: [
        "bigining/PXL_20240404_081549634.PORTRAIT.jpg",
        "bigining/PXL_20240404_084755534.jpg",
        "bigining/PXL_20240602_105120324.PORTRAIT.jpg",
        "bigining/PXL_20240602_130537081.jpg"
    ],
    chaotic: [
        "chaotic/IMG-20250123-WA0019.jpg",
        "chaotic/IMG-20250920-WA0106.jpg",
        "chaotic/IMG-20250923-WA0006.jpg",
        "chaotic/PXL_20260315_092823065.jpg",
        "chaotic/Snapchat-1306174843.jpg",
        "chaotic/Snapchat-1613317592.jpg",
        "chaotic/Snapchat-39676817.jpg",
        "chaotic/Snapchat-644470895.jpg"
    ],
    thara: [
        "thara(you)/IMG-20260111-WA0043.jpg",
        "thara(you)/IMG-20260220-WA0085.jpg",
        "thara(you)/IMG_4893.jpg",
        "thara(you)/PXL_20240821_092207853.PORTRAIT.jpg",
        "thara(you)/PXL_20250201_045949767.jpg",
        "thara(you)/PXL_20250208_064623576.PORTRAIT.jpg",
        "thara(you)/PXL_20250302_064249841.jpg",
        "thara(you)/PXL_20250302_081242068.jpg",
        "thara(you)/PXL_20250302_103438711.jpg",
        "thara(you)/PXL_20250302_103456076.PORTRAIT.jpg",
        "thara(you)/PXL_20260315_111718254.PORTRAIT.jpg"
    ],
    us: [
        "us/IMG-20260220-WA0103.jpg",
        "us/IMG_0650.jpg",
        "us/IMG_1264.jpg",
        "us/IMG_1561.jpg",
        "us/IMG_1672.jpg",
        "us/IMG_9999.jpg",
        "us/IMG_E0711.jpg",
        "us/IMG_E0770.jpg",
        "us/IMG_E0781.jpg",
        "us/IMG_E0875.jpg",
        "us/IMG_E9910.jpg",
        "us/PXL_20250111_021313825.PORTRAIT.jpg",
        "us/PXL_20250302_063731019.jpg",
        "us/PXL_20260110_060130055.PORTRAIT~2.jpg",
        "us/PXL_20260110_060148031.PORTRAIT.jpg",
        "us/PXL_20260220_090833534.PORTRAIT.jpg",
        "us/PXL_20260413_094508854.jpg",
        "us/PXL_20260413_112902001.jpg"
    ]
};

const basePath = "pavi_bday pics/";

const promises = [
    "I promise to always stand beside you.",
    "I promise to make you laugh even on difficult days.",
    "I promise to celebrate every little achievement with you.",
    "I promise to annoy you forever.",
    "I promise to protect your smile.",
    "I promise to keep creating beautiful memories together.",
    "I promise to never stop choosing you."
];

const birthdayLetter = `You are the most beautiful chapter of my life.
Every smile, every laugh, every little moment with you has made my world brighter.
Thank you for being exactly who you are.
I hope today reminds you how deeply loved, appreciated, and cherished you are.
May this year bring endless happiness, success, peace, and unforgettable memories.
I love you today, tomorrow, and every day after.`;

// Initialize Icons
lucide.createIcons();

// --- DOM Elements ---
const loadingScreen = document.getElementById('loading-screen');
const countdownDiv = document.getElementById('countdown');
const bdayReveal = document.getElementById('bday-reveal');
const countdownTitle = document.getElementById('countdown-title');
const skipBtn = document.getElementById('skip-countdown');
const enterBtn = document.getElementById('enter-site');
const mainContent = document.getElementById('main-content');
const startStoryBtn = document.getElementById('start-story-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

// --- Countdown Logic ---
const targetDate = new Date("2026-07-08T00:00:00").getTime();
let timerInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        clearInterval(timerInterval);
        showBirthdayReveal();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("mins").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("secs").innerText = seconds.toString().padStart(2, '0');
}

function showBirthdayReveal() {
    countdownDiv.classList.add('hidden');
    countdownTitle.classList.add('hidden');
    skipBtn.classList.add('hidden');
    bdayReveal.classList.remove('hidden');
    
    // Confetti!
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#38bdf8', '#ffffff', '#1e293b']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#38bdf8', '#ffffff', '#1e293b']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// --- Navigation & Music ---
let isMusicPlaying = false;

function toggleMusic() {
    const textSpan = musicToggle.querySelector('.music-text');
    if(isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        if(textSpan) textSpan.innerText = 'Play';
    } else {
        // Attempt play
        let promise = bgMusic.play();
        if (promise !== undefined) {
            promise.then(_ => {
                musicToggle.classList.add('playing');
                if(textSpan) textSpan.innerText = 'Pause';
            }).catch(error => console.log("Audio play prevented"));
        }
    }
    isMusicPlaying = !isMusicPlaying;
}

musicToggle.addEventListener('click', toggleMusic);

function startExperience() {
    loadingScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    if(!isMusicPlaying) toggleMusic();
    
    // Trigger scroll to top
    window.scrollTo(0, 0);
    
    // Re-initialize GSAP ScrollTriggers after layout
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
}

skipBtn.addEventListener('click', startExperience);
enterBtn.addEventListener('click', startExperience);
startStoryBtn.addEventListener('click', () => {
    document.getElementById('chapter-1').scrollIntoView({ behavior: 'smooth' });
});

// --- Dynamic Content Injection ---

// 1. Polaroid Wall (The Beginning)
const polaroidContainer = document.getElementById('polaroid-container');
const polaroidImages = categories.beginning;
const polaroidCaptions = ["The Spark", "Pure Joy", "Smiles", "Love", "Us", "Memories"];

polaroidImages.forEach((img, idx) => {
    const div = document.createElement('div');
    div.className = 'polaroid glass-panel m-4';
    div.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    div.innerHTML = `
        <img src="${basePath}${img}" loading="lazy" alt="Memory">
        <p class="polaroid-caption sacramento-text">${polaroidCaptions[idx] || "Memory"}</p>
    `;
    div.addEventListener('click', () => openLightbox(basePath + img, polaroidCaptions[idx] || "Memory"));
    polaroidContainer.appendChild(div);
});

// 2. Just You (Masonry Gallery)
const tharaContainer = document.getElementById('thara-masonry-container');
const tharaImages = categories.thara;
tharaImages.forEach((img) => {
    const div = document.createElement('div');
    div.className = 'masonry-item';
    div.innerHTML = `<img src="${basePath}${img}" loading="lazy" alt="Memory">`;
    div.addEventListener('click', () => openLightbox(basePath + img, "Just You"));
    tharaContainer.appendChild(div);
});

// 2.5 Us (Romantic Masonry Gallery)
const usContainer = document.getElementById('us-masonry-container');
const usImages = categories.us;
usImages.forEach((img) => {
    const div = document.createElement('div');
    div.className = 'masonry-item romantic-pic';
    div.innerHTML = `<img src="${basePath}${img}" loading="lazy" alt="Memory">`;
    div.addEventListener('click', () => openLightbox(basePath + img, "Us ❤️"));
    usContainer.appendChild(div);
});

// 3. Promises
const promisesGrid = document.getElementById('promises-grid');
promises.forEach((promise) => {
    const div = document.createElement('div');
    div.className = 'promise-card glass-panel p-8 rounded-2xl flex items-start gap-4';
    div.innerHTML = `
        <i data-lucide="heart-handshake" class="text-blue-400 min-w-8 min-h-8"></i>
        <p class="montserrat-text text-lg leading-relaxed text-white/90">${promise}</p>
    `;
    promisesGrid.appendChild(div);
});

// Re-init icons for injected HTML
lucide.createIcons();

// --- Interactive Features ---

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxBtn = document.getElementById('close-lightbox');

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.innerText = caption || "";
    lightbox.classList.remove('hidden');
    // slight delay for animation
    setTimeout(() => lightbox.classList.add('active'), 10);
}

closeLightboxBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.classList.add('hidden'), 300);
});

// Memory Wheel
const wheelBtn = document.getElementById('spin-wheel-btn');
const wheelImg = document.getElementById('wheel-image');
const wheelOverlay = document.getElementById('wheel-overlay');
const wheelFrame = document.getElementById('wheel-frame');

wheelBtn.addEventListener('click', () => {
    wheelBtn.disabled = true;
    wheelImg.classList.remove('hidden');
    wheelOverlay.style.opacity = '0';
    wheelFrame.classList.add('spinning');
    
    // Cycle images quickly
    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
        const randomImg = categories.chaotic[Math.floor(Math.random() * categories.chaotic.length)];
        wheelImg.src = basePath + randomImg;
        spins++;
        
        if (spins >= maxSpins) {
            clearInterval(interval);
            wheelFrame.classList.remove('spinning');
            wheelBtn.disabled = false;
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#38bdf8']
            });
        }
    }, 100);
});

// Gift Box & Secret Letter
const giftBox = document.getElementById('gift-box');
const secretLetter = document.getElementById('secret-letter');
const letterContentWrapper = document.getElementById('letter-content-wrapper');
const typewriterElement = document.getElementById('typewriter-text');
let letterOpened = false;

giftBox.addEventListener('click', () => {
    if(letterOpened) return;
    letterOpened = true;
    
    // Open animation
    giftBox.classList.add('scale-0', 'opacity-0');
    setTimeout(() => giftBox.classList.add('hidden'), 500);
    
    // Confetti explosion
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#38bdf8', '#ffffff']});
    
    // Reveal letter
    setTimeout(() => {
        secretLetter.classList.remove('hidden');
        setTimeout(() => {
            secretLetter.classList.remove('opacity-0', 'scale-95');
            secretLetter.classList.add('opacity-100', 'scale-100');
            
            setTimeout(() => {
                letterContentWrapper.classList.remove('hidden');
                typewriterEffect(birthdayLetter, typewriterElement, 50);
            }, 500);
        }, 50);
    }, 500);
});

function typewriterEffect(text, element, speed) {
    element.innerHTML = '';
    element.classList.add('typewriter-cursor');
    let i = 0;
    function type() {
        if (i < text.length) {
            if(text.charAt(i) === '\n') {
                element.innerHTML += '<br><br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typewriter-cursor');
        }
    }
    type();
}

// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

// Animate story chapters
document.querySelectorAll('.story-chapter').forEach((section) => {
    gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                scrub: 1
            },
            opacity: 1,
            y: 0,
            duration: 1
        }
    );
});

// Parallax hero
gsap.to(".hero-content", {
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 150,
    opacity: 0
});

// Final Scene Text Reveal
gsap.to(".final-text", {
    scrollTrigger: {
        trigger: "#final-scene",
        start: "top 50%",
        end: "center center",
        scrub: true
    },
    opacity: 1,
    y: -20,
    stagger: 0.5
});


// --- Canvas Particle Systems ---

// 1. Background Stars/Particles
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let bgParticles = [];

function initBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    bgParticles = [];
    for(let i=0; i<100; i++) {
        bgParticles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            size: Math.random() * 2,
            speedY: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
}
initBgCanvas();
window.addEventListener('resize', initBgCanvas);

function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = '#38bdf8';
    
    bgParticles.forEach(p => {
        bgCtx.globalAlpha = p.opacity;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        bgCtx.fill();
        
        p.y -= p.speedY;
        if(p.y < 0) {
            p.y = bgCanvas.height;
            p.x = Math.random() * bgCanvas.width;
        }
    });
    requestAnimationFrame(animateBg);
}
animateBg();

// 2. Mouse Trail (Hearts)
const trailCanvas = document.getElementById('trail-canvas');
const trailCtx = trailCanvas.getContext('2d');
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

let trailParticles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add particle
    if(Math.random() > 0.5) {
        trailParticles.push({
            x: mouseX,
            y: mouseY,
            size: Math.random() * 10 + 5,
            opacity: 1,
            speedY: Math.random() * -2 - 1,
            speedX: (Math.random() - 0.5) * 2,
            color: '#60a5fa'
        });
    }
});

function drawHeart(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
    ctx.bezierCurveTo(-35, -15, -35, 12.5, -35, 12.5);
    ctx.bezierCurveTo(-35, 25, -15, 37, 0, 50);
    ctx.bezierCurveTo(15, 37, 35, 25, 35, 12.5);
    ctx.bezierCurveTo(35, 12.5, 35, -15, 15, -15);
    ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
    ctx.fill();
    ctx.restore();
}

function animateTrail() {
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    
    for(let i = trailParticles.length - 1; i >= 0; i--) {
        let p = trailParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.02;
        p.size *= 0.95;
        
        drawHeart(trailCtx, p.x, p.y, p.size, p.color, p.opacity);
        
        if(p.opacity <= 0 || p.size <= 0.1) {
            trailParticles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateTrail);
}
animateTrail();
window.addEventListener('resize', () => {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
});

// Click anywhere for heart explosion
window.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    for(let i=0; i<10; i++) {
        trailParticles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 20 + 10,
            opacity: 1,
            speedY: (Math.random() - 0.5) * 10,
            speedX: (Math.random() - 0.5) * 10,
            color: '#38bdf8'
        });
    }
});

// --- Flip Cards Interactions ---
const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// --- Love Burst Effect ---
document.addEventListener('click', (e) => {
    // Don't burst on buttons to avoid visual clutter on interactive elements
    if(e.target.closest('button')) return;

    for (let i = 0; i < 5; i++) {
        createLoveParticle(e.clientX, e.clientY);
    }
});

function createLoveParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'love-particle';
    particle.innerHTML = '✨';
    
    // Randomize initial position slightly around the click
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;
    
    particle.style.left = `${x + offsetX}px`;
    particle.style.top = `${y + offsetY}px`;
    
    // Randomize animation variables
    particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 60}px`);
    particle.style.setProperty('--ty', `${-Math.random() * 80 - 40}px`);
    particle.style.setProperty('--rot', `${Math.random() * 360}deg`);
    
    document.body.appendChild(particle);
    
    // Remove after animation finishes
    setTimeout(() => {
        particle.remove();
    }, 1000);
}
