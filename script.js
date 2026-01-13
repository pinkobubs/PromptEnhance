/* ═══════════════════════════════════════════════════════════════
   PROMPTENHANCE — Premium Interactive Experience
   Smooth animations, refined interactions, cinematic feel
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const debounce = (fn, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};

// ─────────────────────────────────────────────────────────────────
// Stars Background
// ─────────────────────────────────────────────────────────────────
class StarField {
  constructor(canvas) {
    if (!canvas) return;
    
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.resize();
    this.init();
    
    window.addEventListener('resize', debounce(() => this.resize(), 200));
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.starCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);
  }
  
  init() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach(star => {
      star.pulse += star.pulseSpeed;
      const opacity = star.opacity + Math.sin(star.pulse) * 0.2;
      
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(167, 139, 250, ${opacity})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize stars
new StarField($('#stars-canvas'));

// ─────────────────────────────────────────────────────────────────
// Navbar Scroll Effect
// ─────────────────────────────────────────────────────────────────
const navbar = $('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// ─────────────────────────────────────────────────────────────────
// Scroll Progress Bar
// ─────────────────────────────────────────────────────────────────
const scrollProgress = $('.scroll-progress');

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset;
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
  
  scrollProgress.style.width = `${scrollPercent}%`;
}, { passive: true });

// ─────────────────────────────────────────────────────────────────
// Mobile Menu
// ─────────────────────────────────────────────────────────────────
const mobileToggle = $('.mobile-toggle');
const navLinks = $('.nav-links');

mobileToggle?.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks?.classList.toggle('active');
});

// ─────────────────────────────────────────────────────────────────
// Hero Demo Typing Animation
// ─────────────────────────────────────────────────────────────────
class TypeWriter {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
  }
  
  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }
  
  reset() {
    this.element.textContent = '';
    this.index = 0;
  }
}

// Hero demo animation
const demoTyped = $('#demo-typed');
const demoResult = $('#demo-result');
const enhanceBtn = $('#enhance-btn');

if (demoTyped && demoResult && enhanceBtn) {
  const typeWriter = new TypeWriter(demoTyped, 'make a weather app', 80);
  
  // Start typing when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          typeWriter.type();
          
          // Show result after typing completes
          setTimeout(() => {
            demoResult.classList.add('visible');
          }, 2000);
        }, 500);
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  heroObserver.observe($('.hero'));
  
  // Enhance button click
  enhanceBtn.addEventListener('click', () => {
    enhanceBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      enhanceBtn.style.transform = '';
    }, 150);
    
    demoResult.classList.remove('visible');
    setTimeout(() => {
      demoResult.classList.add('visible');
    }, 300);
  });
}

// ─────────────────────────────────────────────────────────────────
// Scroll Reveal Animations
// ─────────────────────────────────────────────────────────────────
const revealElements = $$('.step, .problem-card, .feature-card, .example-showcase');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─────────────────────────────────────────────────────────────────
// Section Headers Animation
// ─────────────────────────────────────────────────────────────────
const sectionHeaders = $$('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

sectionHeaders.forEach(header => {
  header.style.opacity = '0';
  header.style.transform = 'translateY(30px)';
  header.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
  headerObserver.observe(header);
});

// ─────────────────────────────────────────────────────────────────
// Example Tabs
// ─────────────────────────────────────────────────────────────────
const exampleTabs = $$('.example-tab');
const exampleContents = $$('.example-content');

exampleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.dataset.tab;
    
    // Update tabs
    exampleTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Update content
    exampleContents.forEach(content => {
      content.classList.remove('active');
      if (content.dataset.content === targetTab) {
        content.classList.add('active');
      }
    });
  });
});

// ─────────────────────────────────────────────────────────────────
// Smooth Scroll
// ─────────────────────────────────────────────────────────────────
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = $(href);
    
    if (target) {
      const offset = 100;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ─────────────────────────────────────────────────────────────────
// Scroll to Top Button
// ─────────────────────────────────────────────────────────────────
const scrollTopBtn = $('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ─────────────────────────────────────────────────────────────────
// Button Hover Effects
// ─────────────────────────────────────────────────────────────────
$$('.btn-primary').forEach(btn => {
  btn.addEventListener('mouseenter', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    btn.style.setProperty('--mouse-x', `${x}px`);
    btn.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ─────────────────────────────────────────────────────────────────
// Card Hover Effects
// ─────────────────────────────────────────────────────────────────
$$('.problem-card, .feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ─────────────────────────────────────────────────────────────────
// Viewport Height Fix (iOS Safari)
// ─────────────────────────────────────────────────────────────────
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', debounce(setVH, 100));

// ─────────────────────────────────────────────────────────────────
// Prefers Reduced Motion
// ─────────────────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.body.classList.add('reduce-motion');
}

// ─────────────────────────────────────────────────────────────────
// Page Load Animation
// ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  
  // Stagger animation for hero elements
  const heroElements = $$('.hero-badge, .hero-title, .hero-subtitle, .hero-cta-group, .hero-stats, .hero-demo');
  heroElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
  });
});

// ─────────────────────────────────────────────────────────────────
// Intersection Observer for Steps
// ─────────────────────────────────────────────────────────────────
const steps = $$('.step');

const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add stagger delay for child elements
      const visual = entry.target.querySelector('.step-visual');
      const content = entry.target.querySelector('.step-content');
      
      if (visual) {
        visual.style.transitionDelay = '0.1s';
      }
      if (content) {
        content.style.transitionDelay = '0.2s';
      }
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
});

steps.forEach(step => stepObserver.observe(step));

// ─────────────────────────────────────────────────────────────────
// Center Ripple Effect on Enhance Button
// ─────────────────────────────────────────────────────────────────
const centerRippleOnButton = () => {
  const ripple = $('.click-ripple');
  
  if (ripple) {
    // Find the step-mockup that contains this ripple
    const stepMockup = ripple.closest('.step-mockup');
    const button = stepMockup?.querySelector('.mockup-enhance');
    
    if (button && stepMockup) {
      const updateRipplePosition = () => {
        // Get bounding rectangles (positions relative to viewport)
        const mockupRect = stepMockup.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        
        // Calculate button center relative to step-mockup
        // getBoundingClientRect gives viewport-relative positions, so we just subtract
        const buttonCenterX = (buttonRect.left + buttonRect.width / 2) - mockupRect.left;
        const buttonCenterY = (buttonRect.top + buttonRect.height / 2) - mockupRect.top;
        
        ripple.style.left = `${buttonCenterX}px`;
        ripple.style.top = `${buttonCenterY}px`;
        ripple.style.right = 'auto';
        ripple.style.bottom = 'auto';
      };
      
      // Wait for layout to be ready
      const initPosition = () => {
        requestAnimationFrame(() => {
          updateRipplePosition();
          requestAnimationFrame(updateRipplePosition);
        });
      };
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPosition);
      } else {
        initPosition();
      }
      
      // Update on resize
      window.addEventListener('resize', debounce(updateRipplePosition, 100));
      
      // Update when step becomes visible
      const rippleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              updateRipplePosition();
              setTimeout(updateRipplePosition, 100);
            });
          }
        });
      }, { threshold: 0.1 });
      
      rippleObserver.observe(stepMockup);
    }
  }
};

// Initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', centerRippleOnButton);
} else {
  centerRippleOnButton();
}

// ─────────────────────────────────────────────────────────────────
// Comparison Block Animation
// ─────────────────────────────────────────────────────────────────
const comparisonBlock = $('.comparison-block');

if (comparisonBlock) {
  const comparisonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.comparison-card');
        const vs = entry.target.querySelector('.comparison-vs');
        
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 200);
        });
        
        if (vs) {
          setTimeout(() => {
            vs.style.opacity = '1';
            vs.style.transform = 'scale(1)';
          }, 100);
        }
        
        comparisonObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  // Initial state
  const cards = comparisonBlock.querySelectorAll('.comparison-card');
  const vs = comparisonBlock.querySelector('.comparison-vs');
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
  });
  
  if (vs) {
    vs.style.opacity = '0';
    vs.style.transform = 'scale(0.8)';
    vs.style.transition = 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
  }
  
  comparisonObserver.observe(comparisonBlock);
}

// ─────────────────────────────────────────────────────────────────
// Feature Cards Stagger
// ─────────────────────────────────────────────────────────────────
const featuresGrid = $('.features-grid');

if (featuresGrid) {
  const featureCards = featuresGrid.querySelectorAll('.feature-card');
  
  const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        featureCards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 100);
        });
        featuresObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
  });
  
  featuresObserver.observe(featuresGrid);
}

// ─────────────────────────────────────────────────────────────────
// CTA Section Animation
// ─────────────────────────────────────────────────────────────────
const ctaContent = $('.cta-content');

if (ctaContent) {
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        ctaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  ctaContent.style.opacity = '0';
  ctaContent.style.transform = 'translateY(30px) scale(0.98)';
  ctaContent.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
  
  ctaObserver.observe(ctaContent);
}

// ─────────────────────────────────────────────────────────────────
// Parallax Effect for Aurora
// ─────────────────────────────────────────────────────────────────
const aurora = $$('.aurora');

if (aurora.length && !prefersReducedMotion.matches) {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    aurora.forEach((el, i) => {
      const speed = 0.1 + (i * 0.05);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

// ─────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  // ESC closes mobile menu
  if (e.key === 'Escape') {
    mobileToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
  }
});

// ─────────────────────────────────────────────────────────────────
// Console Easter Egg
// ─────────────────────────────────────────────────────────────────
console.log(
  '%c✨ PromptEnhance',
  'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #a78bfa, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
);
console.log(
  '%cPrompt engineering at your fingertips.',
  'font-size: 14px; color: #a1a1aa;'
);
console.log(
  '%c💖 Made with love by pinkobubs',
  'font-size: 12px; color: #f472b6; font-weight: bold;'
);

// ─────────────────────────────────────────────────────────────────
// Advanced Settings Info Icon Hover Effect
// ─────────────────────────────────────────────────────────────────
const setupInfoIconHover = () => {
  const infoIcons = $$('.info-icon[data-highlight]');
  const advancedFeatures = $$('.adv-feature[data-feature]');
  
  if (infoIcons.length === 0 || advancedFeatures.length === 0) return;
  
  infoIcons.forEach(icon => {
    const highlightTarget = icon.dataset.highlight;
    
    icon.addEventListener('mouseenter', () => {
      // Find the corresponding feature card
      const targetCard = advancedFeatures.find(card => 
        card.dataset.feature === highlightTarget
      );
      
      if (targetCard) {
        targetCard.classList.add('highlighted');
      }
    });
    
    icon.addEventListener('mouseleave', () => {
      // Remove highlight from all cards
      advancedFeatures.forEach(card => {
        card.classList.remove('highlighted');
      });
    });
  });
};

// Initialize info icon hover effects
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupInfoIconHover);
} else {
  setupInfoIconHover();
}

// ─────────────────────────────────────────────────────────────────
// Enhancement Style Tag Selection
// ─────────────────────────────────────────────────────────────────
const setupEnhancementStyleTags = () => {
  const styleTags = $$('.feature-tags .tag');
  
  styleTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Remove active class from all tags
      styleTags.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tag
      tag.classList.add('active');
    });
  });
};

// Initialize enhancement style tags
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupEnhancementStyleTags);
} else {
  setupEnhancementStyleTags();
}

// ─────────────────────────────────────────────────────────────────
// Slider Value Updates
// ─────────────────────────────────────────────────────────────────
const setupSliders = () => {
  const tempSlider = $('#temperature');
  const tempValue = $('#temp-value');
  const tempFill = $('#temp-fill');
  const topPSlider = $('#top-p');
  const toppValue = $('#topp-value');
  const toppFill = $('#topp-fill');
  
  const updateTemperature = () => {
    if (tempSlider && tempValue && tempFill) {
      const value = parseFloat(tempSlider.value);
      tempValue.textContent = value.toFixed(1);
      
      // Update fill width (0 to 1.5 range)
      const percentage = (value / 1.5) * 100;
      tempFill.style.width = `${percentage}%`;
    }
  };
  
  const updateTopP = () => {
    if (topPSlider && toppValue && toppFill) {
      const value = parseFloat(topPSlider.value);
      toppValue.textContent = value.toFixed(2);
      
      // Update fill width (0 to 1 range)
      const percentage = (value / 1) * 100;
      toppFill.style.width = `${percentage}%`;
    }
  };
  
  // Initialize values and fills
  if (tempSlider) {
    tempSlider.addEventListener('input', updateTemperature);
    updateTemperature(); // Set initial state
  }
  
  if (topPSlider) {
    topPSlider.addEventListener('input', updateTopP);
    updateTopP(); // Set initial state
  }
};

// Initialize sliders
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSliders);
} else {
  setupSliders();
}
