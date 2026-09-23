/* =========================================================
   Brown Ivory Group — Main Script (FINAL v7)
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Auto-update footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- HOME: sticky header transition ---------- */
  const header = document.getElementById('site-header');
  if (header && header.classList.contains('transparent')) {
    const onScroll = () => {
      if (window.scrollY > 80) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- HOME: Ecosystem tabs ---------- */
  const ecoTabs = document.querySelectorAll('.eco-tab');
  const ecoPanels = document.querySelectorAll('.eco-panel');

  if (ecoTabs.length && ecoPanels.length) {
    ecoTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        ecoTabs.forEach((t) => t.classList.remove('active'));
        ecoPanels.forEach((p) => p.classList.remove('active'));

        tab.classList.add('active');
        const target = document.getElementById(targetId);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ---------- SERVICES: Service tabs ---------- */
  const serviceTabs = document.querySelectorAll('.service-tab');
  const servicePanels = document.querySelectorAll('.service-panel');

  if (serviceTabs.length && servicePanels.length) {
    serviceTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        serviceTabs.forEach((t) => t.classList.remove('active'));
        servicePanels.forEach((p) => p.classList.remove('active'));

        tab.classList.add('active');
        const target = document.getElementById(targetId);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ---------- INSIGHTS: dropdown filter ---------- */
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  dropdowns.forEach((dd) => {
    const toggleBtn = dd.querySelector('.filter-dropdown-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dd.classList.toggle('open');
    });

    document.addEventListener('click', () => dd.classList.remove('open'));
  });

  /* ---------- INSIGHTS: filter posts (all + sub-filters) ---------- */
  const allFilterBtns = document.querySelectorAll('.filter-btn');
  const allPosts = document.querySelectorAll('.post-row');

  allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (!filter) return;

      allFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.classList.contains('sub-filter')) {
        const parentToggle = btn.closest('.filter-dropdown')?.querySelector('.filter-dropdown-toggle');
        if (parentToggle) parentToggle.classList.add('active');
      }

      allPosts.forEach((post) => {
        const cat = post.dataset.category || 'all';
        const isEmpty = post.innerHTML.trim() === '';
        if (isEmpty) return;
        post.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });

      document.querySelectorAll('.filter-dropdown').forEach((dd) => dd.classList.remove('open'));
    });
  });

  /* ---------- INSIGHTS: Read More / Back to Insights ---------- */
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  const closeBtns = document.querySelectorAll('[data-close]');
  const postsSection = document.getElementById('posts');
  const articles = document.querySelectorAll('.article-full');
  const ctaSection = document.querySelector('.final-cta');

  function hideAllArticles() {
    articles.forEach((a) => { a.hidden = true; });
    if (postsSection) postsSection.hidden = false;
    if (ctaSection) ctaSection.hidden = false;
  }

  function showArticle(id) {
    articles.forEach((a) => { a.hidden = true; });
    const target = document.getElementById(id);
    if (target) {
      target.hidden = false;
      if (postsSection) postsSection.hidden = true;
      if (ctaSection) ctaSection.hidden = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  readMoreBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.article;
      if (id) showArticle(id);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      hideAllArticles();
      const posts = document.getElementById('posts');
      if (posts) posts.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- BULLETPROOF INTERNAL NAVIGATION ---------- */
  document.querySelectorAll('.js-back, a[href$=".html"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('#')
      ) return;

      e.preventDefault();
      e.stopPropagation();
      window.location.href = href;
    });
  });

  /* ---------- Contact form (inline success) ---------- */
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const success = contactForm.querySelector('.form-success');
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      contactForm.reset();

      setTimeout(() => {
        if (success) success.hidden = true;
      }, 6000);
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealTargets = document.querySelectorAll(
    '.feature-card, .pillar, .value-card, .win-card, .capability-card, .question, .post-row, .industry-card, .service-panel, .quick-tile'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }
})();