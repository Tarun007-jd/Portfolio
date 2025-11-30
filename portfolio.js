// Highlight nav link by current section
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');

function setActiveById(id) {
  navLinks.forEach(link => {
    const isMatch = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isMatch);
  });
}

// Observe sections entering viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveById(entry.target.id);
      history.replaceState(null, '', `#${entry.target.id}`);
    }
  });
}, { root: null, rootMargin: '-30% 0px -30% 0px', threshold: [0, 0.25, 0.5] });

sections.forEach(sec => observer.observe(sec));

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

  const roles = ["Full Stack Developer","Problem Solver", "Programmer", "Web Developer", "Mobile App Developer"];
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
