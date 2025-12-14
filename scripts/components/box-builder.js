const DonutsBoxBuilder = {
    currentBoxConfig: {
        id: null,
        name: '',
        price: 0,
        image: '',
        quantity: 4,
        flowers: 'no',
        card: 'no',
        selectedDonuts: [],
        editingIndex: null
    },

    init() {
        this.setupModalEvents();
    },

    setupModalEvents() {
        const boxModalOverlay = document.getElementById('box-modal-overlay');
        const closeBoxModal = document.getElementById('close-box-modal');

        if (boxModalOverlay && closeBoxModal) {
            closeBoxModal.addEventListener('click', () => this.closeModal());
            boxModalOverlay.addEventListener('click', (e) => {
                if (e.target === boxModalOverlay) {
                    this.closeModal();
                }
            });
        }
    },

    openBuilder(boxId, boxName, boxPrice, boxImage, boxQuantity) {
        this.currentBoxConfig = {
            id: Date.now(),
            boxId: boxId,
            name: boxName,
            price: parseFloat(boxPrice),
            image: boxImage,
            quantity: parseInt(boxQuantity),
            flowers: 'no',
            card: 'no',
            selectedDonuts: [],
            editingIndex: null
        };

        const boxModalOverlay = document.getElementById('box-modal-overlay');
        const boxModalTitle = document.getElementById('box-modal-title');

        if (boxModalOverlay && boxModalTitle) {
            this.updateBoxNameByQuantity(this.currentBoxConfig.quantity);
            boxModalTitle.textContent = 'Собрать свой бокс';
            boxModalOverlay.style.display = 'flex';

            setTimeout(() => {
                this.initBuilder();
            }, 50);
        }
    },

    initBuilder() {
        const optionsScreen = document.getElementById('box-options-screen');
        const summaryScreen = document.getElementById('box-summary-screen');

        if (optionsScreen) optionsScreen.style.display = 'block';
        if (summaryScreen) summaryScreen.style.display = 'none';

        this.setActiveQuantityOption(this.currentBoxConfig.quantity);
        this.setActiveToggleOptions();
        this.loadBoxCatalog();
        this.setupBoxOptions();
        this.setupBoxNavigation();
    },

    closeModal() {
        const boxModalOverlay = document.getElementById('box-modal-overlay');
        if (boxModalOverlay) {
            boxModalOverlay.style.display = 'none';
        }
        this.currentBoxConfig.editingIndex = null;
        localStorage.removeItem('editingBoxIndex');
    },

    loadBoxCatalog() {
        let catalogContainer = document.getElementById('box-catalog-items');
        if (!catalogContainer) return;

        const newCatalogContainer = catalogContainer.cloneNode(false);
        catalogContainer.parentNode.replaceChild(newCatalogContainer, catalogContainer);

        catalogContainer = newCatalogContainer;
        catalogContainer.innerHTML = '';

        const donutsOnly = DonutsData.catalog.filter(item => !item.categories.includes('beverages'));

        donutsOnly.forEach(donut => {
            const existingItem = this.currentBoxConfig.selectedDonuts.find(item => item.id === donut.id);
            const quantity = existingItem ? existingItem.quantity : 0;

            // Добавляем бейдж "Новинка" если пончик новый
            const newBadge = donut.isNew ? '<span class="new-badge">Новинка</span>' : '';

            const donutItem = document.createElement('div');
            donutItem.className = 'box-catalog-item';
            donutItem.setAttribute('data-id', donut.id.toString());
            donutItem.setAttribute('data-categories', donut.categories.join(' '));
            donutItem.innerHTML = `
            ${newBadge}
            <img src="${donut.image}" alt="${donut.name}">
            <div class="box-item-title">${donut.name}</div>
            <div class="box-item-price">${donut.price} BYN</div>
            <div class="box-item-controls">
                ${quantity > 0 ? `
                    <button class="box-quantity-btn minus" data-id="${donut.id}">-</button>
                    <span class="box-item-quantity">${quantity}</span>
                    <button class="box-quantity-btn plus" data-id="${donut.id}">+</button>
                ` : `
                    <button class="btn-add-to-box" data-id="${donut.id}">Добавить</button>
                `}
            </div>
        `;
            catalogContainer.appendChild(donutItem);
        });

        catalogContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-to-box')) {
                this.addDonutToBox(e.target.getAttribute('data-id'));
            } else if (e.target.classList.contains('box-quantity-btn')) {
                if (e.target.classList.contains('minus')) {
                    this.removeDonutFromBox(e.target.getAttribute('data-id'));
                } else if (e.target.classList.contains('plus')) {
                    this.addDonutToBox(e.target.getAttribute('data-id'));
                }
            }
        });

        this.initBoxCatalogTabs();
    },


    initBoxCatalogTabs() {
        const catalogTabs = document.querySelectorAll('.compact-tabs .catalog-tab');
        const catalogItems = document.querySelectorAll('.box-catalog-item');

        catalogTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                catalogTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');

                const category = e.target.getAttribute('data-category');
                catalogItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-categories').split(' ');
                    if (category === 'all' || itemCategories.includes(category)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    },


    setupBoxOptions() {
        document.querySelectorAll('.quantity-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.quantity-option').forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');

                const newQuantity = parseInt(e.target.getAttribute('data-quantity'));
                const totalSelected = this.currentBoxConfig.selectedDonuts.reduce((sum, item) => sum + item.quantity, 0);

                if (totalSelected > newQuantity) {

                    let remaining = newQuantity;
                    const newSelectedDonuts = [];

                    this.currentBoxConfig.selectedDonuts.forEach(item => {
                        if (remaining >= item.quantity) {
                            newSelectedDonuts.push(item);
                            remaining -= item.quantity;
                        } else if (remaining > 0) {
                            newSelectedDonuts.push({...item, quantity: remaining});
                            remaining = 0;
                        }
                    });

                    this.currentBoxConfig.selectedDonuts = newSelectedDonuts;
                }

                this.updateBoxNameByQuantity(newQuantity);
                this.currentBoxConfig.quantity = newQuantity;
                this.updateSelectionLimit();
                this.loadBoxCatalog();
            });
        });

        document.querySelectorAll('.toggle-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const optionType = e.target.getAttribute('data-option');
                const optionValue = e.target.getAttribute('data-value');

                document.querySelectorAll(`.toggle-option[data-option="${optionType}"]`).forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');

                this.currentBoxConfig[optionType] = optionValue;
            });
        });
    },

    setupBoxNavigation() {
        const nextButton = document.getElementById('next-to-summary');
        const backButton = document.getElementById('back-to-options');
        const addToCartButton = document.getElementById('add-box-to-cart');

        if (nextButton) {
            const newNextButton = nextButton.cloneNode(true);
            nextButton.parentNode.replaceChild(newNextButton, nextButton);
        }
        if (backButton) {
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
        }
        if (addToCartButton) {
            const newAddToCartButton = addToCartButton.cloneNode(true);
            addToCartButton.parentNode.replaceChild(newAddToCartButton, addToCartButton);
        }

        const updatedNextButton = document.getElementById('next-to-summary');
        const updatedBackButton = document.getElementById('back-to-options');
        const updatedAddToCartButton = document.getElementById('add-box-to-cart');

        if (updatedNextButton) {
            updatedNextButton.addEventListener('click', () => {
                const totalSelected = this.currentBoxConfig.selectedDonuts.reduce((sum, item) => sum + item.quantity, 0);
                if (totalSelected === this.currentBoxConfig.quantity) {
                    this.showSummaryScreen();
                } else {
                    alert(`Пожалуйста, выберите ровно ${this.currentBoxConfig.quantity} пончиков для продолжения.`);
                }
            });
        }

        if (updatedBackButton) {
            updatedBackButton.addEventListener('click', () => {
                const optionsScreen = document.getElementById('box-options-screen');
                const summaryScreen = document.getElementById('box-summary-screen');
                if (optionsScreen) optionsScreen.style.display = 'block';
                if (summaryScreen) summaryScreen.style.display = 'none';
            });
        }

        if (updatedAddToCartButton) {
            updatedAddToCartButton.textContent = this.currentBoxConfig.editingIndex !== null ? 'Обновить корзину' : 'Добавить в корзину';
            updatedAddToCartButton.addEventListener('click', () => {
                this.addBoxToCart();
            });
        }
    },

    setActiveQuantityOption(quantity) {
        document.querySelectorAll('.quantity-option').forEach(option => {
            const optionQuantity = parseInt(option.getAttribute('data-quantity'));
            option.classList.toggle('active', optionQuantity === quantity);
        });
    },

    setActiveToggleOptions() {
        document.querySelectorAll('.toggle-option').forEach(option => {
            const optionType = option.getAttribute('data-option');
            const optionValue = option.getAttribute('data-value');
            option.classList.remove('active');
            if (optionValue === this.currentBoxConfig[optionType]) {
                option.classList.add('active');
            }
        });
    },

    updateBoxNameByQuantity(quantity) {
        let newName = '';
        let newPrice = 0;
        let newImage = '';

        // Находим соответствующий бокс в данных по количеству пончиков
        const matchingBox = DonutsData.boxes.find(box => box.quantity === quantity);

        if (matchingBox) {
            newName = matchingBox.title;
            newPrice = matchingBox.price;
            newImage = matchingBox.image;
        } else {
            switch(quantity) {
                case 4:
                    newName = 'Маленький';
                    newPrice = 4.5;
                    newImage = "../images/бокс на 4.png";
                    break;
                case 8:
                    newName = 'Средний';
                    newPrice = 8;
                    newImage = "../images/бокс на 8.png";
                    break;
                case 12:
                    newName = 'Большой';
                    newPrice = 11;
                    newImage = "../images/бокс на 12.png";
                    break;
                default:
                    newName = 'Кастомный';
                    newPrice = quantity * 1.1;
                    newImage = "../images/бокс на 8.png";
            }
        }

        this.currentBoxConfig.name = newName;
        this.currentBoxConfig.price = newPrice;
        this.currentBoxConfig.image = newImage;

        const addToCartButton = document.getElementById('add-box-to-cart');
        if (addToCartButton) {
            addToCartButton.textContent = this.currentBoxConfig.editingIndex !== null ? 'Обновить корзину' : 'Добавить в корзину';
        }
    },

    addDonutToBox(donutId) {
        const totalSelected = this.currentBoxConfig.selectedDonuts.reduce((sum, item) => sum + item.quantity, 0);
        if (totalSelected >= this.currentBoxConfig.quantity) {
            this.showSelectionLimitMessage();
            return;
        }

        const numericDonutId = parseInt(donutId);
        const donut = DonutsData.catalog.find(d => d.id === numericDonutId);
        if (!donut) return;

        const existingItem = this.currentBoxConfig.selectedDonuts.find(item => item.id === numericDonutId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.currentBoxConfig.selectedDonuts.push({ ...donut, quantity: 1 });
        }

        this.updateDonutControls(donutId);
        this.updateSelectionLimit();
    },

    removeDonutFromBox(donutId) {
        const numericDonutId = parseInt(donutId);
        const existingItemIndex = this.currentBoxConfig.selectedDonuts.findIndex(item => item.id === numericDonutId);

        if (existingItemIndex !== -1) {
            const existingItem = this.currentBoxConfig.selectedDonuts[existingItemIndex];
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                this.currentBoxConfig.selectedDonuts.splice(existingItemIndex, 1);
            }
            this.updateDonutControls(donutId);
            this.updateSelectionLimit();
        }
    },

    updateDonutControls(donutId) {
        const numericDonutId = parseInt(donutId);
        const existingItem = this.currentBoxConfig.selectedDonuts.find(item => item.id === numericDonutId);
        const donutItem = document.querySelector(`.box-catalog-item[data-id="${donutId}"]`);

        if (!donutItem) return;

        const controlsContainer = donutItem.querySelector('.box-item-controls');
        const totalSelected = this.currentBoxConfig.selectedDonuts.reduce((sum, item) => sum + item.quantity, 0);

        if (existingItem && existingItem.quantity > 0) {
            controlsContainer.innerHTML = `
                <button class="box-quantity-btn minus" data-id="${donutId}">-</button>
                <span class="box-item-quantity">${existingItem.quantity}</span>
                <button class="box-quantity-btn plus" data-id="${donutId}" ${totalSelected >= this.currentBoxConfig.quantity ? 'disabled' : ''}>+</button>
            `;
        } else {
            controlsContainer.innerHTML = `<button class="btn-add-to-box" data-id="${donutId}" ${totalSelected >= this.currentBoxConfig.quantity ? 'disabled' : ''}>Добавить</button>`;
        }
    },

    updateSelectionLimit() {
        const totalSelected = this.currentBoxConfig.selectedDonuts.reduce((sum, item) => sum + item.quantity, 0);
        const limitMessage = document.getElementById('selection-limit-message');
        const nextButton = document.getElementById('next-to-summary');

        if (limitMessage) {
            limitMessage.style.display = totalSelected >= this.currentBoxConfig.quantity ? 'block' : 'none';
        }

        if (nextButton) {
            const isComplete = totalSelected === this.currentBoxConfig.quantity;
            nextButton.disabled = !isComplete;
            nextButton.style.opacity = isComplete ? '1' : '0.6';
            nextButton.style.cursor = isComplete ? 'pointer' : 'not-allowed';
        }
    },

    showSelectionLimitMessage() {
        const limitMessage = document.getElementById('selection-limit-message');
        if (limitMessage) {
            limitMessage.style.display = 'block';
            setTimeout(() => { limitMessage.style.display = 'none'; }, 2000);
        }
    },

    showSummaryScreen() {
        const optionsScreen = document.getElementById('box-options-screen');
        const summaryScreen = document.getElementById('box-summary-screen');
        const selectedContainer = document.getElementById('selected-items-container');
        const boxImageElement = document.getElementById('box-summary-image'); // Добавляем элемент для изображения бокса

        if (optionsScreen) optionsScreen.style.display = 'none';
        if (summaryScreen) summaryScreen.style.display = 'block';
        if (!selectedContainer) return;

        // Обновляем изображение бокса
        if (boxImageElement) {
            boxImageElement.src = this.currentBoxConfig.image;
            boxImageElement.alt = this.currentBoxConfig.name;
        }

        selectedContainer.innerHTML = '';
        this.currentBoxConfig.selectedDonuts.forEach(donut => {
            const selectedItem = document.createElement('div');
            selectedItem.className = 'selected-item';
            selectedItem.innerHTML = `
            <img src="${donut.image}" alt="${donut.name}">
            <div class="selected-item-info">
                <div class="selected-item-name">${donut.name}</div>
                <div class="selected-item-quantity">Количество: ${donut.quantity}</div>
            </div>
        `;
            selectedContainer.appendChild(selectedItem);
        });
    },

    addBoxToCart() {
        const totalSelected = this.currentBoxConfig.selectedDonuts.reduce((sum, item) => sum + item.quantity, 0);
        if (totalSelected !== this.currentBoxConfig.quantity) {
            alert(`Пожалуйста, выберите ровно ${this.currentBoxConfig.quantity} пончиков для продолжения.`);
            return;
        }

        let boxCartItems = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));
        const boxItem = this.createBoxCartItemObject();

        if (this.currentBoxConfig.editingIndex !== null) {
            boxCartItems[this.currentBoxConfig.editingIndex] = boxItem;
            DonutsUtils.showNotification(`Бокс "${this.currentBoxConfig.name}" обновлен!`);
        } else {
            boxCartItems.push(boxItem);
            DonutsUtils.showNotification(`Бокс "${this.currentBoxConfig.name}" добавлен в корзину!`);
        }

        localStorage.setItem('boxCartItems', JSON.stringify(boxCartItems));
        DonutsCart.updateCart();
        this.closeModal();
    },

    createBoxCartItemObject() {
        return {
            id: this.currentBoxConfig.id,
            boxId: this.currentBoxConfig.boxId,
            name: this.currentBoxConfig.name,
            price: this.currentBoxConfig.price,
            image: this.currentBoxConfig.image,
            quantity: this.currentBoxConfig.quantity,
            flowers: this.currentBoxConfig.flowers,
            card: this.currentBoxConfig.card,
            donuts: [...this.currentBoxConfig.selectedDonuts],
            expanded: false
        };
    },

    editBoxFromCart(index) {
        const boxesCart = DonutsUtils.safeJSONParse(localStorage.getItem('boxCartItems'));
        const numericIndex = parseInt(index);
        const boxToEdit = boxesCart[numericIndex];

        if (!boxToEdit) return;

        this.currentBoxConfig = {
            id: boxToEdit.id,
            boxId: boxToEdit.boxId,
            name: boxToEdit.name,
            price: boxToEdit.price,
            image: boxToEdit.image,
            quantity: boxToEdit.quantity,
            flowers: boxToEdit.flowers,
            card: boxToEdit.card,
            selectedDonuts: [...boxToEdit.donuts],
            editingIndex: numericIndex
        };

        const boxModalOverlay = document.getElementById('box-modal-overlay');
        const boxModalTitle = document.getElementById('box-modal-title');

        if (boxModalOverlay && boxModalTitle) {
            boxModalTitle.textContent = 'Редактировать бокс';
            boxModalOverlay.style.display = 'flex';

            setTimeout(() => {
                this.initBuilder();
            }, 50);
        }
    }
};