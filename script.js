/**
 * AuraPortfolio - Cute & Fresh Aesthetic Interactions
 * 
 * Dynamically loads text and assets from data.js, handles scroll reveals,
 * typing animations, theme toggles, and lightbox functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if profileData is defined in data.js
  if (typeof profileData === 'undefined') {
    console.error('Error: profileData is not defined. Make sure data.js is loaded first.');
    return;
  }

  // --- Dynamic Content Rendering ---
  renderPortfolio();

  // --- Theme Toggle Handler ---
  initThemeToggle();

  // --- Typing Animation ---
  initTypingAnimation();

  // --- Sticky Header & Scroll Spy ---
  initStickyNavbar();

  // --- Scroll Reveal & Skill Progress Activation ---
  initScrollReveals();

  // --- Lightbox Modal ---
  initLightbox();

  // ==========================================
  // Core Functions
  // ==========================================

  function renderPortfolio() {
    const info = profileData.personalInfo;

    // 1. Hero Content
    document.getElementById('hero-profile-img').src = info.profileImage;
    document.getElementById('hero-name').innerHTML = `
      ${info.name}
      <span class="hero-korean-badge">이도나 (${info.koreanName}) 🇰🇷</span>
    `;
    document.getElementById('hero-intro').innerText = info.introShort;
    document.getElementById('footer-name').innerText = info.name;
    document.getElementById('nav-logo').innerText = getInitials(info.name);

    // 2. About Me: Biography & Education
    document.getElementById('about-bio').innerHTML = info.bio.replace(/\n/g, '<br>');
    
    const eduList = document.getElementById('education-list');
    eduList.innerHTML = info.education.map(edu => `
      <div class="edu-item">
        <span class="edu-period">${edu.period}</span>
        <div class="edu-degree">${edu.degree}</div>
        <div class="edu-school">${edu.school}</div>
      </div>
    `).join('');

    // 3. About Me: Interests
    const interestsGrid = document.getElementById('interests-grid');
    interestsGrid.innerHTML = info.interests.map(item => `
      <div class="interest-item">
        <span class="interest-icon">${item.icon}</span>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `).join('');

    // 4. About Me: Skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = profileData.skills.map(skill => `
      <div class="skill-item">
        <div class="skill-info">
          <span class="skill-name"><span>${skill.icon}</span> ${skill.name}</span>
          <span class="skill-value">${skill.value}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-progress" data-target="${skill.value}"></div>
        </div>
      </div>
    `).join('');

    // 5. Projects Section
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = profileData.projects.map(proj => `
      <article class="project-card">
        <div class="project-icon-box">
          <span class="project-icon">${proj.icon}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.desc}</p>
          <a href="${proj.link}" class="btn btn-secondary btn-block">View More</a>
        </div>
      </article>
    `).join('');

    // 6. Achievements Section
    const achievementsGrid = document.getElementById('achievements-grid');
    achievementsGrid.innerHTML = profileData.achievements.map(ach => `
      <div class="achievement-card">
        <div class="achievement-icon-wrapper">
          <span class="achievement-icon">${ach.icon}</span>
        </div>
        <div class="achievement-details">
          <h3 class="achievement-title">${ach.title}</h3>
          <p class="achievement-desc">${ach.desc}</p>
        </div>
      </div>
    `).join('');

    // 7. Gallery Section
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = profileData.gallery.map((img, idx) => `
      <div class="gallery-item" data-index="${idx}" data-category="${img.category}">
        <div class="gallery-img-box">
          <img src="${img.url}" alt="${img.alt || ('Gallery photo ' + (idx + 1))}">
        </div>
        <div class="gallery-caption">${img.alt || ('Gallery photo ' + (idx + 1))}</div>
      </div>
    `).join('');

    // Gallery Category Filtering logic
    const filterBtns = document.querySelectorAll('#gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const activeCat = btn.getAttribute('data-category');

        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (activeCat === 'all' || itemCat === activeCat) {
            // Trigger anim and show
            item.style.display = 'inline-block';
            item.style.animation = 'none';
            // Trigger reflow to restart animation
            void item.offsetWidth;
            item.style.animation = 'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // 8. Contact Section Info
    const c = profileData.contact;
    const emailLink = document.getElementById('contact-email');
    emailLink.innerText = c.email;
    emailLink.href = `mailto:${c.email}`;
    document.getElementById('contact-phone').innerText = c.phone;
    document.getElementById('contact-location').innerText = c.location;

    // Contact: Social Icons
    const socialsList = document.getElementById('socials-list');
    socialsList.innerHTML = c.socials.map(soc => `
      <a href="${soc.url}" class="social-icon-btn" title="${soc.platform}" aria-label="${soc.platform}">
        <span>${soc.icon}</span>
      </a>
    `).join('');
  }

  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('.') + '.';
  }

  // --- Typing Effect logic ---
  function initTypingAnimation() {
    const sentences = profileData.personalInfo.typingSentences;
    const target = document.getElementById('typing-text');
    if (!target || !sentences.length) return;

    let sentenceIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentSentence = sentences[sentenceIdx];

      if (isDeleting) {
        target.innerText = currentSentence.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 50; // speed up deleting
      } else {
        target.innerText = currentSentence.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 120; // normal typing speed
      }

      if (!isDeleting && charIdx === currentSentence.length) {
        typingSpeed = 1500; // wait when completed
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        sentenceIdx = (sentenceIdx + 1) % sentences.length;
        typingSpeed = 500; // brief wait before typing next
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
  }

  // --- Sticky Navigation & Scroll Spy ---
  function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      // Sticky header logic
      if (window.scrollY > 40) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }

      // Scroll spy logic
      let currentSectionId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- Scroll Reveal trigger ---
  function initScrollReveals() {
    const revealItems = document.querySelectorAll('.scroll-reveal');
    const skillsSection = document.getElementById('about');

    const animateReveal = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // If the entry is the about section, trigger skills progress animation
          if (entry.target.id === 'about') {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
              const targetWidth = bar.getAttribute('data-target');
              bar.style.width = targetWidth + '%';
            });
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(animateReveal, {
      root: null,
      threshold: 0.1
    });

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  }

  // --- Theme Toggle persistence ---
  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('auracute_theme') || 'light';

    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    }

    themeBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('auracute_theme', 'light');
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('auracute_theme', 'dark');
      }
    });
  }

  // --- Lightbox Modal ---
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let visibleGalleryItems = [];
    let currentItemIndex = 0;

    if (!lightbox) return;

    // Use event delegation for clicking gallery items
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
      galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        // Get only the items that are currently visible (not hidden by filter)
        visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item'))
          .filter(el => el.style.display !== 'none');
        
        currentItemIndex = visibleGalleryItems.indexOf(item);
        if (currentItemIndex !== -1) {
          showImage(currentItemIndex);
          lightbox.setAttribute('aria-hidden', 'false');
        }
      });
    }

    function showImage(index) {
      if (index < 0 || index >= visibleGalleryItems.length) return;
      const imgEl = visibleGalleryItems[index].querySelector('img');
      const capEl = visibleGalleryItems[index].querySelector('.gallery-caption');
      if (!imgEl) return;

      lightboxImg.style.opacity = '0';
      if (lightboxCaption) lightboxCaption.style.opacity = '0';

      setTimeout(() => {
        lightboxImg.src = imgEl.src;
        lightboxImg.style.opacity = '1';
        if (lightboxCaption && capEl) {
          lightboxCaption.innerText = capEl.innerText;
          lightboxCaption.style.opacity = '1';
        }
      }, 100);
    }

    function showNext() {
      if (visibleGalleryItems.length === 0) return;
      currentItemIndex = (currentItemIndex + 1) % visibleGalleryItems.length;
      showImage(currentItemIndex);
    }

    function showPrev() {
      if (visibleGalleryItems.length === 0) return;
      currentItemIndex = (currentItemIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
      showImage(currentItemIndex);
    }

    closeBtn.addEventListener('click', () => {
      lightbox.setAttribute('aria-hidden', 'true');
    });

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close lightbox on click outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });

    // Keyboard support for Lightbox
    document.addEventListener('keydown', (e) => {
      if (lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') {
          lightbox.setAttribute('aria-hidden', 'true');
        } else if (e.key === 'ArrowRight') {
          showNext();
        } else if (e.key === 'ArrowLeft') {
          showPrev();
        }
      }
    });
  }
});
