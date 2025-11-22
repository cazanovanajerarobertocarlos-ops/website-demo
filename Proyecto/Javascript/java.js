 document.addEventListener('DOMContentLoaded', () => {
    // AHORA SE BUSCAN LOS ENLACES DENTRO DE LA CLASE 'vertical-nav'
    const navLinks = document.querySelectorAll('.vertical-nav a');
    const sections = document.querySelectorAll('.section-content');

    /**
     * Función para manejar la visibilidad de las secciones
     * y el estado activo de la navegación.
     */
    function showSection(targetId) {
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active-section');
        });

        // Mostrar la sección objetivo
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            // Añadir un pequeño retraso para asegurar que la visibilidad se aplica antes de la animación
            setTimeout(() => {
                targetSection.classList.add('active-section');
            }, 10); 
        }

        // Actualizar el estado activo de los enlaces de la navegación
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#${targetId}') {
                link.classList.add('active');
            }
        });
    }

    // 1. Asignar el manejador de eventos a todos los enlaces de la navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace (recarga)
            const targetId = this.getAttribute('href').substring(1);
            // Usar el API de historial para actualizar la URL
            history.pushState(null, null, '#${targetId}');
            showSection(targetId);
        });
    });

    // 2. Inicializar la página para mostrar la sección correcta al cargar
    function initializePage() {
        const hash = window.location.hash ? window.location.hash.substring(1) : 'inicio';
        showSection(hash);
    }

    // 3. Manejar el evento 'popstate' para el botón de retroceso/adelante del navegador
    window.addEventListener('popstate', initializePage);
    
    // Iniciar la aplicación
    initializePage();
});
