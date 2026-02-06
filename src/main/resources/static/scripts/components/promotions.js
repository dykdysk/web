const DonutsPromotions = {
    currentIndex: 0,
    carouselInterval: null,
    isTransitioning: false,
    totalSlides: 0,

    init() {
        this.renderPromotions();
        this.setupEventListeners();
        this.startCarousel();
    },

    renderPromotions() {
        const promotionsTrack = document.getElementById('promotions-track');
        if (!promotionsTrack) return;

        promotionsTrack.innerHTML = '';

        const extendedPromotions = [
            ...DonutsData.promotions.slice(-4),
            ...DonutsData.promotions,
            ...DonutsData.promotions.slice(0, 4)
        ];

        this.totalSlides = extendedPromotions.length;

        extendedPromotions.forEach((promotion, index) => {
            const promotionItem = document.createElement('div');
            promotionItem.className = 'promotion-item';
            promotionItem.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            promotionItem.innerHTML = `
            <div class="promotion-image-container">
                <img src="${promotion.image}" alt="${promotion.title}">
                <div class="promotion-content">
                    <p>${promotion.description}</p>
                </div>
            </div>
        `;
            promotionsTrack.appendChild(promotionItem);

            if ('ontouchstart' in window) {
                promotionItem.addEventListener('touchstart', () => {
                    promotionItem.style.transform = 'translateY(-5px)';
                    promotionItem.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                });

                promotionItem.addEventListener('touchend', () => {
                    setTimeout(() => {
                        promotionItem.style.transform = '';
                        promotionItem.style.boxShadow = '';
                    }, 300);
                });
            }
        });

        this.currentIndex = 2;
        promotionsTrack.style.transform = `translateX(-${this.currentIndex * 250}px)`;
        promotionsTrack.style.transition = 'transform 0.5s ease';
    },

    setupEventListeners() {
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
            nextBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
            prevBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.prevSlide();
            });
        }
    },

    startCarousel() {
        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 3000);
    },

    nextSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        const promotionsTrack = document.getElementById('promotions-track');
        const originalLength = DonutsData.promotions.length;

        this.currentIndex++;

        if (promotionsTrack) {
            promotionsTrack.style.transform = `translateX(-${this.currentIndex * 250}px)`;
        }

        if (this.currentIndex >= originalLength + 2) {
            setTimeout(() => {
                if (promotionsTrack) {
                    promotionsTrack.style.transition = 'none';
                    this.currentIndex = 2;
                    promotionsTrack.style.transform = `translateX(-${this.currentIndex * 250}px)`;

                    setTimeout(() => {
                        promotionsTrack.style.transition = 'transform 0.5s ease';
                        this.isTransitioning = false;
                    }, 50);
                }
            }, 500);
        } else {
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    },

    prevSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        const promotionsTrack = document.getElementById('promotions-track');
        const originalLength = DonutsData.promotions.length;

        this.currentIndex--;

        if (this.currentIndex < 2) {
            if (promotionsTrack) {
                promotionsTrack.style.transition = 'none';
                this.currentIndex = originalLength + 1;
                promotionsTrack.style.transform = `translateX(-${this.currentIndex * 250}px)`;

                setTimeout(() => {
                    promotionsTrack.style.transition = 'transform 0.5s ease';
                    this.isTransitioning = false;
                }, 50);
            }
        } else {
            if (promotionsTrack) {
                promotionsTrack.style.transform = `translateX(-${this.currentIndex * 250}px)`;
            }

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    DonutsPromotions.init();
});