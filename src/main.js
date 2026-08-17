import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Particle System ---
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random()
    });
  }
  
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      
      if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
      if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(102, 252, 241, ${p.alpha * 0.5})`;
      ctx.fill();
    });
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// --- Timers ---
function initTimers() {
  // HUD Clock
  const clockEl = document.getElementById('clock');
  setInterval(() => {
    if (clockEl) {
      const now = new Date();
      clockEl.innerText = now.toISOString().split('T')[1].split('.')[0] + " Z";
    }
  }, 1000);

  // Countdown Timer (Target: Dec 15, 2026)
  const targetDate = new Date('December 15, 2026 09:00:00').getTime();
  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');

  setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0 && dEl) {
      dEl.innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
      hEl.innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      mEl.innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      sEl.innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
    }
  }, 1000);
}

// --- Initialize GSAP Animations ---
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTimers();
  
  // Parallax for each section
  const sections = gsap.utils.toArray('.section');
  
  sections.forEach((section) => {
    const bg = section.querySelector('.parallax-bg');
    const mid = section.querySelector('.parallax-mid');
    const fore = section.querySelector('.parallax-fore');
    
    if(bg) {
      gsap.to(bg, {
        yPercent: 30, 
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
    
    if(mid) {
      gsap.to(mid, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }

    if(fore) {
      gsap.to(fore, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  });

  // Clouds sweeping
  const clouds = document.querySelector('.clouds-layer');
  if(clouds) {
    gsap.to(clouds, {
      xPercent: -30,
      ease: 'none',
      scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }

  // Drone Wireframes
  gsap.to('.drone-1', { y: -300, rotation: 45, scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: 1 }});
  gsap.to('.drone-2', { y: -400, rotation: -45, scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 }});
  gsap.to('.drone-3', { y: -200, rotation: 90, scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: 0.5 }});

  // Event Tracks - Grid Stagger
  const isMobile = window.innerWidth <= 768;
  
  if (!isMobile) {
    const trackCards = gsap.utils.toArray('.track-card');
    // We can use a simple stagger effect when scrolling into view
    gsap.from(trackCards, {
      y: 150, 
      opacity: 0, 
      stagger: 0.15,
      scrollTrigger: { 
        trigger: '.tracks-section', 
        start: 'top 70%', 
        end: 'center center', 
        scrub: 1 
      }
    });
  } else {
    gsap.from('.track-card', {
      y: 50, opacity: 0, stagger: 0.1,
      scrollTrigger: { trigger: '.tracks-section', start: 'top 80%', end: 'bottom center', scrub: 1 }
    });
  }

  // Space backgrounds
  gsap.to('.stars.layer-1', { yPercent: -10, scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true }});
  gsap.to('.stars.layer-2', { yPercent: -20, scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true }});
  gsap.to('.stars.layer-3', { yPercent: -30, scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true }});

  // Cyber moon
  gsap.fromTo('.cyber-moon', 
    { y: -150, scale: 0.9, rotation: 0 },
    { y: 50, scale: 1.1, rotation: 15, ease: 'none', scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true }}
  );

  // 3D Hover Tilt
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
  });
});
