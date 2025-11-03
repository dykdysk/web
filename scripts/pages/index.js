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

    setupBoxAssembleHandlers();
});

function initBoxes() {
    const boxesContainer = document.querySelector('.boxes-container');
    if (!boxesContainer) return;

    boxesContainer.innerHTML = '';

    DonutsData.boxes.forEach(box => {
        const boxItem = document.createElement('div');
        boxItem.className = 'box-item fade-in';
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
    });
}

function initCatalog() {
    const catalogItems = document.querySelector('.catalog-items');
    if (!catalogItems) return;

    catalogItems.innerHTML = '';

    DonutsData.catalog.forEach(item => {
        const catalogItem = document.createElement('div');
        catalogItem.className = 'catalog-item fade-in';
        catalogItem.setAttribute('data-category', item.category);
        catalogItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3 class="item-title">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-footer">
                <div class="item-price">${item.price} BYN</div>
                <button class="btn btn-add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">В корзину</button>
            </div>
        `;
        catalogItems.appendChild(catalogItem);
    });

    catalogItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image');

            DonutsCart.addDonutToCart(id, name, price, image);

            e.target.textContent = 'Добавлено!';
            setTimeout(() => {
                e.target.textContent = 'В корзину';
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
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function setupCartEditHandlers() {
    // Делегирование событий для динамически создаваемых кнопок
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-edit-box')) {
            const index = e.target.getAttribute('data-box-index');
            DonutsBoxBuilder.editBoxFromCart(index);
        }
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