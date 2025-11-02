// signup.js - handle signup form (student or company). Shows friendly messages and redirects on success
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('signupForm');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

  function setFieldError(input, msg){
    if(!input) return;
    let el = input.nextElementSibling;
    if(!el || !el.classList || !el.classList.contains('field-error')){
      el = document.createElement('div');
      el.className = 'field-error';
      el.style.color = 'crimson';
      el.style.fontSize = '0.9rem';
      el.style.marginTop = '4px';
      input.parentNode.insertBefore(el, input.nextSibling);
    }
    el.textContent = msg || '';
  }

  function clearFieldError(input){
    if(!input) return;
    const el = input.nextElementSibling;
    if(el && el.classList && el.classList.contains('field-error')) el.textContent = '';
  }

  function validateForm(){
    let ok = true;
    const email = form.querySelector('[name="email"]');
    const password = form.querySelector('[name="password"]');
    const confirm = form.querySelector('[name="confirmPassword"]');
    const role = (form.querySelector('[name="role"]') || {}).value || 'student';
    const nameField = form.querySelector('[name="name"]');

    if(email && !email.value.trim()) { setFieldError(email, 'Email is required'); ok = false; } else clearFieldError(email);
    if(password && password.value.length < 8) { setFieldError(password, 'Password must be at least 8 characters'); ok = false; } else clearFieldError(password);
    if(confirm && password && confirm.value !== password.value) { setFieldError(confirm, 'Passwords do not match'); ok = false; } else clearFieldError(confirm);

    if(role === 'company'){
      if(nameField && !nameField.value.trim()){ setFieldError(nameField, 'Company name is required'); ok = false; } else clearFieldError(nameField);
    }
    return ok;
  }

  // attach realtime validation
  ['input','change'].forEach(ev => {
    form.addEventListener(ev, (e) => {
      const t = e.target;
      if(!t) return;
      if(t.name === 'password' || t.name === 'confirmPassword' || t.name === 'email' || t.name === 'name'){
        validateForm();
      }
      clearFieldError(t);
    });
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if(!validateForm()) return;

    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating account...';

    const formData = new FormData(form);

    try{
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        try{
          const data = await response.json();
          const role = data.user?.role || (formData.get('role') || 'student');
          if (role === 'company') {
            window.location.href = '/company-login?status=success';
          } else {
            window.location.href = '/loginuser?status=success';
          }
        }catch(e){
          const role = formData.get('role') || 'student';
          if (role === 'company') window.location.href = '/company-login?status=success';
          else window.location.href = '/loginuser?status=success';
        }
      } else {
        let msg = 'An error occurred while creating the account. Please try again.';
        try{
          const errorData = await response.json();
          if (response.status === 409) {
            msg = 'An account with that email already exists. Try signing in or recovering the password.';
          } else if (errorData && errorData.message) {
            const lower = (errorData.message || '').toLowerCase();
            if (lower.includes('email') && lower.includes('exist')) {
              msg = 'An account with that email already exists.';
            }
          }
        }catch(e){ /* ignore */ }
        alert(msg);
      }
    } catch (error) {
      console.error('Network or submit error:', error);
      alert('There was a problem connecting to the server. Please try again.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText || 'Create account';
    }
  });
});
