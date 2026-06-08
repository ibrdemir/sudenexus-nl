/* ================================================================
   sudeNEXUS Learning - Main JavaScript
   sudenexus.nl
   ================================================================ */

(function() {
  'use strict';

  /* ----------------------------------------------------------------
     Navigation: scroll state, mobile toggle, active links
     ---------------------------------------------------------------- */
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  // Scroll state
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile toggle
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMobile.classList.contains('open');
      navToggle.classList.toggle('open');
      navMobile.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (navMobile.classList.contains('open') &&
          !navMobile.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link based on current URL
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile-links a').forEach(function(link) {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === currentPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------------
     Scroll Reveal: uses IntersectionObserver
     ---------------------------------------------------------------- */
  function initReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Make all reveal elements visible immediately
      document.querySelectorAll('.reveal').forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------------
     Cookie Banner
     ---------------------------------------------------------------- */
  function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    const acceptBtn = banner.querySelector('[data-cookie-accept]');
    const declineBtn = banner.querySelector('[data-cookie-decline]');
    const settingsBtn = banner.querySelector('[data-cookie-settings]');

    // Check if consent already given
    const consent = localStorage.getItem('sn-cookie-consent');
    if (!consent) {
      setTimeout(function() {
        banner.classList.add('visible');
      }, 1200);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('sn-cookie-consent', JSON.stringify({
          essential: true,
          analytics: true,
          date: new Date().toISOString()
        }));
        banner.classList.remove('visible');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function() {
        localStorage.setItem('sn-cookie-consent', JSON.stringify({
          essential: true,
          analytics: false,
          date: new Date().toISOString()
        }));
        banner.classList.remove('visible');
      });
    }

    // Allow users to update preferences
    document.querySelectorAll('[data-open-cookie-settings]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('sn-cookie-consent');
        banner.classList.add('visible');
      });
    });
  }

  /* ----------------------------------------------------------------
     Category Icon Animations (SVG)
     Uses IntersectionObserver to trigger when in viewport
     Respects prefers-reduced-motion
     ---------------------------------------------------------------- */
  function initCategoryIcons() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const icons = document.querySelectorAll('[data-icon-animate]');
    if (!icons.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    icons.forEach(function(icon) {
      observer.observe(icon);
    });
  }

  /* ----------------------------------------------------------------
     Destination Pin Sequence Animation
     ---------------------------------------------------------------- */
  function initMapPins() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mapEl = document.querySelector('[data-map-pins]');
    if (!mapEl || prefersReduced) return;

    const pins = mapEl.querySelectorAll('[data-pin]');
    if (!pins.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          pins.forEach(function(pin, i) {
            setTimeout(function() {
              pin.classList.add('pin-visible');
            }, i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(mapEl);
  }

  /* ----------------------------------------------------------------
     Dates page: filter functionality placeholder
     Full implementation in Phase 6
     ---------------------------------------------------------------- */
  function initDateFilters() {
    const filterForm = document.querySelector('[data-dates-filter]');
    if (!filterForm) return;
    // Placeholder: Phase 6 implementation
  }

  /* ----------------------------------------------------------------
     Course catalogue search/filter placeholder
     Full implementation in Phase 4
     ---------------------------------------------------------------- */
  function initCatalogueFilter() {
    const searchInput = document.querySelector('[data-catalogue-search]');
    if (!searchInput) return;
    // Placeholder: Phase 4 implementation
  }

  /* ----------------------------------------------------------------
     Find Your Course: profile filter placeholder
     Full implementation in Phase 4
     ---------------------------------------------------------------- */
  function initProfileFilter() {
    const profileCards = document.querySelectorAll('[data-profile-slug]');
    if (!profileCards.length) return;
    // Placeholder: Phase 4 implementation
  }

  /* ----------------------------------------------------------------
     Init on DOMContentLoaded
     ---------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function() {
    initReveal();
    initCookieBanner();
    initCategoryIcons();
    initMapPins();
    initDateFilters();
    initCatalogueFilter();
    initProfileFilter();
  });

})();
