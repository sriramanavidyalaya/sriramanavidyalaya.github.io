// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

// Close the menu after tapping a link (mobile)
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Admission enquiry form =====
const form = document.getElementById('enquiryForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.className = 'form-status';

  if (!form.checkValidity()) {
    status.textContent = 'Please fill in all required fields correctly.';
    status.classList.add('err');
    form.reportValidity();
    return;
  }

  const name = document.getElementById('parentName').value.trim();
  const childName = document.getElementById('childName').value.trim();
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.disabled = true;
  status.textContent = 'Sending your enquiry…';

  try {
    // Entries are emailed to the school via FormSubmit.
    const res = await fetch('https://formsubmit.co/ajax/srvschoolmyl@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `New Admission Enquiry — ${childName}`,
        _template: 'table',
        'Parent / Guardian': name,
        'Email': document.getElementById('email').value.trim(),
        'Phone': document.getElementById('phone').value.trim(),
        "Child's name": childName,
        'Grade applying for': document.getElementById('grade').value,
        'Message': document.getElementById('message').value.trim() || '—',
      }),
    });
    if (!res.ok) throw new Error('send failed');

    status.textContent = `Thank you, ${name}! We've received your enquiry and will reach out within 2 working days.`;
    status.classList.add('ok');
    form.reset();
  } catch {
    status.textContent = 'Sorry, something went wrong. Please call us at +91 85266 55322 or try again.';
    status.classList.add('err');
  } finally {
    submitBtn.disabled = false;
  }
});

// ===== Gallery + lightbox =====
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
let galleryPhotos = [];
let currentIndex = 0;

fetch('assets/gallery/manifest.json')
  .then((r) => r.json())
  .then((files) => {
    galleryPhotos = files.map((f) => `assets/gallery/${f}`);
    galleryGrid.innerHTML = galleryPhotos
      .map(
        (src, i) =>
          `<button class="g-item" data-index="${i}" aria-label="Open photo ${i + 1}">
             <img src="${src}" alt="Sri Ramana Vidyalaya photo ${i + 1}" loading="lazy" />
           </button>`
      )
      .join('');
    reveal(Array.from(galleryGrid.children), 40);
  })
  .catch(() => {
    galleryGrid.innerHTML = '<p style="color:var(--muted)">Photos coming soon.</p>';
  });

function openLightbox(index) {
  currentIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  lbImage.src = galleryPhotos[currentIndex];
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

galleryGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.g-item');
  if (btn) openLightbox(Number(btn.dataset.index));
});
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', () => openLightbox(currentIndex + 1));
document.getElementById('lbPrev').addEventListener('click', () => openLightbox(currentIndex - 1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
});

// ===== Scroll-reveal animations =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

function reveal(elements, stagger = 90) {
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * stagger, 450)}ms`;
    revealObserver.observe(el);
  });
}

// Section headings and standalone blocks
reveal(document.querySelectorAll('.section-eyebrow, .section-title'), 0);
reveal(document.querySelectorAll('.about-text, .vision-card, .founder-photo, .founder-message, .partner-logo-card, .partner-copy, .admissions-info, .enquiry-form, .map-card, .contact-list, .socials'), 120);

// Card groups (staggered within each group)
document.querySelectorAll('.mission-grid, .programs, .leaders, .events').forEach((group) => {
  reveal(group.children ? Array.from(group.children) : []);
});

// ===== Current year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();
