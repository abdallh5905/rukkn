// ركن القدس — تفاعلات الموقع
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var navList = document.querySelector('nav.main ul');
  if (burger && navList) {
    burger.addEventListener('click', function () {
      navList.classList.toggle('open');
      var expanded = navList.classList.contains('open');
      burger.setAttribute('aria-expanded', expanded);
    });
  }

  // إغلاق القائمة عند اختيار رابط (موبايل)
  document.querySelectorAll('nav.main ul li a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (navList) navList.classList.remove('open');
    });
  });

  // صندوق الصور (Lightbox)
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-grid figure img').forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.style.cursor = 'zoom-in';
      var open = function () {
        lbImg.src = img.getAttribute('data-full') || img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('open');
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // نموذج التواصل: تحويل إلى واتساب
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var pkg = form.querySelector('#package') ? form.querySelector('#package').value : '';
      var msg = form.querySelector('#message').value.trim();
      var text = 'السلام عليكم، معكم ' + name + ' (' + phone + ').';
      if (pkg) text += ' مهتم بباقة: ' + pkg + '.';
      if (msg) text += ' ' + msg;
      var url = 'https://wa.me/966593130153?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }

  // تمييز الرابط النشط في القائمة
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main ul li a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // ظهور تدريجي عند التمرير
  var revealEls = document.querySelectorAll('.pkg-card, .why-item, .blog-card, .testi-card, .gallery-grid figure');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp .6s ease both';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { obs.observe(el); });
  }
});
