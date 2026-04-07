// Register Page Script

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
    const inputs = document.querySelectorAll('input[placeholder]');
    const button = document.querySelector('.create-btn');
    const termsLabel = document.querySelector('.terms label');
    const footerLink = document.querySelector('.footer a');
    const headerTitle = document.querySelector('.header h1');
    const headerDesc = document.querySelector('.header p');

    if (isArabic) {
        // Switch to English
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        welcomeText.textContent = 'Create Account';
        subtitle.textContent = 'Join DiaCare to start managing your diabetes effectively.';
        labels[0].textContent = 'Full Name';
        labels[1].textContent = 'Email Address';
        labels[2].textContent = 'Password';
        labels[3].textContent = 'Confirm Password';
        inputs[0].placeholder = 'John Doe';
        inputs[1].placeholder = 'john@example.com';
        inputs[2].placeholder = '........';
        inputs[3].placeholder = '........';
        button.innerHTML = 'Create Account <i class="fa-solid fa-user-plus"></i>';
        termsLabel.innerHTML = 'I agree to the <a href="#" style="color: var(--primary-color);">Terms of Service</a> and <a href="#" style="color: var(--primary-color);">Privacy Policy</a>';
        footerLink.textContent = 'Sign In';
        headerTitle.textContent = 'DiaCare';
        headerDesc.textContent = 'Your intelligent partner in diabetes management and daily wellness.';
        this.querySelector('span').textContent = 'العربية';
    } else {
        // Switch to Arabic
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        welcomeText.textContent = 'إنشاء حساب';
        subtitle.textContent = 'انضم إلى دايا كير لبدء إدارة السكري بفعالية.';
        labels[0].textContent = 'الاسم الكامل';
        labels[1].textContent = 'عنوان البريد الإلكتروني';
        labels[2].textContent = 'كلمة المرور';
        labels[3].textContent = 'تأكيد كلمة المرور';
        inputs[0].placeholder = 'جون دو';
        inputs[1].placeholder = 'john@example.com';
        inputs[2].placeholder = '........';
        inputs[3].placeholder = '........';
        button.innerHTML = 'إنشاء حساب <i class="fa-solid fa-user-plus"></i>';
        termsLabel.innerHTML = 'أوافق على <a href="#" style="color: var(--primary-color);">شروط الخدمة</a> و <a href="#" style="color: var(--primary-color);">سياسة الخصوصية</a>';
        footerLink.textContent = 'تسجيل الدخول';
        headerTitle.textContent = 'دايا كير';
        headerDesc.textContent = 'شريكك الذكي في إدارة السكري والعافية اليومية.';
        this.querySelector('span').textContent = 'English';
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = this.querySelector('#password').value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    const terms = this.querySelector('#terms').checked;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (!terms) {
        alert('Please agree to the terms and conditions.');
        return;
    }

    alert('Account created successfully! Please check your email for verification.');
    window.location.href = 'login.html';
});