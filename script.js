(function () {
  const doc = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggle');
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

  // Init
  applyTheme(loadTheme());
  setYear();
  if (themeToggleButton) themeToggleButton.addEventListener('click', toggleTheme);
  renderGallery();
})();
