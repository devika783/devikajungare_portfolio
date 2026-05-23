import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Cinematic Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset (adjusting for fixed navbar)
        const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1400; // Cinematic slow duration (1.4 seconds)
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          
          // Smooth easing function: easeInOutQuart
          const progress = timeElapsed / duration;
          const easeInOutQuart = progress < 0.5
            ? 8 * progress * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 4) / 2;

          window.scrollTo(0, startPosition + distance * easeInOutQuart);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            // Update URL hash without jumping
            history.pushState(null, null, targetId);
          }
        }
        
        requestAnimationFrame(animation);
      }
    });
  });

  // Preloader Logic
  const preloader = document.getElementById('preloader');
  const loaderFill = document.getElementById('loader-fill');
  const loaderPercentage = document.getElementById('loader-percentage');
  
  if (preloader && loaderFill && loaderPercentage) {
    let progress = 0;
    const duration = 3000; 
    const intervalTime = 20; 
    const step = 100 / (duration / intervalTime);

    const loaderInterval = setInterval(() => {
      progress += step;
      loaderFill.style.width = `${Math.min(progress, 100)}%`;
      loaderPercentage.innerText = `${Math.floor(Math.min(progress, 100))}%`;
      
      if (progress >= 100) {
        clearInterval(loaderInterval);
        
        const loaderPill = document.querySelector('.loader-pill');
        if (loaderPill) loaderPill.classList.add('expand');

        setTimeout(() => {
          preloader.classList.add('hidden');
          document.body.classList.remove('loading');
        }, 800);
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



  // Mobile Navigation Menu Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileNavToggle && mobileNav) {
    const mobileLinks = mobileNav.querySelectorAll('a');
    
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNavToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close mobile nav when clicking on a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close mobile nav when clicking outside of the menu
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        if (mobileNav.classList.contains('active')) {
          mobileNavToggle.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      }
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
