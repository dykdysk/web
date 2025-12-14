const DonutsReviews = {
    currentPage: 1,
    reviewsPerPage: 5,
    currentSort: 'newest',
    ratingErrorShown: false,

    init() {
        this.loadReviews();
        this.setupEventListeners();
        this.renderReviews();
    },

    loadReviews() {
        const savedReviews = localStorage.getItem('donutsReviews');
        this.reviews = savedReviews ? JSON.parse(savedReviews) : [];
    },

    saveReviews() {
        localStorage.setItem('donutsReviews', JSON.stringify(this.reviews));
    },

    setupEventListeners() {
        // Звезды для рейтинга
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => {
                this.setRating(parseInt(star.dataset.value));
                this.hideRatingError(); // Скрываем ошибку при клике на звезду
            });
            star.addEventListener('mouseover', () => this.previewRating(parseInt(star.dataset.value)));
        });

        document.querySelector('.star-rating').addEventListener('mouseleave', () => this.resetStarPreview());

        // Форма отправки отзыва
        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => this.submitReview(e));
        }

        // Сортировка
        const sortSelect = document.getElementById('reviews-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.currentPage = 1;
                this.renderReviews();
            });
        }
    },

    setRating(rating) {
        document.getElementById('review-rating').value = rating;
        document.querySelectorAll('.star').forEach(star => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    },

    previewRating(rating) {
        document.querySelectorAll('.star').forEach(star => {
            const starValue = parseInt(star.dataset.value);
            star.style.color = starValue <= rating ? '#ffd700' : '#ddd';
        });
    },

    resetStarPreview() {
        const currentRating = parseInt(document.getElementById('review-rating').value);
        document.querySelectorAll('.star').forEach(star => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= currentRating) {
                star.style.color = '#ffd700';
            } else {
                star.style.color = '#ddd';
            }
        });
    },

    showRatingError() {
        const ratingError = document.getElementById('rating-error');
        if (ratingError) {
            ratingError.style.display = 'block';
            this.ratingErrorShown = true;

            // Автоматически скрываем через 3 секунды
            setTimeout(() => {
                this.hideRatingError();
            }, 3000);
        }
    },

    hideRatingError() {
        const ratingError = document.getElementById('rating-error');
        if (ratingError) {
            ratingError.style.display = 'none';
            this.ratingErrorShown = false;
        }
    },

    submitReview(e) {
        e.preventDefault();

        const nameInput = document.getElementById('review-name');
        const ratingInput = document.getElementById('review-rating');
        const textInput = document.getElementById('review-text');

        const name = nameInput.value.trim() || 'Аноним';
        const rating = parseInt(ratingInput.value);
        const text = textInput.value.trim();

        // Валидация - теперь показываем ошибку только если оценка действительно не поставлена
        if (rating === 0) {
            this.showRatingError();

            // Плавно прокручиваем к звездам
            document.querySelector('.star-rating').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return;
        }

        if (!text) {
            // Добавляем красную рамку к текстовому полю
            textInput.style.borderColor = '#ff6b6b';
            textInput.focus();

            // Убираем красную рамку через 2 секунды или при фокусе
            setTimeout(() => {
                textInput.style.borderColor = '';
            }, 2000);

            textInput.addEventListener('focus', () => {
                textInput.style.borderColor = '';
            }, { once: true });

            return;
        }

        // Создаем отзыв
        const review = {
            id: Date.now(),
            name: name,
            rating: rating,
            text: text,
            date: new Date().toISOString()
        };

        // Добавляем в начало массива
        this.reviews.unshift(review);
        this.saveReviews();

        // Сброс формы
        document.getElementById('review-form').reset();
        document.getElementById('review-rating').value = 0;
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
            star.style.color = '#ddd';
        });

        // Скрываем ошибку если была показана
        this.hideRatingError();

        // Обновляем отображение
        this.currentPage = 1;
        this.renderReviews();

        // Показываем уведомление
        DonutsUtils.showNotification('Спасибо за ваш отзыв!');

        // Плавно прокручиваем к новому отзыву
        setTimeout(() => {
            const firstReview = document.querySelector('.review-item');
            if (firstReview) {
                firstReview.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Добавляем анимацию выделения нового отзыва
                firstReview.style.backgroundColor = '#fff5f7';
                setTimeout(() => {
                    firstReview.style.backgroundColor = '';
                }, 2000);
            }
        }, 300);
    },

    getSortedReviews() {
        const reviews = [...this.reviews];

        switch(this.currentSort) {
            case 'newest':
                return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'oldest':
                return reviews.sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'highest':
                return reviews.sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date));
            case 'lowest':
                return reviews.sort((a, b) => a.rating - b.rating || new Date(b.date) - new Date(a.date));
            default:
                return reviews;
        }
    },

    renderReviews() {
        const sortedReviews = this.getSortedReviews();
        const totalReviews = sortedReviews.length;
        const totalPages = Math.ceil(totalReviews / this.reviewsPerPage);

        // Обновляем счетчик
        const totalElement = document.getElementById('total-reviews');
        if (totalElement) {
            totalElement.textContent = totalReviews;
        }

        // Получаем отзывы для текущей страницы
        const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        const pageReviews = sortedReviews.slice(startIndex, endIndex);

        // Рендерим список отзывов
        const reviewsList = document.getElementById('reviews-list');
        if (!reviewsList) return;

        if (pageReviews.length === 0) {
            reviewsList.innerHTML = `
                <div class="no-reviews">
                    <p>Пока нет отзывов. Будьте первым!</p>
                </div>
            `;
        } else {
            reviewsList.innerHTML = pageReviews.map(review => this.createReviewHTML(review)).join('');
        }

        // Рендерим пагинацию
        this.renderPagination(totalPages);
    },

    createReviewHTML(review) {
        const date = new Date(review.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Создаем звезды рейтинга
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        // Получаем первую букву имени для аватара
        const avatarLetter = review.name.charAt(0).toUpperCase();

        return `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">${avatarLetter}</div>
                        <div class="reviewer-details">
                            <h4>${review.name}</h4>
                            <div class="review-date">${formattedDate}</div>
                        </div>
                    </div>
                    <div class="review-stars" title="${review.rating} из 5 звёзд">
                        ${stars}
                    </div>
                </div>
                <p class="review-content">${review.text}</p>
            </div>
        `;
    },

    renderPagination(totalPages) {
        const paginationContainer = document.getElementById('reviews-pagination');
        if (!paginationContainer) return;

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Кнопка "Назад"
        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    ${this.currentPage === 1 ? 'disabled' : ''}
                    data-page="${this.currentPage - 1}">
                ←
            </button>
        `;

        // Номера страниц
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            paginationHTML += `
                <button class="pagination-btn" data-page="1">1</button>
                ${startPage > 2 ? '<span class="pagination-dots">...</span>' : ''}
            `;
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn ${this.currentPage === i ? 'active' : ''}" 
                        data-page="${i}">
                    ${i}
                </button>
            `;
        }

        if (endPage < totalPages) {
            paginationHTML += `
                ${endPage < totalPages - 1 ? '<span class="pagination-dots">...</span>' : ''}
                <button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>
            `;
        }

        // Кнопка "Вперед"
        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    ${this.currentPage === totalPages ? 'disabled' : ''}
                    data-page="${this.currentPage + 1}">
                →
            </button>
        `;

        paginationContainer.innerHTML = paginationHTML;

        // Добавляем обработчики кликов
        paginationContainer.querySelectorAll('.pagination-btn:not(.disabled)').forEach(button => {
            button.addEventListener('click', () => {
                const page = parseInt(button.getAttribute('data-page'));
                if (page && page !== this.currentPage) {
                    this.currentPage = page;
                    this.renderReviews();

                    // Плавная прокрутка к началу отзывов
                    document.querySelector('.reviews-list').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    // Метод для добавления тестовых отзывов (можно удалить после добавления реальных)
    addSampleReviews() {
        if (this.reviews.length > 0) return;

        const sampleReviews = [
            {
                id: 1,
                name: "Анна",
                rating: 5,
                text: "Пончики просто божественные! Особенно клубничные с малиной. Заказываем каждую неделю всей семьей.",
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                name: "Максим",
                rating: 4,
                text: "Очень вкусно, но жаль что быстро заканчиваются. Доставка быстрая, пончики всегда свежие.",
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                name: "Екатерина",
                rating: 5,
                text: "Заказывала бокс на день рождения дочери. Все гости были в восторге! Цветы и открытка - приятный бонус.",
                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 4,
                name: "Дмитрий",
                rating: 3,
                text: "Вкусно, но дороговато. Жду акций чтобы заказать побольше.",
                date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 5,
                name: "Ольга",
                rating: 5,
                text: "Новогодние пончики - это шедевр! Съели за 5 минут, хотя планировали растянуть удовольствие.",
                date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 6,
                name: "Иван",
                rating: 4,
                text: "Хорошее качество, быстрая доставка. Советую попробовать шоколадные с орехами.",
                date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        this.reviews = sampleReviews;
        this.saveReviews();
        this.renderReviews();
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    DonutsReviews.init();
    // Можно раскомментировать для добавления тестовых данных:
    // DonutsReviews.addSampleReviews();
});