/* ================================================================
   sudeNEXUS — site.js
   Shared across all pages. Load before </body>.
   ================================================================ */

(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  const toggle     = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.classList.contains('open');
      toggle.classList.toggle('open', !isOpen);
      mobileMenu.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── Scroll reveal ── */
  // CSS expects .reveal → .visible (matching main.css)
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Nav: add scrolled class for shadow ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Cookie banner ── */
  const cookieBanner  = document.getElementById('cookie-banner');
  const cookieAccept  = document.getElementById('cookie-accept');
  const cookieEssential = document.getElementById('cookie-essential');

  if (cookieBanner && !localStorage.getItem('sn_cookie_consent')) {
    setTimeout(function () { cookieBanner.classList.add('visible'); }, 800);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem('sn_cookie_consent', 'all');
      cookieBanner.classList.remove('visible');
    });
  }

  if (cookieEssential) {
    cookieEssential.addEventListener('click', function () {
      localStorage.setItem('sn_cookie_consent', 'essential');
      cookieBanner.classList.remove('visible');
    });
  }

})();
