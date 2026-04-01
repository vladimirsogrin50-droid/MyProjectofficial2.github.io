// ========== Мобильное меню ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ========== Закрытие меню при клике на ссылку ==========
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        }
    });
});

// ========== Активная ссылка в меню ==========
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '/' && href === '/') {
            link.classList.add('active');
        } else if (href !== '/' && currentPath.startsWith(href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== Плавная прокрутка для якорных ссылок ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Анимация при скролле ==========
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.lesson-card, .lesson-full-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Устанавливаем начальные стили для анимации
const animatedElements = document.querySelectorAll('.lesson-card, .lesson-full-card');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Запускаем анимацию при загрузке и скролле
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ========== Копирование кода (если есть кнопки) ==========
document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const codeBlock = btn.previousElementSibling;
        if (codeBlock && codeBlock.tagName === 'PRE') {
            const code = codeBlock.textContent;
            try {
                await navigator.clipboard.writeText(code);
                const originalText = btn.textContent;
                btn.textContent = '✅ Скопировано!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            } catch (err) {
                console.error('Ошибка копирования:', err);
            }
        }
    });
});

// ========== Инициализация ==========
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    console.log('Сайт JavaScript Pro загружен!');
});

// ========== Добавляем класс для sticky навигации ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});
