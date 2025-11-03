document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    DonutsCart.init();
    DonutsUtils.initSmoothScroll();
});


function setupCartEditHandlers() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-edit-box')) {
            const index = e.target.getAttribute('data-box-index');
            DonutsBoxBuilder.editBoxFromCart(index);
        }
    });
}

function initScrollAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}