// Disable right-click on all images
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Define sections and navLinks
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Smooth Scrolling for Navigation Links and Updating Active Class
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Smooth scrolling to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active class
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Scroll to contact section with animation when "Hire Me" or "Contact for More" buttons are clicked
            if (targetId === '#contact') {
                gsap.to(window, { duration: 1.5, scrollTo: targetId, ease: 'power4.out' });
            }
        });
    });

    // Smooth scroll functionality for buttons
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

    // Typing effect with cursor
    const typingTextElement = document.querySelector('.typing-text');
    const phrases = ['LuaU Scripter', 'Game Developer', 'Problem Solver', 'Backend Expert', 'Top Writer'];
    let phraseIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < phrases[phraseIndex].length) {
            typingTextElement.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingTextElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 100);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 150);
        }
    }

    // Create and insert cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    typingTextElement.appendChild(cursor);

    // Cursor blinking effect
    function blinkCursor() {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        setTimeout(blinkCursor, 600);
    }

    blinkCursor(); // Start the cursor blinking effect
    type(); // Start the typing effect

    // GSAP Animations with Anime-Style Effects
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

    gsap.from('.contact-form input, .contact-form textarea, .contact-form button', {
        scrollTrigger: '.contact-form',
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.2
    });

    // Anime-style effects function
    function applyAnimeEffects() {
        gsap.to('.animated-profile', { duration: 2, scale: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }

    // Background Music Functionality
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playMusicButton = document.getElementById('playMusicButton');
    const welcomeModal = document.getElementById('welcomeModal');
    const continueButton = document.getElementById('continueButton');

    // Function to play music
    function playMusic() {
        backgroundMusic.play().catch(error => {
            console.log('Error playing audio:', error);
        });
    }

    // Show the modal when the page loads
    if (welcomeModal) {
        welcomeModal.style.display = 'flex';

        continueButton.addEventListener('click', function() {
            welcomeModal.style.display = 'none'; // Hide the modal
            playMusic(); // Start playing the background music
        });
    }

    // Attempt to play music automatically
    try {
        playMusic();
    } catch (error) {
        console.log('Autoplay not allowed, waiting for user interaction.');
    }

    // Add click event listener to the whole document
    document.addEventListener('click', function() {
        playMusic();
        // Remove the event listener after first click to avoid multiple triggers
        document.removeEventListener('click', arguments.callee);
    });

    // Optionally, provide a button for users to play the music
    if (playMusicButton) {
        playMusicButton.addEventListener('click', function() {
            playMusic();
        });
    }
});

// Conclusion message when user leaves the page
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