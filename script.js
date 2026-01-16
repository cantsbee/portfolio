// Navegación móvil
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 25px rgba(255, 158, 199, 0.2)';
        navbar.style.background = 'rgba(255, 249, 251, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 25px rgba(255, 158, 199, 0.15)';
        navbar.style.background = 'rgba(255, 249, 251, 0.95)';
    }
});

// Animación de barras de habilidades al hacer scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const progress = skillProgress.getAttribute('data-progress');
                skillProgress.style.width = progress + '%';
            }
        }
    });
}, observerOptions);

// Observar todas las tarjetas de habilidades
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Animación de entrada para las tarjetas de proyectos
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// Animación de entrada para las tarjetas de soft skills
const softSkillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.soft-skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    softSkillsObserver.observe(card);
});

// Animación de entrada para las estadísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateNumber(stat, 0, target, 2000);
            });
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Función para animar números
function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.textContent.includes('+') ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ejemplo, usando fetch para enviar a un servidor
    console.log('Datos del formulario:', formData);
    
    // Mostrar mensaje de éxito
    showNotification('¡Mensaje enviado con éxito!', 'success');
    
    // Limpiar formulario
    contactForm.reset();
});

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Animación de escritura para el título (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Efecto de confeti al hacer clic en botones
function createConfetti(x, y) {
    const emojis = ['💕', '✨', '⭐', '💖', '🌸', '🎀', '💝', '💗'];
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        confetti.style.animation = `confettiFall ${1 + Math.random()}s ease-out forwards`;
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        confetti.style.setProperty('--vx', vx + 'px');
        confetti.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// Agregar efecto de confeti a los botones
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createConfetti(x, y);
    });
});

// Animación para elementos flotantes
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-heart, .floating-star, .floating-sparkle');
    floatingElements.forEach((element, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        element.style.left = randomX + '%';
        element.style.top = randomY + '%';
        element.style.animationDelay = randomDelay + 's';
        element.style.animationDuration = randomDuration + 's';
    });
}

// Inicializar animaciones al cargar la página
window.addEventListener('load', () => {
    // Asegurar que las animaciones se ejecuten después de la carga
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animar elementos flotantes
    animateFloatingElements();
});

// Agregar estilos para las animaciones de notificación y confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx, 0), var(--vy, 200px)) rotate(720deg);
            opacity: 0;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);
