const DonutsReviews = {
    currentPage: 1,
    reviewsPerPage: 5,
    currentSort: 'newest',
    ratingErrorShown: false,

    async init() {
        this.api = new ApiService();
        await this.loadReviews();
        this.setupEventListeners();
        this.renderReviews();
    },

    async loadReviews() {
        const savedReviews = await this.api.getAll("reviews");
        console.log(savedReviews);
        this.reviews = savedReviews ? savedReviews : [];

        this.reviews = this.reviews.map(review => ({
            ...review,
            date: new Date(review.date)
        }));
    },

    setupEventListeners() {
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => {
                this.setRating(parseInt(star.dataset.value));
                this.hideRatingError();
            });
            star.addEventListener('mouseover', () => this.previewRating(parseInt(star.dataset.value)));
        });

        document.querySelector('.star-rating').addEventListener('mouseleave', () => this.resetStarPreview());

        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => this.submitReview(e));
        }

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
            star.style.color = starValue <= rating ? '#ffdc81' : '#ddd';
        });
    },

    resetStarPreview() {
        const currentRating = parseInt(document.getElementById('review-rating').value);
        document.querySelectorAll('.star').forEach(star => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= currentRating) {
                star.style.color = '#ffdc81';
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

    async submitReview(e) {
        e.preventDefault();

        const nameInput = document.getElementById('review-name');
        const ratingInput = document.getElementById('review-rating');
        const textInput = document.getElementById('review-text');

        const name = nameInput.value.trim() || 'Аноним';
        const rating = parseInt(ratingInput.value);
        const text = textInput.value.trim();

        if (rating === 0) {
            this.showRatingError();

            document.querySelector('.star-rating').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return;
        }

        if (!text) {
            textInput.style.borderColor = '#ff6b6b';
            textInput.focus();

            setTimeout(() => {
                textInput.style.borderColor = '';
            }, 2000);

            textInput.addEventListener('focus', () => {
                textInput.style.borderColor = '';
            }, { once: true });

            return;
        }

        const review = {
            name: name,
            rating: rating,
            text: text,
            date: new Date()
        };

        try {
            this.reviews.unshift(review);

            const reviewForServer = {
                ...review,
                date: review.date.toISOString()
            };

            const response = await this.api.createReview(reviewForServer);

            document.getElementById('review-form').reset();
            document.getElementById('review-rating').value = 0;
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
                star.style.color = '#ddd';
            });

            this.hideRatingError();

            this.currentPage = 1;
            this.renderReviews();

            DonutsUtils.showNotification('Спасибо за ваш отзыв!');

            setTimeout(() => {
                const firstReview = document.querySelector('.review-item');
                if (firstReview) {
                    firstReview.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    firstReview.style.backgroundColor = '#fff5f7';
                    setTimeout(() => {
                        firstReview.style.backgroundColor = '';
                    }, 2000);
                }
            }, 300);
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
            DonutsUtils.showNotification('Отзыв не был добавлен');
        }
    },

    getSortedReviews() {
        const reviews = [...this.reviews];

        switch(this.currentSort) {
            case 'newest':
                return reviews.sort((a, b) => b.date - a.date);
            case 'oldest':
                return reviews.sort((a, b) => a.date - b.date);
            case 'highest':
                return reviews.sort((a, b) => b.rating - a.rating || b.date - a.date);
            case 'lowest':
                return reviews.sort((a, b) => a.rating - b.rating || b.date - a.date);
            default:
                return reviews;
        }
    },

    renderReviews() {
        const sortedReviews = this.getSortedReviews();
        const totalReviews = sortedReviews.length;
        const totalPages = Math.ceil(totalReviews / this.reviewsPerPage);

        const totalElement = document.getElementById('total-reviews');
        if (totalElement) {
            totalElement.textContent = totalReviews;
        }

        const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        const pageReviews = sortedReviews.slice(startIndex, endIndex);

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

        this.renderPagination(totalPages);
    },

    createReviewHTML(review) {
        const date = review.date instanceof Date ? review.date : new Date(review.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

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

        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    ${this.currentPage === 1 ? 'disabled' : ''}
                    data-page="${this.currentPage - 1}">
                ←
            </button>
        `;

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

        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    ${this.currentPage === totalPages ? 'disabled' : ''}
                    data-page="${this.currentPage + 1}">
                →
            </button>
        `;

        paginationContainer.innerHTML = paginationHTML;

        paginationContainer.querySelectorAll('.pagination-btn:not(.disabled)').forEach(button => {
            button.addEventListener('click', () => {
                const page = parseInt(button.getAttribute('data-page'));
                if (page && page !== this.currentPage) {
                    this.currentPage = page;
                    this.renderReviews();

                    document.querySelector('.reviews-list').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },
};

document.addEventListener('DOMContentLoaded', function() {
    DonutsReviews.init();
});