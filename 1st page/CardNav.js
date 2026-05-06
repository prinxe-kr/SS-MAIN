class CardNav {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.isHamburgerOpen = false;
    this.isExpanded = false;
    this.timeline = null;
    
    this.options = {
      logo: options.logo || '../Pictures/logo.png',
      logoAlt: options.logoAlt || 'S.S. Enterprises Logo',
      items: options.items || [],
      baseColor: options.baseColor || '#fff',
      menuColor: options.menuColor || '#000',
      buttonBgColor: options.buttonBgColor || '#dcc961',
      buttonTextColor: options.buttonTextColor || '#000',
      ease: options.ease || 'circ.out',
      theme: options.theme || 'light'
    };
    
    this.init();
  }
  
  init() {
    this.createHTML();
    this.setupEventListeners();
    this.initGSAP();
  }
  
  createHTML() {
    const items = this.options.items.map((item, idx) => `
      <div class="nav-card" data-index="${idx}" style="background-color: ${item.bgColor}; color: ${item.textColor};">
        <div class="nav-card-label">${item.label}</div>
        <div class="nav-card-links">
          ${item.links.map((link, i) => `
            <a class="nav-card-link" href="${link.href || '#'}" aria-label="${link.ariaLabel || link.label}">
              <svg class="nav-card-link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
              ${link.label}
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
    
    this.container.innerHTML = `
      <div class="card-nav-container">
        <nav class="card-nav" style="background-color: ${this.options.baseColor};">
          <div class="card-nav-top">
            <div class="hamburger-menu" style="color: ${this.options.menuColor};">
              <div class="hamburger-line"></div>
              <div class="hamburger-line"></div>
            </div>
            
            <div class="logo-container">
              <!-- Logo removed -->
            </div>
            
            <button class="card-nav-cta-button" style="background-color: ${this.options.buttonBgColor}; color: ${this.options.buttonTextColor};">
              Get Started
            </button>
          </div>
          
          <div class="card-nav-content">
            ${items}
          </div>
        </nav>
      </div>
    `;
    
    this.nav = this.container.querySelector('.card-nav');
    this.hamburger = this.container.querySelector('.hamburger-menu');
    this.cards = this.container.querySelectorAll('.nav-card');
    this.content = this.container.querySelector('.card-nav-content');
  }
  
  setupEventListeners() {
    this.hamburger.addEventListener('click', () => this.toggleMenu());
    
    window.addEventListener('resize', () => {
      if (this.isExpanded) {
        const newHeight = this.calculateHeight();
        gsap.set(this.nav, { height: newHeight });
      }
    });
  }
  
  initGSAP() {
    gsap.set(this.nav, { height: 60, overflow: 'hidden' });
    gsap.set(this.cards, { y: 50, opacity: 0 });
    
    this.timeline = gsap.timeline({ paused: true });
    
    this.timeline.to(this.nav, {
      height: () => this.calculateHeight(),
      duration: 0.4,
      ease: this.options.ease
    });
    
    this.timeline.to(this.cards, { 
      y: 0, 
      opacity: 1, 
      duration: 0.4, 
      ease: this.options.ease, 
      stagger: 0.08 
    }, '-=0.1');
  }
  
  calculateHeight() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentHeight = this.content.scrollHeight;
      return 60 + contentHeight + 16;
    }
    return 220;
  }
  
  toggleMenu() {
    if (!this.timeline) return;
    
    if (!this.isExpanded) {
      this.isHamburgerOpen = true;
      this.isExpanded = true;
      this.hamburger.classList.add('open');
      this.content.style.visibility = 'visible';
      this.content.style.pointerEvents = 'auto';
      this.timeline.play(0);
    } else {
      this.isHamburgerOpen = false;
      this.hamburger.classList.remove('open');
      this.timeline.eventCallback('onReverseComplete', () => {
        this.isExpanded = false;
        this.content.style.visibility = 'hidden';
        this.content.style.pointerEvents = 'none';
      });
      this.timeline.reverse();
    }
  }
}
