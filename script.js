// ============================================
// FILE: script.js
// ============================================

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initHeaderScroll();
    initContactForm();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');

    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        if (mobileNav.classList.contains('active')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
}

// Smooth Scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Spy - Active navigation highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call once on load
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load
}

// Contact Form Handling

       function initContactForm() {
  const form = document.querySelector('form[name="contact"]');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const successMsg = form.querySelector('.form-success');
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      successMsg.style.display = 'block';
      form.reset();
    })
    .catch(() => {
      alert('❌ Form submission failed. Please try again.');
    });
  });
}

// function initContactForm() {
//     const contactForm = document.getElementById('contactForm');
    
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form data
    //         const formData = {
    //             name: this.elements.name.value,
    //             email: this.elements.email.value,
    //             phone: this.elements.phone.value,
    //             service: this.elements.service.value,
    //             message: this.elements.message.value
    //         };
            
    //         // Validate form
    //         if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
    //             alert('Please fill in all fields');
    //             return;
    //         }
            
    //         // Email validation
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //         if (!emailRegex.test(formData.email)) {
    //             alert('Please enter a valid email address');
    //             return;
    //         }
            
    //         // Phone validation (basic)
    //         const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    //         if (!phoneRegex.test(formData.phone)) {
    //             alert('Please enter a valid phone number');
    //             return;
    //         }
            
    //         // Simulate form submission (replace with actual API call)
    //         console.log('Form Data:', formData);
            
    //         // Show success message
    //         alert('Thank you for your inquiry! We will contact you soon.');
            
    //         // Reset form
    //         contactForm.reset();
            
            // In a real application, you would send this data to your server
            // Example:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you for your inquiry! We will contact you soon.');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again.');
            });
            */
//         });
//     }
// }

// Animation on scroll (optional enhancement)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements you want to animate
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .about-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Call animation function if you want scroll animations
// Uncomment the line below to enable scroll animations
// initScrollAnimations();

// Utility function to reinitialize icons after dynamic content changes
function reinitializeIcons() {
    lucide.createIcons();
}

// Export functions for potential use in other scripts
window.NeevWebsite = {
    reinitializeIcons: reinitializeIcons
};