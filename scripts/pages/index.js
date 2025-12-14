document.addEventListener('DOMContentLoaded', function() {
    const editingBoxIndex = localStorage.getItem('editingBoxIndex');
    if (editingBoxIndex !== null) {
        setTimeout(() => {
            DonutsBoxBuilder.editBoxFromCart(editingBoxIndex);
            localStorage.removeItem('editingBoxIndex');
        }, 500);
    }

    DonutsPromotions.init();
    initBoxes();
    initCatalog();
    DonutsCart.init();
    DonutsUtils.initScrollAnimations();
    initCatalogTabs();
    DonutsBoxBuilder.init();
    DonutsHamburger.init();
    setupBoxAssembleHandlers();
    setupMobileCardHover();
});

function initBoxes() {
    const boxesContainer = document.querySelector('.boxes-container');
    if (!boxesContainer) return;

    boxesContainer.innerHTML = '';

    DonutsData.boxes.forEach(box => {
        const boxItem = document.createElement('div');
        boxItem.className = 'box-item fade-in';
        boxItem.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        boxItem.innerHTML = `
            <img src="${box.image}" alt="${box.title}">
            <h3 class="box-title">${box.title}</h3>
            <p class="box-description">${box.description}</p>
            <div class="box-footer">
                <div class="box-price">${box.price} BYN</div>
                <button class="btn btn-assemble" data-id="${box.id}" data-name="${box.title}" data-price="${box.price}" data-image="${box.image}" data-quantity="${box.quantity}">Собрать</button>
            </div>
        `;
        boxesContainer.appendChild(boxItem);

        if ('ontouchstart' in window) {
            boxItem.addEventListener('touchstart', () => {
                boxItem.style.transform = 'translateY(-5px)';
                boxItem.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            });

            boxItem.addEventListener('touchend', () => {
                setTimeout(() => {
                    boxItem.style.transform = '';
                    boxItem.style.boxShadow = '';
                }, 300);
            });
        }
    });
}

function initCatalog() {
    const catalogItems = document.querySelector('.catalog-items');
    if (!catalogItems) return;

    catalogItems.innerHTML = '';

    DonutsData.catalog.forEach(item => {
        const catalogItem = document.createElement('div');
        catalogItem.className = 'catalog-item fade-in';
        catalogItem.setAttribute('data-categories', item.categories.join(' '));
        catalogItem.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';

        const newBadge = item.isNew ? '<span class="new-badge">Новинка</span>' : '';

        catalogItem.innerHTML = `
            ${newBadge}
            <img src="${item.image}" alt="${item.name}">
            <h3 class="item-title">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-footer">
                <div class="item-price">${item.price} BYN</div>
                <button class="btn btn-add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">В корзину</button>
            </div>
        `;
        catalogItems.appendChild(catalogItem);

        if ('ontouchstart' in window) {
            catalogItem.addEventListener('touchstart', () => {
                catalogItem.style.transform = 'translateY(-5px)';
                catalogItem.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            });

            catalogItem.addEventListener('touchend', () => {
                setTimeout(() => {
                    catalogItem.style.transform = '';
                    catalogItem.style.boxShadow = '';
                }, 300);
            });
        }
    });

    catalogItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image');

            DonutsCart.addDonutToCart(id, name, price, image);

            e.target.textContent = 'Добавлено!';
            e.target.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                e.target.textContent = 'В корзину';
                e.target.style.backgroundColor = '';
            }, 1000);
        }
    });
}

function initCatalogTabs() {
    const catalogTabs = document.querySelectorAll('.catalog-tab');
    const catalogItems = document.querySelectorAll('.catalog-item');

    catalogTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            catalogTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            catalogItems.forEach(item => {
                const itemCategories = item.getAttribute('data-categories').split(' ');
                if (category === 'all' || itemCategories.includes(category)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        tab.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
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

            DonutsBoxBuilder.openBuilder(boxId, boxName, boxPrice, boxImage, boxQuantity);
        }
    });
}

function setupMobileCardHover() {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            const promotionItems = document.querySelectorAll('.promotion-item');
            const catalogItems = document.querySelectorAll('.catalog-item');
            const boxItems = document.querySelectorAll('.box-item');

            if ('ontouchstart' in window) {
                promotionItems.forEach(item => {
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

                catalogItems.forEach(item => {
                    item.addEventListener('touchstart', function() {
                        this.style.transform = 'translateY(-5px)';
                        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    });

                    item.addEventListener('touchend', function() {
                        setTimeout(() => {
                            this.style.transform = '';
                            this.style.boxShadow = '';
                        }, 300);
                    });
                });

                boxItems.forEach(item => {
                    item.addEventListener('touchstart', function() {
                        this.style.transform = 'translateY(-5px)';
                        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    });

                    item.addEventListener('touchend', function() {
                        setTimeout(() => {
                            this.style.transform = '';
                            this.style.boxShadow = '';
                        }, 300);
                    });
                });
            }
        }, 1000);
    });
}