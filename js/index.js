// Login Page Script

const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

// Initially hide the eye if password is empty
if (passwordInput.value.length === 0) {
    togglePassword.style.display = 'none';
}

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Show/hide eye based on password input
passwordInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        togglePassword.style.display = 'block';
    } else {
        togglePassword.style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login Successful!');
    window.location.href = 'dashboard.html';
});

// Arabic Language Button
const langSwitch = document.querySelector('.lang-switch');
langSwitch.addEventListener('click', function() {
    const icon = this.querySelector('i');
    icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    // Switch language
    const isArabic = document.documentElement.lang === 'ar';
    document.documentElement.lang = isArabic ? 'en' : 'ar';
    document.documentElement.dir = isArabic ? 'ltr' : 'rtl';
    // Change all text to Arabic
    const welcomeText = document.querySelector('.login-card h2');
    const subtitle = document.querySelector('.subtitle');
    const labels = document.querySelectorAll('label');
    const forgotLink = document.querySelector('.forgot-link');
    const inputs = document.querySelectorAll('input[placeholder]');
    const button = document.querySelector('.login-btn');
    const rememberLabel = document.querySelector('.remember-me label');
    const divider = document.querySelector('.divider span');
    const socialBtns = document.querySelectorAll('.social-btn');
    const footerText = document.querySelector('.footer p');
    const footerLink = document.querySelector('.footer a');
    const headerTitle = document.querySelector('.header h1');
    const headerDesc = document.querySelector('.header p');

    if (isArabic) {
        // Switch to English
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        welcomeText.textContent = 'Welcome Back';
        subtitle.textContent = 'Please enter your credentials to access your dashboard.';
        labels[0].textContent = 'Email Address';
        labels[1].textContent = 'Password';
        forgotLink.textContent = 'Forgot Password?';
        inputs[0].placeholder = 'john@example.com';
        inputs[1].placeholder = '........';
        button.innerHTML = 'Log In <i class="fa-solid fa-right-to-bracket"></i>';
        rememberLabel.textContent = 'Keep me logged in';
        divider.textContent = 'OR CONNECT WITH';
        socialBtns[0].innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width="18"> Google';
        socialBtns[1].innerHTML = '<i class="fa-solid fa-fingerprint"></i> Biometric';
        footerText.innerHTML = 'Don\'t have an account? <a href="register.html">Create Account</a>';
        headerTitle.textContent = 'DiaCare';
        headerDesc.textContent = 'Your intelligent partner in diabetes management and daily wellness.';
        this.querySelector('span').textContent = 'العربية';
    } else {
        // Switch to Arabic
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        welcomeText.textContent = 'مرحباً بعودتك';
        subtitle.textContent = 'يرجى إدخال بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم.';
        labels[0].textContent = 'عنوان البريد الإلكتروني';
        labels[1].textContent = 'كلمة المرور';
        forgotLink.textContent = 'نسيت كلمة المرور؟';
        inputs[0].placeholder = 'john@example.com';
        inputs[1].placeholder = '........';
        button.innerHTML = 'تسجيل الدخول <i class="fa-solid fa-right-to-bracket"></i>';
        rememberLabel.textContent = 'ابقني مسجلاً';
        divider.textContent = 'أو الاتصال بـ';
        socialBtns[0].innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width="18"> جوجل';
        socialBtns[1].innerHTML = '<i class="fa-solid fa-fingerprint"></i> البيومتري';
        footerText.innerHTML = 'ليس لديك حساب؟ <a href="register.html">إنشاء حساب</a>';
        headerTitle.textContent = 'دايا كير';
        headerDesc.textContent = 'شريكك الذكي في إدارة السكري والعافية اليومية.';
        this.querySelector('span').textContent = 'English';
    }
});

// Forgot Password
document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'forgot-password.html';
});

// Create Account
document.querySelector('.footer a').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'register.html';
});

// Google Login
document.querySelector('.social-btn').addEventListener('click', function() {
    window.location.href = 'https://accounts.google.com';
});

// Biometric Login
document.querySelectorAll('.social-btn')[1].addEventListener('click', function() {
    alert('Biometric authentication is not available in this demo.');
});

// Privacy Policy
document.querySelector('.footer-links a:first-child').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Privacy Policy:\n\nDiaCare is committed to protecting your privacy. We collect minimal data necessary for diabetes management and ensure all information is encrypted and secure. Contact us for more details.');
});

// Support Center
document.querySelector('.footer-links a:last-child').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Support Center:\n\nFor assistance, email support@diacare.com or call our helpline. Our team is available 24/7 to help with your diabetes management needs.');
});