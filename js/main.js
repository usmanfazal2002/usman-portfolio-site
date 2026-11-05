/**
 * Usman Portfolio - Main JavaScript
 * Professional Portfolio Website
 */

(function () {
  'use strict';

  // =====================================================
  // NAVBAR SCROLL EFFECT
  // =====================================================
  const header = document.getElementById('site-header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scroll-to-top button visibility
    const scrollTop = document.getElementById('scroll-top');
    if (scrollTop) {
      if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    }
    
    // Active nav link highlighting
    updateActiveNavLink();
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on init

  // =====================================================
  // SCROLL TO TOP
  // =====================================================
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =====================================================
  // MOBILE MENU
  // =====================================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // =====================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // =====================================================
  // ACTIVE NAV LINK ON SCROLL
  // =====================================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const headerHeight = header ? header.offsetHeight + 30 : 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop - headerHeight &&
          window.scrollY < sectionTop + sectionHeight - headerHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  // =====================================================
  // INTERSECTION OBSERVER (Fade-up animations)
  // =====================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // =====================================================
  // TYPING ANIMATION (Hero title)
  // =====================================================
  const roleEl = document.querySelector('.hero-title .role');
  if (roleEl) {
    const roles = [
      'Odoo & Web Developer',
      'Python Developer',
      'ERP Solutions Expert',
      'WordPress Developer',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer;

    function typeRole() {
      const currentRole = roles[roleIndex];
      
      if (!isDeleting) {
        roleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentRole.length) {
          isDeleting = true;
          typingTimer = setTimeout(typeRole, 2000);
          return;
        }
      } else {
        roleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      
      typingTimer = setTimeout(typeRole, isDeleting ? 50 : 80);
    }
    
    setTimeout(typeRole, 1000);
  }

  // =====================================================
  // STAT COUNTER ANIMATION
  // =====================================================
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    
    function update() {
      start += step;
      if (start < target) {
        el.textContent = Math.floor(start) + (el.dataset.suffix || '');
        requestAnimationFrame(update);
      } else {
        el.textContent = target + (el.dataset.suffix || '');
      }
    }
    
    requestAnimationFrame(update);
  }

  // Observe stats
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const text = stat.textContent;
          const num = parseInt(text);
          if (!isNaN(num)) {
            stat.dataset.suffix = text.replace(num.toString(), '');
            animateCounter(stat, num, 1000);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroCard = document.querySelector('.hero-card');
  if (heroCard) statsObserver.observe(heroCard);

  // =====================================================
  // CURSOR GLOW EFFECT (subtle)
  // =====================================================
  let cursorGlow = null;
  
  if (window.innerWidth > 768) {
    cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // =====================================================
  // SKILL TAG HOVER RIPPLE
  // =====================================================
  document.querySelectorAll('.skill-tag, .tech-tag, .tag').forEach(tag => {
    tag.addEventListener('mouseenter', function (e) {
      this.style.transform = 'scale(1.05)';
    });
    tag.addEventListener('mouseleave', function (e) {
      this.style.transform = 'scale(1)';
    });
  });

  // =====================================================
  // CONTACT FORM - basic validation
  // =====================================================
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const name = this.querySelector('[name="first_name"]');
      const email = this.querySelector('[name="email"]');
      const message = this.querySelector('[name="message"]');
      
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        e.preventDefault();
        alert('Please fill in all required fields.');
        return;
      }
      
      // Visual feedback
      const btn = this.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    });
  }

})();
