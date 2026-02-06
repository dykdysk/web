class ApiService {
    constructor() {
        this.baseURL = 'https://web/php/router.php';
    }

    async request(endpoint, method, data = null) {
        const url = `${this.baseURL}/${endpoint}`;
        console.log(url);
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (data && method === 'POST') {
            options.body = JSON.stringify(data);
        }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error("error");
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }

    //GET

    getAll(entity) {
        return this.request(entity, 'GET');
    }

    getById(entity, id) {
        return this.request(`${entity}/id/${id}`, 'GET');
    }

    getDonutsByName(name) {
        return this.request(`donuts/name/${name}`, 'GET');
    }

    getDonutsByCategory(category) {
        return this.request(`donuts/category/${category}`, 'GET');
    }

    getDonutsByPrice(price) {
        return this.request(`donuts/price/${price}`, 'GET');
    }

    getDonutsByIsNew(isNew) {
        const value = isNew ? 'true' : 'false';
        return this.request(`donuts/isnew/${value}`, 'GET');
    }

    getBoxesByTitle(title) {
        return this.request(`boxes/title/${title}`, 'GET');
    }

    getBoxesByQuantity(quantity) {
        return this.request(`boxes/quantity/${quantity}`, 'GET');
    }

    getBoxesByPrice(price) {
        return this.request(`boxes/price/${price}`, 'GET');
    }

    getReviewsByName(name) {
        return this.request(`reviews/name/${name}`, 'GET');
    }

    getReviewsByRating(rating) {
        return this.request(`reviews/rating/${rating}`, 'GET');
    }

    getReviewsByDate(date) {
        return this.request(`reviews/date/${date}`, 'GET');
    }

    //POST

    createReview(data) {
        return this.request('reviews', 'POST', data);
    }

    createOrder(data) {
        return this.request('orders', 'POST', data);
    }
}