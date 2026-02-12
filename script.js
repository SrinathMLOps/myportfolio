// Navigation and section visibility
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get target section
        const targetId = this.getAttribute('href');
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Scroll to top of main content
            document.querySelector('.main-content').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Show about section by default on page load
document.addEventListener('DOMContentLoaded', function() {
    // Hide all sections first
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show about section
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        aboutSection.style.display = 'block';
    }
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, testimonials, and blog cards
document.querySelectorAll('.service-card, .testimonial-card, .blog-post-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
});


// Geolocation and Map functionality
let userLocation = null;

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                displayMap(userLocation);
            },
            (error) => {
                console.log('Geolocation error:', error);
                // Fallback to default location (England, UK)
                userLocation = { lat: 52.3555, lng: -1.1743 };
                displayMap(userLocation);
            }
        );
    } else {
        // Fallback to default location
        userLocation = { lat: 52.3555, lng: -1.1743 };
        displayMap(userLocation);
    }
}

function displayMap(location) {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Create an embedded Google Maps iframe
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.lat},${location.lng}&zoom=12`;
    
    // For demo purposes, use OpenStreetMap instead (no API key needed)
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.1},${location.lat-0.1},${location.lng+0.1},${location.lat+0.1}&layer=mapnik&marker=${location.lat},${location.lng}`;
    
    mapElement.innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${osmUrl}" style="border-radius: 16px;"></iframe>`;
}

// View larger map button
document.addEventListener('DOMContentLoaded', function() {
    const viewMapBtn = document.getElementById('viewLargerMap');
    if (viewMapBtn) {
        viewMapBtn.addEventListener('click', function() {
            if (userLocation) {
                window.open(`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`, '_blank');
            }
        });
    }
    
    // Initialize map when contact section is visible
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !userLocation) {
                    initMap();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(contactSection);
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            location: userLocation
        };
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Message
            `;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
            
            // Log form data (for demo purposes)
            console.log('Form submitted:', formData);
        }, 1500);
    });
}
