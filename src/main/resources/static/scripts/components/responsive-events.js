const DonutsResponsive = {
    init() {
        this.setupResizeHandler();
        if (!this.isCheckoutPage()) {
            this.setupTouchEvents();
            this.setupHamburgerOnResize();
            this.setupCartButtonResponsive();
            this.preventZoomOnMobile();
        }
    },

    isCheckoutPage() {
        return window.location.pathname.includes('checkout') ||
            document.querySelector('.checkout-steps') !== null;
    },

    setupHamburgerOnResize() {
        if (window.DonutsHamburger && window.DonutsHamburger.init) {
            window.DonutsHamburger.init();
        }

        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                if (window.DonutsHamburger && window.DonutsHamburger.init) {
                    window.DonutsHamburger.init();
                }
                this.handleResize();
                this.toggleHamburgerVisibility();
            }, 100);
        });
    },

    setupCartButtonResponsive() {
        const updateCartButton = () => {
            const cartButton = document.getElementById('cart-button');
            if (!cartButton) return;

            if (window.innerWidth <= 480) {
                cartButton.classList.add('mobile-compact-cart');
                const cartCount = cartButton.querySelector('.cart-count');
                const count = cartCount ? cartCount.textContent : '0';

                if (window.innerWidth <= 360) {
                    cartButton.innerHTML = `<span class="cart-count">${count}</span>`;
                } else {
                    cartButton.innerHTML = `Корзина <span class="cart-count">${count}</span>`;
                }
            } else if (window.innerWidth <= 768) {
                cartButton.classList.remove('mobile-compact-cart');
                const cartCount = cartButton.querySelector('.cart-count');
                const count = cartCount ? cartCount.textContent : '0';
                cartButton.innerHTML = `Корзина <span class="cart-count">${count}</span>`;
            }
        };

        updateCartButton();
        window.addEventListener('resize', updateCartButton);
        document.addEventListener('cartUpdated', updateCartButton);
    },

    setupResizeHandler() {
        this.resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.handleResize();
                this.toggleHamburgerVisibility();
            }, 250);
        });
    },

    handleResize() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');

        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (window.DonutsHamburger && window.DonutsHamburger.setupResponsiveCart) {
            window.DonutsHamburger.setupResponsiveCart();
        }

        this.toggleHamburgerVisibility();
    },

    toggleHamburgerVisibility() {
        const hamburger = document.querySelector('.hamburger');
        if (!hamburger) return;

        hamburger.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
        const desktopNav = document.querySelector('nav:not(.mobile-nav):not(.checkout-steps)');
        if (desktopNav) {
            desktopNav.style.display = window.innerWidth <= 768 ? 'none' : 'flex';
        }
    },

    setupTouchEvents() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');

            document.querySelectorAll('.btn, .catalog-tab, .star, .quantity-option, .toggle-option, .carousel-btn').forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });

                button.addEventListener('touchend', function() {
                    setTimeout(() => this.classList.remove('touch-active'), 150);
                });

                button.addEventListener('contextmenu', (e) => e.preventDefault());
            });

            const promotionsTrack = document.getElementById('promotions-track');
            if (promotionsTrack) {
                let startX = 0;
                let currentX = 0;

                promotionsTrack.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    promotionsTrack.style.transition = 'none';
                });

                promotionsTrack.addEventListener('touchmove', (e) => {
                    currentX = e.touches[0].clientX;
                    const diff = currentX - startX;

                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            if (window.DonutsPromotions && DonutsPromotions.prevSlide) {
                                DonutsPromotions.prevSlide();
                            }
                        } else {
                            if (window.DonutsPromotions && DonutsPromotions.nextSlide) {
                                DonutsPromotions.nextSlide();
                            }
                        }
                        startX = currentX;
                    }
                });

                promotionsTrack.addEventListener('touchend', () => {
                    promotionsTrack.style.transition = 'transform 0.5s ease';
                });
            }
        }
    },

    preventZoomOnMobile() {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        document.addEventListener('contextmenu', (e) => {
            if ('ontouchstart' in window) {
                e.preventDefault();
            }
        });
    }
};
