async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

function renderPhotos(widgets) {
  const grid = document.getElementById("photo-grid");
  if (!grid) return;
  if (!Array.isArray(widgets) || widgets.length === 0) {
    grid.innerHTML =
      '<p class="section-description">No photos available.</p>';
    return;
  }

  grid.innerHTML = widgets
    .map(
      (widget, index) => `
      <article class="photo-card" data-widget-index="${index}">
        <div class="photo-card-preview">
          <img src="${widget.photos[0].src}" alt="${widget.title || "Travel photo"}" loading="lazy" />
          <div class="photo-count">${widget.photos.length} photos</div>
        </div>
        <div class="photo-card-body">
          <div class="photo-title">${widget.title || "Untitled"}</div>
          ${
            widget.location
              ? `<div class="photo-location">${widget.location}</div>`
              : ""
          }
          <div class="photo-meta">
            <span>${widget.date || ""}</span>
            ${
              widget.tag
                ? `<span class="photo-tag">${widget.tag.toUpperCase()}</span>`
                : ""
            }
          </div>
          <div class="photo-description">${widget.description || ""}</div>
        </div>
      </article>
    `
    )
    .join("");

  // Add click handlers to photo cards
  const photoCards = document.querySelectorAll('.photo-card');
  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-widget-index'));
      openGallery(widgets[index]);
    });
  });
}

// Gallery functions
let currentWidget = null;
let currentPhotos = [];
let currentPhotoIndex = 0;

function openGallery(widget) {
  currentWidget = widget;
  currentPhotos = widget.photos;
  currentPhotoIndex = 0;
  
  const modal = document.getElementById('gallery-modal');
  
  // Show modal
  modal.classList.add('gallery-modal--open');
  document.body.style.overflow = 'hidden';
  
  // Setup close button
  const closeBtn = document.getElementById('gallery-close');
  closeBtn.onclick = closeGallery;
  
  // Close on background click
  modal.onclick = function(event) {
    if (event.target === modal) {
      closeGallery();
    }
  };
  
  // Close on Escape key
  document.addEventListener('keydown', handleGalleryKeydown);
  
  // Setup navigation buttons
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  prevBtn.onclick = () => navigateGallery(-1);
  nextBtn.onclick = () => navigateGallery(1);
  
  // Display first photo
  updateGalleryDisplay();
}

function updateGalleryDisplay() {
  if (!currentWidget || currentPhotos.length === 0) return;
  
  const photo = currentPhotos[currentPhotoIndex];
  const modal = document.getElementById('gallery-modal');
  const image = document.getElementById('gallery-image');
  const title = document.getElementById('gallery-title');
  const location = document.getElementById('gallery-location');
  const meta = document.getElementById('gallery-meta');
  const description = document.getElementById('gallery-description');
  
  // Set image and info
  image.src = photo.src;
  image.alt = photo.title || "Travel photo";
  title.textContent = photo.title || "Untitled";
  
  // Widget info
  if (currentWidget.location) {
    location.textContent = currentWidget.location;
    location.style.display = 'block';
  } else {
    location.style.display = 'none';
  }
  
  // Build meta info with photo counter
  let metaHTML = '';
  if (currentWidget.date) {
    metaHTML += `<span>${currentWidget.date}</span>`;
  }
  if (currentWidget.tag) {
    metaHTML += `<span class="photo-tag">${currentWidget.tag.toUpperCase()}</span>`;
  }
  metaHTML += `<span class="photo-counter">${currentPhotoIndex + 1} / ${currentPhotos.length}</span>`;
  meta.innerHTML = metaHTML;
  
  // Photo description
  if (photo.description) {
    if (!description) {
      // Create description element if it doesn't exist
      const infoDiv = document.querySelector('.gallery-info');
      const descEl = document.createElement('div');
      descEl.id = 'gallery-description';
      descEl.className = 'gallery-description';
      infoDiv.appendChild(descEl);
    }
    document.getElementById('gallery-description').textContent = photo.description;
    document.getElementById('gallery-description').style.display = 'block';
  } else if (description) {
    description.style.display = 'none';
  }
}

function closeGallery() {
  const modal = document.getElementById('gallery-modal');
  modal.classList.remove('gallery-modal--open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleGalleryKeydown);
}

function handleGalleryKeydown(event) {
  if (event.key === 'Escape') {
    closeGallery();
  } else if (event.key === 'ArrowLeft') {
    navigateGallery(-1);
  } else if (event.key === 'ArrowRight') {
    navigateGallery(1);
  }
}

function navigateGallery(direction) {
  if (currentPhotos.length === 0) return;
  
  currentPhotoIndex += direction;
  
  // Wrap around
  if (currentPhotoIndex < 0) {
    currentPhotoIndex = currentPhotos.length - 1;
  } else if (currentPhotoIndex >= currentPhotos.length) {
    currentPhotoIndex = 0;
  }
  
  // Update gallery display
  updateGalleryDisplay();
}

function renderMusic(items) {
  const list = document.getElementById("music-list");
  if (!list) return;

  if (!Array.isArray(items) || items.length === 0) {
    list.innerHTML =
      '<p class="section-description">No music available.</p>';
    return;
  }

  list.innerHTML = items
    .map(
      (m) => `
      <article class="music-card">
        <div class="music-header">
          <div class="music-title-group">
            <div class="music-title">${m.title || "Untitled"}</div>
            <div class="music-meta">
              ${m.artist || ""}${m.year ? ` · ${m.year}` : ""}
            </div>
          </div>
          ${
            m.type
              ? `<span class="music-type">${m.type.toUpperCase()}</span>`
              : ""
          }
        </div>
        ${
          m.note
            ? `<p class="music-note">${m.note}</p>`
            : ""
        }
        ${
          m.embedUrl
            ? `<div class="spotify-embed">
                <iframe
                  src="${m.embedUrl}"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>`
            : ""
        }
      </article>
    `
    )
    .join("");
}

function setupNav() {
  const buttons = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.section;
      sections.forEach((s) => {
        s.classList.toggle("section--active", s.id === target);
      });
      buttons.forEach((b) => {
        b.classList.toggle("nav-link--active", b === btn);
      });
    });
  });

  // mark Photos active by default
  const defaultBtn = document.querySelector(
    '.nav-link[data-section="photos"]'
  );
  if (defaultBtn) defaultBtn.classList.add("nav-link--active");
}

// Theme management
function setupTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = prefersDark.matches;
  
  // Set initial theme
  if (savedTheme === 'light' || (!savedTheme && !prefersDarkMode)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Update toggle button
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Listen for system theme changes
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

async function init() {
  document.getElementById("year").textContent =
    new Date().getFullYear().toString();

  setupNav();
  setupTheme();

  const photos = await loadJSON("photos.json");
  renderPhotos(photos || []);

  const music = await loadJSON("music.json");
  renderMusic(music || []);
}

init();

