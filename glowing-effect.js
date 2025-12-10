// Cursor-style Spotlight Effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glowing-wrapper');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            card.style.setProperty('--opacity', '1');
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--opacity', '0');
        });
    });
});
