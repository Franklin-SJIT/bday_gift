// Initialize Icons & GSAP Plugins
lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// Lenis Smooth Scroll Setup
// ==========================================================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Tie GSAP ScrollTrigger to Lenis
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ==========================================================================
// Image Data Arrays
// ==========================================================================
const basePath = "pavi_bday pics/";

const images = {
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
    ],
    she: [
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
    ]
};

// ==========================================================================
// DOM Generation Utilities
// ==========================================================================
const ww = window.innerWidth;
const wh = window.innerHeight;

function createPhotoElement(src, className, width, height) {
    const div = document.createElement('div');
    div.className = `story-photo ${className}`;
    div.style.width = width;
    div.style.height = height;
    
    const img = document.createElement('img');
    img.src = basePath + src;
    div.appendChild(img);
    return div;
}

// 1. Hero Parallax Photos
const heroContainer = document.getElementById('hero-photos');
images.us.slice(0, 6).forEach((src, i) => {
    const el = createPhotoElement(src, 'hero-pic', '300px', '400px');
    // Scatter around the edges
    const angle = (i / 6) * Math.PI * 2;
    const radius = Math.min(ww, wh) * 0.35;
    gsap.set(el, {
        x: ww/2 + Math.cos(angle) * radius - 150,
        y: wh/2 + Math.sin(angle) * radius - 200,
        z: Math.random() * -300 - 100,
        rotation: (Math.random() - 0.5) * 40,
        opacity: 0.6
    });
    heroContainer.appendChild(el);
});

// 2. Beginning Photos (Polaroids) - Fan them out horizontally
const begContainer = document.getElementById('beginning-container');
const begCount = images.beginning.length;
images.beginning.forEach((src, i) => {
    const el = createPhotoElement(src, 'beg-pic', '280px', '320px');
    // Distribute them evenly across the screen width
    const sectionWidth = ww / begCount;
    const centerX = (i * sectionWidth) + (sectionWidth / 2);
    gsap.set(el, {
        x: centerX - 140, // center it in its section
        y: -400, // start offscreen top
        rotation: (Math.random() - 0.5) * 40,
        z: i * 10
    });
    begContainer.appendChild(el);
});

// 3. Chaotic Photos - Scatter in a controlled grid so they don't hide each other
const chaoticContainer = document.getElementById('chaotic-container');
const emojis = ['✨', '😜', '💙', '🚀', '🎉'];
const cols = Math.ceil(ww / 350); // e.g. 3 or 4 columns
images.chaotic.forEach((src, i) => {
    const el = createPhotoElement(src, 'chaotic-pic', '260px', '320px');
    
    // Controlled grid math
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellWidth = ww / cols;
    const cellHeight = Math.max(wh / 2.5, 350);
    
    gsap.set(el, {
        x: col * cellWidth + (cellWidth/2 - 130) + (Math.random()-0.5)*50,
        y: row * cellHeight + (cellHeight/2 - 160) + (Math.random()-0.5)*50,
        rotation: (Math.random() - 0.5) * 50,
        scale: 0,
        z: Math.random() * 200
    });
    chaoticContainer.appendChild(el);
    
    // Add doodle/emoji
    const doodle = document.createElement('div');
    doodle.className = 'doodle';
    doodle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    gsap.set(doodle, {
        x: col * cellWidth + (cellWidth/2),
        y: row * cellHeight + (cellHeight/2) - 100,
        scale: 0
    });
    chaoticContainer.appendChild(doodle);
});

// 4. Us Photos (River) - Sequential Y spacing so they flow perfectly one by one
const usContainer = document.getElementById('us-container');
images.us.forEach((src, i) => {
    const el = createPhotoElement(src, 'us-pic', '350px', '450px');
    // Start below screen, staggered perfectly by a set distance
    const yOffset = wh + (i * 350); 
    gsap.set(el, {
        x: (i % 2 === 0 ? ww * 0.2 : ww * 0.6) + (Math.random()-0.5)*50,
        y: yOffset, 
        rotation: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 300
    });
    usContainer.appendChild(el);
});

// 5. She Photos (Portraits)
const sheContainer = document.getElementById('she-container');
const shuffledShe = [...images.she].sort(() => Math.random() - 0.5);
shuffledShe.forEach((src, i) => {
    // null width allows the frame to wrap the exact image ratio
    const el = createPhotoElement(src, 'she-pic', null, '55vh');
    gsap.set(el, {
        x: '50vw',
        xPercent: -50,
        y: '50vh',
        yPercent: -50,
        opacity: 0,
        rotationY: 90, // Starts flipped sideways
        z: -500,       // Starts pushed back
        scale: 0.8
    });
    sheContainer.appendChild(el);
});

// 6. Finale Heart Generation
const finaleContainer = document.getElementById('heart-formation-container');
const allImages = [...images.beginning, ...images.chaotic, ...images.us, ...images.she];
const heartPoints = 200; // number of tiny images

function getHeartCoordinate(t, scale) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    return { 
        x: ww/2 + x * scale - 15, // center offset (tiny img is 30x30)
        y: wh/2 - y * scale - 15 
    };
}

const finaleElements = [];
for(let i=0; i<heartPoints; i++) {
    const t = (i / heartPoints) * Math.PI * 2;
    const scale = Math.min(ww, wh) * 0.015; // responsive size
    const coord = getHeartCoordinate(t, scale);
    
    // Pick random image
    const src = allImages[Math.floor(Math.random() * allImages.length)];
    const el = document.createElement('img');
    el.className = 'tiny-memory';
    el.src = basePath + src;
    
    // Start offscreen random
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.max(ww, wh);
    gsap.set(el, {
        x: ww/2 + Math.cos(angle) * dist,
        y: wh/2 + Math.sin(angle) * dist,
        rotation: Math.random() * 360,
        scale: Math.random() * 2,
        opacity: 0
    });
    
    // Store target coord for GSAP
    el.dataset.targetX = coord.x;
    el.dataset.targetY = coord.y;
    
    finaleContainer.appendChild(el);
    finaleElements.push(el);
}


// ==========================================================================
// Ambient Particles (Canvas)
// ==========================================================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
for (let i = 0; i < 100; i++) {
    particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        alpha: Math.random()
    });
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(34, 211, 238, 0.8)';
    for (let i = 0; i < particlesArray.length; i++) {
        let p = particlesArray[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Mouse Parallax for Fixed Viewport
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / ww - 0.5) * 20;
    const y = (e.clientY / wh - 0.5) * 20;
    gsap.to('.fixed-viewport', {
        rotationY: x,
        rotationX: -y,
        transformPerspective: 1500,
        ease: "power2.out",
        duration: 1
    });
});

// ==========================================================================
// Master ScrollTimeline (The Awwwards Experience)
// ==========================================================================
// We create one huge timeline tied to the scroll track
const masterTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
    }
});

// Helper variables
const dur = 1; // logical duration unit

// --- 0% to 10%: Landing Parallax zooms out ---
masterTl.to('#scene-hero .hero-text', { opacity: 0, y: -50, duration: dur * 0.5 }, 0);
masterTl.to('.hero-pic', { 
    z: 1000, 
    opacity: 0, 
    rotation: "random(-90, 90)",
    stagger: 0.1, 
    duration: dur 
}, 0);
masterTl.set('#scene-hero', { autoAlpha: 0 }, dur);

// --- 10% to 25%: Chapter 1 (Beginning) ---
masterTl.set('#scene-beginning', { autoAlpha: 1 }, dur * 0.8);
masterTl.to('#scene-beginning .chapter-title', { opacity: 1, y: -200, duration: dur * 0.5 }, dur * 0.8);

// Polaroids drop in
masterTl.to('.beg-pic', {
    y: (i) => wh/2 - 160 + (Math.random()-0.5)*50,
    ease: "back.out(1.2)",
    stagger: 0.2,
    duration: dur
}, dur);

// Transition out: Polaroids fade and sink gently (Transition to She)
masterTl.to('#scene-beginning .chapter-title', { opacity: 0, duration: dur * 0.3 }, dur * 2.5);
masterTl.to('.beg-pic', {
    y: wh + 400,
    rotation: "random(-45, 45)",
    opacity: 0,
    duration: dur * 1.5,
    stagger: 0.1,
    ease: "power2.in"
}, dur * 2.5);
masterTl.set('#scene-beginning', { autoAlpha: 0 }, dur * 4.0);

// --- 30% to 45%: Chapter 2 (Only She) - PREVIOUSLY CHAPTER 4 ---
masterTl.set('#scene-she', { autoAlpha: 1 }, dur * 3.8);
masterTl.to('#scene-she .chapter-title', { opacity: 1, y: "-40vh", duration: dur * 0.5 }, dur * 3.8);

// Cinematic 3D Flip portraits
const shePics = gsap.utils.toArray('.she-pic');
shePics.forEach((pic, i) => {
    // Flip in from the right
    masterTl.to(pic, { 
        opacity: 1, 
        rotationY: 0, 
        z: 0, 
        scale: 1, 
        duration: dur * 1.2, 
        ease: "power3.out" 
    }, dur * 4.3 + (i * 1.0));
    
    // Flip out to the left (unless it's the last one)
    if (i < shePics.length - 1) {
        masterTl.to(pic, { 
            opacity: 0, 
            rotationY: -90, 
            z: -500, 
            scale: 0.8, 
            duration: dur * 1.0, 
            ease: "power3.in" 
        }, dur * 5.3 + (i * 1.0));
    }
});

// Transition out to Chapter 3 (Us): Smooth fade out
const sheEndTime = dur * 5.8 + (shePics.length * 1.0);
masterTl.to('#scene-she .chapter-title', { opacity: 0, duration: dur * 0.5 }, sheEndTime);
masterTl.to(shePics[shePics.length - 1], { opacity: 0, scale: 1.5, duration: dur }, sheEndTime);
masterTl.set('#scene-she', { autoAlpha: 0 }, sheEndTime + dur);

// --- 50% to 70%: Chapter 3 (Us River & Promises) ---
const usStart = sheEndTime + dur;
masterTl.set('#scene-us', { autoAlpha: 1 }, usStart);
masterTl.to('#scene-us .chapter-title', { opacity: 1, y: -200, duration: dur * 0.5 }, usStart);
masterTl.to('#scene-us .chapter-title', { opacity: 0, y: -300, duration: dur * 0.5 }, usStart + dur * 0.8);

// River flows up
masterTl.to('.us-pic', {
    y: -800, // flow past the top
    ease: "none",
    duration: dur * 4,
    stagger: 0.2
}, usStart + 0.2);

// Promises fade in/out
const promises = gsap.utils.toArray('.promise-card');
promises.forEach((card, i) => {
    masterTl.to(card, { opacity: 1, scale: 1, duration: dur * 0.5 }, usStart + 0.5 + (i * 0.6));
    masterTl.to(card, { opacity: 0, scale: 1.2, duration: dur * 0.5 }, usStart + 1.0 + (i * 0.6));
});

// Transition out to Chaotic (Chapter 4): The remaining Us photos suddenly fall downwards like gravity turned on!
const chaoticStart = usStart + 7.5; // Reduced gap slightly
masterTl.to('.us-pic', {
    y: wh + 500,
    rotation: "random(-90, 90)",
    duration: dur * 1.5,
    ease: "power4.in"
}, chaoticStart);
masterTl.set('#scene-us', { autoAlpha: 0 }, chaoticStart + dur);

// --- 75% to 90%: Chapter 4 (Chaotic) - PREVIOUSLY CHAPTER 2 ---
masterTl.set('#scene-chaotic', { autoAlpha: 1 }, chaoticStart + 0.5);
masterTl.to('#scene-chaotic .chapter-title', { opacity: 1, y: -200, duration: dur * 0.5 }, chaoticStart + 0.5);
masterTl.to('#scene-chaotic .chapter-title', { opacity: 0, y: -300, duration: dur * 0.5 }, chaoticStart + 1.5);

// Chaos pops in like a joyful explosion
masterTl.to('.chaotic-pic', {
    scale: 1,
    ease: "back.out(1.5)",
    duration: dur * 1.5,
    stagger: 0.1
}, chaoticStart + 1.2);
masterTl.to('.doodle', {
    scale: 1,
    rotation: "random(-45, 45)",
    ease: "back.out(2)",
    duration: dur,
    stagger: 0.1
}, chaoticStart + 1.4);

// Transition out to Finale: Suck into center
const finaleStart = chaoticStart + 3.5;
masterTl.to('.chaotic-pic, .doodle', {
    x: ww/2 - 130, // matching cellWidth/2 offset
    y: wh/2 - 160,
    scale: 0.2,
    rotation: 0,
    duration: dur * 0.8,
    ease: "power4.in"
}, finaleStart);
masterTl.to('.chaotic-pic, .doodle', {
    scale: 0,
    opacity: 0,
    duration: 0.2
}, finaleStart + 0.8);
masterTl.set('#scene-chaotic', { autoAlpha: 0 }, finaleStart + 1.0);

// --- 95% to 100%: The Final Surprise (Heart Formation) ---
masterTl.set('#scene-finale', { autoAlpha: 1 }, finaleStart + 1.0);

// Tiny memories fly in to form heart
finaleElements.forEach((el, i) => {
    masterTl.to(el, {
        x: parseFloat(el.dataset.targetX),
        y: parseFloat(el.dataset.targetY),
        rotation: 0,
        scale: 1,
        opacity: 0.9,
        duration: dur * 1.5,
        ease: "power3.out"
    }, finaleStart + 1.0 + (i * 0.005)); // quick stagger
});

// Final Text Reveal
masterTl.to('.finale-text', {
    opacity: 1,
    scale: 1,
    duration: dur * 1,
    ease: "power2.out"
}, finaleStart + 2.5);

// ==========================================================================
// Audio & Autoplay Logic
// ==========================================================================
const musicToggle = document.getElementById('music-toggle');
// Replaced HTML audio tag with native JS Audio for guaranteed cross-browser local loading
const bgMusic = new Audio("pavi_bday pics/En-Jeevan.mp3");
bgMusic.loop = true;
let isMusicPlaying = false;

function toggleMusic() {
    if(isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
        }).catch(error => {
            console.error("Audio playback failed. The browser might be blocking it or the path is incorrect.", error);
        });
    }
    isMusicPlaying = !isMusicPlaying;
}
musicToggle.addEventListener('click', toggleMusic);

// Entry Overlay Logic (The only way to guarantee audio plays is a user interaction)
const entryOverlay = document.getElementById('entry-overlay');
if (entryOverlay) {
    entryOverlay.addEventListener('click', () => {
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
            isMusicPlaying = true;
        }).catch(err => console.log("Audio still blocked", err));
        
        // Hide overlay smoothly
        entryOverlay.style.opacity = '0';
        setTimeout(() => {
            entryOverlay.style.visibility = 'hidden';
            entryOverlay.style.display = 'none';
        }, 1000);
    });
}

// Attempt to autoplay on page load (Some browsers allow it)
window.addEventListener('load', () => {
    bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        isMusicPlaying = true;
    }).catch(() => {
        console.log("Autoplay blocked by browser. User must click 'Begin Journey'.");
    });
});

// Autoplay Button
const autoplayBtn = document.getElementById('autoplay-btn');
if (autoplayBtn) {
    autoplayBtn.addEventListener('click', () => {
        if(!isMusicPlaying) toggleMusic();
        
        gsap.to(autoplayBtn, { opacity: 0, pointerEvents: 'none', duration: 1 });
        
        lenis.scrollTo('bottom', {
            duration: 65, // Longer duration for a slower, more emotional movie feel
            easing: (t) => t
        });
    });
}
