document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('nav');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }
        });
    });

    const hireMeButton = document.querySelector('.hire-me');
    const contactButton = document.querySelector('.contact-more');

    if (hireMeButton && contactButton) {
        hireMeButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });

        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        console.error('Hire Me or Contact More buttons not found');
    }

    const typingTextElement = document.querySelector('.typing-text');
    const typingSpan = document.querySelector('.typing-span');
    const phrases = ['LuaU Scripter', 'Game Developer', 'Problem Solver', 'Backend Expert', 'Top Writer'];
    
    let phraseIndex = 0;
    let charIndex = 0;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    typingTextElement.appendChild(cursor);

    function type() {
        if (charIndex < phrases[phraseIndex].length) {
            typingSpan.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingSpan.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 100);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 150);
        }
    }

    function blinkCursor() {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        setTimeout(blinkCursor, 500);
    }

    blinkCursor();
    type();

    gsap.from('.home-content h1', { duration: 1, y: -50, opacity: 0, ease: 'power4.out' });
    gsap.from('.home-content h3', { duration: 1.2, y: -50, opacity: 0, delay: 0.5, ease: 'power4.out' });
    gsap.from('.home-content p', { duration: 1.4, y: -50, opacity: 0, delay: 0.8, ease: 'power4.out' });
    gsap.from('.home-img img', { duration: 1.6, scale: 0.8, opacity: 0, ease: 'power4.out', onComplete: applyAnimeEffects });
    gsap.from('.btn', { duration: 1.8, scale: 0.9, opacity: 0, ease: 'power4.out' });

    gsap.from('.project', {
        scrollTrigger: '.project',
        duration: 1.5,
        scale: 0.85,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.2
    });

    gsap.from('.skills-list li', {
        scrollTrigger: '.skills-list',
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.2
    });

    function applyAnimeEffects() {
        gsap.to('.animated-profile', { duration: 2, scale: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }

    const backgroundMusic = document.getElementById('backgroundMusic');
    const welcomeModal = document.getElementById('welcomeModal');
    const continueButton = document.getElementById('continueButton');

    function playMusic() {
        backgroundMusic.play().catch(error => {
            console.log('Error playing audio:', error);
        });
    }

    if (welcomeModal) {
        welcomeModal.style.display = 'flex';

        continueButton.addEventListener('click', function() {
            welcomeModal.style.display = 'none';
            playMusic();
        });
    }

    try {
        playMusic();
    } catch (error) {
        console.log('Autoplay not allowed, waiting for user interaction.');
    }

    document.addEventListener('click', function() {
        playMusic();
        document.removeEventListener('click', arguments.callee);
    });
});

window.addEventListener('beforeunload', function(e) {
    const confirmationMessage = 'Thank you for visiting my portfolio!';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
});

document.addEventListener('scroll', function() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 &&
            scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25) {
            const currentId = section.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentId) {
                    link.classList.add('active');
                }
            });
        }
    });
});