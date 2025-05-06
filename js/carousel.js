function setupCarousel(carousel) {
    const imagesWrapper = carousel.querySelector('.carousel-images');
    const items = Array.from(imagesWrapper.children);
    const prevBtn = carousel.querySelector('.prevBtn');
    const nextBtn = carousel.querySelector('.nextBtn');
    let index = 0;

    function getItemWidth() {
        return carousel.offsetWidth;
    }

    function update() {
        const width = getItemWidth();
        imagesWrapper.style.transform = `translateX(-${index * width}px)`;
    }

    function next() {
        index = (index + 1) % items.length;
        update();
    }

    function prev() {
        index = (index - 1 + items.length) % items.length;
        update();
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    window.addEventListener('resize', update);
    update();
}

document.querySelectorAll('.carousel').forEach(setupCarousel);
