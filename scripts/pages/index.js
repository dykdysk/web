document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Donuts Shop');

    // Проверяем наличие редактируемого бокса
    const editingBoxIndex = localStorage.getItem('editingBoxIndex');
    if (editingBoxIndex !== null && editingBoxIndex !== 'undefined') {
        console.log('Editing box index found:', editingBoxIndex);
        setTimeout(() => {
            if (typeof DonutsBoxBuilder !== 'undefined' && DonutsBoxBuilder.editBoxFromCart) {
                DonutsBoxBuilder.editBoxFromCart(editingBoxIndex);
            }
            localStorage.removeItem('editingBoxIndex');
        }, 500);
    }

    // Инициализация компонентов с проверкой на доступность
    try {
        if (typeof DonutsPromotions !== 'undefined' && DonutsPromotions.init) {
            DonutsPromotions.init();
        }

        initBoxes();
        initCatalog();

        if (typeof DonutsCart !== 'undefined' && DonutsCart.init) {
            DonutsCart.init();
        }

        initCatalogTabs();

        if (typeof DonutsBoxBuilder !== 'undefined' && DonutsBoxBuilder.init) {
            DonutsBoxBuilder.init();
        }

        if (typeof DonutsHamburger !== 'undefined' && DonutsHamburger.init) {
            DonutsHamburger.init();
        }

        setupBoxAssembleHandlers();
        setupMobileCardHover();

        // Инициализация плавной прокрутки
        if (typeof DonutsUtils !== 'undefined' && DonutsUtils.initSmoothScroll) {
            DonutsUtils.initSmoothScroll();
        }

    } catch (error) {
        console.error('Error initializing components:', error);
    }
});

function initBoxes() {
    console.log('Initializing boxes...');
    const boxesContainer = document.querySelector('.boxes-container');

    if (!boxesContainer) {
        console.error('Boxes container not found!');
        return;
    }

    boxesContainer.innerHTML = '';

    if (!DonutsData || !DonutsData.boxes || DonutsData.boxes.length === 0) {
        console.error('No boxes data available');
        boxesContainer.innerHTML = '<div class="no-data-message"><p>Боксы временно недоступны</p></div>';
        return;
    }

    console.log(`Creating ${DonutsData.boxes.length} boxes`);

    DonutsData.boxes.forEach(box => {
        const boxItem = document.createElement('div');
        boxItem.className = 'box-item';
        boxItem.innerHTML = `
            <img src="${box.image}" alt="${box.title}" loading="lazy">
            <h3 class="box-title">${box.title}</h3>
            <p class="box-description">${box.description}</p>
            <div class="box-footer">
                <div class="box-price">${box.price} BYN</div>
                <button class="btn btn-assemble" 
                    data-id="${box.id}" 
                    data-name="${box.title}" 
                    data-price="${box.price}" 
                    data-image="${box.image}" 
                    data-quantity="${box.quantity}">Собрать</button>
            </div>
        `;
        boxesContainer.appendChild(boxItem);
    });
}

function initCatalog() {
    console.log('Initializing catalog...');
    const catalogItems = document.querySelector('.catalog-items');

    if (!catalogItems) {
        console.error('Catalog container not found!');
        return;
    }

    catalogItems.innerHTML = '';

    if (!DonutsData || !DonutsData.catalog || DonutsData.catalog.length === 0) {
        console.error('No catalog data available');
        catalogItems.innerHTML = '<div class="no-data-message"><p>Товары временно недоступны</p></div>';
        return;
    }

    console.log(`Creating ${DonutsData.catalog.length} catalog items`);

    DonutsData.catalog.forEach(item => {
        const catalogItem = document.createElement('div');
        catalogItem.className = 'catalog-item';
        catalogItem.setAttribute('data-categories', item.categories.join(' '));

        const newBadge = item.isNew ? '<span class="new-badge">Новинка</span>' : '';

        catalogItem.innerHTML = `
            ${newBadge}
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <h3 class="item-title">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-footer">
                <div class="item-price">${item.price} BYN</div>
                <button class="btn btn-add-to-cart" 
                    data-id="${item.id}" 
                    data-name="${item.name}" 
                    data-price="${item.price}" 
                    data-image="${item.image}">В корзину</button>
            </div>
        `;
        catalogItems.appendChild(catalogItem);
    });

    // Обработчик для кнопок "В корзину"
    catalogItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image');

            if (typeof DonutsCart !== 'undefined' && DonutsCart.addDonutToCart) {
                DonutsCart.addDonutToCart(id, name, price, image);
            }

            // Визуальная обратная связь
            const originalText = e.target.textContent;
            e.target.textContent = 'Добавлено!';
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.color = 'white';

            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.backgroundColor = '';
                e.target.style.color = '';
            }, 1500);
        }
    });
}

function initCatalogTabs() {
    const catalogTabs = document.querySelectorAll('.catalog-tab');
    const catalogItems = document.querySelectorAll('.catalog-item');

    catalogTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс со всех вкладок
            catalogTabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Фильтруем товары по категории
            catalogItems.forEach(item => {
                const itemCategories = item.getAttribute('data-categories').split(' ');
                if (category === 'all' || itemCategories.includes(category)) {
                    item.style.display = 'flex';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.3s ease';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function setupBoxAssembleHandlers() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-assemble')) {
            const button = e.target;
            const boxId = button.getAttribute('data-id');
            const boxName = button.getAttribute('data-name');
            const boxPrice = button.getAttribute('data-price');
            const boxImage = button.getAttribute('data-image');
            const boxQuantity = button.getAttribute('data-quantity');

            if (typeof DonutsBoxBuilder !== 'undefined' && DonutsBoxBuilder.openBuilder) {
                DonutsBoxBuilder.openBuilder(boxId, boxName, boxPrice, boxImage, boxQuantity);
            }
        }
    });
}

function setupMobileCardHover() {
    if ('ontouchstart' in window) {
        document.querySelectorAll('.promotion-item, .catalog-item, .box-item').forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
            });

            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 300);
            });
        });
    }
}

// Функция для отображения сообщения об ошибке
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff6b6b;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-weight: 500;
        max-width: 90%;
        text-align: center;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Обработчик ошибок глобально
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    if (e.error && e.error.toString().includes('eval')) {
        console.warn('CSP policy blocked eval execution');
    }
});