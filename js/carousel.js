(function () {
    'use strict';

    function initCarousel(el) {
        const track  = el.querySelector('.carousel-track');
        const slides = el.querySelectorAll('.carousel-track img');
        const prev   = el.querySelector('.carousel-prev');
        const next   = el.querySelector('.carousel-next');
        const dots   = el.querySelectorAll('.dot');
        const total  = slides.length;

        if (!track || total === 0) return;

        let current  = 0;
        let timer    = null;

        function goTo(i) {
            current = (i + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
        }

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(() => goTo(current + 1), 4000);
        }

        prev.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
        next.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
        dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetTimer(); }));

        /* Swipe táctil */
        let startX = 0;
        el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        el.addEventListener('touchend',   e => {
            const delta = startX - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 40) { goTo(current + (delta > 0 ? 1 : -1)); resetTimer(); }
        });

        /* Pausa en hover */
        el.addEventListener('mouseenter', () => clearInterval(timer));
        el.addEventListener('mouseleave', resetTimer);

        goTo(0);
        resetTimer();
    }

    document.querySelectorAll('.carousel').forEach(initCarousel);
})();
