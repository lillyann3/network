
const infoBtn = document.getElementById('info-btn');
const modal = document.getElementById('about-modal');
const closeModal = document.getElementById('close-modal');

if (infoBtn && modal && closeModal) {
    infoBtn.addEventListener('click', () => {
        modal.showModal();
    });

    closeModal.addEventListener('click', () => {
        modal.close();
    });
}
