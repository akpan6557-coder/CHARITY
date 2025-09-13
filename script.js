(function () {
  const doc = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggle');
  const hamburgerButton = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navOverlay = document.getElementById('navOverlay');
  const yearEl = document.getElementById('year');
  const galleryGrid = document.getElementById('galleryGrid');

  function applyTheme(theme) {
    if (theme === 'dark') {
      doc.classList.add('dark');
      if (themeToggleButton) themeToggleButton.textContent = '☀️';
    } else {
      doc.classList.remove('dark');
      if (themeToggleButton) themeToggleButton.textContent = '🌙';
    }
  }

  function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function toggleTheme() {
    const next = doc.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  function toggleMenu() {
    const isActive = hamburgerButton.classList.contains('active');
    
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    hamburgerButton.classList.add('active');
    hamburgerButton.setAttribute('aria-expanded', 'true');
    nav.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburgerButton.classList.remove('active');
    hamburgerButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setYear() {
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  function renderGallery() {
    if (!galleryGrid) return;
    const base = "Father'spic/";
    const images = [
      { src: base + 'IMG_9213.JPG', alt: 'Family portrait' },
      { src: base + 'download.jpeg', alt: 'Charity support' },
      { src: base + 'download (1).jpeg', alt: 'Helping community' },
      { src: base + 'download (2).jpeg', alt: 'Giving together' },
      { src: base + 'hands.jpg', alt: 'Helping hands' },
      { src: base + 'lovehd.jpg', alt: 'Love and togetherness' }
    ];

    const fragment = document.createDocumentFragment();
    images.forEach(({ src, alt }) => {
      const item = document.createElement('div');
      item.className = 'item';
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.src = src;
      img.alt = alt;
      item.appendChild(img);
      fragment.appendChild(item);
    });

    galleryGrid.innerHTML = '';
    galleryGrid.appendChild(fragment);
  }

  // Event Listeners
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
  }

  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking on nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside or on overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburgerButton.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Init
  applyTheme(loadTheme());
  setYear();
  renderGallery();
})();
