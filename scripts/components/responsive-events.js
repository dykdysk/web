const DonutsResponsive = {
    init() {
        this.setupResizeHandler();
        if (!this.isCheckoutPage()) {
            this.setupTouchEvents();
            this.setupHamburgerOnResize();
            this.setupCartButtonResponsive();
        }
    },

    isCheckoutPage() {
        return window.location.pathname.includes('checkout') ||
            document.querySelector('.checkout-steps') !== null;
    },

    setupHamburgerOnResize() {
        window.addEventListener('resize', () => {
            if (window.DonutsHamburger && window.DonutsHamburger.init) {
                setTimeout(() => window.DonutsHamburger.init(), 100);
            }
        });
    },

    setupCartButtonResponsive() {
        const updateCartButton = () => {
            const cartButton = document.getElementById('cart-button');
            if (!cartButton) return;

            if (window.innerWidth <= 480) {
                cartButton.classList.add('mobile-compact-cart');
            } else if (window.innerWidth <= 768) {
                cartButton.classList.remove('mobile-compact-cart');
            }
        };

        updateCartButton();
        window.addEventListener('resize', updateCartButton);
    },

    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
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
    },

    setupTouchEvents() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');

            document.querySelectorAll('.btn, .catalog-tab, .star, .quantity-option, .toggle-option').forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });

                button.addEventListener('touchend', function() {
                    setTimeout(() => this.classList.remove('touch-active'), 150);
                });
            });
        }
    }
};