document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  // Mostrar mensaje de éxito si vienes de la página de registro
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
  submitButton.disabled = true;
  submitButton.textContent = 'Signing in...';

    const formData = new FormData(form);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
  // API returns { user, profile } now. Store a merged student object for the demo client.
  const studentData = Object.assign({}, data.profile || {}, { id: data.user?.id, email: data.user?.email });
  localStorage.setItem('primerpaso_student', JSON.stringify(studentData));
  window.location.href = '/integradora'; // redirect to dashboard
      } else if (response.status === 404) {
        showBackendUnavailable();
      } else {
  const errorData = await response.json().catch(() => ({}));
  alert(`Error: ${errorData.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      // network/server error
      showBackendUnavailable();
    } finally {
  submitButton.disabled = false;
  submitButton.textContent = 'Sign in';
    }
  });

  function showBackendUnavailable(){
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
    demoBtn.textContent = 'Sign in as student (demo)';
    demoBtn.addEventListener('click', ()=>{
      const demo = { id: 'demo-student', name: 'Demo Student', email: form.querySelector('[name="email"]').value || 'demo@student.test' };
      try{ localStorage.setItem('primerpaso_student', JSON.stringify(demo)); } catch(e){}
      window.location.href = '/integradora';
    });
    banner.appendChild(demoBtn);
    form.prepend(banner);
  }
});
