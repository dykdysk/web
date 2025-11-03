const DonutsPromotions = {
    currentPromotion: 0,
    carouselInterval: null,
    isTransitioning: false,

    init() {
        this.renderPromotions();
        this.startCarousel();
    },

    renderPromotions() {
        const promotionsTrack = document.getElementById('promotions-track');
        const promotionNav = document.getElementById('promotion-nav');

        if (!promotionsTrack || !promotionNav) return;

        promotionsTrack.innerHTML = '';
        promotionNav.innerHTML = '';

        DonutsData.promotions.forEach((promotion, index) => {
            const promotionItem = document.createElement('div');
            promotionItem.className = 'promotion-item fade-in';
            promotionItem.innerHTML = `
                <img src="${promotion.image}" alt="${promotion.title}">
                <div class="promotion-content">
                    <h3>${promotion.title}</h3>
                    <p>${promotion.description}</p>
                </div>
            `;
            promotionsTrack.appendChild(promotionItem);

            const dot = document.createElement('div');
            dot.className = `promotion-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    clearInterval(this.carouselInterval);
                    this.goToPromotion(index);
                    this.startCarousel();
                }
            });
            promotionNav.appendChild(dot);
        });

        promotionsTrack.style.width = `${DonutsData.promotions.length * 330}px`;
    },

    startCarousel() {
        this.carouselInterval = setInterval(() => {
            if (!this.isTransitioning) {
                this.currentPromotion = (this.currentPromotion + 1) % DonutsData.promotions.length;
                this.goToPromotion(this.currentPromotion);
            }
        }, 4000);
    },

    goToPromotion(index) {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        const promotionsTrack = document.getElementById('promotions-track');
        const dots = document.querySelectorAll('.promotion-dot');

        if (promotionsTrack) {
            promotionsTrack.style.transform = `translateX(-${index * 330}px)`;
        }

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentPromotion = index;
        setTimeout(() => { this.isTransitioning = false; }, 500);
    }
};