// Sistema de Scroll Spy Personalizado
class ScrollSpy {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        // Esperar a que el DOM esté cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Buscar todos los elementos con data-scrollspy
        const elements = document.querySelectorAll('[data-scrollspy]');
        elements.forEach(element => this.setupElement(element));
    }

    setupElement(element) {
        const config = this.parseConfig(element.dataset.scrollspy);

        // Crear observer para este elemento
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target, config);
                    this.animatedElements.add(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar el elemento
        observer.observe(element);
        this.observers.set(element, observer);
    } parseConfig(configString) {
        const config = {
            animation: 'fade',
            delay: 0,
            speed: 'normal'
        };

        if (!configString) return config;

        // Parsear configuración tipo: "animation: fade; delay: 400"
        const pairs = configString.split(';');
        pairs.forEach(pair => {
            const [key, value] = pair.split(':').map(s => s.trim());
            if (key && value) {
                config[key] = value.replace(/\s+/g, ' ').trim();
            }
        });

        return config;
    } animateElement(element, config) {
        const delay = parseInt(config.delay) || 0;

        setTimeout(() => {
            // Agregar clase de animación
            const animationClass = `animate-${config.animation}`;
            element.classList.add(animationClass);

            // Agregar clase de velocidad si está especificada
            if (config.speed && config.speed !== 'normal') {
                element.classList.add(`animate-${config.speed}`);
            }

            // Agregar clase de delay si está especificado
            if (delay > 0) {
                const delayClass = `delay-${delay}`;
                element.classList.add(delayClass);
            }

            // Marcar como animado
            element.classList.add('scrollspy-animated');

            // Disparar evento personalizado
            element.dispatchEvent(new CustomEvent('scrollspy:animated', {
                detail: { config }
            }));

            // Añadir efectos de hover especiales después de la animación
            setTimeout(() => {
                element.style.transition = 'transform 0.3s ease, filter 0.3s ease';

                element.addEventListener('mouseenter', () => {
                    if (!element.classList.contains('no-hover')) {
                        element.style.transform = 'translateY(-3px) scale(1.02)';
                        element.style.filter = 'brightness(1.1) drop-shadow(0 8px 16px rgba(0,0,0,0.1))';
                    }
                });

                element.addEventListener('mouseleave', () => {
                    if (!element.classList.contains('no-hover')) {
                        element.style.transform = 'translateY(0) scale(1)';
                        element.style.filter = 'brightness(1) drop-shadow(0 2px 4px rgba(0,0,0,0.05))';
                    }
                });
            }, 1500);
        }, delay * 0.3); // Delay más suave
    }

    // Método para destruir observers (útil para cleanup)
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animatedElements.clear();
    }

    // Método para reconfigurar (útil si se agrega contenido dinámicamente)
    refresh() {
        this.destroy();
        this.setup();
    }

    // Método para animar manualmente un elemento
    animateManually(element, animation = 'fade', delay = 0) {
        const config = { animation, delay };
        this.animateElement(element, config);
    }
}

// Instancia global
let scrollSpyInstance;

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    scrollSpyInstance = new ScrollSpy();
});

// Exponer funciones globales para uso externo
window.ScrollSpyUtils = {
    refresh: () => scrollSpyInstance?.refresh(),
    animateElement: (element, animation, delay) => scrollSpyInstance?.animateManually(element, animation, delay),
    getInstance: () => scrollSpyInstance
};