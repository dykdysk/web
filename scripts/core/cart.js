const DonutsCart = {
    init() {
        this.setupCartEvents();
        this.updateCart();
    },

    setupCartEvents() {
        const cartButton = document.getElementById('cart-button');
        const closeCart = document.getElementById('close-cart');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartPanel = document.getElementById('cart-panel');
        const checkoutButton = document.getElementById('checkout-button');

        if (!cartButton || !closeCart || !cartOverlay || !cartPanel) return;

        cartButton.addEventListener('click', () => this.openCart());

        closeCart.addEventListener('click', () => this.closeCart());
        cartOverlay.addEventListener('click', () => this.closeCart());

        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => this.checkout());
        }
    },

    openCart() {
        const cartOverlay = document.getElementById('cart-overlay');
        const cartPanel = document.getElementById('cart-panel');

        cartOverlay.style.display = 'block';
        cartPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeCart() {
        const cartOverlay = document.getElementById('cart-overlay');
        const cartPanel = document.getElementById('cart-panel');

        cartOverlay.style.display = 'none';
        cartPanel.classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    updateCart() {
        const cartItems = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.querySelector('.cart-count');
        const checkoutButton = document.getElementById('checkout-button');

        if (!cartItems) return;

        cartItems.innerHTML = '';

        const donutCart = DonutsUtils.safeJSONParse(localStorage.getItem('donutsCart'));
        const boxesCart = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));

        const validDonuts = donutCart.filter(item => item && typeof item.price === 'number');
        const validBoxes = boxesCart.filter(item => item && typeof item.price === 'number');

        if (validDonuts.length === 0 && validBoxes.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (cartTotal) cartTotal.textContent = '0 BYN';
            if (checkoutButton) checkoutButton.disabled = true;
            this.updateCartCount();
            return;
        }

        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (checkoutButton) checkoutButton.disabled = false;

        let totalPrice = 0;

        validDonuts.forEach(item => {
            totalPrice += item.price * item.quantity;
            const cartItem = this.createDonutCartItem(item);
            cartItems.appendChild(cartItem);
        });

        validBoxes.forEach((item, index) => {
            totalPrice += item.price;
            const cartItem = this.createBoxCartItem(item, index);
            cartItems.appendChild(cartItem);
        });

        if (cartTotal) cartTotal.textContent = DonutsUtils.formatPrice(totalPrice);

        this.updateCartCount();
        this.addCartEventHandlers();
    },

    createDonutCartItem(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} BYN</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        return cartItem;
    },

    createBoxCartItem(item, index) {
        const flowersText = item.flowers === 'yes' ? 'Да' : 'Нет';
        const cardText = item.card === 'yes' ? 'Да' : 'Нет';

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item box-cart-item';
        cartItem.setAttribute('data-box-index', index);
        cartItem.innerHTML = `
            <div class="box-cart-main">
                <div class="box-cart-header">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name} Бокс</div>
                        <div class="cart-item-price">${item.price} BYN</div>
                        <div class="box-options-info">
                            <span><strong>Цветы:</strong> ${flowersText}</span>
                            <span><strong>Открытка:</strong> ${cardText}</span>
                        </div>
                    </div>
                    <button class="toggle-box-details" data-box-index="${index}">▼</button>
                </div>
                <div class="box-details-content" style="display: none;">
                    <div class="box-donuts-list">
                        <h4>Состав бокса:</h4>
                        ${item.donuts ? item.donuts.map(donut => `
                            <div class="box-donut-item">
                                <img src="${donut.image}" alt="${donut.name}">
                                <span>${donut.name} (${donut.quantity} шт.)</span>
                            </div>
                        `).join('') : ''}
                    </div>
                    <div class="box-actions">
                        <button class="btn-edit-box" data-box-index="${index}">Редактировать</button>
                        <button class="btn-remove-box" data-box-index="${index}">Удалить</button>
                    </div>
                </div>
            </div>
        `;
        return cartItem;
    },

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (!cartCount) return;

        const donutCart = DonutsUtils.safeJSONParse(localStorage.getItem('donutsCart'));
        const boxesCart = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));

        const validDonuts = donutCart.filter(item => item && typeof item.price === 'number');
        const validBoxes = boxesCart.filter(item => item && typeof item.price === 'number');

        const donutCount = validDonuts.reduce((sum, item) => sum + item.quantity, 0);
        const boxCount = validBoxes.length;
        cartCount.textContent = donutCount + boxCount;
    },

    addCartEventHandlers() {
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.updateDonutQuantity(id, -1);
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.updateDonutQuantity(id, 1);
            });
        });

        document.querySelectorAll('.toggle-box-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-box-index');
                this.toggleBoxDetails(index);
            });
        });

        document.querySelectorAll('.btn-remove-box').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-box-index');
                this.removeBoxFromCart(index);
            });
        });

        document.querySelectorAll('.btn-edit-box').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-box-index');
                this.handleEditBox(index);
            });
        });
    },

    handleEditBox(index) {
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            DonutsBoxBuilder.editBoxFromCart(parseInt(index));
        } else {
            localStorage.setItem('editingBoxIndex', index);
            window.location.href = 'index.html#boxes';
        }
    },

    updateDonutQuantity(id, change) {
        let donutCart = DonutsUtils.safeJSONParse(localStorage.getItem('donutsCart'));
        const itemIndex = donutCart.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            if (donutCart[itemIndex].quantity + change > 0) {
                donutCart[itemIndex].quantity += change;
            } else {
                donutCart.splice(itemIndex, 1);
            }
            localStorage.setItem('donutsCart', JSON.stringify(donutCart));
            this.updateCart();
        }
    },

    toggleBoxDetails(index) {
        const boxElement = document.querySelector(`.box-cart-item[data-box-index="${index}"]`);
        if (!boxElement) return;

        const detailsContent = boxElement.querySelector('.box-details-content');
        const toggleButton = boxElement.querySelector('.toggle-box-details');

        if (detailsContent.style.display === 'block') {
            detailsContent.style.display = 'none';
            toggleButton.style.transform = 'rotate(0deg)';
        } else {
            detailsContent.style.display = 'block';
            toggleButton.style.transform = 'rotate(180deg)';
        }
    },

    removeBoxFromCart(index) {
        let boxesCart = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));

        if (boxesCart[index]) {
            boxesCart.splice(index, 1);
            localStorage.setItem('boxCartItems', JSON.stringify(boxesCart));
            this.updateCart();
            DonutsUtils.showNotification('Бокс удален из корзины');
        }
    },


    checkout() {
        const donutCart = DonutsUtils.safeJSONParse(localStorage.getItem('donutsCart'));
        const boxesCart = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));

        const validDonuts = donutCart.filter(item => item && typeof item.price === 'number');
        const validBoxes = boxesCart.filter(item => item && typeof item.price === 'number');

        if (validDonuts.length === 0 && validBoxes.length === 0) {
            alert('Корзина пуста!');
            return;
        }

        window.location.href = 'checkout.html';
    },

    addDonutToCart(id, name, price, image) {
        let donutCart = DonutsUtils.safeJSONParse(localStorage.getItem('donutsCart'));
        const existingItem = donutCart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            donutCart.push({ id, name, price, image, quantity: 1 });
        }

        localStorage.setItem('donutsCart', JSON.stringify(donutCart));
        this.updateCart();
        DonutsUtils.showNotification(`${name} добавлен в корзину`);
    }
};