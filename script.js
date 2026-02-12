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
let watchId = null;

function updateLocationDisplay(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    
    userLocation = { lat, lng };
    
    // Update location details
    document.getElementById('latitude').textContent = lat.toFixed(6);
    document.getElementById('longitude').textContent = lng.toFixed(6);
    document.getElementById('accuracy').textContent = `±${Math.round(accuracy)} meters`;
    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
    
    // Show location details and hide loading
    document.getElementById('locationStatus').style.display = 'none';
    document.getElementById('locationDetails').style.display = 'flex';
    document.getElementById('refreshLocation').style.display = 'flex';
    
    // Update map
    displayMap(userLocation);
    
    // Reverse geocode to get address
    getAddress(lat, lng);
}

function getAddress(lat, lng) {
    // Use Nominatim (OpenStreetMap) reverse geocoding API
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
        .then(response => response.json())
        .then(data => {
            if (data.display_name) {
                document.getElementById('address').textContent = data.display_name;
            } else {
                document.getElementById('address').textContent = 'Address not available';
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
            document.getElementById('address').textContent = 'Unable to fetch address';
        });
}

function handleLocationError(error) {
    const locationStatus = document.getElementById('locationStatus');
    let errorMessage = '';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        default:
            errorMessage = 'An unknown error occurred.';
    }
    
    locationStatus.innerHTML = `<div class="status-error">⚠️ ${errorMessage}</div>`;
    
    // Show default location
    userLocation = { lat: 52.3555, lng: -1.1743 };
    displayMap(userLocation);
}

function initMap() {
    if (navigator.geolocation) {
        // Get initial position
        navigator.geolocation.getCurrentPosition(
            updateLocationDisplay,
            handleLocationError,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
        
        // Watch position for live updates
        watchId = navigator.geolocation.watchPosition(
            updateLocationDisplay,
            (error) => console.log('Watch position error:', error),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        document.getElementById('locationStatus').innerHTML = 
            '<div class="status-error">⚠️ Geolocation is not supported by your browser.</div>';
        
        // Show default location
        userLocation = { lat: 52.3555, lng: -1.1743 };
        displayMap(userLocation);
    }
}

function displayMap(location) {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Use OpenStreetMap
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01},${location.lat-0.01},${location.lng+0.01},${location.lat+0.01}&layer=mapnik&marker=${location.lat},${location.lng}`;
    
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
    
    // Refresh location button
    const refreshBtn = document.getElementById('refreshLocation');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<div class="spinner"></div> Refreshing...';
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    updateLocationDisplay(position);
                    refreshBtn.disabled = false;
                    refreshBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                        Refresh Location
                    `;
                },
                (error) => {
                    handleLocationError(error);
                    refreshBtn.disabled = false;
                    refreshBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                        Refresh Location
                    `;
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
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

// Clean up watch position when leaving the page
window.addEventListener('beforeunload', function() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
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
