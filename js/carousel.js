function setupCarousel(carousel) {
    const imagesWrapper = carousel.querySelector('.carousel-images');
    const items = Array.from(imagesWrapper.children);
    const prevBtn = carousel.querySelector('.prevBtn');
    const nextBtn = carousel.querySelector('.nextBtn');
    let index = 0;

    if (!prevBtn || !nextBtn)
        return

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

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const captionText = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".carousel img").forEach(img => {
        img.addEventListener("click", () => {
            const src = img.src.replace("/mini/", "/full/");
            modalImg.src = src;
            captionText.innerText = img.closest('.carousel-item').querySelector('.caption').innerText;
            modal.style.display = "block";
        });
    });

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
