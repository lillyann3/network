const viewport = document.querySelector('.viewport');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    viewport.style.transform = `translate(${x}px, ${y}px)`;
});