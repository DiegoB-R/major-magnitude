// company-login.js - client handler for company login using API
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('companyLoginForm');
  if (!form) return;

  // show success message if redirected after signup
  const params = new URLSearchParams(window.location.search);
  if (params.get('status') === 'success') {
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Account created! You can now sign in.';
    successMessage.style.color = 'green';
    successMessage.style.textAlign = 'center';
    successMessage.style.marginBottom = '1rem';
    form.prepend(successMessage);
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Signing in...'; }

    const formData = new FormData(form);

    try {
      const response = await fetch('/api/auth/login', { method: 'POST', body: formData });
      if (response.ok) {
        const data = await response.json();
        // Expect { user, profile } and role === 'company'
        if (data.user && data.user.role === 'company') {
          const companyData = Object.assign({}, data.profile || {}, { id: data.user.id, email: data.user.email });
          try { localStorage.setItem('primerpaso_company', JSON.stringify(companyData)); } catch (e) {}
          window.location.href = '/company-dashboard';
        } else {
          alert('This account is not a company account.');
        }
      } else if (response.status === 404) {
        // Backend not available on this host (static demo)
        showBackendUnavailable();
      } else {
  const err = await response.json().catch(() => ({}));
  alert(err.message || 'Invalid credentials');
      }
    } catch (err) {
      // Network or server error — show friendly banner and offer demo login
      showBackendUnavailable();
    } finally {
  if (submitButton) { submitButton.disabled = false; submitButton.textContent = 'Sign in'; }
    }
  });

  function showBackendUnavailable(){
    // Avoid adding multiple banners
    if (document.getElementById('backend-unavailable')) return;
    const banner = document.createElement('div');
    banner.id = 'backend-unavailable';
  banner.style.background = '#fff4e5';
  banner.style.border = '1px solid #ffd39f';
  banner.style.color = '#111';
    banner.style.padding = '12px';
    banner.style.margin = '8px 0';
    banner.style.borderRadius = '8px';
    banner.innerHTML = `
      <strong>Online functionality unavailable</strong>
      <p style="margin:6px 0 8px">The backend is not connected on this public version. You can try a demo sign-in that doesn't require a server.</p>
    `;
    const demoBtn = document.createElement('button');
    demoBtn.className = 'btn primary';
  demoBtn.textContent = 'Sign in as company (demo)';
    demoBtn.addEventListener('click', ()=>{
  const demo = { id: 'demo-company', name: 'Demo Company', email: form.querySelector('[name="email"]').value || 'demo@company.test' };
      try{ localStorage.setItem('primerpaso_company', JSON.stringify(demo)); } catch(e){}
      window.location.href = '/company-dashboard';
    });
  banner.appendChild(demoBtn);
  form.prepend(banner);
  }
});
