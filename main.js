function toggleDiv(ID) {
  var x = document.getElementById(ID);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function toggleCSS() {
  const css = document.getElementById('css');
  if (css.disabled) {
    document.querySelector('.page').style.transform = `translateX(-50%) translateY(-50%) scale(${scale})`;
  } else {
    document.querySelector('.page').style.transform = 'none';
  }
  css.disabled = !css.disabled;
}

let scale = 0;
function scalePageToFit() {
  const page = document.querySelector('.page');
  const pageWidth = page.offsetWidth;
  const pageHeight = page.offsetHeight;
  const viewportWidth = window.innerWidth * 0.9;
  const viewportHeight = window.innerHeight * 0.45;

  const scaleX = viewportWidth / pageWidth;
  const scaleY = viewportHeight / pageHeight;
  scale = Math.min(scaleX, scaleY);

  page.style.transform = `translateX(-50%) translateY(-50%) scale(${scale})`;
}

window.addEventListener('load', scalePageToFit);
// window.addEventListener('resize', scalePageToFit);

const API_BASE = '/api';
const visitorDigits = document.querySelectorAll('#visitor-digits .digit');
const clapDigits = document.querySelectorAll('#clap-digits .digit');

function renderDigits(digitElements, count) {
  const countString = (count % 10000000).toString().padStart(7, '0');
  digitElements.forEach((element, index) => {
    element.innerText = countString[index];
  });
}

async function loadCounts() {
  try {
    const res = await fetch(`${API_BASE}/counts`);
    const { claps, visitors } = await res.json();
    renderDigits(clapDigits, claps);
    renderDigits(visitorDigits, visitors);
  } catch (err) {
    console.log('Counters unavailable', err);
  }
}

async function registerVisit() {
  try {
    const res = await fetch(`${API_BASE}/visit`, { method: 'POST' });
    const { visitors } = await res.json();
    renderDigits(visitorDigits, visitors);
  } catch (err) {
    console.log('Could not register visit', err);
  }
}

let hasClapped = false;
async function handleClap() {
  if (hasClapped) return;
  hasClapped = true;
  try {
    const res = await fetch(`${API_BASE}/clap`, { method: 'POST' });
    const { claps } = await res.json();
    renderDigits(clapDigits, claps);
  } catch (err) {
    console.log('Could not register clap', err);
  }
}

loadCounts().then(registerVisit);

function openLightbox(img) {
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = img.src;
  setLightboxZoom(lightboxImg, false);
  document.getElementById('lightbox').style.display = 'flex';
}

function toggleLightboxZoom(img) {
  setLightboxZoom(img, !img.dataset.zoomed);
}

// Zoomed fills 90% of the viewport, keeping aspect ratio
function setLightboxZoom(img, zoomed) {
  if (zoomed) {
    const fit = Math.min(0.9 * window.innerWidth / img.naturalWidth, 0.9 * window.innerHeight / img.naturalHeight);
    img.style.width = Math.round(img.naturalWidth * fit) + 'px';
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';
    img.dataset.zoomed = '1';
  } else {
    img.style.width = '';
    img.style.maxWidth = 'var(--center-width)';
    img.style.maxHeight = 'var(--box-height)';
    delete img.dataset.zoomed;
  }
}

(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const CURSORS = {
    default: 'images/wii-pointer-ccw.png',
    link: 'images/wii-help-ccw.png',
    button: 'images/wii-open-ccw.png',
  };

  const cursorEl = document.createElement('div');
  cursorEl.id = 'wii-cursor';
  document.body.appendChild(cursorEl);
  document.documentElement.classList.add('js-cursor-active');

  let currentState = 'default';

  function stateFor(el) {
    if (el.closest('.cur-button')) return 'button';
    if (el.closest('a, .cur-link')) return 'link';
    return 'default';
  }

  document.addEventListener('mousemove', (e) => {
    cursorEl.style.left = e.clientX + 'px';
    cursorEl.style.top = e.clientY + 'px';

    const state = stateFor(e.target);
    cursorEl.classList.add('visible');

    if (state !== currentState) {
      currentState = state;
      cursorEl.classList.add('swap');
      setTimeout(() => {
        cursorEl.style.backgroundImage = `url(${CURSORS[state]})`;
        cursorEl.classList.remove('swap');
      }, 90);
    }
  });

  document.addEventListener('mouseleave', () => cursorEl.classList.remove('visible'));
})();

// Highlight the navigation link of the section currently scrolled to
(function () {
  const scroller = document.querySelector('.floating-box.center');
  const links = [...document.querySelectorAll('.floating-box.focus.navigation a')];
  function update() {
    const sections = links.map(a => document.querySelector(a.getAttribute('href')));
    const top = scroller.getBoundingClientRect().top;
    const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
    let current = 0;
    sections.forEach((s, i) => {
      if (s && s.getBoundingClientRect().top - top <= 40) current = i;
    });
    if (atBottom) current = sections.length - 1;
    links.forEach((a, i) => a.classList.toggle('active', i === current));
  }

  scroller.addEventListener('scroll', update, { passive: true });
  update();

  // Load projects from projects.html (needs a server, see serve.sh)
  fetch('projects.html')
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      document.getElementById('projects-container').innerHTML = doc.getElementById('projects-content').innerHTML;
      update();
    });
})();
