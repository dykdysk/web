const DonutsHamburger = {
    init() {
        if (this.isCheckoutPage()) {
            return;
        }

        this.createHamburgerMenu();
        this.createMobileMenu();
        this.setupHamburgerEvents();
        this.setupResponsiveCart();
    },

    isCheckoutPage() {
        return window.location.pathname.includes('checkout') ||
            document.querySelector('.checkout-steps') !== null ||
            document.querySelector('.checkout-main') !== null;
    },

    createHamburgerMenu() {
        let hamburgerBtn = document.querySelector('.hamburger');
        const headerContent = document.querySelector('.header-content');

        if (!headerContent || this.isCheckoutPage()) return;

        if (!hamburgerBtn) {
            hamburgerBtn = document.createElement('button');
            hamburgerBtn.className = 'hamburger';
            hamburgerBtn.setAttribute('aria-label', 'Меню');
            hamburgerBtn.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;

            headerContent.insertBefore(hamburgerBtn, headerContent.firstChild);
        }
    },

    createMobileMenu() {
        if (document.querySelector('.mobile-menu') || this.isCheckoutPage()) return;

        const nav = document.querySelector('nav:not(.checkout-steps)');
        if (nav) {
            const mobileNav = nav.cloneNode(true);
            mobileNav.className = 'mobile-nav';

            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.appendChild(mobileNav);

            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';

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
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            overlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    },

    setupResponsiveCart() {
        const cartButton = document.getElementById('cart-button');
        if (!cartButton) return;

        const updateCartButtonText = () => {
            const cartCount = document.querySelector('.cart-count');
            if (!cartCount) return;

            const count = cartCount.textContent;
            if (window.innerWidth <= 480) {
                cartButton.innerHTML = `<span class="cart-count">${count}</span>`;
            } else {
                cartButton.innerHTML = `Корзина <span class="cart-count">${count}</span>`;
            }
        };

        updateCartButtonText();
        window.addEventListener('resize', updateCartButtonText);
    }
};