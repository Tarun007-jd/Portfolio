// Highlight nav link by current section
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');

function setActiveById(id) {
  navLinks.forEach(link => {
    const isMatch = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isMatch);
  });
}

// Handle menu toggle for mobile
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });
}

// Observe sections via scroll for robust scroll spy
window.addEventListener('scroll', () => {
  let currentId = '';
  const scrollY = window.scrollY;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollY >= top - window.innerHeight / 3) {
      currentId = sec.getAttribute('id');
    }
  });

  // Handle the absolute bottom of the page
  if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
    currentId = sections[sections.length - 1].getAttribute('id');
  }

  if (currentId) {
    setActiveById(currentId);
  }

  // Header sticky class and hide menu on scroll
  const header = document.querySelector('.header');
  if (header) {
    header.classList.toggle('scrolled', scrollY > 50);
  }

  if (menuIcon && navbar) {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  }
});

// Handle clicks and hash navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    setActiveById(id);
  });
});

window.addEventListener('hashchange', () => {
  const id = location.hash.replace('#', '');
  if (id) setActiveById(id);
});

// Reveal headings on scroll
const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-in');
    } else {
      entry.target.classList.remove('reveal-in');
    }
  });
}, { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.1 });

// Observe all headings with reveal-init class
document.querySelectorAll('.heading.reveal-init').forEach(heading => {
  headingObserver.observe(heading);
});

// Set initial active state on page load
window.addEventListener('load', () => {
  const hash = location.hash.replace('#', '') || 'home';
  setActiveById(hash);

  // Trigger reveal for visible headings on load
  document.querySelectorAll('.heading.reveal-init').forEach(heading => {
    const rect = heading.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      heading.classList.add('reveal-in');
    }
  });
});

// Text rotator for the role in .text-animation
(function () {
  const target = document.querySelector('.text-animation');
  if (!target) return;

  const roles = ["Full Stack Developer", "Problem Solver", "Programmer", "Web Developer", "Mobile App Developer"];
  let r = 0, i = 0, del = false;

  function tick() {
    const word = roles[r];
    // type or delete
    i += del ? -1 : 1;
    target.textContent = word.slice(0, i);

    // speeds
    const typing = 80, deleting = 45, hold = 1200, nextDelay = 300;

    let delay = del ? deleting : typing;

    if (!del && i === word.length) { del = true; delay = hold; }
    else if (del && i === 0) { del = false; r = (r + 1) % roles.length; delay = nextDelay; }

    setTimeout(tick, delay);
  }

  // start after a short initial delay
  setTimeout(tick, 400);
})();

// Interactive starfield background for Home section
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], w, h, mouseX = 0, mouseY = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
    initStars();
  }

  function initStars() {
    const count = Math.floor((w * h) / 15000);
    stars = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.3 + 0.2,
      tw: Math.random() * 1000,
      c: `rgba(${180 + Math.floor(Math.random() * 75)}, ${200 + Math.floor(Math.random() * 55)}, 255, ${Math.random() * 0.8 + 0.2})`
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // subtle nebula glow
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.8, 0, w * 0.5, h * 0.8, Math.max(w, h));
    grad.addColorStop(0, 'rgba(102,126,234,0.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    stars.forEach(s => {
      const parallaxX = (mouseX - w / 2) * 0.002 * s.z;
      const parallaxY = (mouseY - h / 2) * 0.002 * s.z;
      const x = s.x - parallaxX;
      const y = s.y - parallaxY;

      ctx.beginPath();
      ctx.arc(x, y, s.r * s.z, 0, Math.PI * 2);
      ctx.fillStyle = s.c;
      ctx.fill();

      // twinkle
      const alpha = 0.6 + 0.4 * Math.sin((Date.now() + s.tw) * 0.004);
      ctx.fillStyle = s.c.replace(/rgba\(([^)]+),\s*([0-9.]+)\)/, (m, rgb, a) => `rgba(${rgb}, ${alpha})`);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// Image skeleton & fallback finalize
document.querySelectorAll('.project-img img').forEach(img => {
  const parent = img.parentElement;
  function done() { parent.classList.remove('skeleton'); }
  if (img.complete && img.naturalWidth) done();
  else {
    img.addEventListener('load', done);
    img.addEventListener('error', done);
  }
});

// Toggle Certificates View All/View Less
function toggleCertificates() {
  const hiddenCerts = document.querySelectorAll('.certificate-card.hidden-cert');
  const btn = document.getElementById('viewAllBtn');

  const anyShown = Array.from(hiddenCerts).some(c => c.classList.contains('show-cert'));
  const show = !anyShown;

  hiddenCerts.forEach(cert => {
    cert.classList.toggle('show-cert', show);
  });

  btn.textContent = show ? 'View Less' : 'View All';

  if (show && hiddenCerts[0]) {
    setTimeout(() => {
      hiddenCerts[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

// Certificate image click -> open modal
function openImageModal(src, alt) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('imageModalImg');
  img.src = src;
  img.alt = alt || 'Certificate preview';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('imageModalImg');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  img.src = '';
  document.body.style.overflow = '';
}

// Delegate clicks on certificate images
document.addEventListener('click', (e) => {
  const img = e.target.closest('.certificate-img img');
  if (!img) return;
  openImageModal(img.currentSrc || img.src, img.alt);
});

// Apply accurate certificate metadata (title, issuer, year)
window.addEventListener('DOMContentLoaded', () => {
  const meta = [
    { title: 'Universal Human Values (6-day Online Students\' Workshop)', issued_by: 'All India Council for Technical Education (AICTE)', year: '2025', match: ['AICTE'] },
    { title: 'Prompt Engineering for Everyone', issued_by: 'Cognitive Class', year: '2025', match: ['cognitive prompt', 'Cognitive'] },
    { title: 'Prompt Engineering', issued_by: 'Infosys Springboard', year: '2025', match: ['Info prompt'] },
    { title: 'Artificial Intelligence Foundation Certification', issued_by: 'Infosys Springboard', year: '2025', match: ['Info AI foundation'] },
    { title: 'Python (Basic)', issued_by: 'HackerRank', year: '2025', match: ['Hackrank python basic', 'HackerRank'] },
    { title: 'Networking and Web Technology', issued_by: 'Infosys Springboard', year: '2025', match: ['Info web tech'] },
    { title: 'Principles of Generative AI Certification', issued_by: 'Infosys Springboard', year: '2025', match: ['Info gen AI'] },
    { title: 'Applied Generative AI Certification', issued_by: 'Infosys Springboard', year: '2025', match: ['Info Applied AI'] },
    { title: 'Artificial Intelligence Primer Certification', issued_by: 'Infosys Springboard', year: '2025', match: ['Info AI primer'] },
    { title: 'Mastering CSS', issued_by: 'Infosys Springboard', year: '2025', match: ['Info Mastering CSS'] },
    { title: 'Enhancing Soft Skills and Personality', issued_by: 'NPTEL (Indian Institute of Technology Kanpur)', year: '2025', match: ['NPTEL 1'] },
    { title: 'Introduction to Networking', issued_by: 'NVIDIA (offered through Coursera)', year: '2025', match: ['NVIDIA'] },
    { title: 'Python Coder', issued_by: 'Kaggle', year: '2025', match: ['Kaggle Python Coder'] },
    { title: 'Basics of Python', issued_by: 'UniAthena (in partnership with Cambridge International Qualifications, UK)', year: '2025', match: ['Uniathena Basics Python'] },
    { title: 'Understanding Incubation and Entrepreneurship', issued_by: 'NPTEL (Indian Institute of Technology Bombay)', year: '2025', match: ['NPTEL 2'] },
    { title: 'Python for Data Science', issued_by: 'Karpagam Academy of Higher Education & GeeksforGeeks Campus Body - KAHE', year: '2025', match: ['Python_Data_Science', 'Workshop'] },
    { title: 'Generative AI in Practice', issued_by: 'Sololearn', year: '2025', match: ['Sololearn Generative AI in Practice'] },
  ];

  const cards = document.querySelectorAll('.certificate-card');
  cards.forEach(card => {
    const img = card.querySelector('.certificate-img img');
    const infoTitle = card.querySelector('.certificate-info h3');
    const infoIssuer = card.querySelector('.certificate-info .issuer');
    const infoYear = card.querySelector('.certificate-info .year');
    if (!img || !infoTitle || !infoIssuer || !infoYear) return;

    const src = (img.getAttribute('src') || '').toLowerCase();
    const found = meta.find(m => m.match.some(k => src.includes(k.toLowerCase())));
    if (found) {
      infoTitle.textContent = found.title;
      infoIssuer.textContent = `Issued by: ${found.issued_by}`;
      infoYear.textContent = `Year: ${found.year}`;
    }
  });
});

// Intercept Contact Form Submission to prevent redirect
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // UI Loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const actionUrl = contactForm.getAttribute('action');

    fetch(actionUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Google Apps Script requires this for cross-origin silently
    })
      .then(() => {
        // Success!
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("Oops! There was a problem submitting your form.");
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
      });
  });
}

// Function to text success message and show form again
window.resetForm = function () {
  successMessage.style.display = 'none';
  contactForm.style.display = 'block';
};
