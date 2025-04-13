document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section');
    });

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        document.querySelectorAll('.section').forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });

        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            if (window.scrollY > 100) {
                navMenu.classList.add('visible');
            } else {
                navMenu.classList.remove('visible');
            }
        }

        let currentSection = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 0) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const id = currentSection.getAttribute('id');
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    }

    handleScroll();

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
    });

    window.addEventListener('resize', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navMenu = document.querySelector('.nav-menu');
                const navHeight = navMenu ? navMenu.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});