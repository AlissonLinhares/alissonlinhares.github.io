document.addEventListener("DOMContentLoaded", () => {
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.innerHTML = `
    <div style="text-align: center;">
      <img src="" alt="Full Image">
      <div id="lightbox-caption" style="color: white; margin-top: 10px; font-size: 1rem;"></div>
    </div>
  `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const caption = document.getElementById('lightbox-caption');

    document.querySelectorAll('.lightbox img').forEach(img => {
        img.addEventListener('click', () => {
            const fullSrc = img.src.replace('mini/', 'full/');
            modalImg.src = fullSrc;
            caption.textContent = img.title || '';
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImg.src = '';
        caption.textContent = '';
    });
});
