const DonutsUtils = {
    showNotification(message, type = 'success') {
        // Проверяем, есть ли уже уведомление
        const existingNotification = document.querySelector('.donuts-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'donuts-notification';

        const bgColor = type === 'success' ? '#FF7E93' : '#ff6b6b';
        const textColor = 'white';

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: notificationSlideIn 0.3s ease-out;
            font-weight: 500;
            max-width: 300px;
            word-wrap: break-word;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    initSmoothScroll() {
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    safeJSONParse(str, fallback = []) {
        try {
            if (!str) return fallback;
            const parsed = JSON.parse(str);
            return Array.isArray(parsed) ? parsed : fallback;
        } catch (error) {
            console.error('JSON parse error:', error);
            return fallback;
        }
    },

    formatPrice(price) {
        const numPrice = parseFloat(price);
        return isNaN(numPrice) ? '0.00 BYN' : `${numPrice.toFixed(2)} BYN`;
    },

    // Новый метод для безопасного выполнения кода
    safeEvalCheck() {
        // Проверяем, доступен ли eval (для CSP)
        try {
            if (typeof eval === 'function') {
                return true;
            }
        } catch (e) {
            console.warn('eval is blocked by CSP');
            return false;
        }
        return false;
    }
};

// Добавляем стили для анимаций безопасным способом (без eval)
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#donuts-utils-styles')) {
        const style = document.createElement('style');
        style.id = 'donuts-utils-styles';
        style.textContent = `
            @keyframes notificationSlideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes notificationSlideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
});