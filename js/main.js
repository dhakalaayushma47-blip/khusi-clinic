const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const controls = document.querySelectorAll('.slider-control');
let currentSlide = 0;
const totalSlides = slides.length;

function setSlide(index) {
  currentSlide = index < 0 ? totalSlides - 1 : index >= totalSlides ? 0 : index;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });
}

function nextSlide() {
  setSlide(currentSlide + 1);
}

function previousSlide() {
  setSlide(currentSlide - 1);
}

controls.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction;
    if (direction === 'next') {
      nextSlide();
    } else {
      previousSlide();
    }
  });
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => setSlide(index));
});

let sliderInterval = setInterval(nextSlide, 7500);

const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  heroSection.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 7500);
  });
}

const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll('.anim-up').forEach((element) => {
  observer.observe(element);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const messageEl = document.querySelector('.form-message');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageEl.textContent = 'Thank you! Your appointment request is ready for review. We will reach out shortly.';
    messageEl.classList.add('visible');
    setTimeout(() => messageEl.classList.remove('visible'), 5000);
    contactForm.reset();
  });
}

// Member modal: open member details in a popup
(function initMemberModal() {
  const modal = document.getElementById('memberModal');
  if (!modal) return;
  const panel = modal.querySelector('.member-modal-panel');
  const titleEl = modal.querySelector('#memberModalTitle');
  const photoEl = modal.querySelector('.member-modal-photo');
  const roleEl = modal.querySelector('.member-modal-info .tag');
  const descEl = modal.querySelector('.member-modal-desc');
  const availEl = modal.querySelector('.member-modal-availability');

  function openModalFromCard(card) {
    const img = card.querySelector('img');
    const name = card.querySelector('h3')?.textContent || '';
    const role = card.querySelector('.tag')?.textContent || '';
    const desc = card.querySelector('p')?.textContent || '';
    const avail = card.querySelector('small')?.innerHTML || '';

    titleEl.textContent = name;
    roleEl.textContent = role;
    descEl.textContent = desc;
    availEl.innerHTML = avail;
    photoEl.src = img?.src || photoEl.src;
    photoEl.alt = name;

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    panel.focus && panel.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Openers
  document.querySelectorAll('.view-profile').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = btn.dataset.index;
      const card = document.querySelector(`.team-card[data-index="${idx}"]`);
      if (card) openModalFromCard(card);
    });
  });

  // Close triggers
  modal.querySelectorAll('[data-modal-close]').forEach((el) => el.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('member-modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
