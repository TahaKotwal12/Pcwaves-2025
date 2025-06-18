// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation and Submission
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('error');

        if (!input.value.trim()) {
            showErrorInput(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showErrorInput(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && !isValidPhone(input.value)) {
            showErrorInput(input, 'Please enter a valid phone number');
            isValid = false;
        }
    });

    return isValid;
}

function showErrorInput(input, message) {
    input.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Initialize EmailJS
(function() {
    emailjs.init("9cJNh2ytS-oO0ra57");
})();

// Contact Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Validate form
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            showError(this, 'Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError(this, 'Please enter a valid email address');
            return;
        }
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS with your actual service and template IDs
        emailjs.send("service_qwr3tjw", "template_ote604c", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: "support@pcwaves.com",
            reply_to: email
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            showSuccess(contactForm, 'Message sent successfully! We will get back to you soon.');
            contactForm.reset();
            // Clear saved form data
            localStorage.removeItem('contactForm_data');
        }, function(error) {
            console.log('FAILED...', error);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            showError(contactForm, 'Failed to send message. Please try again or call us directly.');
        });
    });
}

// Booking Form Submission with EmailJS
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const device = formData.get('device');
            const issue = formData.get('issue');
            const urgency = formData.get('urgency');
            
            submitButton.textContent = 'Booking...';
            submitButton.disabled = true;
            
            // Send booking email using EmailJS
            emailjs.send("service_qwr3tjw", "template_ote604c", {
                from_name: name,
                from_email: email,
                subject: `New Repair Booking - ${device}`,
                message: `
                    New repair booking details:
                    
                    Customer: ${name}
                    Email: ${email}
                    Phone: ${phone}
                    Device: ${device}
                    Issue: ${issue}
                    Urgency: ${urgency}
                    
                    Please contact the customer to confirm the appointment.
                `,
                to_email: "support@pcwaves.com",
                reply_to: email
            })
            .then(function(response) {
                console.log('BOOKING SUCCESS!', response.status, response.text);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showSuccess(bookingForm, 'Booking request submitted successfully! We will contact you within 24 hours to confirm your appointment.');
                bookingForm.reset();
                localStorage.removeItem('bookingForm_data');
            }, function(error) {
                console.log('BOOKING FAILED...', error);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showError(bookingForm, 'Failed to submit booking. Please try again or call us directly at +44 1254 721723.');
            });
        }
    });
}

// Money Transfer Form Submission
const transferForm = document.getElementById('transferForm');
if (transferForm) {
    transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            const senderName = formData.get('senderName');
            const senderPhone = formData.get('senderPhone');
            const amount = formData.get('amount');
            const destination = formData.get('destination');
            const recipientName = formData.get('recipientName');
            const transferMethod = formData.get('transferMethod');
            const purpose = formData.get('purpose');
            
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;
            
            // Send transfer inquiry email using EmailJS
            emailjs.send("service_qwr3tjw", "template_ote604c", {
                from_name: senderName,
                from_email: "support@pcwaves.com",
                subject: `Money Transfer Inquiry - £${amount} to ${destination}`,
                message: `
                    New money transfer inquiry:
                    
                    Sender: ${senderName}
                    Phone: ${senderPhone}
                    Amount: £${amount}
                    Destination: ${destination}
                    Recipient: ${recipientName}
                    Transfer Method: ${transferMethod}
                    Purpose: ${purpose}
                    
                    Please contact the customer with rates and process details.
                `,
                to_email: "support@pcwaves.com",
                reply_to: "support@pcwaves.com"
            })
            .then(function(response) {
                console.log('TRANSFER SUCCESS!', response.status, response.text);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showSuccess(transferForm, 'Transfer inquiry submitted! We will contact you shortly with rates and process details. Please visit our shop to complete the transfer.');
                transferForm.reset();
                localStorage.removeItem('transferForm_data');
            }, function(error) {
                console.log('TRANSFER FAILED...', error);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showError(transferForm, 'Failed to submit inquiry. Please visit our shop directly or call +44 1254 721723.');
            });
        }
    });
}

// Console Repair Form Submission
const consoleBookingForm = document.getElementById('consoleBookingForm');
if (consoleBookingForm) {
    consoleBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const brand = formData.get('brand');
            const model = formData.get('model');
            const issue = formData.get('issue');
            const description = formData.get('description');
            
            submitButton.textContent = 'Booking...';
            submitButton.disabled = true;
            
            // Send console repair booking email using EmailJS
            emailjs.send("service_qwr3tjw", "template_ote604c", {
                from_name: name,
                from_email: email,
                subject: `Console Repair Booking - ${brand} ${model}`,
                message: `
                    New Console Repair Booking:
                    
                    Customer: ${name}
                    Email: ${email}
                    Phone: ${phone}
                    Console Brand: ${brand}
                    Console Model: ${model}
                    Issue Type: ${issue}
                    Description: ${description}
                    
                    Please contact the customer to confirm the appointment.
                `,
                to_email: "support@pcwaves.com",
                reply_to: email
            })
            .then(function(response) {
                console.log('CONSOLE REPAIR SUCCESS!', response.status, response.text);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showSuccess(consoleBookingForm, 'Console repair booking submitted successfully! We will contact you within 24 hours to confirm your appointment.');
                consoleBookingForm.reset();
                localStorage.removeItem('consoleBookingForm_data');
            }, function(error) {
                console.log('CONSOLE REPAIR FAILED...', error);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showError(consoleBookingForm, 'Failed to submit booking. Please try again or call us directly at +44 1254 721723.');
            });
        }
    });
}

// Custom PC Build Form Submission
const pcBuildForm = document.getElementById('pcBuildForm');
if (pcBuildForm) {
    pcBuildForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const type = formData.get('type');
            const budget = formData.get('budget');
            const use = formData.get('use');
            const requirements = formData.get('requirements');
            
            submitButton.textContent = 'Sending Quote Request...';
            submitButton.disabled = true;
            
            // Send custom PC build quote request using EmailJS
            emailjs.send("service_qwr3tjw", "template_ote604c", {
                from_name: name,
                from_email: email,
                subject: `Custom PC Build Quote Request - ${type}`,
                message: `
                    New Custom PC Build Quote Request:
                    
                    Customer: ${name}
                    Email: ${email}
                    Phone: ${phone}
                    PC Type: ${type}
                    Budget Range: ${budget}
                    Primary Use: ${use}
                    Requirements: ${requirements}
                    
                    Please provide a detailed quote and consultation.
                `,
                to_email: "support@pcwaves.com",
                reply_to: email
            })
            .then(function(response) {
                console.log('PC BUILD QUOTE SUCCESS!', response.status, response.text);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showSuccess(pcBuildForm, 'Quote request submitted successfully! We will contact you within 24 hours with a detailed quote and consultation.');
                pcBuildForm.reset();
                localStorage.removeItem('pcBuildForm_data');
            }, function(error) {
                console.log('PC BUILD QUOTE FAILED...', error);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showError(pcBuildForm, 'Failed to submit quote request. Please try again or call us directly at +44 1254 721723.');
            });
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]');
        if (!email.value.trim()) {
            alert('Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            alert('Successfully subscribed to our newsletter!');
            this.reset();
        }, 1500);
    });
}

// Helper functions for form feedback
function showSuccess(form, message) {
    removeExistingMessages(form);
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message success';
    successDiv.style.cssText = `
        background: #dcfce7;
        border: 1px solid #22c55e;
        color: #166534;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 500;
    `;
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 8000);
}

function showError(form, message) {
    removeExistingMessages(form);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message error';
    errorDiv.style.cssText = `
        background: #fee2e2;
        border: 1px solid #ef4444;
        color: #dc2626;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 8000);
}

function removeExistingMessages(form) {
    const existingMessages = form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe all service cards and feature elements
document.querySelectorAll('.service-card, .feature, .contact-item').forEach(el => {
    observer.observe(el);
});

// Local Storage for form data (auto-save)
function saveFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    localStorage.setItem(`${form.id}_data`, JSON.stringify(data));
}

function loadFormData(form) {
    const savedData = localStorage.getItem(`${form.id}_data`);
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        });
    }
}

// Auto-save form data on input
document.querySelectorAll('form').forEach(form => {
    if (form.id) {
        loadFormData(form);
        
        form.addEventListener('input', () => {
            saveFormData(form);
        });
        
        form.addEventListener('submit', () => {
            localStorage.removeItem(`${form.id}_data`);
        });
    }
});

// WhatsApp integration
function openWhatsApp() {
    const phone = '+441254721723';
    const message = encodeURIComponent('Hello! I would like to inquire about your repair services.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Add click-to-call functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (!('ontouchstart' in window)) {
            e.preventDefault();
            alert('Call us at: ' + this.textContent);
        }
    });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log(`
🌊 Welcome to PC Waves Website!
📱 Professional tech repairs in Blackburn
🔧 Laptops | Desktops | Phones | PlayStation
💻 Built with modern web technologies
📧 Contact: support@pcwaves.com
📞 Phone: +44 1254 721723
`);