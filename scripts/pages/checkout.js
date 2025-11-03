document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    setupFormHandler();
    setupDeliveryToggle();
    enhanceSelectStyles();
});

function loadOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const totalAmountElement = document.getElementById('total-amount');

    const donutCart = DonutsUtils.safeJSONParse(localStorage.getItem('donutsCart'));
    const boxesCart = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));

    const validDonuts = donutCart.filter(item => item && typeof item.price === 'number');
    const validBoxes = boxesCart.filter(item => item && typeof item.price === 'number');

    let totalAmount = 0;
    orderItemsContainer.innerHTML = '';

    if (validDonuts.length === 0 && validBoxes.length === 0) {
        orderItemsContainer.innerHTML = '<div class="order-item" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">Корзина пуста</div>';
        totalAmountElement.textContent = '0';
        return;
    }

    validBoxes.forEach(item => {
        if (!item || typeof item.price !== 'number') return;

        totalAmount += item.price;

        const itemElement = document.createElement('div');
        itemElement.className = 'order-box-item';
        itemElement.innerHTML = `
            <div class="box-header">
                <img src="${item.image}" alt="${item.name}">
                <div class="box-info">
                    <div class="box-name">${item.name} Бокс</div>
                    <div class="box-price">${item.price} BYN</div>
                    <div class="box-options">
                        <span><strong>Цветы:</strong> ${item.flowers === 'yes' ? 'Да' : 'Нет'}</span>
                        <span><strong>Открытка:</strong> ${item.card === 'yes' ? 'Да' : 'Нет'}</span>
                    </div>
                </div>
            </div>
            <div class="box-donuts">
                <h4>Состав бокса:</h4>
                <div class="donut-list">
                    ${item.donuts ? item.donuts.map(donut => `
                        <div class="donut-item">
                            <img src="${donut.image}" alt="${donut.name}">
                            <span>${donut.name} (${donut.quantity} шт.)</span>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });

    validDonuts.forEach(item => {
        if (!item || typeof item.price !== 'number') return;

        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-price">${item.price} BYN</div>
                <div class="order-item-quantity">${item.quantity} шт.</div>
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });

    totalAmountElement.textContent = DonutsUtils.formatPrice(totalAmount);

    setTimeout(() => {
        const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
        const paymentRadios = document.querySelectorAll('input[name="payment"]');

        deliveryRadios.forEach(radio => {
            const label = radio.closest('.option-label');
            if (radio.checked) {
                label.classList.add('selected');
            }
        });

        paymentRadios.forEach(radio => {
            const label = radio.closest('.option-label');
            if (radio.checked) {
                label.classList.add('selected');
            }
        });
    }, 100);
}

function setupDeliveryToggle() {
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const pickupAddressGroup = document.querySelector('.pickup-address-group');
    const deliveryAddressGroup = document.querySelector('.delivery-address-group');
    const deliveryAddressField = document.getElementById('delivery-address');
    const pickupAddressField = document.getElementById('pickup-address');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');

    function updateSelectedStyle(radios) {
        radios.forEach(radio => {
            const label = radio.closest('.option-label');
            if (radio.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    }

    function updateRequiredFields() {
        const isPickup = document.querySelector('input[name="delivery"]:checked').value === 'pickup';

        if (isPickup) {
            pickupAddressField.setAttribute('required', 'required');
            deliveryAddressField.removeAttribute('required');
            deliveryAddressField.value = '';
        } else {
            deliveryAddressField.setAttribute('required', 'required');
            pickupAddressField.removeAttribute('required');
            pickupAddressField.value = '';
        }
    }

    updateSelectedStyle(deliveryRadios);
    updateSelectedStyle(paymentRadios);
    updateRequiredFields();

    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateSelectedStyle(deliveryRadios);

            if (this.value === 'pickup') {
                pickupAddressGroup.style.display = 'block';
                deliveryAddressGroup.style.display = 'none';
            } else {
                pickupAddressGroup.style.display = 'none';
                deliveryAddressGroup.style.display = 'block';
            }

            updateRequiredFields();
        });
    });

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateSelectedStyle(paymentRadios);
        });
    });
}

function setupFormHandler() {
    const form = document.getElementById('delivery-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const donutCart = DonutsUtils.safeJSONParse(localStorage.getItem('donutsCart'));
        const boxesCart = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));

        const validDonuts = donutCart.filter(item => item && typeof item.price === 'number');
        const validBoxes = boxesCart.filter(item => item && typeof item.price === 'number');

        if (validDonuts.length === 0 && validBoxes.length === 0) {
            alert('Корзина пуста!');
            return;
        }

        const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
        let isValid = true;
        let errorMessage = '';

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (!name.trim()) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите ваше имя';
        } else if (!phone.trim()) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите ваш телефон';
        } else if (deliveryMethod === 'pickup') {
            const pickupAddress = document.getElementById('pickup-address').value;
            if (!pickupAddress) {
                isValid = false;
                errorMessage = 'Пожалуйста, выберите адрес самовывоза';
            }
        } else {
            const deliveryAddress = document.getElementById('delivery-address').value;
            if (!deliveryAddress.trim()) {
                isValid = false;
                errorMessage = 'Пожалуйста, введите адрес доставки';
            }
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        //здесь была бы отправка данных на сервер но...пока так
        const formData = {
            customer: {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value || null
            },
            delivery: {
                method: deliveryMethod,
                address: deliveryMethod === 'pickup'
                    ? document.getElementById('pickup-address').value
                    : document.getElementById('delivery-address').value
            },
            payment: {
                method: paymentMethod
            },
            comments: document.getElementById('comments').value || null,
            order: {
                donuts: validDonuts,
                boxes: validBoxes,
                total: document.getElementById('total-amount').textContent
            }
        };

        console.log('Данные заказа:', formData);

        localStorage.removeItem('donutsCart');
        localStorage.removeItem('boxCartItems');

        window.location.href = '../pages/index.html';
    });
}


function enhanceSelectStyles() {
    const selects = document.querySelectorAll('select');

    selects.forEach(select => {
        select.addEventListener('focus', function() {
            this.parentElement.classList.add('select-focused');
        });

        select.addEventListener('blur', function() {
            this.parentElement.classList.remove('select-focused');
        });

        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });

        if (select.value) {
            select.classList.add('has-value');
        }
    });
}