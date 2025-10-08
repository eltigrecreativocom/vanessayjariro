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
        
        // Configurar targets si están especificados
        let targets = [element];
        if (config.target) {
            targets = this.getTargets(element, config.target);
        }

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

        // Observar el elemento principal
        observer.observe(element);
        
        // Si hay targets específicos, observar cada uno
        if (config.target) {
            targets.forEach(target => {
                if (target !== element) {
                    observer.observe(target);
                }
            });
        }

        this.observers.set(element, observer);
    }    parseConfig(configString) {
        const config = {
            animation: 'fade',
            delay: 0,
            target: null,
            speed: 'normal'
        };

        if (!configString) return config;

        // Parsear configuración tipo: "animation: fade; delay: 400; target: > h3, > p"
        const pairs = configString.split(';');
        pairs.forEach(pair => {
            const [key, value] = pair.split(':').map(s => s.trim());
            if (key && value) {
                // Limpiar espacios extra en el valor
                config[key] = value.replace(/\s+/g, ' ').trim();
            }
        });

        return config;
    }

    getTargets(element, targetSelector) {
        const targets = [];
        
        if (targetSelector.startsWith('> ')) {
            // Selector de hijos directos
            const selectors = targetSelector.substring(2).split(',').map(s => s.trim());
            selectors.forEach(selector => {
                // Verificar que el selector no esté vacío
                if (selector && selector.length > 0) {
                    try {
                        const children = element.querySelectorAll(`:scope > ${selector}`);
                        targets.push(...children);
                    } catch (error) {
                        console.warn(`Invalid selector: ${selector}`, error);
                    }
                }
            });
        } else {
            // Selector normal
            try {
                const children = element.querySelectorAll(targetSelector);
                targets.push(...children);
            } catch (error) {
                console.warn(`Invalid selector: ${targetSelector}`, error);
            }
        }

        return targets.length > 0 ? targets : [element];
    }    animateElement(element, config) {
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
        }, 0);
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