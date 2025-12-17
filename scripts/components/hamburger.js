const DonutsHamburger = {
    init() {
        if (this.isCheckoutPage()) return;
        this.createHamburgerMenu();
        this.createMobileMenu();
        this.setupHamburgerEvents();
        this.setupResponsiveCart();
        this.setupTouchEvents();
    },

    isCheckoutPage() {
        return window.location.pathname.includes('checkout') ||
            document.querySelector('.checkout-steps') !== null;
    },

    createHamburgerMenu() {
        let hamburgerBtn = document.querySelector('.hamburger');
        const headerContent = document.querySelector('.header-content');

        if (!headerContent || this.isCheckoutPage()) return;

        if (!hamburgerBtn) {
            hamburgerBtn = document.createElement('button');
            hamburgerBtn.className = 'hamburger';
            hamburgerBtn.setAttribute('aria-label', 'Меню');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
            headerContent.insertBefore(hamburgerBtn, headerContent.firstChild);
        }

        this.updateHamburgerVisibility();
    },

    createMobileMenu() {
        if (document.querySelector('.mobile-menu') || this.isCheckoutPage()) return;

        const nav = document.querySelector('nav:not(.checkout-steps)');
        if (nav) {
            const mobileNav = nav.cloneNode(true);
            mobileNav.className = 'mobile-nav';

            const links = mobileNav.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu();
                });
            });

            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenu.appendChild(mobileNav);

            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.setAttribute('aria-label', 'Закрыть меню');
            overlay.addEventListener('click', () => {
                this.closeMenu();
            });

            document.body.appendChild(overlay);
            document.body.appendChild(mobileMenu);
        }
    },

    setupHamburgerEvents() {
        if (this.isCheckoutPage()) return;

        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');

        if (hamburger && mobileMenu && overlay) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                const isActive = hamburger.classList.contains('active');

                if (isActive) {
                    this.closeMenu();
                } else {
                    this.openMenu();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    this.closeMenu();
                }
            });

            mobileMenu.addEventListener('touchmove', (e) => {
                if (mobileMenu.classList.contains('active')) {
                    e.stopPropagation();
                }
            }, { passive: false });
        }
    },

    openMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');

        if (hamburger && mobileMenu && overlay) {
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }
    },

    closeMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');

        if (hamburger && mobileMenu && overlay) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    },

    setupResponsiveCart() {
        const cartButton = document.getElementById('cart-button');
        if (!cartButton) return;

        const updateCartButtonText = () => {
            const cartCount = document.querySelector('.cart-count');
            if (!cartCount) return;

            const count = cartCount.textContent;

            if (window.innerWidth <= 360) {
                cartButton.innerHTML = `<span class="cart-count">${count}</span>`;
                cartButton.setAttribute('aria-label', `Корзина, ${count} товаров`);
            } else if (window.innerWidth <= 480) {
                cartButton.innerHTML = `Корзина <span class="cart-count">${count}</span>`;
                cartButton.setAttribute('aria-label', `Корзина, ${count} товаров`);
            } else {
                cartButton.innerHTML = `Корзина <span class="cart-count">${count}</span>`;
            }
        };

        updateCartButtonText();

        document.addEventListener('cartUpdated', updateCartButtonText);

        window.addEventListener('resize', () => {
            clearTimeout(this.cartResizeTimer);
            this.cartResizeTimer = setTimeout(updateCartButtonText, 100);
        });
    },

    updateHamburgerVisibility() {
        const hamburger = document.querySelector('.hamburger');
        if (!hamburger) return;

        hamburger.style.display = window.innerWidth <= 768 ? 'flex' : 'none';

        if (window.innerWidth > 768 && hamburger.classList.contains('active')) {
            this.closeMenu();
        }
    },

    setupTouchEvents() {
        if ('ontouchstart' in window) {
            const menuItems = document.querySelectorAll('.mobile-nav a, .hamburger');
            menuItems.forEach(item => {
                item.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });

                item.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
        }
    }
};