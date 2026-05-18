import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Preloader Logic
  const preloader = document.getElementById('preloader');
  const loaderProgress = document.querySelector('.loader-progress');
  
  if (preloader && loaderProgress) {
    let progress = 0;
    const duration = 1500; 
    const intervalTime = 20; 
    const step = 100 / (duration / intervalTime);

    const loaderInterval = setInterval(() => {
      progress += step;
      loaderProgress.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(loaderInterval);
        setTimeout(() => {
          preloader.classList.add('hidden');
          document.body.classList.remove('loading');
        }, 300);
      }
    }, intervalTime);
  } else {
    document.body.classList.remove('loading');
  }

  // Scroll Reveal Logic
  const revealElements = document.querySelectorAll('.reveal-scroll');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Dark/Light Mode Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check local storage for theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Custom Cursor Glow
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      });
    });
  }
});
