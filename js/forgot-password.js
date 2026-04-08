


const langSwitch = document.querySelector('.lang-switch');
langSwitch.addEventListener('click', function() {
    const icon = this.querySelector('i');
    icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    
    const isArabic = document.documentElement.lang === 'ar';
    document.documentElement.lang = isArabic ? 'en' : 'ar';
    document.documentElement.dir = isArabic ? 'ltr' : 'rtl';
    
    const welcomeText = document.querySelector('.login-card h2');
    const subtitle = document.querySelector('.subtitle');
    const labels = document.querySelectorAll('label');
    const inputs = document.querySelectorAll('input[placeholder]');
    const button = document.querySelector('.reset-btn');
    const footerLink = document.querySelector('.footer a');
    const headerTitle = document.querySelector('.header h1');
    const headerDesc = document.querySelector('.header p');

    if (isArabic) {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        welcomeText.textContent = 'Reset Password';
        subtitle.textContent = 'Enter your email address and we\'ll send you a link to reset your password.';
        labels[0].textContent = 'Email Address';
        inputs[0].placeholder = 'john@example.com';
        button.innerHTML = 'Send Reset Link <i class="fa-solid fa-paper-plane"></i>';
        footerLink.textContent = 'Back to Login';
        headerTitle.textContent = 'DiaCare';
        headerDesc.textContent = 'Your intelligent partner in diabetes management and daily wellness.';
        this.querySelector('span').textContent = 'العربية';
    } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        welcomeText.textContent = 'إعادة تعيين كلمة المرور';
        subtitle.textContent = 'أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.';
        labels[0].textContent = 'عنوان البريد الإلكتروني';
        inputs[0].placeholder = 'john@example.com';
        button.innerHTML = 'إرسال رابط إعادة التعيين <i class="fa-solid fa-paper-plane"></i>';
        footerLink.textContent = 'العودة لتسجيل الدخول';
        headerTitle.textContent = 'دايا كير';
        headerDesc.textContent = 'شريكك الذكي في إدارة السكري والعافية اليومية.';
        this.querySelector('span').textContent = 'English';
    }
});

document.getElementById('resetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        alert('Password reset link has been sent to ' + email + '. Please check your email.');
        window.location.href = 'login.html';
    }
});