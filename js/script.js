// Navigation System
class Navigation {
    constructor() {
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentPage = 'home';
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.showPage(this.currentPage);
    }
    
    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-target');
                this.switchPage(targetPage);
            });
        });
    }
    
    switchPage(pageId) {
        if (this.currentPage === pageId) return;
        
        this.hideAllPages();
        this.showPage(pageId);
        this.updateActiveNav(pageId);
        this.currentPage = pageId;
    }
    
    hideAllPages() {
        this.pages.forEach(page => {
            page.classList.remove('active');
        });
    }
    
    showPage(pageId) {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }
    
    updateActiveNav(pageId) {
        this.navLinks.forEach(link => {
            if (link.getAttribute('data-target') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Form Validation System
class FormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        this.setupForm();
        this.setupRealTimeValidation();
    }
    
    setupForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    setupRealTimeValidation() {
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('messageText');
        
        nameInput.addEventListener('blur', () => this.validateName());
        messageInput.addEventListener('blur', () => this.validateMessage());
    }
    
    handleSubmit() {
        const isValid = this.validateAll();
        
        if (isValid) {
            this.showResults();
            this.showSuccess();
            this.form.reset();
        } else {
            this.showError();
        }
    }
    
    validateAll() {
        return this.validateName() && 
               this.validateBirthdate() && 
               this.validateGender() && 
               this.validateMessage();
    }
    
    validateName() {
        const name = document.getElementById('name').value.trim();
        const error = document.getElementById('nameError');
        
        if (!name) {
            this.showFieldError(error, 'Nama harus diisi');
            return false;
        }
        
        if (name.length < 2) {
            this.showFieldError(error, 'Nama minimal 2 karakter');
            return false;
        }
        
        this.clearFieldError(error);
        return true;
    }
    
    validateBirthdate() {
        const birthdate = document.getElementById('birthdate').value;
        const error = document.getElementById('birthdateError');
        
        if (!birthdate) {
            this.showFieldError(error, 'Tanggal lahir harus diisi');
            return false;
        }
        
        this.clearFieldError(error);
        return true;
    }
    
    validateGender() {
        const gender = document.querySelector('input[name="gender"]:checked');
        const error = document.getElementById('genderError');
        
        if (!gender) {
            this.showFieldError(error, 'Pilih jenis kelamin');
            return false;
        }
        
        this.clearFieldError(error);
        return true;
    }
    
    validateMessage() {
        const message = document.getElementById('messageText').value.trim();
        const error = document.getElementById('messageError');
        
        if (!message) {
            this.showFieldError(error, 'Pesan harus diisi');
            return false;
        }
        
        if (message.length < 10) {
            this.showFieldError(error, 'Pesan minimal 10 karakter');
            return false;
        }
        
        this.clearFieldError(error);
        return true;
    }
    
    showFieldError(errorElement, message) {
        errorElement.textContent = message;
    }
    
    clearFieldError(errorElement) {
        errorElement.textContent = '';
    }
    
    showResults() {
        const formData = this.getFormData();
        
        document.getElementById('resultName').textContent = formData.name;
        document.getElementById('resultBirthdate').textContent = formData.birthdate;
        document.getElementById('resultGender').textContent = formData.gender;
        document.getElementById('resultMessage').textContent = formData.message;
    }
    
    getFormData() {
        const name = document.getElementById('name').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const message = document.getElementById('messageText').value.trim();
        
        return {
            name: name || '-',
            birthdate: birthdate ? new Date(birthdate).toLocaleDateString('id-ID') : '-',
            gender: gender ? gender.value : '-',
            message: message || '-'
        };
    }
    
    showSuccess() {
        alert('✅ Pesan berhasil dikirim! Terima kasih.');
    }
    
    showError() {
        alert('❌ Harap perbaiki error pada form sebelum mengirim.');
    }
}

// Time System
class TimeManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('currentTime');
        
        if (timeElement) {
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            timeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new FormValidator();
    new TimeManager();
    
    console.log('🚀 Website loaded successfully!');
});
