/* ============================================================
   KUNAL GROUP — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. Mobile Menu Toggle
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navList   = document.querySelector('.nav-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navList.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        hamburger.classList.remove('open');
        navList.classList.remove('open');
      }
    });

    // Close on nav link click (mobile)
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navList.classList.remove('open');
      });
    });
  }


  /* ----------------------------------------------------------
     2. Header shadow on scroll
  ---------------------------------------------------------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.25)'
        : 'none';
    }, { passive: true });
  }


  /* ----------------------------------------------------------
     3. Counter Animation
  ---------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const ease     = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(ease * target * 10) / 10;
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }


  /* ----------------------------------------------------------
     4. Fade-up on scroll
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => fadeObserver.observe(el));
  }


  /* ----------------------------------------------------------
     5. Contact Form Handling
  ---------------------------------------------------------- */
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        }
      });

      if (!valid) return;

      // Simulate submission
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Message Sent';
        btn.style.background = '#16a34a';

        // Show success notice
        let notice = form.querySelector('.form-success');
        if (!notice) {
          notice = document.createElement('p');
          notice.className = 'form-success';
          notice.style.cssText = 'margin-top:14px;padding:12px 16px;background:#dcfce7;color:#166534;border-radius:6px;font-size:0.9rem;font-weight:500;';
          form.appendChild(notice);
        }
        notice.textContent = 'Thank you! We will get back to you within 4 business hours.';

        // Reset after 5 seconds
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
          if (notice) notice.remove();
        }, 5000);
      }, 1200);
    });
  }

});
