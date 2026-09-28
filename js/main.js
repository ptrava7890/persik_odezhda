// Persik — небольшие интерактивы: меню, шапка, нижняя панель, «прыжок» персика

(function () {
  const header = document.querySelector('.header');
  const dock = document.querySelector('.dock');
  const stack = document.getElementById('logoStack');

  // Меню
  const menu = document.getElementById('menu');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');
  function setMenu(open) {
    menu.hidden = !open;
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  openBtn.addEventListener('click', () => setMenu(true));
  closeBtn.addEventListener('click', () => setMenu(false));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  // Маленький логотип в шапке и нижняя панель появляются, когда большой логотип ушёл с экрана
  header.classList.add('logo-hidden');
  if ('IntersectionObserver' in window && stack) {
    new IntersectionObserver(([entry]) => {
      const out = !entry.isIntersecting;
      header.classList.toggle('logo-hidden', !out);
      header.classList.toggle('is-scrolled', out);
      dock.classList.toggle('is-visible', out);
    }, { rootMargin: '-56px 0px 0px 0px', threshold: 0.15 }).observe(stack);
  } else {
    header.classList.remove('logo-hidden');
    dock.classList.add('is-visible');
  }

  // Нажатие на персик — он «пружинит»
  if (stack) {
    stack.addEventListener('click', () => {
      stack.classList.remove('is-jelly');
      void stack.offsetWidth; // перезапуск анимации
      stack.classList.add('is-jelly');
      if (navigator.vibrate) navigator.vibrate(12);
    });
    stack.addEventListener('animationend', (e) => {
      if (e.animationName === 'jelly') stack.classList.remove('is-jelly');
    });
  }
})();
