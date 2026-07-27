const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const controls = document.querySelectorAll('.slider-control');
let currentSlide = 0;
const totalSlides = slides.length;

const teamSpotlightSlides = document.querySelectorAll('.team-spotlight-slide');
const teamSpotlightDots = document.querySelectorAll('.team-spotlight-dot');
let currentTeamSpotlight = 0;
const totalTeamSpotlights = teamSpotlightSlides.length;

function setTeamSpotlight(index) {
  currentTeamSpotlight = index < 0 ? totalTeamSpotlights - 1 : index >= totalTeamSpotlights ? 0 : index;
  teamSpotlightSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentTeamSpotlight);
  });
  teamSpotlightDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentTeamSpotlight);
  });
}

function nextTeamSpotlight() {
  setTeamSpotlight(currentTeamSpotlight + 1);
}

if (teamSpotlightSlides.length) {
  teamSpotlightDots.forEach((dot, index) => {
    dot.addEventListener('click', () => setTeamSpotlight(index));
  });

  let teamSpotlightInterval = setInterval(nextTeamSpotlight, 6500);
  const teamSpotlightShell = document.querySelector('.team-spotlight-shell');
  if (teamSpotlightShell) {
    teamSpotlightShell.addEventListener('mouseenter', () => clearInterval(teamSpotlightInterval));
    teamSpotlightShell.addEventListener('mouseleave', () => {
      teamSpotlightInterval = setInterval(nextTeamSpotlight, 6500);
    });
  }
}

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
    // Collect form values and open WhatsApp chat with a prefilled message
    const name = encodeURIComponent(document.getElementById('name')?.value || '');
    const email = encodeURIComponent(document.getElementById('email')?.value || '');
    const phone = encodeURIComponent(document.getElementById('phone')?.value || '');
    const msg = encodeURIComponent(document.getElementById('message')?.value || '');
    const prefilled = `Hello Khusi Clinic,%0A%0AI have an appointment request.%0AName: ${name}%0APhone: ${phone}%0AEmail: ${email}%0ARequest: ${msg}`;
    const waUrl = `https://wa.me/9779761279899?text=${prefilled}`;

    // Open WhatsApp (web or app) in new tab/window
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Show user-friendly confirmation on the page
    messageEl.textContent = 'Opening WhatsApp so you can send the request. If WhatsApp does not open, please use our chat button.';
    messageEl.classList.add('visible');
    setTimeout(() => messageEl.classList.remove('visible'), 7000);

    // Reset the form
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
  const focusEl = modal.querySelector('.member-modal-focus');

  const teamMembers = [
    {
      name: 'Mr. Leela Bahadur Dhakal',
      role: 'Pharmacist, Founder, MD',
      desc: 'Founder of Khusi Pharmacy & Clinic and a licensed pharmacist with over 15 years of experience dedicated to providing quality healthcare and pharmaceutical services to the community.',
      availability: 'Sun–Fri • 5:00 PM – 6:00 PM',
      focus: 'Medication guidance, pharmacy counseling, and long-term wellness support.'
    },
    {
      name: 'Mrs. Radhika Dhakal',
      role: 'Co-Founder, Staff Nurse',
      desc: 'Experienced nurse with a background in both private and government healthcare institutions, committed to delivering compassionate patient care and supporting women’s health services.',
      availability: 'Sun–Fri • 5:00 PM – 6:00 PM',
      focus: 'Patient support, nursing care, and compassionate follow-up guidance.'
    },
    {
      name: 'Dr. Deepak Kumar Singh',
      role: 'General Physician',
      desc: 'Experienced general physician providing comprehensive medical care for patients of all ages with a focus on accurate diagnosis and effective treatment.',
      availability: 'Sun–Fri • 5:00 PM – 6:00 PM',
      focus: 'General consultations, preventive care, and treatment planning.'
    },
    {
      name: 'Dr. Madhusudhan Kayastha',
      role: 'Pediatrician',
      desc: 'Experienced pediatric specialist committed to the health and well-being of infants, children, and adolescents through compassionate and professional care.',
      availability: 'Sun–Fri • 9:00 AM – 10:00 AM',
      focus: 'Pediatric consultations, child wellness, and family health support.'
    },
    {
      name: 'Ms. Sushmita Shahi',
      role: 'Laboratory',
      desc: 'Licensed laboratory professional providing accurate diagnostic services and supporting quality healthcare through reliable laboratory testing.',
      availability: 'Morning 7:00 AM – 12:00 PM • Evening 5:00 PM – 6:30 PM',
      focus: 'Laboratory diagnostics, sample collection, and accurate test support.'
    }
  ];

  function openModalFromCard(card) {
    const idx = Number(card.dataset.index || 0);
    const img = card.querySelector('img');
    const member = teamMembers[idx] || teamMembers[0];

    titleEl.textContent = member.name;
    roleEl.textContent = member.role;
    descEl.textContent = member.desc;
    availEl.textContent = member.availability;
    focusEl.textContent = member.focus;
    photoEl.src = img?.src || photoEl.src;
    photoEl.alt = member.name;

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

function insertWhatsAppChatbot() {
  const chatUrl = 'https://wa.me/9779761279899?text=Hello%20Khusi%20Clinic%2C%20I%20would%20like%20to%20chat%20with%20you.';
  const chatbot = document.createElement('a');
  chatbot.className = 'whatsapp-chatbot';
  chatbot.href = chatUrl;
  chatbot.target = '_blank';
  chatbot.rel = 'noreferrer';
  chatbot.setAttribute('aria-label', 'Open WhatsApp chat with Khusi Clinic');
  chatbot.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 3.5A11.96 11.96 0 0 0 12 0C5.372 0 0 5.373 0 12c0 2.115.553 4.178 1.6 5.99L0 24l6.28-1.63A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.21-1.25-6.22-3.5-8.5Zm-8.14 18.23c-1.79 0-3.54-.47-5.06-1.35l-.36-.22-3.72.96.99-3.62-.24-.37A9.802 9.802 0 0 1 2 12c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.88-9.88 9.88Zm5.4-7.49c-.3-.15-1.76-.86-2.03-.96-.26-.1-.45-.15-.64.15-.19.3-.73.96-.9 1.16-.16.2-.32.2-.59.07-.26-.12-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.78-.15-.28-.02-.43.12-.57.12-.12.26-.32.39-.48.13-.16.17-.28.26-.46.09-.18.05-.34-.02-.48-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.74.34-.26.27-1 1-1 2.44 0 1.43 1.03 2.82 1.18 3.01.15.18 2.05 3.12 4.96 4.38.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.18-1.42-.06-.12-.24-.2-.51-.35Z"/></svg>
    <span>Chat on WhatsApp</span>
  `;
  document.body.appendChild(chatbot);
}

insertWhatsAppChatbot();
