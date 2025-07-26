let sliders = 0;
slider(sliders);

function change(x) {
    slider(sliders += x);
}

function slider(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    for (let x of slides) x.style.display = 'none';
    if (n == slides.length) sliders = 0;
    if (n < 0) sliders = slides.length - 1;
    slides[sliders].style.display = 'block';

    dots.forEach((dot, i) => dot.classList.toggle('active', i == sliders));
}

// Dot click logic
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, i) => {
    dot.onclick = () => { sliders = i; slider(sliders); };
});
